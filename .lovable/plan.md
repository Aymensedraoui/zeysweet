
# Cart + Checkout — 3 payment paths, no Stripe

## What the customer experiences

```text
[Build a box]  →  [Add to cart]
                      │
                      ▼
            ┌────────────────────┐
            │  Cart drawer 🛒    │  (always reachable from navbar)
            │  • NY Maxi ×6      │
            │  • American 12     │
            │  • Dattes ×12      │
            │  Subtotal 410 MAD  │
            │  [Commander →]     │
            └────────────────────┘
                      ▼
        ┌──────────────────────────────┐
        │  Checkout (3 steps, 1 page)  │
        │                              │
        │  1. Vos coordonnées          │
        │     nom · téléphone · ville  │
        │     adresse · note (option.) │
        │                              │
        │  2. Mode de paiement         │
        │   ┌──────┬──────┬──────┐     │
        │   │ Wh.  │ CIH  │ Cash │     │
        │   │ App  │ Vir. │ Liv. │     │
        │   └──────┴──────┴──────┘     │
        │                              │
        │  3. Récapitulatif            │
        │     items + total + mode     │
        │     [Confirmer la commande]  │
        └──────────────────────────────┘
                      ▼
         Confirmation screen tailored
         to the chosen payment mode
```

## The 3 payment modes (UX details)

**A. WhatsApp (default, fastest)**
- "Validation par WhatsApp — on confirme votre commande en moins d'1 h."
- Confirm → opens WhatsApp with a clean pre-filled message: customer info, every cart item with qty + price, total, delivery zone, note.
- Confirmation page: "Votre WhatsApp s'est ouvert. Envoyez le message pour valider 🤍" + "Rouvrir WhatsApp" button as fallback.

**B. Virement CIH / CIH Express**
- "Payez par virement bancaire CIH ou CIH Express — on prépare dès réception."
- Confirmation page shows a clean RIB card with:
  - Titulaire, RIB, CIH Express number (placeholder block clearly marked "à compléter" — you'll edit later)
  - One-tap **Copier le RIB** button (clipboard) with toast confirmation
  - Montant à virer (= total) — also copyable
  - Référence à mentionner: `ZEY-{shortId}` (random 6-char)
- "Envoyer la preuve de paiement" primary button → opens WhatsApp pre-filled with order summary + the reference, asking customer to attach the transfer screenshot.

**C. Payer à la livraison (Cash)**
- "Réglez en espèces à la remise — Rabat & Témara."
- Min 70 MAD enforced on the button (already your global rule).
- Confirm → opens WhatsApp with order summary + "💵 Paiement à la livraison" so you can call to confirm address & slot.
- Confirmation page: "On vous appelle dans l'heure pour confirmer 📞"

All three modes ultimately route through WhatsApp — your single source of truth — so no backend, no orders table, no DB needed.

## Page structure / what we touch

- **New `src/lib/cart.ts`** — Zustand store (persisted to localStorage): items `[{id, line, format, size, flavors, price, qty}]`, `add/remove/updateQty/clear`, `subtotal`, `count`. ID derived from line+format+size+sorted flavors so identical boxes merge.
- **New `src/components/CartDrawer.tsx`** — slide-in sheet (shadcn `Sheet`): list rows with thumbnail, format label, flavors as small chips, qty stepper, remove. Footer: subtotal + min-order warning + "Commander" CTA.
- **New `src/components/CartButton.tsx`** — small cart icon + badge for the navbar, opens the drawer.
- **`src/components/Navbar.tsx`** — mount `<CartButton />` (desktop + mobile).
- **`src/components/BoxBuilder.tsx`** — replace the single "Commander sur WhatsApp" CTA with **"Ajouter au panier"** (primary) + small "Commander directement sur WhatsApp" ghost link as escape hatch. On add → toast "Boîte ajoutée 🛒" + auto-open the drawer once.
- **`src/components/Menu.tsx`** (DatesBanner) — same treatment for the dates product.
- **New page `src/pages/Checkout.tsx`** mounted at `/checkout` in `App.tsx`:
  - Stepper (3 steps), form with shadcn inputs + zod validation.
  - Step 2 = `RadioGroup` of 3 large cards with icon, title, 1-line description.
  - Step 3 = order recap (read-only) + "Confirmer".
  - On confirm: branch into mode-specific confirmation screen (same page state, no navigation), generate WA link via a shared `buildOrderMessage(cart, customer, mode)` helper.
- **New `src/lib/checkout.ts`** — message builder (FR/AR aware via `useStore().lang`), reference generator (`ZEY-XXXXXX`), copy-to-clipboard util, mode metadata.
- **`src/components/FloatingWhatsApp.tsx`** — stays, but hidden on `/checkout` to avoid double CTAs.

## Technical details

- Cart persistence: Zustand `persist` middleware, key `zey-cart-v1`. Migrates cleanly when prices change (store snapshots price at add-time; on mount we revalidate against current catalog and toast if anything moved).
- WhatsApp message format (FR example):
  ```
  Bonjour Zey's Sweetness 🍪
  Nouvelle commande — réf ZEY-A1B2C3

  • New York Maxi 6 — Pistache×2, Oreo×2, Nutella×2 — 160 MAD
  • American Classic Maxi 12 — 190 MAD

  Total : 350 MAD
  Mode : Virement CIH (preuve à suivre)

  Client : Sara B.
  📞 06 12 34 56 78
  📍 Témara — Rue X, Imm 4
  Note : livraison après 18 h
  ```
- No DB, no Lovable Cloud needed for this iteration. If you later want order history / receipt uploads, we add Cloud + an `orders` table in a follow-up.
- RIB block is a single component reading from `src/lib/bankInfo.ts` (placeholder constants with clear `TODO` comments) so you can fill it in one file later.
- Analytics: `trackWhatsAppClick` extended to log `{source: 'checkout', mode: 'whatsapp'|'cih'|'cod', total}`.

## Out of scope (ask if you want it next)

- Receipt upload on site (needs Cloud + storage).
- Order history / status tracking for the customer.
- Admin dashboard to mark orders paid.
- Promo codes, delivery fees by zone, scheduled delivery slots.
