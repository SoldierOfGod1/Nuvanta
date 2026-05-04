import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Email or WhatsApp Nuvanta. We respond within 24 hours, often much faster.',
};

export default function ContactPage() {
  const support = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@nuvanta.co.za';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
  const whatsappDisplay = whatsapp ? `+${whatsapp}` : 'WhatsApp';

  return (
    <section className="container-prose py-16 sm:py-20">
      <h1 className="mb-8">Contact</h1>

      <div className="space-y-6 text-lg text-ink/85">
        <p>
          We're a small team. You'll most likely be talking to the founder
          directly.
        </p>

        <div className="border-l-2 border-accent pl-5 space-y-2">
          <p>
            <span className="text-muted text-sm uppercase tracking-widest mr-2">
              Email
            </span>
            <a href={`mailto:${support}`} className="link">
              {support}
            </a>
          </p>
          {whatsapp && (
            <p>
              <span className="text-muted text-sm uppercase tracking-widest mr-2">
                WhatsApp
              </span>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                {whatsappDisplay}
              </a>
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl mt-10 mb-2">Response times</h3>
          <p className="text-muted">
            WhatsApp · within 2 business hours (08:00–18:00 SA time, weekdays)
            <br />
            Email · within 24 hours
            <br />
            Out of hours · we'll see it the next morning, urgent issues
            should be marked URGENT in the subject line.
          </p>
        </div>
      </div>
    </section>
  );
}
