# Plan d'action — Combler les manques de zeysweet.com

Objectif : passer de **72/100 à 90+/100** en 90 jours et atteindre 100+ commandes WhatsApp/mois.

Le plan est ordonné : chaque étape débloque la suivante. Ne saute pas l'ordre — sans tracking (étape 1), tout le reste est aveugle.

---

## 🔴 PHASE 1 — Débloquer le tracking (Semaine 1)

Sans données, impossible d'optimiser. C'est la base de tout le reste.

### Étape 1.1 — Activer GA4 (toi, hors-code)
- Créer un compte Google Analytics 4 sur analytics.google.com
- Créer une propriété "Zey's Sweetness"
- Récupérer le **Measurement ID** (format `G-XXXXXXXXXX`)

### Étape 1.2 — Activer Meta Pixel (toi, hors-code)
- Aller sur business.facebook.com → Events Manager
- Créer un Pixel "Zey's Sweetness"
- Récupérer le **Pixel ID** (16 chiffres)

### Étape 1.3 — Activer TikTok Pixel (toi, hors-code)
- ads.tiktok.com → Assets → Events → Web Events
- Créer un Pixel et récupérer le **TikTok Pixel ID**

### Étape 1.4 — Injecter les vrais IDs (moi, code)
- Remplacer les placeholders dans `index.html`
- Ajouter le snippet TikTok Pixel
- Brancher `trackWhatsAppClick`, `trackOrderSubmit` sur les 3 plateformes
- Ajouter un event `purchase_intent` à la soumission du formulaire WhatsApp

---

## 🔴 PHASE 2 — Présence locale Google (Semaine 1-2)

Levier #1 au Maroc local. Gratuit. ROI immédiat.

### Étape 2.1 — Google Business Profile (toi)
- Créer/réclamer la fiche sur business.google.com
- Catégorie : "Pâtisserie" + secondaires "Traiteur", "Boutique de cadeaux"
- Ajouter horaires, téléphone, lien zeysweet.com
- Upload 10+ photos pro (produits, packaging, vitrine)

### Étape 2.2 — Récolter 25 avis Google en 30 jours (toi + moi)
- **Toi** : envoyer le lien d'avis à tes 50 dernières clientes via WhatsApp
- **Moi (code)** : ajouter sur `/avis` un bouton CTA "Laisser un avis Google" avec lien direct vers ta fiche GBP, tracking event `gbp_review_click`

### Étape 2.3 — Posts hebdomadaires GBP (toi)
- 1 post/semaine : offres, nouveautés, behind-the-scenes

---

## 🟠 PHASE 3 — Combler les manques SEO/GEO (Semaine 2-3)

### Étape 3.1 — Cibler "dattes fourrées" (moi, code)
- Variante orthographique = 590 recherches/mois vs 170 actuelles
- Ajouter en synonyme dans : Hero, Products, FAQ, page Ramadan, meta descriptions
- Créer une page dédiée `/dattes-fourrees-rabat` (variante SEO)

### Étape 3.2 — og:image partageable (moi, code)
- Générer une image og 1200×630 (cookie + dattes + branding)
- Injecter via Helmet pour Home, Produits, Blog

### Étape 3.3 — Étendre le contenu GEO (moi, code)
- Ajouter 6 Q/R supplémentaires dans la FAQ (allergènes, vegan, halal, conservation, livraison rapide, paiement)
- Créer un guide long-form `/guide/cadeau-gourmand-rabat` (1200 mots, cible IA génératives)

---

## 🟠 PHASE 4 — Autorité du domaine / Backlinks (Semaine 3-6)

Objectif : passer de Authority Score 0 → 10+

### Étape 4.1 — Annuaires marocains (toi, 1h de travail)
- Pages Jaunes Maroc, Yelo.ma, Avito Pro, Jumia local
- Cohérence NAP (Nom, Adresse, Téléphone) identique partout

### Étape 4.2 — Articles invités (toi)
- Pitcher 3 blogs : Welovebuzz, MarocMama, Hespress Lifestyle
- Angle : "L'histoire derrière Zey's Sweetness" ou "Le retour des douceurs artisanales à Rabat"

### Étape 4.3 — Partenariats locaux (toi)
- Wedding planners Rabat : échange visibilité (coffrets dégustation)
- Traiteurs corporate : commission sur recommandation

---

## 🟡 PHASE 5 — Mécanique virale (Semaine 4-8)

### Étape 5.1 — Plan vidéo TikTok/Reels (toi, 5 vidéos/semaine)
- Scripts déjà préparés (`videoCampaigns.ts`) — lancer la production
- Liens bio : `/wa/cookie-signature`, `/wa/asmr-dattes`, etc.
- 2 collabs/mois micro-influenceuses Rabat (1k–50k followers)

### Étape 5.2 — Programme parrainage opérationnel (moi, code + Cloud)
- Activer Lovable Cloud
- Table `referrals` : code unique par cliente, tracking des conversions
- Mécanique "-15 % pour toi, -15 % pour ton amie"
- Notification WhatsApp auto à la marraine quand sa filleule commande

### Étape 5.3 — UGC contest mensuel (toi + moi)
- **Toi** : règlement + repost sur Insta
- **Moi (code)** : page `/concours` avec formulaire upload photo (Cloud Storage)

---

## 🟢 PHASE 6 — Accélération payante (Mois 2-3)

### Étape 6.1 — Meta Ads géolocalisé (toi)
- Budget test 1500 MAD/mois
- Audience : Rabat + Témara, 22-45 ans, intérêts wedding/food/gifts
- Créatives : tes meilleures vidéos UGC

### Étape 6.2 — Retargeting WhatsApp clickers (moi + toi)
- Audience custom Meta = visiteurs qui ont cliqué WhatsApp sans commander
- Offre : "-10 % première commande, valable 48h"

### Étape 6.3 — Outreach B2B LinkedIn (toi)
- 50 RH/mois : banques, ambassades, cabinets conseil Rabat
- Plaquette PDF coffrets fin d'année / Aïd / Ramadan
- Page `/corporate` existe déjà — ajouter formulaire devis (moi, code si pas déjà fait)

---

## 📋 Checklist de ce que JE peux coder en une itération

Si tu valides ce plan, je livre dans le prochain build :

1. ✅ Remplacer placeholders GA4/Meta/TikTok dans `index.html` *(j'ai besoin de tes 3 IDs)*
2. ✅ Bouton "Laisser un avis Google" sur `/avis` *(j'ai besoin du lien GBP)*
3. ✅ Cibler "dattes fourrées" partout + page dédiée
4. ✅ og:image générée + injection Helmet par route
5. ✅ FAQ +6 Q/R, guide cadeau long-form
6. ✅ Activer Lovable Cloud + table parrainage + tracking codes
7. ✅ Page `/concours` UGC avec upload photo

## 📋 Ce qui reste à TA charge

- Créer comptes GA4, Meta Pixel, TikTok Pixel → me donner les IDs
- Créer la fiche Google Business Profile
- Récolter avis Google
- Produire les vidéos TikTok/Reels
- Inscrire le site aux annuaires
- Pitcher blogs + influenceurs
- Budget Meta Ads

---

## 🎯 Résultat attendu à J+90

| Métrique | Aujourd'hui | Objectif |
|---|---|---|
| Score global site | 72/100 | **92/100** |
| Authority Score | 0 | 10–12 |
| Avis Google | 0 | 25+ |
| Commandes/mois | inconnu | 100+ |
| Trafic organique | ~0 | 500–800/mois |
