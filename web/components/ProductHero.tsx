import { BuyButton } from './BuyButton';
import type { Product } from '@/lib/products';

export function ProductHero({ product }: { product: Product }) {
  return (
    <section className="container-page pt-12 sm:pt-16 pb-10 sm:pb-12">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="text-muted text-sm uppercase tracking-widest mb-4">
            Phase 1 · Hand-picked
          </p>
          <h1 className="mb-5">{product.tagline}</h1>
          <p className="text-lg text-ink/80 max-w-xl mb-8">
            The {product.name}. {product.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="text-2xl font-medium">
              R{product.priceZar.toFixed(0)}
              <span className="text-sm text-muted ml-2 font-normal">
                VAT incl.
              </span>
            </div>
            <BuyButton product={product} />
          </div>

          <p className="text-sm text-muted">
            Ships within {product.shipsWithinDays} working days · 7-day returns,
            we cover shipping
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <div className="aspect-[4/5] bg-line rounded-sm overflow-hidden flex items-center justify-center">
            {/* Replace with <Image> + real photo once assets are in /public */}
            <div className="text-center text-muted p-8">
              <div className="font-display text-3xl mb-2">[ Product photo ]</div>
              <p className="text-sm">
                Add hero image to{' '}
                <code className="text-xs bg-bg px-1 py-0.5">
                  /public{product.imageHero}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
