# Nuvanta

Curated essentials for the modern South African.

Self-hosted Next.js storefront. Single-product wedge for Phase 1
(Power Bank 20,000mAh). Sequenced expansion into Smart Electronics →
Pet Lifestyle → Fashion Essentials.

## Status

Pre-launch. Vision D selected (Modern Lifestyle & Essentials).
Stack pivoted from Shopify to self-hosted Next.js + PayFast + Vercel.

## Repo layout

```
Nuvanta/
├── docs/               17 strategy + ops docs (read in order)
└── web/                Next.js storefront — deploy-ready
    ├── app/            App Router pages + API routes
    ├── components/     UI components (Header, Footer, Pixels, etc.)
    ├── lib/            Server-side helpers (PayFast, email, products)
    ├── public/         Static assets (add product photos here)
    └── README.md       Local dev + Vercel deploy guide
```

## Documents

| File | Purpose |
|------|---------|
| `docs/01-office-hours-design.md` | Diagnostic, premises, resolved Q&A, unit economics, kill rule |
| `docs/02-ceo-review.md` | Vision A/B/C/D analysis, Vision D decision recorded |
| `docs/03-review.md` | Plan review (3 critical, 5 high, 5 medium, 3 low) — vision-agnostic |
| `docs/04-qa-plan.md` | Launch acceptance criteria + test scenarios + go/no-go |
| `docs/05-brand-voice.md` | Brand promise, voice principles, palette, typography, tone examples |
| `docs/06-product-page.md` | Power Bank product page copy (full conversion surface) |
| `docs/07-ad-creative-briefs.md` | 3 Meta + 3 TikTok creatives, test plan, kill rule |
| `docs/08-legal-templates.md` | Returns policy, T&Cs, POPIA privacy, cookie banner — SA-compliant templates |
| `docs/09-tracking-setup.md` | Meta Pixel + CAPI, TikTok Pixel, GA4, UTM scheme, pre-launch verification |
| `docs/10-launch-runbook.md` | 7-day day-by-day operational runbook with KPI gates and decision tree |
| `docs/11-shopify-setup.md` | **SUPERSEDED** by docs/17 — kept for reference |
| `docs/12-email-sequences.md` | Transactional + lifecycle emails (cart abandon, day-7, day-30, day-90) |
| `docs/13-support-playbook.md` | WhatsApp + email support: quick replies, decision rules, escalation, capacity |
| `docs/14-phase-2-plan.md` | Smart Electronics depth roadmap: 5 SKUs, bundles, creative cadence, 90-day targets |
| `docs/15-risk-register.md` | Week-1, month-3, month-12 risks with probability, mitigation, response |
| `docs/16-founder-budget.md` | Honest cash + time + energy budget, 90-day decision gate |
| `docs/17-stack-architecture.md` | Self-hosted stack decision (replaces Shopify path) |

## Quick start (local dev)

```bash
cd web/
npm install
cp .env.example .env.local
# Fill in PayFast sandbox + Resend test key
npm run dev
```

Open `http://localhost:3000`.

## Deploy

Push to `main`. Vercel auto-deploys (after one-time project setup).
Full guide: `web/README.md`.

## Operating costs

~R12/month fixed (domain only). PayFast 3.5% + R2.50 per transaction.
vs Shopify Basic R580/mo. Self-hosting saves ~R570/mo from day one.

## The plan in one paragraph

Drop the original 3-niche, 9-SKU launch. Vision D is curated lifestyle
across Pet, Fashion, and Smart Electronics for SA urban millennials 25-38.
Wedge first inside Smart Electronics with a single Power Bank 20,000mAh,
R3k ad budget, hard 7-day kill rule. Either find 30 buyers or get a clear
no. Then build depth in Smart Electronics, expand to Pet at month 4,
Fashion last at month 7+ only after the email list is past 5,000.

## Categories (sequenced, not simultaneous)

1. **Smart Electronics** — power banks, LED lights, phone accessories.
   Phase 1 wedge live first.
2. **Pet Lifestyle** — smart feeders, grooming kits, travel accessories.
   Phase 3 expansion.
3. **Fashion Essentials** — minimalist everyday, gym/lifestyle, caps and bags.
   Phase 4 (last because returns are brutal in apparel dropship).

## Next actions

1. Replace `[BRACKET]` placeholders in `web/app/{privacy,terms}/page.tsx` with
   real legal entity details.
2. Add real product hero photo to `web/public/products/daily-power-bank-hero.jpg`.
3. Edit `web/components/FounderNote.tsx` to reference your actual product test.
4. Run `cd web && npm install && npm run dev` to preview locally.
5. Set up PayFast sandbox account, run R1 test transaction.
6. Push to GitHub → import to Vercel → connect domain → done.
