import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & conditions',
  description: 'The terms that apply when you order from Nuvanta.',
};

export default function TermsPage() {
  return (
    <section className="container-prose py-16 sm:py-20">
      <h1 className="mb-4">Terms &amp; conditions</h1>
      <p className="text-muted mb-10">Last updated 4 May 2026</p>

      <div className="space-y-8 text-ink/85 leading-relaxed">
        <div>
          <h3 className="text-xl mb-2">1. About these terms</h3>
          <p>
            By using nuvanta.co.za you agree to these terms. If you don't,
            please don't place an order.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">2. Who we are</h3>
          <p>
            Nuvanta is operated by{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[LEGAL ENTITY NAME]</span>,
            registration number{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[CIPC NUMBER]</span>,
            registered at{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[REGISTERED ADDRESS]</span>.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">3. Products</h3>
          <p>
            We try to describe products accurately. Photos are illustrative —
            slight variations in colour or finish may occur. Prices are in
            South African Rand, VAT-inclusive (where applicable). Prices may
            change without notice but the price you paid at checkout is the
            price honoured for that order.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">4. Orders</h3>
          <p>
            Placing an order is an offer to buy. We accept your offer when
            we send the order confirmation email. We may decline or cancel
            any order (e.g. fraud signals, stockouts) — if we do, we'll
            refund any payment within 5 business days.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">5. Payment</h3>
          <p>
            We accept payments processed by PayFast and Ozow. Your card
            details never touch our servers.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">6. Delivery</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>We ship within 2 working days of order confirmation.</li>
            <li>Courier delivery: 1–3 business days metro; 2–5 business days regional.</li>
            <li>Delivery dates are estimates. We're not liable for courier-side delays.</li>
            <li>If your order doesn't arrive within 14 business days, contact us — we'll investigate or refund.</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">7. Risk and ownership</h3>
          <p>Risk passes to you on delivery. Ownership passes when payment clears.</p>
        </div>

        <div>
          <h3 className="text-xl mb-2">8. Returns</h3>
          <p>
            See our{' '}
            <Link href="/returns" className="link">
              Returns &amp; Refunds Policy
            </Link>
            .
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">9. Warranty</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>12-month manufacturer warranty (defects in materials or workmanship)</li>
            <li>6-month statutory warranty under CPA Section 56 (always applies)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">10. Limitation of liability</h3>
          <p>
            To the maximum extent permitted by law, our total liability for
            any claim relating to a product or order is capped at the amount
            you paid for that order. Nothing in these terms excludes liability
            that cannot legally be excluded (e.g. CPA rights).
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">11. Intellectual property</h3>
          <p>
            All site content, branding, photos, and copy are owned by Nuvanta
            or licensed to us. Don't copy, scrape, or republish without
            permission.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">12. Disputes</h3>
          <p>
            South African law governs these terms. Disputes go to the courts
            of South Africa,{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[PROVINCE]</span>{' '}
            division. You also have the right to refer disputes to the
            Consumer Goods and Services Ombud (cgso.org.za).
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">13. Changes</h3>
          <p>
            We may update these terms. The version on the site at the time
            of your order is the version that applies to that order.
          </p>
        </div>
      </div>
    </section>
  );
}
