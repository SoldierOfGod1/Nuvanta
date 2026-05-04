import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Two of us in Joburg, picking gear we would actually use. Curated essentials for South Africans.',
};

export default function AboutPage() {
  return (
    <section className="container-prose py-16 sm:py-20">
      <h1 className="mb-8">About Nuvanta</h1>

      <div className="space-y-5 text-ink/85 text-lg leading-relaxed">
        <p>
          We hand-pick gear that earns its place in your day. We tell you
          when it's worth the money and when it isn't. We'd rather sell
          you one good thing than ten you'll forget by next month.
        </p>
        <p>
          Two of us in Joburg, picking gear we'd actually use. Every product
          on Nuvanta is something we tested ourselves under South African
          conditions — load-shedding nights, road trips through the Karoo,
          the occasional power-cut on a Saturday morning when you really
          need a coffee.
        </p>
        <p>
          We started Nuvanta because South African shoppers deserve better
          than scrolling 10,000 SKUs to find the one that won't quit on
          them in three months. So we did the scrolling for you. We've
          tested four power banks, two desk lamps, and counting. The ones
          that pass become Nuvanta. The ones that don't, we tell you why.
        </p>
        <p className="text-muted">
          — The Nuvanta team
        </p>
      </div>
    </section>
  );
}
