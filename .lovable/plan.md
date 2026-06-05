# Audit SEO / GEO + Plan de croissance virale — Zey's Sweetness

## 1. Diagnostic actuel

### ✅ SEO technique — solide
- Schema JSON-LD : Bakery + Product (×2) + FAQPage + LocalBusiness (page /avis) ✅
- Sitemap.xml, robots.txt, llms.txt, canonical, hreflang ✅
- Titres < 60 car., meta descriptions OK ✅
- Pre-render serveur pour Googlebot + crawlers sociaux ✅
- Hero LCP optimisé (fetchpriority, width/height, font-display swap) ✅
- Google Search Console vérifié + sitemap soumis ✅

### ⚠️ Points faibles détectés
| Domaine | Constat | Sévérité |
|---|---|---|
| **Authority Score Semrush** | 0/100 — site quasi inconnu de Google | 🔴 critique |
| **Backlinks** | 7 liens, tous nofollow, 4 domaines (3 sont des sites Fiverr spam) | 🔴 critique |
| **Trafic organique** | Non mesurable (volume trop faible pour Semrush) | 🟡 normal pour un nouveau site |
| **Accessibilité** | Contrastes texte muté sur fond clair (WCAG AA) | 🟢 low |
| **Analytics** | GA4 et Meta Pixel = `G-XXXXXXXXXX` / `0000000000000000` (placeholders) | 🔴 zéro tracking actif |
| **GEO (Generative Engine Optimization)** | LocalBusiness OK mais peu de contenu Q&A long-form que ChatGPT/Perplexity citent | 🟡 à renforcer |

### 📊 Données marché (Semrush, base FR)
- "cookies Rabat" : 20 recherches/mois, difficulté 0/100 → **win facile**
- "dattes farcies" : 170/mois, difficulté 16/100 → **opportunité**
- "dattes fourrées" : 590/mois (variante orthographique non ciblée) → **manque à exploiter**

> ⚠️ Le Maroc n'est pas une base Semrush dédiée — les volumes réels locaux sont supérieurs (recherches en darija + français mélangées via Google.ma).

---

## 2. Plan en 3 phases

### Phase 1 — Fondations mesurables (Semaine 1)
**Sans tracking, aucune décision data-driven n'est possible.**

1. **Remplacer les placeholders analytics** dans `index.html` :
   - GA4 `G-XXXXXXXXXX` → vrai Measurement ID
   - Meta Pixel `0000000000000000` → vrai Pixel ID
   - Ajouter Pixel TikTok (audience Maroc 18-35 ans massive sur TikTok)
2. **Corriger l'accessibilité** : remplacer `text-muted-foreground/50` et contrastes faibles par tokens design system
3. **Ajouter événements WhatsApp tracking** (`whatsapp_click`, `add_to_cart`, `checkout`) sur les CTAs

### Phase 2 — SEO local + GEO (Semaines 2-3)
**Objectif : devenir LA réponse pour "cookies/dattes à Rabat" sur Google ET ChatGPT/Perplexity.**

1. **Google Business Profile** (priorité #1 absolue — gratuit, énorme ROI local)
   - Créer/réclamer la fiche "Zey's Sweetness Rabat"
   - 10+ photos pro produits + vitrine
   - Récolter 20 avis Google clients existants en 30 jours
   - Posts hebdomadaires (offres, nouveautés)
2. **Renforcer le contenu GEO** (cité par les IA génératives) :
   - Étendre la FAQ à 12+ Q/R (prix, délais, allergènes, conservation, mariage, corporate)
   - Ajouter une page `/guide/cadeau-gourmand-rabat` (guide long-form, 1200 mots)
   - Ajouter une page `/dattes-ramadan-rabat` (saisonnier, fort potentiel)
3. **Variantes orthographiques** : ajouter "dattes fourrées" en synonyme dans le contenu (590/mois vs 170 actuels)
4. **Backlinks de qualité** :
   - Inscriptions annuaires marocains (Pages Jaunes Maroc, Yelo.ma, Avito Pro)
   - Articles invités sur 2-3 blogs lifestyle Maroc (Welovebuzz, MarocMama)
   - Partenariats : wedding planners Rabat, traiteurs corporate

### Phase 3 — Viralité (Semaines 3-8)
**Objectif : générer 100+ commandes/mois via social, pas via SEO seul.**

1. **TikTok / Instagram Reels** — moteur principal au Maroc
   - 5 vidéos/semaine (15-30 sec) : ASMR cookie qui casse, dattes farcies en macro, coulissé chocolat, packaging mariage
   - Hashtags : #RabatFood #MoroccoSweets #CookiesMaroc #Témara #FoodieRabat
   - 2 collabs/mois avec foodies Rabat (1k-50k followers, micro-influence > macro)
2. **Mécanique virale intégrée au site** :
   - **Programme parrainage** : "-15% pour toi, -15% pour ton amie" (lien WhatsApp pré-rempli)
   - **UGC contest mensuel** : photo de ta boîte → repost + cookie offert
   - **Coffret "surprise mariage"** offert à 1 mariée/mois si elle poste un reel
3. **Campagnes payantes** (budget 1500-3000 MAD/mois)
   - Meta Ads géolocalisé Rabat+Témara, audience 22-45, intérêts wedding/food/gifts
   - Reciblage WhatsApp click → offre première commande
4. **B2B Corporate** (panier moyen 10×)
   - LinkedIn outreach 50 RH/mois (banques, ambassades, cabinets conseil Rabat)
   - Plaquette PDF coffrets fin d'année / Aïd / Ramadan
   - Page dédiée `/corporate` avec formulaire devis

---

## 3. KPIs à 90 jours

| Métrique | Aujourd'hui | Objectif J+90 |
|---|---|---|
| Authority Score | 0 | 8-12 |
| Backlinks (dofollow) | 0 | 15+ |
| Avis Google | 0 | 25+ |
| Followers Instagram | ? | +2000 |
| Commandes WhatsApp/mois | ? | 100+ |
| Trafic organique mensuel | ~0 | 500-800 sessions |
| Conversion WhatsApp click | ? | 12%+ |

---

## 4. Ce que je peux implémenter en code (étape suivante)

Si tu approuves, je peux livrer dans une seule itération :

1. Corrections accessibilité (contrastes WCAG AA)
2. Hooks analytics : `whatsapp_click`, `add_to_cart`, `view_product` (prêts à recevoir tes vrais IDs GA4/Meta/TikTok)
3. Nouvelle page `/parrainage` avec mécanique de partage WhatsApp pré-rempli
4. Nouvelle page `/corporate` avec formulaire devis (Cloud backend)
5. Extension FAQ (4 → 12 questions) — boost GEO
6. Nouvelle page locale `/dattes-ramadan-rabat` (saisonnier)
7. Bouton "Laisser un avis Google" sur `/avis` pour booster la fiche GBP

**Ce qui reste hors-code (à faire par toi)** :
- Créer la fiche Google Business Profile
- Fournir les vrais IDs GA4 / Meta Pixel / TikTok Pixel
- Stratégie de contenu TikTok/Reels (tournage)
- Outreach influenceurs et annuaires
- Budget Meta Ads

Veux-tu que je démarre par les 7 points code ci-dessus ?
