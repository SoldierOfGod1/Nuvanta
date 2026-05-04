# Stack Architecture — Self-Hosted Nuvanta

Generated 2026-05-04. Replaces `/docs/11-shopify-setup.md` as the build path.

The store is a self-hosted Next.js application. PayFast handles payments
via hosted checkout (no PCI scope on Nuvanta's side). Resend handles
transactional email. Vercel handles deployment. Total monthly fixed cost:
~R150–R250 (vs R580 for Shopify Basic).

This doc explains the stack and why each piece was chosen. Code lives
in `/web/` at the repo root.

---

## 1. Stack at a glance

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | Server components for SEO + speed, file-based routing, mature ecosystem |
| Language | **TypeScript** | Catches errors at compile time, better tooling |
| Styling | **Tailwind CSS** | Brand voice palette + typography expressed as utility classes |
| Payments | **PayFast hosted checkout** | SA-native, no PCI scope, founder already has a merchant account |
| Email | **Resend** | 3k/mo free, modern API, deliverability good |
| Deploy | **Vercel** (free tier) | One `git push` deploys, free SSL, edge CDN, free up to 100GB/mo |
| Domain | Founder's registrar | Cloudflare DNS optional |
| Analytics | GA4 + Meta Pixel + TikTok Pixel | Same as `/docs/09-tracking-setup.md` |
| Cookies | Custom consent banner | POPIA-compliant, gates pixel loading |
| Data | None for v1 | Orders flow PayFast ITN → Resend email → founder inbox |

---

## 2. Why not Shopify

Shopify is excellent at one job: making non-technical merchants productive
fast with 100+ SKUs, complex shipping, inventory tracking, app ecosystem.

Nuvanta in Phase 1 has:
- 1 SKU
- 1 shipping zone (SA)
- No inventory management (dropship via Dropstore)
- No complex variants

Shopify's value proposition is wasted on this scope. R580/mo for features
you don't use. The pivot point would be Phase 3+ (multiple categories,
inventory, scale) — but by then you'd be locked into Shopify's data model
and pay rising platform fees forever.

**Self-hosting now means you own the codebase forever.** Migrate to
Shopify in 18 months if it makes sense. Or stay self-hosted and pay
~R150/mo at scale instead of R580 + per-transaction fees.

---

## 3. Why not WordPress / WooCommerce

Common SA choice. Real downsides:
- WordPress security maintenance is real work (updates, plugins, exploits)
- Page speed is hard without aggressive caching plugins
- Theme + plugin lock-in limits brand-led design
- PHP knowledge needed to make non-trivial changes
- Slower than Next.js by default

WooCommerce is the right answer if the founder wants point-and-click admin
and zero command-line work. But the founder already pushed a `git`-managed
repo to GitHub. Next.js fits better.

---

## 4. Why not full headless commerce (Medusa / Saleor / Vendure)

Powerful and modern but overkill for a wedge:
- Self-hosted backend means founder runs a Node service + Postgres + Redis
- DevOps burden is real even with Docker / Railway
- Onboarding cost is high (data model, schema, admin UI)

Phase 1 needs to ship in 2 weeks. Headless commerce platforms ship in
6+ weeks for non-developers. Wrong tool for the wedge.

If Phase 2 succeeds and SKU count crosses 30+, revisit Medusa as the
backend. The Next.js frontend stays.

---

## 5. Architecture diagram (text)

```
                      ┌────────────────────┐
                      │  nuvanta.co.za     │
                      │  (Vercel CDN)      │
                      └─────────┬──────────┘
                                │
                  ┌─────────────┼─────────────────┐
                  │             │                 │
                  ▼             ▼                 ▼
           [Static pages]  [Buy button]   [/api/payfast-webhook]
              (RSC)         (server         (Next.js Route
                              action)         Handler)
                                │                 ▲
                                │                 │
                                ▼                 │
                       ┌────────────────┐         │
                       │  PayFast.co.za │─────────┘
                       │ hosted checkout│   ITN webhook
                       │   + 3D Secure  │   on payment complete
                       └────────────────┘
                                │
                                │ on COMPLETE
                                ▼
                       ┌────────────────┐
                       │   Resend API   │  → order confirmation
                       └────────────────┘     to customer
                                              + founder
```

Key design choice: **no database in v1**. Orders are emailed to founder
+ customer. Founder's email inbox + a Google Sheet is the order book for
the first 100 orders. When that breaks (~Phase 2), add Supabase Postgres
in 1 day.

---

## 6. Pricing — monthly fixed

| Service | Cost | Notes |
|---|---|---|
| Vercel Hobby | R0 | Free tier — 100GB bandwidth, unlimited sites |
| Resend | R0 | 3,000 emails/mo free; pay R200/mo at 10k emails |
| Domain (.co.za) | R12/mo | annualised |
| Cloudflare DNS | R0 | optional but recommended |
| PayFast | R0/mo | per-transaction only (3.5% + R2.50) |
| **Total fixed** | **~R12–R200/mo** | vs Shopify Basic R580/mo |

At 100 sales/mo, total cost (incl. PayFast fees) is ~R2,000 across
gateway + platform. Shopify Basic equivalent is ~R2,580 + 1.7%
transaction fee on top of PayFast. Self-hosting saves ~R600/mo from
day one and grows to ~R3,000/mo of savings at Phase 2 scale.

---

## 7. Trade-offs (be honest)

### What you give up vs Shopify
- **No admin UI.** Orders arrive by email. Founder builds a Google Sheet
  workflow. Fine for ~100/mo, manual at higher volume.
- **No built-in apps.** Reviews, popups, abandoned cart flows must be
  coded or skipped.
- **No theme marketplace.** You're the designer. Brand is in your hands.
- **You handle uptime.** Vercel is 99.99% but if your code breaks, it's
  on you to fix.

### What you gain
- **Total cost ~75% lower** at Phase 1 scale.
- **You own every line of code.** Nothing locks you in.
- **Page speed near-perfect.** 95+ Lighthouse score is achievable.
- **Brand-led design with zero theme constraints.**
- **Modern stack** the founder can extend forever without a Shopify
  developer.

### What's the same
- PayFast still the gateway (same R580/mo merchant fees, same payouts)
- Same legal docs (`/docs/08`)
- Same email content (`/docs/12`)
- Same support playbook (`/docs/13`)
- Same brand voice (`/docs/05`) baked into components

---

## 8. Repo layout

```
Nuvanta/
├── docs/                  ← all 16 strategy docs
└── web/                   ← Next.js app
    ├── app/               ← App Router pages
    │   ├── layout.tsx
    │   ├── page.tsx       ← homepage / product
    │   ├── globals.css
    │   ├── about/
    │   ├── contact/
    │   ├── returns/
    │   ├── privacy/
    │   ├── terms/
    │   ├── faq/
    │   ├── order/
    │   │   ├── success/
    │   │   └── cancelled/
    │   └── api/
    │       ├── checkout/        ← initiates PayFast
    │       └── payfast-webhook/ ← receives PayFast ITN
    ├── components/        ← reusable UI
    ├── lib/               ← server-side helpers
    ├── public/            ← images, favicons
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    └── .env.example
```

---

## 9. Local dev workflow

```bash
cd web/
npm install                    # one-time
cp .env.example .env.local     # fill in local PayFast sandbox creds + Resend test key
npm run dev                    # http://localhost:3000
```

Runs against PayFast sandbox by default. Switch to production by setting
`PAYFAST_SANDBOX=false` and providing live merchant credentials.

---

## 10. Deploy workflow

```bash
git push origin main
```

That's it. Vercel auto-deploys on push. Custom domain configured in
Vercel UI (one-time, ~5 min).

Full deploy guide: `web/README.md`.

---

## 11. Migration from this doc

`docs/11-shopify-setup.md` is **superseded** by this doc. Marked accordingly
at the top of that file.

Other docs are stack-agnostic and continue to apply:
- `docs/05-brand-voice` — drives component styling
- `docs/06-product-page` — content for `app/page.tsx`
- `docs/08-legal-templates` — content for `app/{returns,privacy,terms}/page.tsx`
- `docs/12-email-sequences` — templates for Resend
- `docs/09-tracking-setup` — Pixel + GA4 setup, identical client-side
- `docs/10-launch-runbook` — operational runbook unchanged

The strategy is the same. The implementation is now in your hands.
