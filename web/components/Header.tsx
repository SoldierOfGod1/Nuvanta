import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="container-page flex items-center justify-between py-5">
        <Link href="/" className="font-display text-2xl tracking-tight">
          Nuvanta
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="link no-underline hover:underline">
            Shop
          </Link>
          <Link href="/about" className="link no-underline hover:underline">
            About
          </Link>
          <Link href="/contact" className="link no-underline hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
