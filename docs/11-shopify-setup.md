# Shopify Setup Checklist — Nuvanta

> **SUPERSEDED 2026-05-04.** Architecture pivoted to self-hosted Next.js
> + PayFast + Vercel. See `/docs/17-stack-architecture.md` for the active
> build path. This file kept for reference if Shopify ever becomes the
> right answer at Phase 3+ scale.

Generated 2026-05-04. End-to-end store configuration for Phase 1 launch.

Goal: a clean, fast, Vision D-aligned store live in 4-6 hours of focused
work. Don't get clever. Resist the urge to install 12 apps. The store's
job in Phase 1 is to convert ad clicks into one product purchase.

---

## 1. Plan & billing

- **Plan:** Shopify Basic — R580/mo (annual: R464/mo).
- **Trial:** start with the 3-day trial, then R1 for the first month
  (Shopify's standard offer).
- **Annual:** switch to annual after week 4 if the wedge survives.

---

## 2. Theme

**Pick: Dawn (free, official).**

Why Dawn:
- Free, maintained by Shopify, fastest theme on the platform
- Clean type-led layout matches the Vision D brand voice
- Zero cruft (no carousel sliders, no "feature collage" nonsense)
- Mobile-first by default

Theme customisation (~60 min):
- Set accent colour: clay terracotta `#C46A4D` OR deep olive `#5B6B3A`
  (pick one from `/docs/05-brand-voice.md`)
- Set background: off-white `#F7F4EE`
- Set body font: Inter (free via Shopify Fonts)
- Set heading font: Tiempos / Cormorant Garamond / Söhne (paid web licence
  ~R300-R600/yr — worth it)
- Remove default sections you won't use: testimonials carousel, blog feed,
  featured collection grid
- Add: hero with the headline from `/docs/06-product-page.md`, then
  product page link, then trust strip, then footer

**Themes to NOT pick:** Impulse, Empire, Booster — these are conversion-
optimised but visually loud, contradicts the brand voice.

---

## 3. App stack (lean, intentionally)

### Install (5 apps total)
1. **Facebook & Instagram by Meta** (free) — pixel + catalog + IG shop
2. **TikTok by TikTok Inc.** (free) — pixel + catalog
3. **Google & YouTube by Google** (free) — GA4 integration + Google Shopping
4. **Shopify Email** (free up to 10k emails/mo) — transactional + simple flows
5. **Shopify Inbox** (free) — chat consolidation, links to WhatsApp

### Do NOT install yet
- Review apps (Loox, Judge.me) — no customers to review you. Comes Phase 2.
- Upsell / cross-sell apps — single SKU. Pointless.
- Currency converters — ZAR-only market.
- Stamped, Trustpilot, etc. — buys credibility you haven't earned. Smells fake.
- Pop-up apps (Privy, Wisepops) — kills first-time conversion. Add Phase 2.
- Wholesale, subscriptions, dropship feed apps — B2C single SKU only.

**Rule:** every app you install adds page weight, complexity, and a monthly
fee. Five apps in week 1. Re-evaluate every 90 days.

---

## 4. Settings — General

| Setting | Value |
|---|---|
| Store name | Nuvanta |
| Account email | hello@nuvanta.co.za |
| Customer email | orders@nuvanta.co.za |
| Currency | ZAR (South African Rand) |
| Unit system | Metric |
| Time zone | (GMT+02:00) Johannesburg |
| Address | [registered business address from legal docs] |

---

## 5. Settings — Taxes

VAT setup depends on registration status:
- **Not VAT-registered (turnover < R1m/yr):** product prices are
  VAT-exclusive (i.e. no VAT). Set tax rate to 0%. Add small footer note:
  "Nuvanta is not currently VAT-registered."
- **VAT-registered:** include 15% VAT in displayed prices. Settings → Taxes
  → "All prices include tax." Display "VAT incl." next to price on PDP.

Re-check at month 9 — if you cross R1m turnover, mandatory VAT registration
within 21 days of crossing. Set a calendar reminder.

---

## 6. Settings — Payments

### Primary: PayFast
1. PayFast → Account → API & Notifications → grab Merchant ID + Merchant Key
2. Shopify → Settings → Payments → "PayFast" — paste credentials
3. Enable: credit card, instant EFT, masterpass
4. Run R1 test transaction with own card; verify PayFast dashboard
   shows it AND Shopify order shows "Paid"

### Secondary: Ozow
1. Ozow merchant onboarding — typically 2-5 business days
2. Same credential flow
3. Test R1 transaction

### Express checkout
- Apple Pay: enable (free, native to Shopify)
- Google Pay: enable (free, native to Shopify)
- Shop Pay: enable (free, lifts conversion ~10-15%)

### Manual payments
- Disable bank deposit / EFT manual — too much support overhead at this scale.

---

## 7. Settings — Shipping

### Profile: Domestic SA
- **Standard courier (Aramex/Courier Guy/Pep Paxi):** R99 flat
- **Free shipping threshold:** orders over R750 — but in Phase 1 with a
  R499 wedge SKU, leave this off. Add when bundle SKUs land in Phase 2.
- **Lead time displayed at checkout:** "Ships within 2 working days. 1-3
  days metro, 2-5 days regional."

### Profile: International
- **Disable.** Phase 1 is SA-only. International ships break courier rates
  and the brand promise.

---

## 8. Settings — Customer accounts

- **Account creation:** Optional at checkout (NOT required).
- **Why:** forced account creation drops conversion ~12-15%. The order
  confirmation email is enough — they can re-find their order via that.
- **Marketing consent:** unchecked by default at checkout (POPIA
  compliance). Customer ticks if they want emails.

---

## 9. Settings — Checkout

| Setting | Value |
|---|---|
| Checkout style | One page (Shopify's 2024 default) |
| Customer contact info | Email |
| Address forms | Last name only required |
| Phone number | Required (for courier) |
| Order processing | Auto-archive 30 days after fulfillment |
| Abandoned checkout email | ON, send after 1 hour |

---

## 10. Settings — Notifications

Customise these 4 transactional emails with brand voice:
- Order confirmation
- Order shipped
- Order delivered (if your courier provides delivery webhooks)
- Refund processed

Templates live in `/docs/12-email-sequences.md`. Paste each into Shopify →
Settings → Notifications. Keep HTML minimal — text-leaning emails feel
human and bypass spam filters.

Signature on every email:
```
Nuvanta — hand-picked essentials
[Founder name], Joburg
hello@nuvanta.co.za | WhatsApp: [number]
```

---

## 11. Settings — Domain

1. Connect `nuvanta.co.za` (post-purchase from registrar — most likely
   domains.co.za or registry.za.net)
2. Add DNS records per Shopify instructions (A + CNAME)
3. Set as **primary domain**
4. Force `https://` (Shopify auto-provisions Let's Encrypt SSL)
5. Force `www.` to apex (or vice versa, but pick one and redirect)
6. Verify via `https://www.ssllabs.com/ssltest/` — target grade A

Domain checklist (from `/docs/01-office-hours-design.md` Q5 — verify NOW
if not already done):
- [ ] nuvanta.co.za registered
- [ ] nuvanta.com (defensive registration, $10/yr — buy it)
- [ ] @nuvanta on Instagram
- [ ] @nuvanta on TikTok
- [ ] CIPC trademark search clean (classes 25, 28, 18, 35)
- [ ] Google "nuvanta" — no top-10 conflict

---

## 12. Pages to publish

Create as Shopify Pages (Online Store → Pages → Add page):

1. **About** — 200-300 words, founder voice, "we hand-pick essentials..."
   Paragraph from `/docs/05-brand-voice.md` adapted.
2. **Contact** — email, WhatsApp button, business hours, response SLA
3. **Returns & Refunds** — paste from `/docs/08-legal-templates.md`
4. **Privacy Policy** — paste from `/docs/08-legal-templates.md`
5. **Terms & Conditions** — paste from `/docs/08-legal-templates.md`
6. **FAQ** — 8-10 most common questions (cribbed from product page FAQ +
   shipping + returns)

All linked from footer.

---

## 13. Navigation

Header (mobile-first, max 4 items):
- Shop (links to /products/daily-power-bank in Phase 1, to /collections in Phase 2)
- About
- Contact
- (cart icon)

Footer columns (3):
- **Shop:** Power Bank, (Phase 2 SKUs)
- **Help:** Returns, Shipping, FAQ, Contact
- **Nuvanta:** About, Privacy, Terms

---

## 14. Final pre-launch verification

Before day 0 launch:
- [ ] R1 test transaction completes successfully on PayFast
- [ ] Order confirmation email arrives within 2 minutes
- [ ] Shipping confirmation can be triggered manually from Shopify admin
- [ ] All 6 footer pages render and contain final copy (no `[BRACKETS]`)
- [ ] Mobile load < 3s on 4G (test with Chrome DevTools throttling)
- [ ] Lighthouse mobile score >= 70
- [ ] Cookie banner blocks pixels until consent given
- [ ] All 5 events fire in test mode for Meta + TikTok + GA4
- [ ] WhatsApp click-to-chat link opens correct number on iPhone + Android
- [ ] 404 page is branded and links back to home
- [ ] Robots.txt + sitemap.xml accessible (Shopify auto-generates)

---

## 15. Time budget

| Task | Time |
|---|---|
| Theme install + customisation | 60 min |
| Apps install + configure | 45 min |
| Settings (general / taxes / payments) | 60 min |
| Pages (paste + format) | 60 min |
| Domain + DNS + SSL | 30 min |
| Notification templates customisation | 30 min |
| Pre-launch verification | 60 min |
| **Total focused work** | **~5.5 hours** |

Block one Saturday morning. Do it in one sitting. Half-built stores
become abandoned stores.
