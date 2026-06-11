# Refonte de la section « Nos Douceurs »

Objectif : séparer cookies et dattes, restaurer la dimension visuelle (photos), et hiérarchiser proprement (boîtes > unités, Maxi/Mini groupés).

## Nouvelle structure

```text
─── NOTRE CARTE ───
       Nos Douceurs
   (intro 1 ligne)

╔══════════════ Nos Cookies ══════════════╗
║                                          ║
║  ┌──────────────┐    ┌──────────────┐   ║
║  │  [PHOTO NY]  │    │  [PHOTO AM]  │   ║
║  │              │    │              │   ║
║  │ New York     │    │ American     │   ║
║  │ Cookies      │    │ Cookies      │   ║
║  │ description  │    │ description  │   ║
║  │              │    │              │   ║
║  │ ─ MAXI ─     │    │ ─ MAXI ─     │   ║
║  │ Boîte de 4   │    │ Boîte de 4   │   ║
║  │ Boîte de 6 ★ │    │ Boîte de 8 ★ │   ║
║  │ Boîte de 10  │    │ Boîte de 12  │   ║
║  │ Unité 30 MAD │    │ Unité 20 MAD │   ║
║  │              │    │              │   ║
║  │ ─ MINI ─     │    │ ─ MINI ─     │   ║
║  │ Boîte de 10  │    │ Boîte de 4   │   ║
║  │ Boîte de 20  │    │ Boîte de 8   │   ║
║  │ Unité 15 MAD │    │ Boîte de 12  │   ║
║  │              │    │ Unité 10 MAD │   ║
║  │ [WhatsApp]   │    │ [WhatsApp]   │   ║
║  └──────────────┘    └──────────────┘   ║
╚══════════════════════════════════════════╝

╔════════════ Nos Dattes Farcies ══════════╗
║  ┌─────────────┬──────────────────────┐  ║
║  │             │ Format cadeau        │  ║
║  │  [PHOTO     │ Dattes Farcies aux   │  ║
║  │   DATTES    │ Cajou                │  ║
║  │   pleine    │ Boîte de 12          │  ║
║  │   hauteur]  │ 120 MAD              │  ║
║  │             │ description premium  │  ║
║  │             │ [Commander WhatsApp] │  ║
║  └─────────────┴──────────────────────┘  ║
╚══════════════════════════════════════════╝

  ── Bandeau infos pratiques (4 colonnes) ──
```

## Changements visuels

- **Sous-titres de section** (`Nos Cookies`, `Nos Dattes Farcies`) en font display, séparés par un ornement.
- **Photos restaurées** : chaque carte cookie a un en-tête image (aspect 4/3), la carte dattes a une image pleine hauteur sur 40 % de la largeur.
- **Groupement Maxi / Mini** à l'intérieur de chaque carte cookie, sous-titre discret en uppercase tracking.
- **Labels raccourcis** : « Boîte de 6 » au lieu de « Boîte de 6 New York Cookies Maxi » (le contexte est déjà donné par la carte + le sous-groupe).
- **Boîtes** : rangées en bg cream avec bordure douce, prix en font-hand caramel, CTA WhatsApp rose.
- **Unités** : ligne simple, prix discret, lien texte « Commander → ».
- **Badges conservés** : `Le plus commandé`, `Idéal à partager`, `Format cadeau` — un seul badge par carte de boîte, pas surchargé.
- **Section Dattes pleine largeur** : layout horizontal (image gauche, contenu droit), traité comme un bandeau cadeau premium, pas comme une 3ème carte cookie.

## Photos

- **Générer 2 nouvelles photos cookies** dans `src/assets/` :
  - `product-cookie-newyork.jpg` — cookie épais, généreux, débordant de chocolat fondant, vue rapprochée, lumière chaude, fond cream/papier kraft, style éditorial.
  - `product-cookie-american.jpg` — cookie plus classique, plus plat, pépites visibles, ambiance plus quotidienne mais soignée, même palette pour cohérence de marque.
- **Réutiliser** `product-dates.jpg` (existante) pour la section dattes.
- Toutes en cohérence avec la palette existante (cream, cocoa, rose, caramel).

## Détails techniques (pour l'implémentation)

- Refactor `src/components/Menu.tsx` :
  - Séparer `FAMILIES` en `COOKIE_FAMILIES` (NY + American) et constante `DATES` (objet unique).
  - Ajouter `image` et `format` (`maxi` | `mini`) sur chaque item cookie pour le groupement.
  - Nouveau composant interne `CookieCard` (image + groupes Maxi/Mini + CTA).
  - Nouveau composant interne `DatesBanner` (layout 2 colonnes, image + contenu).
  - Conserver `waUrl()`, `familyWaUrl()`, `BADGE_LABEL`, tracking inchangés.
- Imports images : `import nyImg from "@/assets/product-cookie-newyork.jpg"` etc.
- Aucun changement sur `src/lib/store.ts`, `src/pages/Index.tsx`, `src/components/FloatingWhatsApp.tsx` — le flux WhatsApp reste identique.
- Mobile : cartes cookies passent en stack vertical, bandeau dattes passe en stack vertical (image au-dessus, contenu en-dessous).

## Hors scope

- Pas de changement sur le cart system existant ni sur les autres sections (Hero, Story, Gifts, FAQ).
- Pas de nouvelle traduction AR au-delà de l'existant — les CTA WhatsApp continuent de respecter `lang`.
