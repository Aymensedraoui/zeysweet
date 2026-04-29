## Goal
Take Zey's Sweetness from a beautiful showcase (72/100) to a fully functional, production-ready bilingual e-commerce experience (100/100).

The plan is split into **5 phases**, ordered so each one delivers value even if you stop early. Phase 1 is critical (broken business logic). Phases 2–3 are the core upgrade. Phases 4–5 are polish + production-readiness.

---

## Phase 1 — Make it actually work (critical fixes)

**1.1 Real WhatsApp number**
Replace the placeholder `212600000000` in `src/lib/store.ts` with Zey's real WhatsApp Business number. (We'll ask you for it.)

**1.2 Cart persistence**
Add Zustand `persist` middleware so the cart, gift message, and language survive refresh and tab close.

**1.3 Form validation + edge cases**
- Cap quantity (1–20 per item)
- Disable WhatsApp send if cart is empty
- Toast feedback on remove / clear
- Minimum order amount check (e.g. 150 MAD) with friendly inline message

---

## Phase 2 — Complete the bilingual system (FR / AR)

Right now only the navbar and WhatsApp message translate. We'll build a proper i18n layer.

**2.1 Centralized translation dictionary**
Create `src/lib/i18n.ts` with a `t(key, lang)` helper and a full FR/AR dictionary covering every section: Hero, TrustBar, Products, Story, Cinematic, Gifts, HowToOrder, Testimonials, Gallery, OrderCTA, Footer, Cart, Modal.

**2.2 Translate every component**
Refactor all 12 sections + Cart + Modal to read text via `t()` instead of hardcoded French.

**2.3 RTL polish**
- Mirror layouts properly when `dir="rtl"` (icons, arrows, marquee direction, ribbons)
- Swap font for Arabic body text (e.g. `Tajawal` or `Noto Naskh Arabic`) for proper rendering
- Fix the language toggle button label logic

**2.4 Translate product names + descriptions**
Extend `src/lib/products.ts` so each product has `{ name: { fr, ar }, desc: { fr, ar } }`.

---

## Phase 3 — Real e-commerce depth

**3.1 Product detail pages**
Add `/product/:id` route with:
- Large hero image + 3-image gallery
- Full description, ingredients, allergens, weight/portions
- Quantity selector + "Add to cart" + "Order on WhatsApp" buttons
- "You might also like" section (3 related products)
- Breakpoint-perfect mobile layout

**3.2 Delivery zones + fees**
- Zone selector in checkout modal: Casablanca centre (free over 200 MAD), Casablanca périphérie (+30 MAD), other cities (+80 MAD)
- Show delivery fee breakdown in cart drawer + WhatsApp message
- Min order enforcement per zone

**3.3 Customer info capture in modal**
Before opening WhatsApp, collect: name, phone, delivery address, preferred date/time. Inject into the WhatsApp message so Zey gets a complete order, not just a list.

**3.4 Gift box customizer**
On the Gifts section, let users pick which products go inside a custom box (3 / 6 / 12 pieces) before adding to cart.

---

## Phase 4 — Content + trust polish

**4.1 Real Instagram gallery**
Either embed Instagram Basic Display feed or wire a simple lightbox over the existing 6 images with captions.

**4.2 FAQ section**
Add a collapsible FAQ between Testimonials and Gallery: delivery times, allergens, custom orders, payment methods, shelf life.

**4.3 Legal pages**
Add 3 routes with proper bilingual content:
- `/mentions-legales`
- `/cgv` (Conditions Générales de Vente)
- `/confidentialite` (politique de confidentialité)
Link them from the footer.

**4.4 404 page redesign**
Style `NotFound.tsx` to match the brand (cocoa background, handwritten "Oups, cette douceur a disparu...", CTA back home).

**4.5 SEO + sharing**
- Per-page `<title>` and meta descriptions
- Open Graph image (use the cinematic cookie shot)
- JSON-LD structured data for `Bakery` + `Product`
- `sitemap.xml` + updated `robots.txt`

---

## Phase 5 — Production readiness

**5.1 Performance**
- Convert all `.jpg` assets to `.webp` (≈60% smaller)
- Add `loading="eager"` only on hero, `lazy` on rest (already partially done)
- Preload hero image + display fonts
- Lighthouse target: 95+ on mobile

**5.2 Accessibility audit**
- Color contrast pass (caramel on cream may fail AA — verify)
- All interactive elements have visible focus rings
- `aria-label` on every icon-only button
- Keyboard navigation through cart + modal
- `prefers-reduced-motion` respected on all animations

**5.3 Analytics + tracking**
Light, privacy-friendly setup: Plausible or a simple custom event log for `add_to_cart`, `open_whatsapp_modal`, `lang_switched`, `order_sent`.

**5.4 Optional: Lovable Cloud backend**
If Zey wants to manage products herself without editing code, add a tiny admin panel backed by Lovable Cloud:
- Products table (name FR/AR, desc FR/AR, price, image, badge, in stock)
- Image upload to Storage
- Simple `/admin` route protected by auth
- Frontend reads from Cloud instead of `products.ts`

This is optional — only worth it if Zey will update the catalog regularly.

---

## Technical notes

- **No new heavy dependencies.** Zustand `persist` is built-in. i18n stays a tiny custom helper (no `i18next` needed for ~200 strings).
- **Routing:** React Router is already installed — just add `/product/:id` and the legal routes above the catch-all.
- **Arabic font:** load via Google Fonts `<link>` in `index.html`, scoped with `[dir="rtl"] { font-family: ... }`.
- **Phase 5.4 (Cloud admin)** is the only phase that requires enabling Lovable Cloud — we'll ask before doing it.

---

## Suggested execution order

I recommend we tackle this in **3 build sessions**:
1. **Session A:** Phase 1 + Phase 2 (broken-business fixes + full bilingual). After this you can actually take orders in both languages.
2. **Session B:** Phase 3 (product pages, delivery, customer info, gift customizer). After this it feels like a real shop.
3. **Session C:** Phase 4 + Phase 5 (polish, legal, perf, a11y, optional admin).

---

## Before I start, two things I need from you

1. **Real WhatsApp Business number** for Zey (with country code, e.g. `+212 6 12 34 56 78`).
2. **Confirm scope:** do you want all 5 phases, or should we stop after Phase 3 (the "real shop" milestone)?

Once you approve this plan and answer those two, I'll switch to build mode and start with Session A.