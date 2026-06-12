
# Two Cookie Lines — American Classic & New York

## What changes for the customer

The menu becomes a two-step experience:

1. **Choose your line** — two large editorial cards side-by-side:
   - **American Classic** — the flat, soft-baked chocolate chip. Original flavor only.
   - **New York** — the thick, stuffed, generous style. 7 flavors to mix & match.
2. **Build your box** — the existing Box Builder opens for the chosen line, with a small "← Change line" link to go back.

This keeps the premium feel of the builder while making the brand story crystal clear: two distinct products, not one menu of variants.

## Pricing (locked in from your answers)

**New York Cookie**
- Maxi: 4 → 110 · 6 → 160 · 10 → 250 MAD
- Mini: 10 → 130 · 20 → 260 MAD

**American Classic** (Original only)
- Maxi: 4 → 70 · 8 → 140 · 12 → 190 MAD
- Mini: 4 → 35 · 8 → 65 · 12 → 99 MAD

**Minimum order: 70 MAD** — shown as a subtle note on the chooser and disabled state on under-minimum boxes (only American Mini 4-pack at 35 MAD and 8-pack at 65 MAD fall under, so those two will display a "Minimum 70 MAD — ajoutez une autre boîte ou choisissez un format plus grand" hint and the WhatsApp CTA will be disabled for those single-box orders).

## Page structure

```text
Notre Carte
─────────────────────────────
[Step shown when no line picked]

  ┌──────────────────┐   ┌──────────────────┐
  │  AMERICAN        │   │  NEW YORK        │
  │  CLASSIC         │   │  COOKIE          │
  │  [photo 1]       │   │  [photo 2]       │
  │  Soft-baked      │   │  Thick & stuffed │
  │  Original        │   │  7 flavors       │
  │  dès 35 MAD      │   │  dès 110 MAD     │
  │  [Composer →]    │   │  [Composer →]    │
  └──────────────────┘   └──────────────────┘

[After click → builder for chosen line replaces chooser]

← Changer de gamme
  [BoxBuilder configured for that line]

─────────────────────────────
Nos Dattes Farcies (unchanged)
```

## Box Builder behavior per line

- **New York**: keeps the current 7-flavor mix & match grid. Maxi/Mini toggle with the new boxes above. (Mini drops the 6-pack — only 10 & 20 now per your pricing.)
- **American Classic**: builder collapses to a simpler view — no flavor grid (single flavor). Maxi/Mini toggle + 3 box sizes each. Single "Commander" CTA per selected box. The flavor step is replaced by a short product description card with the American photo and tasting notes.

Both builders share the same summary bar + WhatsApp message generator, with the line name and format included in the pre-filled text (e.g. `🍪 Boîte de 6 cookies New York Maxi — 160 MAD`).

## Files to change

- **`src/components/Menu.tsx`** — add a `selectedLine` state (`null | 'american' | 'newyork'`). When `null`, render the two-card chooser. When set, render `<BoxBuilder line={selectedLine} />` with a back link.
- **`src/components/BoxBuilder.tsx`** — accept a `line` prop. Branch box catalog, format options, and the flavor step:
  - `line === 'newyork'` → current 7-flavor grid, NY box prices above.
  - `line === 'american'` → hide flavor grid, show a single "Original — chocolat noir & pépites, fleur de sel" hero card, American box prices above.
  - Update `buildBoxLink` to include the line name in the WhatsApp message.
  - Add 70 MAD minimum check → disable CTA + show hint when `box.price < 70`.
- **`src/assets/`** — upload the two attached photos as Lovable Assets:
  - `american-classic-hero.jpg` (image 1, flat chocolate chip on rack)
  - `newyork-cookie-hero.jpg` (image 2, thick stuffed cookie on rack)
  Used for the chooser cards and the American builder hero.

## What stays the same

- Dattes Farcies banner, practical info strip, FAQ, contact, all other sections.
- WhatsApp-only checkout flow.
- Visual language (cocoa/cream/rose palette, hand + display fonts, paper texture).

## Out of scope (ask if you want it)

- Cross-line bundles (one American + one NY in a single WhatsApp message).
- Per-flavor photos on the chooser cards.
- Animated transition between chooser and builder (can add Motion if you want a polished slide).
