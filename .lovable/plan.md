
# Plan — Pages locales SEO Rabat & Témara

## Objectif
Capter le trafic local "cookies rabat", "cookies maison rabat", "dattes farcies témara", "dattes fourrées rabat" via 2 landing pages dédiées, indexables et liées dans le sitemap.

## Pages à créer

### 1. `/cookies-rabat` — "Cookies maison à Rabat"
- **H1** : Cookies maison à Rabat — Livraison 24h
- **Meta title** (<60c) : Cookies maison à Rabat | Zey's Sweetness — Livraison 24h
- **Meta description** (<160c) : Cookies Signature chocolat noir & noix de pécan, faits main à Rabat. Livraison gratuite Agdal, Hassan, Hay Riad, Souissi. Commande WhatsApp.
- **Canonical** : https://zeysweet.com/cookies-rabat
- **Contenu (≈450 mots)** :
  - Intro locale (Rabat, quartiers livrés)
  - Section "Pourquoi nos cookies" (ingrédients, recette, fait main)
  - Section "Zones de livraison à Rabat" (liste des quartiers : Agdal, Hassan, Hay Riad, Souissi, L'Océan, Yacoub El Mansour)
  - Section "Prix & format" (35 MAD / pièce, packs)
  - Section "Comment commander" (WhatsApp, délai 24h)
  - FAQ locale (3 questions : délai Rabat, livraison gratuite, paiement cash)
  - CTA WhatsApp sticky
- **JSON-LD** : `LocalBusiness` + `Product` + `FAQPage` + `BreadcrumbList`

### 2. `/dattes-farcies-temara` — "Dattes farcies à Témara"
- **H1** : Dattes farcies aux cajou à Témara — Livraison 24h
- **Meta title** : Dattes farcies à Témara | Zey's Sweetness — Cajou & Miel
- **Meta description** : Dattes fourrées aux noix de cajou, faites main. Livraison Témara, Harhoura, Skhirat. Idéal mariage, Ramadan, cadeau. Commande WhatsApp.
- **Canonical** : https://zeysweet.com/dattes-farcies-temara
- **Contenu (≈450 mots)** :
  - Intro Témara + occasions (mariage, Ramadan, Aïd, cadeau corporate)
  - Section "Nos dattes farcies" (Medjool, cajou, fait main)
  - Section "Zones livrées" (Témara centre, Harhoura, Skhirat, Plage des Nations)
  - Section "Pour quelles occasions" (mariage, baby shower, Ramadan, corporate)
  - Section "Conservation & présentation" (boîte cadeau, ruban, 7 jours frais)
  - FAQ (combien par personne mariage, conservation, personnalisation)
  - CTA WhatsApp
- **JSON-LD** : `LocalBusiness` + `Product` + `FAQPage` + `BreadcrumbList`

## Implémentation technique

### Fichiers
- **Nouveau** : `src/pages/LocalLanding.tsx` — composant générique paramétré par slug, contenu chargé depuis `src/lib/localPages.ts`
- **Nouveau** : `src/lib/localPages.ts` — données structurées des 2 pages (titre, meta, sections, FAQ, JSON-LD)
- **Modifié** : `src/App.tsx` — ajouter 2 routes :
  ```
  <Route path="/cookies-rabat" element={<LocalLanding slug="cookies-rabat" />} />
  <Route path="/dattes-farcies-temara" element={<LocalLanding slug="dattes-farcies-temara" />} />
  ```
- **Modifié** : `public/sitemap.xml` — ajouter les 2 URLs (priority 0.8, changefreq monthly)
- **Modifié** : `public/llms.txt` — ajouter les 2 pages dans la section Pages
- **Modifié** : `src/components/Footer.tsx` — ajouter 2 liens "Cookies Rabat" et "Dattes Témara" dans la section Liens (boost maillage interne)

### Design
- Réutilise les composants existants (`Navbar`, `Footer`, `FloatingWhatsApp`)
- Style cohérent avec la home (palette cream/cocoa/rose/caramel, font display + hand)
- Hero image locale + sections alternées
- CTA `btn-rose btn-glow` vers `buildWhatsAppLink`

### SEO
- `<Helmet>` par page : title, description, canonical, og:*, JSON-LD
- H1 unique par page avec mot-clé principal
- Alt text riche sur images (`cookies-maison-rabat-zey-sweetness.jpg`)
- Maillage : lien depuis Footer + lien réciproque entre les 2 pages

## Hors scope (à confirmer après)
- Génération d'images dédiées (peut utiliser images existantes ou imagegen)
- Soumission GSC manuelle des 2 nouvelles URLs (côté user)
- Google Business Profile (côté user)
