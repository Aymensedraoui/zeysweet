# Plan SEO & visibilité — Objectif 50 commandes en 30 jours

## Réalité du marché (à lire en premier)

Un site neuf sans backlinks ne se classe pas sur Google en 30 jours. Le SEO organique met 3 à 6 mois à porter ses fruits. **Pour atteindre 50 commandes en 30 jours, le SEO seul ne suffit pas** — il faut combiner SEO (qui sème pour mois 2-3) avec des leviers à effet immédiat : Google Business Profile (local pack en 7-14j), Instagram, WhatsApp Status, bouche-à-oreille ciblé.

Hypothèse : panier moyen ~150 MAD, taux conversion visite→WhatsApp ~5%, conversion WhatsApp→commande ~40%. Pour 50 commandes il faut ~2 500 visites OU ~125 conversations WhatsApp qualifiées.

## Ce qu'on fait dans Lovable (code/SEO technique)

### Semaine 1 — Fondations SEO

1. **Analytics + tracking**
   - Intégrer Google Analytics 4 (mesure trafic, sources, conversions)
   - Intégrer Meta Pixel (préparer remarketing pour phase B)
   - Event tracking sur clic WhatsApp (= conversion principale)

2. **4 nouvelles pages locales SEO** (sur le modèle cookies-rabat existant)
   - `/cookies-agdal` — quartier le plus chaud Rabat
   - `/cookies-hay-riad` — pouvoir d'achat élevé
   - `/dattes-mariage-rabat` — intention d'achat forte, gros panier
   - `/coffrets-cadeaux-corporate-rabat` — B2B, gros tickets
   - Chaque page : Helmet complet, JSON-LD LocalBusiness+Product+FAQ+Breadcrumb, ~450 mots, maillage croisé, CTA WhatsApp

3. **Images dédiées par page** (génération via imagegen)
   - 1 hero image par landing locale (6 au total avec les existantes)
   - Optimisation : conversion WebP, lazy loading, alt text riche
   - OG image par page (au lieu du générique partagé)

4. **hreflang FR/AR**
   - Ajouter balises hreflang dans Helmet pour signaler les versions FR et AR à Google

### Semaine 2 — Contenu éditorial (longue traîne)

5. **Structure blog** : route `/blog` + `/blog/:slug`, CMS léger (markdown ou data file), JSON-LD Article + BreadcrumbList

6. **5 premiers articles** (mots-clés à faible difficulté, intention locale/saisonnière) :
   - "Idées cadeaux Ramadan 2026 à Rabat"
   - "Combien de pièces de dattes farcies pour un mariage marocain ?"
   - "Cookies maison vs industriels : ce qui change vraiment"
   - "Cadeaux corporate fin d'année : 7 idées originales à Rabat"
   - "Conservation des dattes farcies : guide complet"

### Semaine 3 — Optimisation conversion SEO

7. **Pages produit dédiées** : `/produits/cookie-signature` et `/produits/dattes-farcies-cajou`
   - Galerie photos, ingrédients détaillés, avis, FAQ produit
   - JSON-LD Product complet avec vraies reviews

8. **Audit technique** : Core Web Vitals, vitesse mobile, lazy load, preload fonts

### Semaine 4 — Amplification & mesure

9. **Maillage interne renforcé** : liens contextuels home ↔ blog ↔ pages locales ↔ produit
10. **Resoumission GSC** : sitemap mis à jour, demande d'indexation des nouvelles URLs
11. **Bilan analytics** : sources de trafic, pages performantes, taux conversion WhatsApp

## Ce que TU dois faire en parallèle (hors Lovable, critique pour 50 commandes)

Ces actions sont **plus impactantes que le SEO** sur 30 jours. Sans elles, l'objectif 50 commandes ne sera pas atteint.

### A faire cette semaine
- **Google Business Profile** : créer fiche "Zey's Sweetness Rabat" + "Témara", photos pro, horaires, posts hebdo. → effet local pack en 7-14j.
- **Instagram pro** : 3 posts/semaine + 5 stories/jour avec lien WhatsApp. Reels cuisine = portée organique max.
- **WhatsApp Status quotidien** : montre la fabrication, les livraisons, les retours clients. Tes contacts existants = premier vivier.
- **10 micro-influenceurs Rabat** (food/lifestyle, 2-10k followers) : envoie 10 boîtes gratuites contre 1 story + 1 post. ROI imbattable.

### Continu
- **Demander un avis Google** à chaque cliente livrée (lien direct préparé). Vise 20 avis 5★ en 30j.
- **Photos clients réelles** (avec leur accord) — gold pour future page testimonials.
- **Activer un code parrainage** : "-15% pour toi et ton amie" (geste manuel WhatsApp suffit).

## Indicateurs hebdo (à me reporter chaque vendredi)

| Métrique | Objectif S4 |
|---|---|
| Visites GA4 | 2 500 cumulées |
| Clics WhatsApp (event) | 125 |
| Commandes confirmées | 50 |
| Avis Google | 20 |
| Followers Instagram | +500 |
| Pages indexées GSC | 12+ |

## Détails techniques

- **GA4** : via `gtag.js` dans `index.html` (sitewide). Event custom `whatsapp_click` déclenché dans `buildWhatsAppLink` et `FloatingWhatsApp`.
- **Meta Pixel** : même approche, event `Lead` sur clic WhatsApp.
- **Blog** : data en `src/lib/posts.ts` au début (rapide), migration CMS plus tard si nécessaire. Pas de Lovable Cloud requis maintenant.
- **Images** : génération via imagegen, format `.jpg` (photos), nommage SEO `cookies-agdal-zey-sweetness.jpg`.
- **Sitemap** : `public/sitemap.xml` mis à jour à chaque ajout de page (manuel pour l'instant — 16 URLs prévues fin S2).
- **hreflang** : `<link rel="alternate" hreflang="fr" href="..." />` + `<link rel="alternate" hreflang="ar" href="..." />` + `x-default`.

## Hors scope (phase B/C ensuite)
- Checkout en ligne, paiement, Lovable Cloud, emails transactionnels
- Vraie page reviews dynamique branchée à Google API
- Refonte du design / nouveaux composants visuels majeurs

## Ordre d'exécution si tu valides

Je commence par **Semaine 1** dans l'ordre : GA4+Pixel → 4 pages locales → images → hreflang. Je m'arrête après chaque semaine pour te montrer et tu valides la suite.
