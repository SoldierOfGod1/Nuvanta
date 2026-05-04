'use client';

import { useState, useTransition } from 'react';
import { ShoppingBag, Loader2 } from 'lucide-react';
import type { Product } from '@/lib/products';

export function BuyButton({ product }: { product: Product }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });
        const data = await res.json();
        if (!res.ok || !data.redirectUrl) {
          throw new Error(data.error ?? 'Could not start checkout. Try again.');
        }
        // Hand off to PayFast hosted checkout
        window.location.assign(data.redirectUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={pending || !product.inStock}
        className="btn-primary"
        aria-busy={pending}
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Taking you to checkout
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            Order — R{product.priceZar.toFixed(0)}
          </>
        )}
      </button>
      {error && (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
