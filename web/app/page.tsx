import { ProductHero } from '@/components/ProductHero';
import { TrustStrip } from '@/components/TrustStrip';
import { FounderNote } from '@/components/FounderNote';
import { FAQSection } from '@/components/FAQSection';
import { FEATURED_PRODUCT } from '@/lib/products';

export default function HomePage() {
  const product = FEATURED_PRODUCT;

  return (
    <>
      <ProductHero product={product} />

      <section className="container-page py-16 sm:py-20">
        <h2 className="text-center mb-12">Why this one</h2>
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
          {product.features.map((f) => (
            <div key={f.title}>
              <h3 className="mb-2 text-lg">{f.title}</h3>
              <p className="text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <FounderNote />

      <section className="container-page py-16 sm:py-20 border-t border-line">
        <h2 className="mb-10">Specs</h2>
        <dl className="divide-y divide-line">
          {product.specs.map((s) => (
            <div key={s.label} className="py-4 grid grid-cols-3 gap-4">
              <dt className="text-muted">{s.label}</dt>
              <dd className="col-span-2">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <TrustStrip />

      <FAQSection />
    </>
  );
}
