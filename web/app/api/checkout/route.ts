import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getProductById } from '@/lib/products';
import {
  buildSignedFormData,
  getProcessUrl,
  formatZar,
} from '@/lib/payfast';
import { generateOrderNumber, absoluteUrl } from '@/lib/utils';

export const runtime = 'nodejs';

const BodySchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive().max(10).default(1),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request.', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { productId, quantity } = parsed.data;
  const product = getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }
  if (!product.inStock) {
    return NextResponse.json({ error: 'Out of stock.' }, { status: 409 });
  }

  const merchantId = process.env.PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
  if (!merchantId || !merchantKey) {
    return NextResponse.json(
      { error: 'Payment is not configured. Try again shortly.' },
      { status: 500 },
    );
  }

  const orderNumber = generateOrderNumber();
  const amount = product.priceZar * quantity;

  // Build the PayFast hosted-checkout fields. Insertion order matters
  // for the signature — keep this object's keys in PayFast's documented order.
  const fields = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: absoluteUrl(`/order/success?ref=${orderNumber}`),
    cancel_url: absoluteUrl(`/order/cancelled?ref=${orderNumber}`),
    notify_url: absoluteUrl('/api/payfast-webhook'),

    m_payment_id: orderNumber,
    amount: formatZar(amount),
    item_name: `${product.name} × ${quantity}`,
    item_description: product.description.slice(0, 200),

    custom_str1: product.id,
    custom_int1: String(quantity),
  };

  const signed = buildSignedFormData(fields);
  const processUrl = getProcessUrl();

  // Build the final redirect URL with all signed params as query string.
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(signed)) {
    if (v === undefined || v === null || v === '') continue;
    search.append(k, String(v));
  }

  return NextResponse.json({
    orderNumber,
    redirectUrl: `${processUrl}?${search.toString()}`,
  });
}
