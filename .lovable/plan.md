# Launch Plan — Zey's Sweetness (today)

## 1. Wire the real WhatsApp number
- Replace placeholder `212600000000` with `212620355325` in `src/lib/store.ts`.
- Update displayed number to `+212 620 35 53 25` in `Footer.tsx` and `Contact.tsx`.
- Verify all CTAs (Hero, Navbar, FloatingWhatsApp, OrderCTA, Contact, Modal) open `wa.me/212620355325` with the prefilled FR + AR messages.

## 2. Catalogue — launch with 2 products only this week
Per your instruction, the menu will only show **two items** until the rest of the catalogue is ready:
- **Le Cookie Signature (Classic)** — keep
- **Dates Farcies aux Cajou** — keep

Actions:
- In `src/lib/products.ts`, keep only `cookie` and `dates`. Comment out (don't delete) brownie, cheesecake, cake, box so they're easy to re-enable next week.
- `Products.tsx` grid will naturally show 2 cards — adjust to a centered 2-column layout on desktop so it doesn't look empty.
- Remove/hide the "Box Surprise" mention from Hero, Story, Gifts copy where it implies more SKUs.
- `Gifts.tsx`: simplify to **one offer** = "Coffret personnalisé sur demande WhatsApp" (since gift boxes depend on the full catalogue). Hide Discovery / Premium boxes for now.
- Gallery: keep only photos that match the 2 live products + ambiance shots.
- Update FAQ + Story copy to reflect "lancement avec nos 2 best-sellers, nouveautés bientôt".

## 3. SEO (Organic — Google/Bing)
- `index.html`: title ≤60 chars, meta description ≤160 chars with keywords *cookies maison Casablanca, dattes farcies, pâtisserie artisanale*.
- Add `<link rel="canonical">`, `og:locale="fr_MA"`, `og:url`.
- Create `public/sitemap.xml` (homepage + 3 legal pages) and add `Sitemap:` directive in `robots.txt`.
- Single H1, semantic H2s, alt text on all images.
- JSON-LD in `index.html`:
  - `Bakery` / `LocalBusiness` (name, phone +212620355325, address Casablanca, hours, areaServed, sameAs Instagram).
  - `Product` schema for the 2 live products (injected from `Products.tsx`).
  - `FAQPage` schema from `FAQ.tsx`.

## 4. AEO (ChatGPT, Perplexity, Google AI Overviews)
- Rewrite FAQ answers as short, quotable, factual sentences containing brand + city.
- Add concise "À propos en bref" block (40–60 words) on homepage — easily quoted by LLMs.
- Add quotable answers for: where to order cookies in Casablanca, delivery time, payment methods, gift options.
- FAQPage JSON-LD makes answers machine-readable.

## 5. Content polish
- Remove placeholder copy, confirm prices, hours, delivery zones, Instagram link, email.

## 6. QA before publish
- Mobile (375px) + current viewport: Hero CTA, sticky WhatsApp, modal flow.
- Click each CTA → confirm WhatsApp opens with prefilled message on the real number.
- Lighthouse: title, meta, alt, contrast, mobile.
- Legal pages reachable from footer.

---

## Decisions locked in
- WhatsApp: **+212 620 35 53 25** ✅
- Launch catalogue: **Cookie Signature + Dates Farcies aux Cajou** only ✅
- Other products: hidden, re-enabled next week.

## Still need from you to finish today
1. **Address / quartier** to display (e.g. "Maârif, Casablanca") — for LocalBusiness schema + trust.
2. **Opening hours** (e.g. "Mar–Dim 10h–20h").
3. **Delivery zones + fees** — keep centre gratuit / périphérie 30 MAD / autre 80 MAD?
4. **Email** — confirm `contact@zeyssweetness.ma` is active, or give the real one.
5. **Prices confirmed?** Cookie 35 MAD, Dates 120 MAD — keep or update?
6. **Founder first name + 1–2 line bio** for Story + AEO "About".
7. **Real testimonials** (3–5 short quotes + first names) or keep current as illustrative?
8. **Domain** — launch on `zeysweet.lovable.app` or do you have a custom domain to connect after publish?
9. **Logo file** (PNG/SVG) — for header + OG image. If none, I'll style a clean wordmark.

Reply with these and I implement everything in one pass, you click **Publish**, we're live tonight.
