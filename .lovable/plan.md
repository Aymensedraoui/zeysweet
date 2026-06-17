
# UX Audit & Conversion Refresh — Zey's Sweetness

## 1. The immediate pain (the selected button)

When a user opens a range (American Classic or New York), the `BoxBuilder` takes over the Menu section and the only way back is a small `Changer de gamme` text-link at the very top. On mobile, after scrolling through flavors/sizes, this link is off-screen. Users scroll up past it, hit the navbar, click the logo → leaves the section → lost. Result: drop-off right at the moment of intent.

### Fix
- Replace the plain text-link with a **proper, branded back button** styled like the rest of the site (cocoa outline + arrow + hover state).
- Add a **persistent floating "Retour aux gammes" pill** on mobile, bottom-left, mirrored to the WhatsApp button on the right — only visible while a range is open, hides on scroll-up.
- After the builder mounts, **scroll the section's title into view** so the user immediately sees the back affordance.
- Smooth-scroll back to the `#products` section title when clicked (currently it just toggles state, leaving the user mid-page).

## 2. Site-wide audit findings

### Duplication / friction to remove
- **`HowToOrder` + `OrderCTA` + `Contact` + `FloatingWhatsApp`** all repeat "Commander sur WhatsApp" in the bottom third → merge `OrderCTA` into a tighter single block (kept once before footer); remove the standalone CTA section.
- **Two scroll-cinematic clips back-to-back around the dates section** (`scroll2` used both in `ScrollCinematic` and again in `SectionDivider`) → drop the second to cut visual noise on mobile.
- **`TrustBar` + practical-info grid inside Menu** repeat the same four reassurances ("livraison 24h, paiement, etc.") → keep the in-Menu grid, remove `TrustBar` from the page if rendered (verify).
- **`Products.tsx`** appears unused alongside `Menu.tsx` → confirm and delete if dead.

### Mobile-specific issues
- Navbar mobile drawer has no "Commander" CTA inside — user has to close menu to find it.
- `FloatingWhatsApp` overlaps the cart drawer trigger on small screens; reposition with safe-area padding.
- Hero CTAs stack but lack a single, dominant "Voir la carte" primary — currently competing equal-weight buttons cause hesitation.
- Long sections (Cinematic, Story, Gallery) have no jump-back-to-products affordance once the user is deep in storytelling.

### Conversion architecture (kept simple)
Single guided path on mobile:
```text
Hero → "Voir la carte" (primary)
  → Menu (range chooser)
    → BoxBuilder (with clear back + sticky "Ajouter au panier" on mobile)
      → Cart drawer → Checkout / WhatsApp
```
Story, Gallery, Testimonials become *support* — moved after the Menu, with anchor jump-back-to-products at the end of each.

## 3. Concrete changes

### A. BoxBuilder back navigation (the audit trigger)
- New `<BackToRanges>` component: rounded-full, cocoa border, arrow-left icon, "Changer de gamme" label, sits inline above builder AND as a fixed bottom-left pill on `< md` screens.
- On click: `setSelectedLine(null)` + `scrollIntoView` on `#products`.

### B. Sticky mobile "Ajouter au panier" bar in BoxBuilder
- When user has picked size + flavors, a bottom bar slides up with total price + add-to-cart, so they never lose the action.

### C. Hero hierarchy
- Make "Découvrir la carte" the single primary; secondary "WhatsApp" becomes ghost outline.

### D. Trim the page (Index.tsx)
- Remove the duplicate `SectionDivider` between Testimonials and FAQ.
- Remove `OrderCTA` (already covered by Contact + floating WA).
- Confirm `TrustBar` not rendered; delete file if unused.

### E. Navbar mobile drawer
- Add a "Commander sur WhatsApp" rose button at the bottom of the open drawer.

### F. Footer / Story end-anchors
- Add small "↑ Retour à la carte" link after Story, Gallery, Testimonials.

## 4. Out of scope (kept untouched per your rules)
- Product line-up, prices, flavors, BoxBuilder pricing logic
- Section order of Story/Cinematic/Gifts (architecture preserved)
- Backend / payments / checkout flow logic

## 5. Technical notes
- All new styles use existing tokens (`cocoa`, `cream`, `rose`, `caramel`) — no new colors.
- New `BackToRanges` lives in `src/components/BoxBuilder.tsx` (small internal component) to keep the file count down.
- Sticky mobile bar uses `env(safe-area-inset-bottom)` to clear iOS home indicator.
- Smooth scroll via `element.scrollIntoView({ behavior: "smooth", block: "start" })`.

Approve and I'll ship in one pass.
