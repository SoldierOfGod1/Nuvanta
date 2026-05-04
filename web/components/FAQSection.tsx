const FAQS = [
  {
    q: 'Is this airline-safe?',
    a: 'Yes. 74Wh is under the 100Wh airline carry-on limit. Take it on flights without a fuss.',
  },
  {
    q: 'How fast does it charge my phone?',
    a: 'Modern phones (iPhone 12+, Samsung S20+) reach 50% in about 30 minutes on the USB-C PD port. Older phones charge slower.',
  },
  {
    q: 'Will it work during load-shedding?',
    a: 'Yes. Charge it overnight when the grid is on, use it during the outage. One full charge runs an iPhone for 2 days of moderate use, or a Wi-Fi router for about 4–5 hours.',
  },
  {
    q: 'Why Nuvanta instead of Takealot?',
    a: "Takealot has 200+ power banks. We have one we tested ourselves and stand behind. If you'd rather scroll, Takealot is fine. If you'd rather we picked, we're here.",
  },
  {
    q: 'What if it breaks?',
    a: 'Email orders@nuvanta.co.za with your order number. Replacement ships within 3 business days for any manufacturing defect in the first 12 months.',
  },
];

export function FAQSection() {
  return (
    <section className="container-page py-16 sm:py-20 border-t border-line">
      <h2 className="mb-10">Frequently asked</h2>
      <dl className="divide-y divide-line">
        {FAQS.map((item) => (
          <div key={item.q} className="py-6">
            <dt className="font-medium mb-2">{item.q}</dt>
            <dd className="text-muted leading-relaxed">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
