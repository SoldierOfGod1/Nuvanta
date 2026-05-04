import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { Pixels } from '@/components/Pixels';
import { siteUrl } from '@/lib/utils';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nuvanta';
const SITE_TAGLINE = 'Hand-picked essentials for South Africans';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    'Nuvanta hand-picks one good thing at a time. Curated essentials, tested for South African conditions, shipped within 2 days.',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Curated essentials for the modern South African. Hand-picked, tested, shipped in 2 days.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      'Curated essentials for the modern South African. Hand-picked, tested, shipped in 2 days.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F4EE',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-ZA">
      <body>
        <Pixels />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
