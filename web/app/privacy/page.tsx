import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'POPIA-aligned privacy policy. What we collect, why, and your rights over it.',
};

export default function PrivacyPage() {
  return (
    <section className="container-prose py-16 sm:py-20">
      <h1 className="mb-4">Privacy policy</h1>
      <p className="text-muted mb-10">Last updated 4 May 2026</p>

      <div className="space-y-8 text-ink/85 leading-relaxed">
        <div>
          <h3 className="text-xl mb-2">1. Who we are</h3>
          <p>
            Nuvanta is operated by{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[LEGAL ENTITY NAME]</span>{' '}
            ("Nuvanta", "we", "us"), a Pty Ltd / sole proprietor registered in
            South Africa, registration number{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[CIPC NUMBER]</span>,
            with its principal place of business at{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[REGISTERED ADDRESS]</span>.
          </p>
          <p className="mt-3">
            Information Officer:{' '}
            <span className="bg-line px-1 py-0.5 text-sm">[FOUNDER NAME]</span>
            <br />
            Contact: <a className="link" href="mailto:privacy@nuvanta.co.za">privacy@nuvanta.co.za</a>
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">2. What we collect</h3>
          <p className="font-medium mt-3">When you visit our site:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address, browser type, device type, pages viewed (server logs)</li>
            <li>Cookies for cart persistence, session tracking, ad pixel attribution (only after consent)</li>
          </ul>
          <p className="font-medium mt-3">When you place an order:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name, email, phone, delivery address</li>
            <li>Payment is processed by PayFast / Ozow — we never see or store your full card details</li>
            <li>Order history (so we can support you)</li>
          </ul>
          <p className="font-medium mt-3">When you contact us:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Email content, WhatsApp messages, support ticket history</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">3. Why we collect it</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Performance of contract:</span> to fulfil and deliver your order</li>
            <li><span className="font-medium">Legitimate interest:</span> to improve the site, prevent fraud, send order updates</li>
            <li><span className="font-medium">Consent:</span> for marketing emails (you can unsubscribe any time)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">4. Who we share it with</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Couriers:</span> name, address, phone</li>
            <li><span className="font-medium">PayFast / Ozow:</span> name, email, amount</li>
            <li><span className="font-medium">Dropstore / supplier:</span> name, address, order details</li>
            <li><span className="font-medium">Meta, TikTok, Google:</span> hashed email + browsing events (only after cookie consent, opt-out available)</li>
          </ul>
          <p className="mt-3">
            We never sell your data. We never share it for purposes outside
            fulfilling your order, supporting you, or marketing our own products.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">5. How long we keep it</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Order records: 7 years (SARS / VAT compliance)</li>
            <li>Marketing list: until you unsubscribe + 30 days</li>
            <li>Support tickets: 2 years</li>
            <li>Server logs: 90 days</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">6. Your rights (POPIA)</h3>
          <p>You can ask us to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Show you what we have on you</li>
            <li>Correct it if it's wrong</li>
            <li>Delete it (subject to our 7-year SARS obligation on order records)</li>
            <li>Stop processing it for marketing</li>
          </ul>
          <p className="mt-3">
            Email{' '}
            <a className="link" href="mailto:privacy@nuvanta.co.za">
              privacy@nuvanta.co.za
            </a>
            . We respond within 7 business days.
          </p>
          <p className="mt-3">
            If we don't satisfy your request, you can complain to the
            Information Regulator at{' '}
            <a className="link" href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer">
              inforegulator.org.za
            </a>
            .
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">7. Cookies</h3>
          <p>
            Necessary cookies (cart, session) — always on. Analytics +
            advertising cookies (Meta Pixel, TikTok Pixel, GA4) — set only
            after you accept the cookie banner. Decline and we won't load them.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">8. Updates to this policy</h3>
          <p>We'll email you at least 14 days before any material change.</p>
        </div>
      </div>
    </section>
  );
}
