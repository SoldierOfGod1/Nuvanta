import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order received',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const ref = searchParams.ref ?? '';

  return (
    <section className="container-prose py-20 text-center">
      <p className="text-sm uppercase tracking-widest text-muted mb-4">
        Order received
      </p>
      <h1 className="mb-6">Thanks for trusting us.</h1>
      <p className="text-lg text-ink/85 mb-8">
        We've got it from here. You'll get an email confirmation in the next
        few minutes, and we'll dispatch within 2 working days.
      </p>

      {ref && (
        <p className="text-sm text-muted mb-8">
          Order reference:{' '}
          <code className="bg-line px-2 py-1 rounded-sm">{ref}</code>
        </p>
      )}

      <p className="text-sm text-muted mb-10">
        If anything looks wrong on the confirmation email, hit reply or
        message us on WhatsApp. We read every one.
      </p>

      <Link href="/" className="btn-ghost">
        Back to Nuvanta
      </Link>
    </section>
  );
}
