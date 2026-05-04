import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout cancelled',
  robots: { index: false, follow: false },
};

export default function OrderCancelledPage() {
  return (
    <section className="container-prose py-20 text-center">
      <p className="text-sm uppercase tracking-widest text-muted mb-4">
        Checkout cancelled
      </p>
      <h1 className="mb-6">No worries.</h1>
      <p className="text-lg text-ink/85 mb-10">
        Your card wasn't charged. If something on the checkout page felt
        off, hit reply on a WhatsApp message and tell us — we'd rather hear
        about it than lose you quietly.
      </p>

      <div className="flex justify-center gap-3">
        <Link href="/" className="btn-primary">
          Take another look
        </Link>
        <Link href="/contact" className="btn-ghost">
          Tell us what happened
        </Link>
      </div>
    </section>
  );
}
