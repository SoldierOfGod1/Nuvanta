import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & refunds',
  description:
    'Our 7-day cooling-off return policy. Try it for a week — if it is not right, we cover return shipping.',
};

export default function ReturnsPage() {
  const support = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@nuvanta.co.za';

  return (
    <section className="container-prose py-16 sm:py-20">
      <h1 className="mb-4">Try it for 7 days. We've got you covered.</h1>
      <p className="text-muted mb-10">Last updated 4 May 2026</p>

      <div className="space-y-8 text-ink/85 leading-relaxed">
        <div>
          <h3 className="text-xl mb-2">Your 7-day cooling-off right</h3>
          <p>
            Because you bought from us online, you have the right to return
            any product within 7 days of receiving it, for any reason — even
            if you just changed your mind. We'll refund the full amount you
            paid, including the original delivery fee. (ECT Act Section 44.)
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Who pays for return shipping?</h3>
          <p>
            We do. For cooling-off returns, Nuvanta covers return-courier costs.
            Email <a className="link" href={`mailto:${support}`}>{support}</a>{' '}
            with your order number and we'll send a return-collection booking.
            You don't arrange the courier yourself.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Condition of returned goods</h3>
          <p>
            Product must be in original packaging, with all accessories, and
            not visibly used (charging it once to test is fine; using it as
            your daily power bank for a week is not). Items returned in
            unsellable condition may be refunded at a reduced amount.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Refund timeline</h3>
          <p>
            Once we receive and inspect the product (1–2 business days after
            the courier returns it to us), your refund is processed within
            5 business days to the original payment method. PayFast and Ozow
            refunds typically land in 2–3 working days after we initiate.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Defective products (CPA Section 56)</h3>
          <p>
            If the product is defective, doesn't do what we said it would, or
            breaks within 6 months of normal use, you can choose: repair,
            replacement, OR full refund. This is your statutory right under
            the Consumer Protection Act.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">Manufacturer warranty</h3>
          <p>
            The Nuvanta Daily Power Bank carries a 12-month manufacturer
            warranty covering defects in materials or workmanship. Damage
            from drops, liquid, fire, modification, or use with non-standard
            cables is not covered.
          </p>
        </div>

        <div>
          <h3 className="text-xl mb-2">What's NOT returnable</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Items you've owned more than 7 days (unless defective — see CPA above)</li>
            <li>Items damaged through misuse</li>
            <li>Gift cards / store credit</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-2">How to start a return</h3>
          <p>Email <a className="link" href={`mailto:${support}`}>{support}</a> with:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Order number</li>
            <li>Reason for return (one line is fine)</li>
            <li>Photos if the item is defective</li>
          </ul>
          <p className="mt-3">
            We'll respond within 1 business day with the next steps.
          </p>
        </div>
      </div>
    </section>
  );
}
