# Nuvanta — Web

Self-hosted Next.js storefront. Single-product wedge for Phase 1.

Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · PayFast hosted
checkout · Resend (email) · Vercel (deploy).

Architecture decision: see `/docs/17-stack-architecture.md` at repo root.

---

## Local development

### Prereqs
- Node.js >= 18.17
- A PayFast sandbox account (free, signup at https://sandbox.payfast.co.za)
- A Resend account (free, signup at https://resend.com)

### Setup

```bash
cd web/
npm install
cp .env.example .env.local
# Fill in PayFast sandbox + Resend test API key in .env.local
npm run dev
```

Open `http://localhost:3000`. Click **Order — R499** to test the PayFast
sandbox flow. Sandbox card numbers documented at
https://developers.payfast.co.za/docs#testing.

### Useful scripts

```bash
npm run dev          # local dev with hot reload
npm run build        # production build
npm run start        # serve the production build
npm run typecheck    # TypeScript only, no emit
npm run lint         # ESLint
```

---

## Production deploy (Vercel — recommended)

### One-time

1. Push the `Nuvanta/` repo to GitHub (already done — `SoldierOfGod1/Nuvanta`)
2. Sign in to Vercel with GitHub
3. **Import Project** → select `Nuvanta` repo
4. **Root Directory** → `web/` (important, since the docs/ folder is at repo root)
5. **Framework preset:** Next.js (auto-detected)
6. **Build command:** `npm run build` (default)
7. **Output directory:** `.next` (default)
8. Click **Deploy** — first deploy fails because env vars aren't set yet,
   that's fine

### Environment variables (set in Vercel dashboard)

Settings → Environment Variables → add each from `web/.env.example`:

```
NEXT_PUBLIC_SITE_URL=https://nuvanta.co.za
NEXT_PUBLIC_SITE_NAME=Nuvanta
NEXT_PUBLIC_FOUNDER_NAME=Baptista
NEXT_PUBLIC_WHATSAPP_NUMBER=27XXXXXXXXX
NEXT_PUBLIC_SUPPORT_EMAIL=hello@nuvanta.co.za

PAYFAST_SANDBOX=false
PAYFAST_MERCHANT_ID=<your live merchant id>
PAYFAST_MERCHANT_KEY=<your live merchant key>
PAYFAST_PASSPHRASE=<your live passphrase, if set>

RESEND_API_KEY=<your live API key, re_xxx>
EMAIL_FROM=hello@nuvanta.co.za
EMAIL_FOUNDER=baptista@nuvanta.co.za

NEXT_PUBLIC_META_PIXEL_ID=<your meta pixel id>
NEXT_PUBLIC_TIKTOK_PIXEL_ID=<your tiktok pixel id>
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

WEBHOOK_SECRET=<openssl rand -hex 32 output>
```

After saving env vars: **Deployments → Redeploy → Use existing Build Cache: off**.

### Custom domain

1. Buy / already-own `nuvanta.co.za`
2. In Vercel: **Settings → Domains → Add** → `nuvanta.co.za`
3. Vercel shows DNS records to add at your registrar:
   - `A` record: `nuvanta.co.za` → `76.76.21.21`
   - `CNAME`: `www.nuvanta.co.za` → `cname.vercel-dns.com`
4. Wait 1–10 min for DNS propagation. SSL auto-provisioned.

### PayFast configuration

After domain is live:

1. Log in to PayFast dashboard (sandbox first, then live)
2. **Settings → Integration**
   - Merchant ID and Merchant Key → confirm match Vercel env vars
   - Passphrase → set a strong one, paste into Vercel `PAYFAST_PASSPHRASE`
3. **Settings → Notify URLs**
   - Set ITN URL: `https://nuvanta.co.za/api/payfast-webhook`
4. Run a R1 sandbox transaction to verify the full flow:
   - PayFast hosted checkout opens
   - Test card completes
   - Browser redirects to `/order/success`
   - Founder email + customer email arrive within 1 minute
5. When all green, switch `PAYFAST_SANDBOX=false` in Vercel and use live credentials

### Resend configuration

1. Log in to Resend dashboard
2. **Domains → Add** → `nuvanta.co.za`
3. Add the 3 DNS records (DKIM + SPF + return-path) at registrar
4. Wait for verification (usually <5 min)
5. Copy live API key → Vercel `RESEND_API_KEY`

---

## Repo structure

```
web/
├── app/                  Next.js App Router
│   ├── layout.tsx        Root layout, metadata, pixels, cookie banner
│   ├── page.tsx          Homepage (single-product wedge)
│   ├── globals.css       Tailwind + brand-token CSS
│   ├── about/            About page
│   ├── contact/          Contact page
│   ├── returns/          Returns & refunds policy
│   ├── privacy/          POPIA privacy policy
│   ├── terms/            Terms & conditions
│   ├── faq/              FAQ
│   ├── order/
│   │   ├── success/      Post-payment landing
│   │   └── cancelled/    Cancelled-checkout landing
│   ├── api/
│   │   ├── checkout/     POST → builds PayFast redirect URL
│   │   └── payfast-webhook/  Receives PayFast ITN
│   ├── robots.ts         /robots.txt
│   ├── sitemap.ts        /sitemap.xml
│   └── not-found.tsx     404
├── components/           Reusable UI (Header, Footer, Pixels, etc.)
├── lib/                  Server-side helpers (payfast, email, products, utils)
├── public/               Static assets — add product photos here
└── *.config.{js,ts}      Tooling config
```

---

## Pre-launch verification checklist

Before flipping `PAYFAST_SANDBOX=false`:

- [ ] R1 sandbox transaction completes end-to-end
- [ ] Order confirmation email arrives at customer test address
- [ ] Founder notification email arrives at `EMAIL_FOUNDER`
- [ ] Browser redirected to `/order/success` with correct order ref
- [ ] Cookie banner blocks pixel loading until accepted (verify in DevTools → Network)
- [ ] All 6 footer pages render with no `[BRACKETS]` (replace placeholders in T&Cs + privacy)
- [ ] Mobile load < 3s on 4G (Lighthouse mobile score >= 70)
- [ ] `/robots.txt` and `/sitemap.xml` accessible
- [ ] SSL grade A (test at https://www.ssllabs.com/ssltest/)
- [ ] Domain verified in Meta Business Manager (DNS TXT record live)
- [ ] Resend domain verified

---

## Operating costs (vs Shopify)

| Service | Cost / month |
|---|---|
| Vercel Hobby | R0 (free tier, 100GB bandwidth) |
| Resend | R0 (3,000 emails/mo free) |
| Domain (.co.za, annualised) | ~R12 |
| PayFast | R0 platform fee, 3.5% + R2.50 per txn |
| **Total fixed** | **~R12/mo** |

vs Shopify Basic (R580/mo) + apps + theme. Self-hosting saves ~R570/mo
in Phase 1, scales to several thousand R/mo savings at Phase 2.

Trade-off: you own uptime, SEO, security headers, deploys. Vercel makes
99% of that automatic. The 1% you handle is reading deploy logs when a
build fails.

---

## What this MVP does NOT include (intentional, for Phase 1)

- No customer accounts (guest checkout only)
- No cart (single-product page → direct to PayFast)
- No reviews (no customers yet to review)
- No abandoned-cart recovery (no cart to abandon)
- No admin UI (orders go to founder email + planned Google Sheet)
- No inventory tracking (Dropstore handles)
- No shipping calculator (flat R99)
- No discount codes (no discounts in Phase 1, ever)
- No multi-currency (ZAR only)
- No multi-language (English only)
- No multi-region (SA only)

All of these are addable in Phase 2 if needed. Phase 1's job is to read
the demand signal cleanly. Less to break = more accurate signal.

---

## When to outgrow this stack

- **>30 SKUs:** add Sanity or Payload CMS for product data
- **>500 orders/mo:** add Supabase Postgres for an order table
- **>5 SKUs with variants:** add Medusa.js as headless commerce backend
- **Need an admin UI for ops staff:** add a simple dashboard at `/admin`
  protected by Clerk or NextAuth
- **Subscription products:** PayFast supports recurring; needs custom
  schema on the order side

Each of these is a 1–3 day add. None require a full rewrite.

The Next.js frontend is the durable asset. The backend can evolve under it.
