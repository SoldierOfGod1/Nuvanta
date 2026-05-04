import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();
  const support = process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@nuvanta.co.za';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

  return (
    <footer className="border-t border-line mt-20">
      <div className="container-page py-14 grid sm:grid-cols-3 gap-10 text-sm">
        <div>
          <h4 className="font-display text-xl mb-3">Nuvanta</h4>
          <p className="text-muted">
            Hand-picked essentials for South Africans who'd rather own one
            good thing than scroll past a thousand bad ones.
          </p>
        </div>

        <div>
          <h5 className="font-medium mb-3">Help</h5>
          <ul className="space-y-2 text-muted">
            <li><Link href="/returns" className="hover:text-ink">Returns &amp; refunds</Link></li>
            <li><Link href="/faq" className="hover:text-ink">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-ink">Contact</Link></li>
            <li>
              <a href={`mailto:${support}`} className="hover:text-ink">
                {support}
              </a>
            </li>
            {whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  WhatsApp us
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-3">Legal</h5>
          <ul className="space-y-2 text-muted">
            <li><Link href="/privacy" className="hover:text-ink">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-ink">Terms</Link></li>
            <li><Link href="/returns" className="hover:text-ink">Returns policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-page border-t border-line py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
        <p>© {year} Nuvanta. Made in Joburg.</p>
        <p>Pay with PayFast or Ozow.</p>
      </div>
    </footer>
  );
}
