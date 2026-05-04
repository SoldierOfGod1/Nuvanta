// Resend email helper. Templates pulled from /docs/12-email-sequences.md.
// Server-side only.

import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

const FROM = process.env.EMAIL_FROM ?? 'hello@nuvanta.co.za';
const FOUNDER = process.env.EMAIL_FOUNDER ?? 'baptista@nuvanta.co.za';
const FOUNDER_FIRST_NAME = process.env.NEXT_PUBLIC_FOUNDER_NAME ?? 'Baptista';
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '27000000000';

type OrderConfirmationParams = {
  to: string;
  customerFirstName: string;
  orderNumber: string;
  productName: string;
  amountZar: number;
  shippingAddress: string;
};

export async function sendOrderConfirmation(p: OrderConfirmationParams) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping send. Order:', p.orderNumber);
    return { skipped: true };
  }

  const subject = `Order #${p.orderNumber} — we've got it from here`;
  const text = `Hi ${p.customerFirstName},

Thanks for ordering. Your ${p.productName} is on the way — here's what
happens next.

Order #${p.orderNumber}
${p.productName}
Total: R${p.amountZar.toFixed(2)}

Shipping to:
${p.shippingAddress}

What's next:
- We pack and dispatch within 2 working days
- You'll get a tracking link the moment it ships
- Delivery 1-3 days metro, 2-5 days regional

If anything's wrong with your order, hit reply or message us on
WhatsApp (+${WHATSAPP}). We read every message.

— ${FOUNDER_FIRST_NAME}
Nuvanta, Joburg

P.S. The "we tested it for 36 hours in Sutherland" story is real.
Photos coming once you've used yours for a week.
`;

  return resend.emails.send({
    from: `Nuvanta <${FROM}>`,
    to: p.to,
    replyTo: FOUNDER,
    subject,
    text,
  });
}

type FounderNotifyParams = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productName: string;
  amountZar: number;
  shippingAddress: string;
  paymentStatus: string;
};

export async function notifyFounderNewOrder(p: FounderNotifyParams) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping founder notify.');
    return { skipped: true };
  }

  const subject = `🆕 Order #${p.orderNumber} — R${p.amountZar.toFixed(2)} (${p.paymentStatus})`;
  const text = `New order on Nuvanta.

Order:        ${p.orderNumber}
Status:       ${p.paymentStatus}
Product:      ${p.productName}
Amount:       R${p.amountZar.toFixed(2)}

Customer:
  Name:       ${p.customerName}
  Email:      ${p.customerEmail}
  Phone:      ${p.customerPhone}

Shipping:
${p.shippingAddress}

Action items:
1. Place fulfillment order on Dropstore within 2 working days
2. Update tracking in Shopify-replacement order log (Google Sheet)
3. Send shipping confirmation email manually until automation is live

— Nuvanta system
`;

  return resend.emails.send({
    from: `Nuvanta Orders <${FROM}>`,
    to: FOUNDER,
    subject,
    text,
  });
}

type ContactFormParams = {
  fromName: string;
  fromEmail: string;
  message: string;
};

export async function sendContactForm(p: ContactFormParams) {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping contact form send.');
    return { skipped: true };
  }

  return resend.emails.send({
    from: `Nuvanta Contact <${FROM}>`,
    to: FOUNDER,
    replyTo: p.fromEmail,
    subject: `Contact form: ${p.fromName}`,
    text: `From: ${p.fromName} <${p.fromEmail}>\n\n${p.message}`,
  });
}
