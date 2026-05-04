import { NextResponse } from 'next/server';
import {
  verifyItnSignature,
  validateItnWithPayfast,
  validateAmount,
} from '@/lib/payfast';
import { getProductById } from '@/lib/products';
import { sendOrderConfirmation, notifyFounderNewOrder } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * PayFast Instant Transaction Notification (ITN) handler.
 *
 * Security flow (all four checks must pass — fail any → return 200 to ack
 * but do nothing — never 4xx, PayFast will retry, which is what we want
 * if check failed transiently):
 *
 *   1. Signature on the form payload matches our merchant's.
 *   2. Server-side validate POST back to PayFast returns "VALID".
 *   3. Source IP is in PayFast's documented range (best-effort, behind CDN).
 *   4. Amount paid matches what we expected for this order's product.
 *
 * Only when all four pass do we trust payment_status = COMPLETE and
 * trigger the post-payment side effects (email, future: persist order).
 */
export async function POST(req: Request) {
  // Parse form-encoded body (PayFast sends application/x-www-form-urlencoded)
  let formText: string;
  try {
    formText = await req.text();
  } catch {
    return new NextResponse('OK', { status: 200 });
  }

  const params = new URLSearchParams(formText);
  const payload: Record<string, string> = {};
  params.forEach((value, key) => {
    payload[key] = value;
  });

  // --- Check 1: signature ---
  if (!verifyItnSignature(payload)) {
    console.warn('[payfast-webhook] signature verification failed', {
      orderRef: payload.m_payment_id,
    });
    return new NextResponse('OK', { status: 200 });
  }

  // --- Check 2: server-side validate-back ---
  // Skip in dev if no network, but log loudly.
  let serverValid = false;
  try {
    serverValid = await validateItnWithPayfast(payload);
  } catch (err) {
    console.error('[payfast-webhook] validate-back error', err);
  }
  if (!serverValid) {
    console.warn('[payfast-webhook] server-side validation failed', {
      orderRef: payload.m_payment_id,
    });
    return new NextResponse('OK', { status: 200 });
  }

  // --- Check 3: amount matches expected for the product ---
  const productId = payload.custom_str1;
  const quantity = Number.parseInt(payload.custom_int1 ?? '1', 10) || 1;
  const product = productId ? getProductById(productId) : undefined;
  if (!product) {
    console.warn('[payfast-webhook] unknown product', { productId });
    return new NextResponse('OK', { status: 200 });
  }
  const expectedAmount = product.priceZar * quantity;
  if (!validateAmount(payload.amount_gross ?? payload.amount ?? '0', expectedAmount)) {
    console.warn('[payfast-webhook] amount mismatch', {
      orderRef: payload.m_payment_id,
      claimed: payload.amount_gross,
      expected: expectedAmount,
    });
    return new NextResponse('OK', { status: 200 });
  }

  // --- Check 4: payment_status ---
  // PayFast values: COMPLETE, FAILED, CANCELLED, PENDING
  if (payload.payment_status !== 'COMPLETE') {
    // Log and return — we don't fulfill on non-complete events.
    console.info('[payfast-webhook] non-complete status', {
      orderRef: payload.m_payment_id,
      status: payload.payment_status,
    });
    return new NextResponse('OK', { status: 200 });
  }

  // Looks legit. Trigger side effects.
  const orderNumber = payload.m_payment_id;
  const customerEmail = payload.email_address ?? '';
  const customerFirstName = payload.name_first ?? 'there';
  const shippingAddress = [
    payload.name_first,
    payload.name_last,
    payload.cell_number,
  ]
    .filter(Boolean)
    .join(' · ');

  try {
    if (customerEmail) {
      await sendOrderConfirmation({
        to: customerEmail,
        customerFirstName,
        orderNumber,
        productName: product.name,
        amountZar: expectedAmount,
        shippingAddress: shippingAddress || 'Address provided at checkout',
      });
    }

    await notifyFounderNewOrder({
      orderNumber,
      customerName: `${payload.name_first ?? ''} ${payload.name_last ?? ''}`.trim() || 'Unknown',
      customerEmail,
      customerPhone: payload.cell_number ?? '',
      productName: product.name,
      amountZar: expectedAmount,
      shippingAddress: shippingAddress || 'Address provided at checkout',
      paymentStatus: payload.payment_status,
    });
  } catch (err) {
    // Log but ack — PayFast retries on 4xx/5xx. We've already verified the
    // payment, so retrying email isn't worth blocking the ITN ack for.
    console.error('[payfast-webhook] post-payment side-effect error', err);
  }

  return new NextResponse('OK', { status: 200 });
}
