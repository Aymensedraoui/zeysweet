# Option A — WhatsApp direct everywhere

Align the site with the brand promise: one tap → pre-filled WhatsApp. Remove the orphaned cart/checkout flow entirely.

## Goals
- Zero friction ordering, consistent across the whole site
- No more "cart stays at 0" confusion
- Lighter code, less to maintain
- Preserve premium artisanal feel (no Glovo-like checkout)

## What gets removed
- `src/components/CartDrawer.tsx` — deleted
- `src/components/WhatsAppModal.tsx` — deleted
- Cart icon + badge in `src/components/Navbar.tsx`
- Cart-related state in `src/lib/store.ts`: `cart`, `cartOpen`, `setCartOpen`, `add`, `remove`, `setQty`, `modalOpen`, `setModalOpen`, `customer`, `setCustomer`, `promoApplied`, `setPromoApplied`, `firstOrderUsed`, `markFirstOrderUsed`, `giftMessage`, `setGiftMessage`
- Helpers no longer used: `cartSubtotal`, `promoDiscount`, `ZONE_FEE`, `MIN_ORDER_MAD`, `PROMO_CODE`, `DeliveryZone`, customer type
- Mounting of `<CartDrawer />` and `<WhatsAppModal />` in `src/pages/Index.tsx` (and anywhere else)
- i18n keys under `cart.*` and `mod.*` in `src/lib/i18n.ts`
- Any "Ajouter au panier" / cart CTAs in `Products.tsx`, `Gifts.tsx`, `OrderCTA.tsx`, `HowToOrder.tsx`, `Hero.tsx` — replaced by direct WhatsApp links using `buildWhatsAppLink([], "", lang, { source })`

## What stays
- `src/components/Menu.tsx` — already WhatsApp-direct, untouched
- `FloatingWhatsApp.tsx` — simplified: always opens WhatsApp directly (no more `if (cart.length) setModalOpen`)
- `buildWhatsAppLink()` in `store.ts` — kept, but simplified signature: only `(lang, { source, productLabel?, price? })`. Used everywhere as the single entry point.
- `WHATSAPP_NUMBER`, `CONTACT_EMAIL`, `CONTACT_PHONE_DISPLAY` constants
- Language store (`lang`, `setLang`)
- Analytics `trackWhatsAppClick(source)` — kept; `trackOrderSubmit` removed

## New unified pattern
Every CTA on the site becomes:
```tsx
<a
  href={waUrl({ source: "hero", productLabel?, price? })}
  target="_blank" rel="noopener"
  onClick={() => trackWhatsAppClick("hero")}
  className="btn-rose"
>
  Commander sur WhatsApp
</a>
```

## Files touched
| File | Action |
|---|---|
| `src/components/CartDrawer.tsx` | delete |
| `src/components/WhatsAppModal.tsx` | delete |
| `src/lib/store.ts` | slim down to lang + WA helpers |
| `src/lib/i18n.ts` | remove `cart.*` and `mod.*` keys |
| `src/components/Navbar.tsx` | remove cart icon/badge |
| `src/components/FloatingWhatsApp.tsx` | always direct WA |
| `src/components/Hero.tsx` | CTA → direct WA |
| `src/components/Products.tsx` | "Ajouter" → direct WA |
| `src/components/Gifts.tsx` | CTA → direct WA |
| `src/components/OrderCTA.tsx` | CTA → direct WA |
| `src/components/HowToOrder.tsx` | CTA → direct WA |
| `src/pages/Index.tsx` | drop `<CartDrawer />` + `<WhatsAppModal />` |
| `src/components/Menu.tsx` | unchanged |

## Verification
- Build passes (no dangling imports)
- Click each CTA in preview → opens WhatsApp with pre-filled message
- No "0" cart badge anywhere
- Floating WA always opens chat directly

## Out of scope
- No design redesign — only logic cleanup
- No changes to Menu structure, Hero copy, or images
- No new translations beyond removing dead keys
