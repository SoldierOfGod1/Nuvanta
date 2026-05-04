// PayFast helper — server-side only.
// Docs: https://developers.payfast.co.za/docs#step_1_form_fields
//
// Flow:
//   1. POST to /api/checkout with order details
//   2. Server builds signed PayFast form params, returns hosted-checkout URL
//   3. Browser redirects customer to PayFast
//   4. Customer pays. PayFast posts ITN to /api/payfast-webhook
//   5. Server verifies ITN signature + validates back to PayFast
//   6. Server emails customer + founder, redirects browser to /order/success

import crypto from 'node:crypto';

const SANDBOX_PROCESS_URL = 'https://sandbox.payfast.co.za/eng/process';
const LIVE_PROCESS_URL = 'https://www.payfast.co.za/eng/process';
const SANDBOX_VALIDATE_URL = 'https://sandbox.payfast.co.za/eng/query/validate';
const LIVE_VALIDATE_URL = 'https://www.payfast.co.za/eng/query/validate';

export type PayfastFormData = {
  // Merchant
  merchant_id: string;
  merchant_key: string;
  return_url: string;
  cancel_url: string;
  notify_url: string;

  // Buyer (optional, helps PayFast pre-fill checkout)
  name_first?: string;
  name_last?: string;
  email_address?: string;
  cell_number?: string;

  // Transaction
  m_payment_id: string;       // our order reference (UUID)
  amount: string;             // 2-decimal string, e.g. "499.00"
  item_name: string;
  item_description?: string;

  // Custom fields — opaque to PayFast, returned in ITN
  custom_str1?: string;       // e.g. product_id
  custom_str2?: string;       // e.g. shipping address summary
  custom_str3?: string;
  custom_str4?: string;
  custom_str5?: string;
  custom_int1?: string;
  custom_int2?: string;

  // Subscription / split (unused for one-off purchases)
  // ... omitted

  // Signature — added by buildSignedFormData
  signature?: string;
};

export function getProcessUrl(): string {
  return isSandbox() ? SANDBOX_PROCESS_URL : LIVE_PROCESS_URL;
}

export function getValidateUrl(): string {
  return isSandbox() ? SANDBOX_VALIDATE_URL : LIVE_VALIDATE_URL;
}

export function isSandbox(): boolean {
  return process.env.PAYFAST_SANDBOX !== 'false';
}

/**
 * Build the full set of PayFast form fields with a valid MD5 signature.
 * The signature is computed over all non-empty fields in the order they appear,
 * URL-encoded with %20 → +, with the optional passphrase appended.
 */
export function buildSignedFormData(
  fields: Omit<PayfastFormData, 'signature'>,
): PayfastFormData {
  const passphrase = process.env.PAYFAST_PASSPHRASE || '';

  // Iterate in insertion order, skip empty values, encode per PayFast spec
  const parts: string[] = [];
  for (const [key, raw] of Object.entries(fields)) {
    if (raw === undefined || raw === null || raw === '') continue;
    const value = String(raw).trim();
    parts.push(`${key}=${encodeFormValue(value)}`);
  }

  let signatureSource = parts.join('&');
  if (passphrase) {
    signatureSource += `&passphrase=${encodeFormValue(passphrase.trim())}`;
  }

  const signature = crypto
    .createHash('md5')
    .update(signatureSource)
    .digest('hex');

  return { ...fields, signature };
}

function encodeFormValue(value: string): string {
  // PayFast spec: encodeURIComponent, then replace %20 with + (form encoding)
  return encodeURIComponent(value).replace(/%20/g, '+');
}

/**
 * Verify the signature on an incoming ITN (Instant Transaction Notification).
 * Returns true if the signature matches, false otherwise.
 */
export function verifyItnSignature(payload: Record<string, string>): boolean {
  const receivedSignature = payload.signature;
  if (!receivedSignature) return false;

  const passphrase = process.env.PAYFAST_PASSPHRASE || '';
  const parts: string[] = [];
  for (const [key, value] of Object.entries(payload)) {
    if (key === 'signature') continue;
    if (value === undefined || value === null || value === '') continue;
    parts.push(`${key}=${encodeFormValue(String(value))}`);
  }

  let signatureSource = parts.join('&');
  if (passphrase) {
    signatureSource += `&passphrase=${encodeFormValue(passphrase.trim())}`;
  }

  const expected = crypto
    .createHash('md5')
    .update(signatureSource)
    .digest('hex');

  return safeEqual(expected, receivedSignature);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * After receiving an ITN, POST it back to PayFast for server-side validation.
 * This confirms the ITN actually came from PayFast (not a forgery hitting our endpoint).
 */
export async function validateItnWithPayfast(
  payload: Record<string, string>,
): Promise<boolean> {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(payload)) {
    body.append(key, String(value));
  }

  const res = await fetch(getValidateUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const text = await res.text();
  return text.trim() === 'VALID';
}

/**
 * Validate that the ITN amount matches what we expected for this order.
 * Catches the case where a tampered ITN claims a R1 payment for an R499 order.
 */
export function validateAmount(
  itnAmount: string,
  expectedAmount: number,
): boolean {
  const itnNumber = Number.parseFloat(itnAmount);
  if (Number.isNaN(itnNumber)) return false;
  // Small tolerance for cents-level rounding
  return Math.abs(itnNumber - expectedAmount) < 0.01;
}

export function formatZar(amountInRand: number): string {
  return amountInRand.toFixed(2);
}
