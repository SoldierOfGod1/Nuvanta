import type { Metadata } from 'next';
import { FAQSection } from '@/components/FAQSection';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about Nuvanta — shipping, returns, payment, warranty.',
};

const SHIPPING_FAQS = [
  {
    q: 'How long does delivery take?',
    a: '1–3 business days metro (Joburg, Cape Town, Durban, Pretoria). 2–5 business days regional. We dispatch within 2 working days of your order.',
  },
  {
    q: 'Do you ship outside South Africa?',
    a: 'Not yet. We are SA-only in Phase 1 — focused on doing one country well first.',
  },
  {
    q: 'Can I pay with EFT or cash on delivery?',
    a: 'Card via PayFast or instant EFT via Ozow at checkout. No COD in Phase 1 — keeps things simple. Both payment options work on mobile.',
  },
  {
    q: 'What if my order arrives damaged?',
    a: 'Email orders@nuvanta.co.za with photos within 7 days. Replacement ships immediately or full refund — your call. We cover return shipping.',
  },
];

export default function FAQPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-prose mb-10">
        <h1 className="mb-4">Frequently asked</h1>
        <p className="text-muted text-lg">
          If your question isn't here, hit us on WhatsApp or email — we'd
          rather answer once than have you guess.
        </p>
      </div>

      <FAQSection />

      <section className="container-page py-12 border-t border-line">
        <h2 className="mb-8">Shipping &amp; payment</h2>
        <dl className="divide-y divide-line">
          {SHIPPING_FAQS.map((item) => (
            <div key={item.q} className="py-6">
              <dt className="font-medium mb-2">{item.q}</dt>
              <dd className="text-muted leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  );
}
