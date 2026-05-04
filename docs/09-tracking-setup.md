# Tracking & Analytics Setup — Phase 1

Generated 2026-05-04. Pre-launch checklist for Meta Pixel, TikTok Pixel,
GA4, server-side Conversion API, and UTM scheme.

If pixels don't fire, the kill rule cannot be enforced and the wedge test
is meaningless. This is not optional plumbing. Set it up before any
ad spend.

---

## 1. The five events you must track

These five events fire across all three platforms (Meta, TikTok, GA4).
Same event names, same trigger points, same payload. Consistency is what
makes attribution comparable across the dashboards later.

| Event | Trigger | Required payload |
|---|---|---|
| `PageView` | Any page load | url, referrer |
| `ViewContent` | Product page load | product_id, product_name, price, currency |
| `AddToCart` | Add-to-cart click | product_id, quantity, value, currency |
| `InitiateCheckout` | Checkout start | total_value, currency, num_items |
| `Purchase` | Order confirmation page | order_id, total_value, currency, products[] |

**Currency = `ZAR` always.** Don't let any platform default to USD — it
silently destroys reporting.

---

## 2. Meta Pixel + Conversion API (CAPI)

iOS 14.5+ blocks ~30-40% of pixel-only attribution. **CAPI is mandatory**
for accurate CPA reporting. Without it your reported CPA looks worse than
reality and you'll kill creatives that were actually winning.

### 2.1 Pixel installation
1. Create a Meta Business account if you don't have one
2. Business Settings → Data Sources → Pixels → **Add new**
3. Name it `Nuvanta Main Pixel`. Save the Pixel ID.
4. Shopify → Settings → Apps → install **Facebook & Instagram by Meta**
5. Connect the Meta Business account, select the pixel
6. Enable **Maximum** data sharing (this is the CAPI bridge for Shopify)
7. Verify in Meta Events Manager → Test Events

### 2.2 Test events checklist (do BEFORE launch)
- [ ] `PageView` fires on home, product, cart, checkout pages
- [ ] `ViewContent` fires on product page with `value: 499.00`, `currency: ZAR`
- [ ] `AddToCart` fires on add-to-cart click
- [ ] `InitiateCheckout` fires on checkout-start
- [ ] `Purchase` fires on thank-you page with the **correct order ID**
- [ ] Each event arrives via BOTH browser pixel AND server (CAPI)
- [ ] Match Quality score in Events Manager > 6.0

### 2.3 Aggregated Event Measurement (iOS)
1. Events Manager → Aggregated Event Measurement → Configure
2. Verify `nuvanta.co.za` domain (DNS TXT record)
3. Prioritise events 1-8 in this order:
   1. Purchase (high value)
   2. InitiateCheckout
   3. AddToCart
   4. ViewContent
   5. PageView
   6. (optional) Lead — for Phase 2 email captures
   7. (reserved)
   8. (reserved)

---

## 3. TikTok Pixel + Events API

### 3.1 Pixel installation
1. TikTok Ads Manager → Assets → Events → **Web Events**
2. Click **Manage** → create pixel `Nuvanta TikTok Pixel`. Save Pixel ID.
3. Shopify → Apps → install **TikTok by TikTok Inc.**
4. Connect TikTok Business account, select pixel
5. Enable **Advanced Matching** + **Events API** (server-side)

### 3.2 Test events
Same five events as Meta. Use TikTok Events Manager → **Test Event** mode
to verify each fires with correct payload.

### 3.3 Naming alignment
TikTok uses different default names. Map them in the pixel config:
- TikTok `ViewContent` ← Shopify `product_view`
- TikTok `AddToCart` ← Shopify `product_added_to_cart`
- TikTok `InitiateCheckout` ← Shopify `checkout_started`
- TikTok `PlaceAnOrder` ← Shopify `order_completed` (this maps to Purchase
  in everyone else's vocabulary)

---

## 4. GA4

GA4 is your independent ground-truth. When Meta says 5 sales and TikTok
says 3 sales, GA4 (cross-referenced with Shopify orders) is the truth.

### 4.1 Property setup
1. analytics.google.com → Admin → **Create Property**
2. Property name `Nuvanta`. Time zone `(GMT+02:00) Johannesburg`. Currency `ZAR`.
3. Create a **Web Data Stream** for `https://nuvanta.co.za`
4. Copy the **Measurement ID** (G-XXXXXXX)

### 4.2 Shopify integration
1. Shopify → Settings → Customer Privacy → Online Store → **Customer Data Sharing**
2. Add Google channel, paste Measurement ID
3. Enable **Enhanced Conversions** for ad attribution

### 4.3 Custom events (Shopify auto-fires most)
Shopify's Google Analytics integration auto-fires:
- `page_view`
- `view_item` (= ViewContent)
- `add_to_cart`
- `begin_checkout` (= InitiateCheckout)
- `purchase`

Verify each in **GA4 Realtime** view before launch.

### 4.4 Conversions
GA4 Admin → Conversions → mark `purchase` as a Key Event. Optionally mark
`begin_checkout` and `add_to_cart` for funnel analysis.

---

## 5. UTM scheme (mandatory on every ad)

Every paid link uses this scheme. No exceptions.

```
https://nuvanta.co.za/products/daily-power-bank
?utm_source=meta
&utm_medium=cpc
&utm_campaign=pb-wedge-w1
&utm_content=creative-a-problem-solution
&utm_term=audience-broad
```

| Parameter | Allowed values |
|---|---|
| `utm_source` | `meta` \| `tiktok` \| `email` \| `whatsapp` \| `organic-social` |
| `utm_medium` | `cpc` \| `social` \| `email` \| `referral` |
| `utm_campaign` | `pb-wedge-w1` (Phase 1 wedge week 1) |
| `utm_content` | `creative-a-problem-solution` \| `creative-b-curation` \| ... |
| `utm_term` | `audience-broad` \| `audience-lookalike` \| `audience-interest` |

**One source of truth:** maintain a Google Sheet `Nuvanta UTM tracker`
with every URL used in any ad. When CPA reports come in, this sheet
tells you which creative + audience drove which sale.

---

## 6. Pre-launch verification (the night before)

Run this checklist within 24 hours of launching ads. If any item fails,
do not launch.

### Site-side
- [ ] Place a real R1 test order using a personal card
- [ ] Confirm order arrives in Shopify admin
- [ ] Confirm `Purchase` event fires in Meta Events Manager (Test Events)
- [ ] Confirm `PlaceAnOrder` fires in TikTok Events Manager
- [ ] Confirm `purchase` fires in GA4 Realtime
- [ ] Confirm Match Quality (Meta) > 6.0 and (TikTok) > 7
- [ ] Confirm Conversion API (server-side) shows the same Purchase event

### Domain & DNS
- [ ] Domain verified in Meta Business (DNS TXT record live)
- [ ] Aggregated Event Measurement priorities saved
- [ ] SSL certificate valid (test with https://www.ssllabs.com)
- [ ] Cookie banner blocks pixels until consent given

### Cookie consent compliance (POPIA)
- [ ] Banner appears on first visit
- [ ] **Decline** option exists and is equally prominent
- [ ] Pixels do NOT fire if user declines (verify in browser DevTools → Network)
- [ ] Consent state persists across sessions

### UTM
- [ ] Every ad URL in the UTM tracker sheet
- [ ] Test-click each ad URL → arrives at correct landing page
- [ ] UTM params appear in GA4 Realtime → Acquisition

---

## 7. Daily reporting view (during week 1)

Build one Google Sheet `Nuvanta Daily KPI` with these columns, filled
each evening at 21:00:

| Date | Spend | Impressions | Clicks | CTR | ATC | IC | Sales (Shopify) | Sales (Meta) | Sales (TikTok) | CPA | ROAS | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|

Why all three sales columns: **Shopify is ground truth.** Meta and
TikTok will each over-report (their last-click attribution rewards them).
ROAS calculation uses Shopify number, not platform-reported number.

**Daily review (15 min):**
1. Pull spend from Meta Ads Manager + TikTok Ads Manager
2. Pull sales from Shopify admin
3. Calculate CPA = Spend ÷ Shopify sales
4. Compare to kill rule:
   - CPA <= R150 → scale 1.5x tomorrow
   - R150 < CPA <= R250 → hold spend, watch creative health
   - CPA > R250 → kill bottom-half creatives, reallocate

---

## 8. What to do when numbers don't match

In week 1 you will see something like:
- Meta says 5 conversions
- TikTok says 3 conversions
- GA4 says 4 conversions
- Shopify says 4 actual orders

**This is normal.** Reasons:
- Each platform credits the last-touch click in its own ecosystem
- Some attributions overlap (Meta + TikTok both claim same order)
- iOS 14.5+ tracking loss (CAPI helps, doesn't fully fix)
- Cookie consent declines

**Trust Shopify orders as ground truth.** Use platform-reported numbers
to compare *between creatives within the same platform* (relative
performance), never as absolute revenue.

---

## 9. Common setup failures (predicted)

1. **`Purchase` event missing `order_id` parameter** → Meta dedupe breaks,
   you get double-counted Purchases in CAPI + Pixel. Fix: ensure Shopify's
   Meta integration is set to "Maximum" data sharing.
2. **Currency defaults to USD** → ROAS shows 1/19th of real value.
   Verify ZAR everywhere.
3. **TikTok Pixel fires but Events API doesn't** → iOS users invisible
   in TikTok reporting. Fix: re-link Shopify TikTok app, enable
   "Advanced Matching".
4. **GA4 doesn't see e-commerce events** → wrong measurement ID, or
   Shopify "Customer data sharing" not enabled. Check Realtime first.
5. **Cookie banner doesn't actually block pixels** → POPIA risk + bad data.
   Fix: install GA4 + pixels via a consent-aware tool (e.g. Cookiebot,
   or Shopify's native consent API).
