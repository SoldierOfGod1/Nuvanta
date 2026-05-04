// Single source of truth for product data. Phase 1 wedge = single SKU.
// When Phase 2 adds SKUs, extend this list and add slug-based routing.

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  priceZar: number;          // Display + checkout price (VAT-inclusive at this stage)
  costZar: number;           // Internal — for margin reporting
  imageHero: string;         // /public/products/...
  imageAlt: string;
  features: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  shipsWithinDays: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 'daily-power-bank',
    slug: 'daily-power-bank',
    name: 'Nuvanta Daily Power Bank',
    shortName: 'Daily Power Bank',
    tagline: 'Two days of phone. One charger.',
    description:
      '20,000mAh, triple-port, fits a back pocket. Hand-picked, tested in Joburg load-shedding and overnight Karoo road trips.',
    priceZar: 499,
    costZar: 250,
    imageHero: '/products/daily-power-bank-hero.jpg',
    imageAlt: 'Nuvanta Daily Power Bank on a wooden desk, charging an iPhone',
    features: [
      {
        title: 'Charges most phones 4–5 times.',
        body: '20,000mAh holds enough for a long weekend off-grid.',
      },
      {
        title: 'Three things at once.',
        body: 'USB-C in/out, USB-A, and fast-charge port. No cable hunting.',
      },
      {
        title: 'Pocket-sized.',
        body: '14 cm × 7 cm × 2.5 cm. Slips into a back pocket or backpack pouch.',
      },
    ],
    specs: [
      { label: 'Capacity', value: '20,000mAh / 74Wh' },
      { label: 'Output', value: 'USB-C PD 18W, USB-A QC 18W, USB-A 5V/2.4A' },
      { label: 'Input', value: 'USB-C PD 18W (full charge ~4 hrs)' },
      { label: 'Size', value: '14 × 7 × 2.5 cm' },
      { label: 'Weight', value: '380g' },
      { label: "What's in the box", value: 'Power bank, USB-C cable, carry pouch, instructions' },
    ],
    inStock: true,
    shipsWithinDays: 2,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const FEATURED_PRODUCT = PRODUCTS[0];
