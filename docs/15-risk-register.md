# Risk Register — Nuvanta

Generated 2026-05-04. The things that can kill Nuvanta, sequenced by
when they bite.

This isn't a worry list. It's a watch list. Read it once a month.
Pre-mortems prevent post-mortems.

Format per risk:
- **Probability** (Low / Med / High) × **Impact** (Low / Med / High / Existential)
- **Trigger** — what you'll see first
- **Mitigation** — what you do now
- **Response** — what you do if it hits

---

## A. Week 1-4 risks (launch + wedge)

### A1. Phase 1 wedge fails (CPA never breaks below R250)
- **Probability:** Med. **Impact:** Med (R3k lost + 2 weeks).
- **Trigger:** Day 3, CPA stuck > R300. By Day 5 still no sub-R250 day.
- **Mitigation:** Hard kill rule already in `/docs/10-launch-runbook.md`.
  Diversified creatives (6, then 4, then 2) to find the angle.
- **Response:** Pivot to higher-margin SKU (Mini UPS or Multi-port
  Charger). Re-test for 7 days at fresh R3k. If second wedge fails,
  re-evaluate Vision D itself (see Vision A/B from CEO review).

### A2. Pixel firing wrong / attribution broken
- **Probability:** High (this happens to ~40% of new Shopify stores).
  **Impact:** High (you kill creatives that were actually winning).
- **Trigger:** Meta says 0 conversions but Shopify shows orders. Or
  Match Quality < 5.0.
- **Mitigation:** `/docs/09-tracking-setup.md §6` pre-launch checklist.
  Test events mode before any spend.
- **Response:** Pause all spend. Fix CAPI bridge. Re-verify with R1
  test transaction. Don't resume spend until events match Shopify
  ground truth.

### A3. Dropstore stockout on the winning SKU
- **Probability:** Med. **Impact:** High (lost momentum + customer trust).
- **Trigger:** Dropstore portal says "out of stock" or supplier
  processing time jumps from 0-2 days to 7+.
- **Mitigation:** Identify a backup supplier on Day 0. Pre-test their
  product to confirm it's the same unit. Have them on standby.
- **Response:** Switch supplier within 24 hrs. Email affected customers
  proactively. If switch unavailable, pause ads, refund pending orders
  in full, set "back in stock" notify form. Keep cash flow sustained
  via existing customers, not new ads, during the gap.

### A4. PayFast / Ozow account suspended
- **Probability:** Low. **Impact:** Existential (no payment = no business).
- **Trigger:** Email from gateway citing "compliance review" or
  chargeback rate > 1%.
- **Mitigation:** Keep chargeback rate < 0.5%. Respond to disputes
  within 24 hours with evidence. Avoid trigger language in marketing
  ("limited time only," "selling out fast"). Maintain transparent
  refund policy.
- **Response:** Provide all requested docs immediately (CIPC, address
  proof, banking, T&Cs). Have backup gateway already approved (Yoco,
  Stitch, Peach Payments) so switchover takes hours not weeks.

### A5. Meta or TikTok ad account ban
- **Probability:** Med (high for first-time advertisers). **Impact:** High.
- **Trigger:** "Your ad account has been disabled" email. Often after
  flagging for "low quality landing page" or "personal attribute"
  rule violation.
- **Mitigation:** No claims like "fix your back pain", no before/after
  body shots, no health claims. Domain verified. Pixel + business
  manager fully populated. Run ads from a Business Manager, never
  personal account.
- **Response:** Appeal once, professionally, in 200 words. If denied,
  pivot to TikTok-only / Meta-only for 30 days while you create a new
  Business Manager (different person's name if necessary, never with
  intent to deceive — just standard small-business operating practice
  when locked out).

### A6. Founder posts something that ends up on SA Twitter
- **Probability:** Med. **Impact:** High (brand damage compounds fast).
- **Trigger:** Customer complaint screenshot, founder's own meme/
  political post, response that reads as defensive or rude.
- **Mitigation:** Read every reply out loud before sending. No politics
  on Nuvanta channels. No replying to bad reviews defensively.
  Sleep on anything that feels like a sharp reply.
- **Response:** If a brand complaint goes viral, founder posts ONE
  public response within 2 hours: acknowledge, apologise, name the
  resolution. Then DM the customer privately to actually solve it.
  Don't argue. Don't delete. Don't explain.

---

## B. Month 2-3 risks (early scale)

### B1. Returns spike on a specific SKU
- **Probability:** Med. **Impact:** Med (margin destroyed, time burned).
- **Trigger:** Return rate on one SKU > 12% (vs ~5-8% baseline).
- **Mitigation:** Founder personally tested every SKU before listing.
- **Response:** Pause that SKU's ads immediately. Read the last 20
  return reasons. If quality issue → kill SKU, refund inventory to
  supplier. If expectation gap → fix product page copy + re-test. Don't
  hide the issue from customers. Mention in next newsletter
  ("we got it wrong on X, here's what we changed").

### B2. Customer fraud / chargebacks
- **Probability:** Med (SA dropship fraud is non-zero). **Impact:** Med.
- **Trigger:** Order placed with mismatched billing/shipping, free email
  domain, multiple orders to same address with different cards.
- **Mitigation:** Enable PayFast 3D Secure for all transactions. Manual
  review on orders > R2,000 in first 30 days. AVS check enabled.
- **Response:** Document everything. Provide POD + tracking + delivery
  signature for chargeback dispute. Win rate in SA is ~50% if
  documentation is tight. Lose rate is high if not.

### B3. Founder burnout
- **Probability:** High (most likely failure mode in months 2-4).
  **Impact:** Existential.
- **Trigger:** Founder skipping the runbook check-ins, replying to
  customers tersely, "I'm just gonna take a day off" turning into
  three days, brand-content stops, ads keep running unattended.
- **Mitigation:** See `/docs/16-founder-budget.md`. Protected hours.
  Calendar discipline. Outsource WhatsApp at 30 tickets/day, not 50.
- **Response:** Pause all ad spend for 7 days. Don't ship anything new.
  Review the last 30 days honestly. If the math still works, hire help.
  If it doesn't, declare it a learning project and move on with
  dignity. Burning out and shutting down quietly is worse than closing
  the brand publicly while the math is still defensible.

### B4. Trademark dispute (someone else owns "Nuvanta" or similar)
- **Probability:** Low (founder said "defensible brand" — verify).
  **Impact:** High (rebrand cost ~R20k + lost momentum).
- **Trigger:** Cease-and-desist letter or social-media DM claiming prior use.
- **Mitigation:** Run the 5 brand checks before week 4. Register
  Nuvanta as a CIPC trademark in classes 25, 28, 18, 35 (~R590/class
  + attorney fee ~R2,500 per filing).
- **Response:** Engage IP attorney immediately. Don't respond to the
  C&D before legal review. If filing predates yours, negotiate
  coexistence or rebrand within 60 days. Reserve `nuvanta-shop.co.za`
  + `getnuvanta.co.za` defensively while resolving.

### B5. Negative review goes viral
- **Probability:** Low-Med. **Impact:** Med-High.
- **Trigger:** TikTok review with > 50k views, Hello Peter post, IG
  comment thread blowing up.
- **Mitigation:** Real product testing. Honest copy. Fast support.
  No fake reviews on the site (one fake review caught = brand-killer
  in the SA Twitter ecosystem).
- **Response:** Founder responds publicly in the same channel within
  2 hours. Acknowledge → apologise → name resolution → move to DM.
  If product genuinely defective, full public refund + restock public
  signal ("we're pulling SKU X for a quality review, here's why").
  Trust earned in handling > trust lost in the failure.

### B6. Cash crunch on ad scale
- **Probability:** Med. **Impact:** High.
- **Trigger:** Ad spend ramping while sales lag because pay-out timing
  on PayFast = 5-7 days but ad invoice = daily. Cash gap.
- **Mitigation:** Maintain 30-day ad-spend cash reserve. Don't scale
  beyond cash buffer. See `/docs/16-founder-budget.md`.
- **Response:** Dial back ad spend to last week's net contribution.
  Wait 7 days for cash to clear. Resume scale at sustainable pace.

---

## C. Month 6+ risks (sustainability)

### C1. Loadshedding actually ends in SA
- **Probability:** Med (Eskom EAF improving 2024-2026). **Impact:** Med
  (one ad angle dies, brand survives).
- **Trigger:** 90+ consecutive days with no Stage 2+ events. Power-bank
  search volume drops > 40% on Google Trends SA.
- **Mitigation:** Vision D was chosen partly to avoid this — Nuvanta
  is "modern essentials," not "loadshedding survival." But power-bank
  ads use the angle. Diversify ad creatives off loadshedding before
  this risk hits.
- **Response:** Refresh ad creatives within 14 days to lifestyle /
  travel / commute angles. Power bank still sells without loadshedding —
  it's a flight item, a road-trip item, a festival item.

### C2. Rand crash → import cost spike
- **Probability:** Med (recurring SA risk). **Impact:** High (margin
  destroyed if costs rise > 15%).
- **Trigger:** ZAR/USD moves > 15% in 30 days. Dropstore raises wholesale
  prices.
- **Mitigation:** Lock in supplier pricing where possible. Review
  margins quarterly. Don't run aggressive discounting that compresses
  buffer.
- **Response:** Raise retail prices within 14 days, communicate to email
  list honestly ("import cost rose 18%, we held the price as long as we
  could"). Customers respect honest economics, especially in SA.

### C3. Dropstore relationship breaks down
- **Probability:** Low. **Impact:** High.
- **Trigger:** Dropstore changes pricing, terms, integration without
  notice. Or shuts down a SKU category.
- **Mitigation:** Multi-supplier strategy by month 4 — at least 2
  suppliers per Phase 2 SKU. Direct-import relationship by month 9 for
  top SKUs (cuts COGS ~25%, improves margin).
- **Response:** Activate backup supplier within 7 days. If category
  removed, pivot affected SKUs.

### C4. POPIA breach / data leak
- **Probability:** Low. **Impact:** Existential (R10M fine cap + brand
  death).
- **Trigger:** Customer data exposure, phishing impersonator using
  Nuvanta lookalike domain, Shopify breach (rare but possible).
- **Mitigation:** No customer data stored outside Shopify + payment
  gateways. No spreadsheets with customer emails. No CSV exports
  emailed around. Two-factor on every Shopify, Meta, Google, banking
  account.
- **Response:** Notify Information Regulator within 72 hours per POPIA.
  Notify affected customers within 7 days. Engage attorney + breach
  consultant. Public statement honest and immediate. Recovery is
  possible only if response is fast and transparent.

### C5. Founder loses domain or social handles
- **Probability:** Low. **Impact:** High.
- **Trigger:** Domain expiry email missed. Social account hacked.
- **Mitigation:** Set domain to auto-renew, calendar reminder 60 days
  before expiry. Hardware 2FA (YubiKey or Google Authenticator) on
  every account. Recovery email = a separate, secured account NOT
  used for anything else.
- **Response:** Domain: contact registrar immediately, most have
  30-90 day grace period. Social: account recovery flow + paper trail
  of brand use (CIPC, trademark, invoices) usually wins back within
  10 business days.

### C6. SARS / VAT registration miss
- **Probability:** Med (founder forgets the threshold). **Impact:** Med
  (back-tax penalty 10-200%).
- **Trigger:** Cumulative 12-month turnover crosses R1M.
- **Mitigation:** Set calendar reminder when monthly revenue averages
  R75k+ (which projects to R900k/yr — register 1 month before crossing).
  Bookkeeping monthly, not annually.
- **Response:** Register voluntarily within 21 days of crossing. Pay
  back-VAT for unregistered sales over threshold. Consider voluntary
  early registration if turnover is approaching threshold and growth
  is steady.

---

## D. Existential category — read once a month

These are unlikely but unrecoverable. Plan for them once, then watch.

| Risk | Trigger | Plan |
|---|---|---|
| **Founder personally injured / out of action** | Hospital, accident, family emergency > 2 weeks | Designated friend has Shopify admin access + a "pause everything" runbook in the docs/ directory |
| **Bank account / business banking frozen** | FICA review, fraud flag | Backup business account at a different bank, both registered |
| **Cyber-attack / Shopify account compromise** | Unauthorised admin access | Hardware 2FA + Shopify "Disable account" emergency line in support contacts |
| **Reputation event (founder personal)** | Anything in founder's personal life that goes viral | Brand can survive if founder is honest and not the personality. Keep founder voice modest, not cult. |

---

## E. Risk review cadence

Read this register:
- **End of every Phase** (Phase 1 → 2 → 3 → 4)
- **First Sunday of every month** during active phases
- **Any time something triggers** in section A, B, or C

Update probability and impact ratings as you learn. Risks decay (e.g.
A5 ad-account ban risk drops to Low after 6 months of clean operation)
or escalate (e.g. C1 loadshedding-ending risk rises if Eskom keeps
improving).

This document is alive. Keep it current.
