# Email Sequences — Nuvanta

Generated 2026-05-04. Transactional + lifecycle emails for Phase 1.

Email is the cheapest LTV lever in eCommerce. A buyer who opens a
post-purchase email is 3-5x more likely to buy again than one who never
hears from you. But: bad emails kill the brand faster than no emails.
Every send is signed by the founder. Every send sounds like Nuvanta.

---

## Voice rules (every email, every time)

1. **Plain text first, HTML decorations second.** Heavy HTML emails read
   as marketing. Nuvanta reads as a friend.
2. **One CTA per email.** No "and also...". Make a single ask.
3. **Subject lines:** short, declarative, no emojis, no ALL CAPS.
4. **Sign every email by founder name.** Reply-to is the real founder
   inbox. We respond within 24 hours.
5. **Unsubscribe link in footer of every marketing email.** Not legal
   only — moral. Make it easy.

---

## A. Transactional (set in Shopify → Notifications)

### A1. Order confirmation

**Subject:** Order #{{order.number}} — we've got it from here

**Body:**
```
Hi {{customer.first_name}},

Thanks for ordering. Your Nuvanta Daily Power Bank is on the way —
here's what happens next.

Order #{{order.number}}
{{line_items}}
Total: R{{total_price}}

Shipping to:
{{shipping_address.street}}
{{shipping_address.city}}, {{shipping_address.zip}}

What's next:
- We pack and dispatch within 2 working days
- You'll get a tracking link the moment it ships
- Delivery 1-3 days metro, 2-5 days regional

If anything's wrong with your order, hit reply or message us on
WhatsApp ({{whatsapp_number}}). We read every message.

— {{founder_first_name}}
Nuvanta, Joburg

P.S. The "we tested it for 36 hours in Sutherland" story is real.
Photos coming once you've used yours for a week.
```

---

### A2. Shipping confirmation

**Subject:** Your power bank is on its way

**Body:**
```
{{customer.first_name}},

Your order is with the courier.

Tracking: {{tracking_url}}
Courier: {{tracking_company}}

Estimated delivery: {{estimated_delivery_date}}.

A heads-up: SA couriers sometimes need a phone call before drop-off.
Make sure {{shipping_phone}} is reachable.

— {{founder_first_name}}
```

---

### A3. Order delivered (if courier webhook supports it)

**Subject:** Hope it landed safely

**Body:**
```
{{customer.first_name}},

The courier says your power bank arrived. Hope it's exactly what
you needed.

Two requests:
1. Charge it fully tonight before you use it. Some shipping vibration
   triggers the safety cut-off — full charge resets it.
2. If anything's off — packaging, the unit itself, instructions
   missing — message us within 7 days. We pay return shipping.

Use it for a week or two. I'll check back in then.

— {{founder_first_name}}
```

---

### A4. Refund processed

**Subject:** Refund processed — R{{refund_amount}}

**Body:**
```
{{customer.first_name}},

We've refunded R{{refund_amount}} to your original payment method.
Most banks show it in 2-3 working days.

If you'd like to share what didn't work for you, hit reply. One
sentence is enough — it helps us pick better next time.

— {{founder_first_name}}
```

---

## B. Lifecycle (set in Shopify Email or migrate to Klaviyo at 500+ subs)

### B1. Abandoned cart — 1 hour delay

**Subject:** Left this behind?

**Body:**
```
{{customer.first_name}},

You looked at the Nuvanta Daily Power Bank earlier today and didn't
finish checkout. No pressure — but if it was something we said,
let me know.

A few things people usually want to know:
- Yes, we ship in 2 working days
- Yes, you can return it for any reason within 7 days, we cover shipping
- Yes, R499 is the price (no surprise add-ons at checkout)

If you want to come back: {{checkout_url}}

If you want to ask something first, just reply.

— {{founder_first_name}}
Nuvanta
```

**Settings:**
- Trigger: cart abandoned 60 min ago
- Send only if no purchase since
- Send max 1 reminder (don't nag)

---

### B2. Welcome (post-purchase day 0, sent ~30 min after order confirmation)

**Subject:** Real quick — what to expect

**Body:**
```
{{customer.first_name}},

I run Nuvanta. Just wanted to drop a real note while you wait for
the power bank.

What we are: two of us, hand-picking gear we'd actually use, then
selling it. We tested four power banks last month. The one you
just bought won.

What we're not: a Takealot-style mega-store. We pick fewer things
and stand behind each one.

Over the next few weeks I'll send maybe 3 emails total — one when
your power bank arrives, one to ask how it's holding up, and one
when we add the next thing to Nuvanta. That's it. No daily blasts.

If you want fewer emails, the unsubscribe is at the bottom — no
hurt feelings.

— {{founder_first_name}}, Joburg
```

**Settings:**
- Trigger: 30 min after order confirmation
- Send once per customer

---

### B3. Post-purchase day 7 — "How was unboxing?"

**Subject:** Quick question

**Body:**
```
{{customer.first_name}},

Your power bank should have landed about a week ago.

One question: what's the FIRST thing you'd change about how it
arrived? The packaging, the cable, the instructions, the size,
the colour — anything.

One sentence reply is enough. I read every one and your answer
literally changes what we ship to the next customer.

— {{founder_first_name}}
```

**Settings:**
- Trigger: 7 days after fulfillment
- Send only if no return / refund initiated

**Why this works:** asks for feedback, not a review or a sale. Trust
compounds. The replies become testimonials we earn (vs fake ones).

---

### B4. Post-purchase day 30 — "What should we pick next?"

**Subject:** Picking the next thing — input?

**Body:**
```
{{customer.first_name}},

Power bank holding up?

We're picking the next product for Nuvanta. Three on the shortlist:
- A multi-port wall charger (one plug, four devices, fast)
- A rechargeable LED desk lamp (loadshedding-tested)
- A magnetic phone car mount (the only one we've ever liked)

If one of these would actually be useful in your day-to-day, hit
reply with the name. If none, hit reply with what you'd actually
want us to pick.

— {{founder_first_name}}
```

**Settings:**
- Trigger: 30 days after fulfillment
- Skip if customer returned / refunded

**Why this works:** turns existing customers into Phase 2 product
research. They feel ownership. The answers tell you what to actually
source.

---

### B5. Win-back day 90 — "Still using it?"

**Subject:** 3-month check-in

**Body:**
```
{{customer.first_name}},

You bought the power bank about 3 months ago. Two questions:

1. Is it still going strong? (If not, the warranty's still active —
   reply and we'll sort it.)

2. We just added [new SKU] — same hand-picked process, same
   stand-behind-it promise. R{{price}}, ships in 2 days.
   Take a look: {{product_url}}

— {{founder_first_name}}
```

**Settings:**
- Trigger: 90 days after fulfillment
- Only send when a Phase 2 SKU is live and ready

---

## C. Marketing list (popup-driven, build slowly)

### C1. List signup confirmation

**Subject:** You're on the list

**Body:**
```
Welcome.

You'll hear from us when we add a new thing to Nuvanta. Maybe once
every 4-6 weeks. Never daily.

Each email tells you what we picked and why. If you want one of
them, the link's right there. If not, no pressure.

— {{founder_first_name}}
Nuvanta, Joburg

(If you change your mind, the unsubscribe is at the bottom of every
email. No hard feelings.)
```

---

## D. Implementation sequence (do in this order)

### Week 0 (pre-launch)
- A1, A2, A3, A4 transactional templates customised in Shopify
- B2 welcome flow built and tested

### Week 1 (first sales)
- B1 abandoned cart flow turned ON

### Week 2-3
- B3 day-7 flow turned ON

### Month 2
- B4 day-30 flow turned ON
- C1 popup added to site (exit-intent only, not entry — protect first-time conversion)

### Month 3+
- B5 day-90 flow turned ON when a Phase 2 SKU is ready
- Migrate to Klaviyo if list > 500 subscribers

---

## E. Anti-patterns — never send

- "Hurry, only 3 left!" (it's a lie, kills trust)
- "FLASH SALE 50% OFF" (Nuvanta's not a discount brand)
- Daily emails (kills the unsubscribe rate, spam-folder demotion)
- Pure-image emails (no text alternative — accessibility fail + spam-trigger)
- "Don't open this if you don't want to save money" (manipulation)
- Birthday emails with discounts (we don't celebrate them with discounts —
  if anything, send a hand-picked-for-you note instead)
- Cart-abandon-flooding (>1 reminder)
- Generic newsletter (we don't have a newsletter; we have product picks)

---

## F. Metrics to watch (week 4 onward)

| Metric | Healthy | Watch | Action |
|---|---|---|---|
| Open rate | >35% | 25-35% | Check subject line freshness |
| Click rate | >5% | 2-5% | Check CTA clarity |
| Reply rate | >2% | <2% | This is unique to Nuvanta — engagement health |
| Unsubscribe | <0.5% per send | 0.5-1% | Audit content tone |
| Complaint | <0.05% | 0.05-0.1% | Stop sending immediately, audit list source |
| Revenue per recipient | >R8 | <R8 | Check segmentation (sending to wrong cohort) |

Baseline these in month 1 and review monthly.
