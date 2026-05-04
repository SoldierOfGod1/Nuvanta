'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'nuvanta.cookie-consent';

export type ConsentState = 'unknown' | 'all' | 'essential';

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('unknown');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'all' || stored === 'essential') {
      setConsent(stored);
    }
  }, []);

  function persist(value: ConsentState) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    // Pixels component listens for this custom event to load conditionally
    window.dispatchEvent(
      new CustomEvent('nuvanta:consent-change', { detail: { consent: value } }),
    );
  }

  if (consent !== 'unknown') return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md
                 bg-ink text-bg p-5 rounded-sm shadow-lg z-50"
    >
      <h4 className="font-display text-lg mb-2">Cookies on Nuvanta</h4>
      <p className="text-sm leading-relaxed mb-4 text-bg/85">
        We use cookies to make the site work and remember your cart. We also
        use ad-measurement cookies (Meta + TikTok) — those load only if you
        say yes.
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => persist('all')}
          className="bg-accent text-white text-sm font-medium px-4 py-2 rounded-sm hover:bg-bg hover:text-ink"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => persist('essential')}
          className="bg-transparent border border-bg/40 text-bg text-sm font-medium px-4 py-2 rounded-sm hover:bg-bg hover:text-ink"
        >
          Only essentials
        </button>
      </div>
    </div>
  );
}

export function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'unknown';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'all' || stored === 'essential') return stored;
  return 'unknown';
}
