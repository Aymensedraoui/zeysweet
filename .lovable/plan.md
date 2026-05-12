## Recommandation

Pour votre cas (pâtisserie physique à Casablanca, pas encore enregistrée, < 20 commandes/semaine), **n'activez aucune passerelle de paiement maintenant**.

Raisons :
- **Stripe / Paddle** exigent une société enregistrée (Maroc non supporté côté vendeur Stripe ; Paddle = produits digitaux uniquement).
- **Shopify** ajouterait un abonnement mensuel + complexité inutile pour < 20 commandes.
- **CMI / PayZone** (passerelles marocaines) demandent un dossier bancaire pro impossible sans statut juridique.
- Au Maroc, **WhatsApp + Cash à la livraison** est le standard pour l'artisanat alimentaire et convertit mieux qu'un checkout carte.

La bonne stratégie : **rendre le flux actuel irréprochable** et préparer le terrain pour plus tard.

## Plan en 3 phases

### Phase 1 — Maintenant (UX paiement & confiance)

1. **Clarifier les moyens de paiement partout sur le site**
   - Bandeau dans le footer + section Contact : « Paiement à la livraison (cash) · Virement bancaire sur demande pour gros paniers »
   - Retirer le badge « Virement bancaire » s'il n'est pas réellement disponible, ou le conditionner aux commandes > 300 MAD.

2. **Renforcer la confiance autour du cash**
   - Ajouter une mini-section « Comment ça marche » avec 3 étapes claires : Commande WhatsApp → Confirmation + créneau → Paiement cash à la livraison.
   - Ajouter une ligne FAQ : « Quels moyens de paiement acceptez-vous ? »
   - Ajouter une ligne FAQ : « Puis-je annuler ou modifier ma commande ? »

3. **Améliorer le message WhatsApp pré-rempli**
   - Inclure : produits + quantités + total estimé + zone de livraison demandée.
   - Ajouter mention « Paiement cash à la livraison sauf accord contraire ».

4. **Acompte pour cadeaux / gros volumes (optionnel, sans code)**
   - Documenter dans la FAQ : pour commandes > X MAD ou cadeaux corporate, acompte de 30% par virement, RIB envoyé sur WhatsApp.

### Phase 2 — Quand vous serez auto-entrepreneur

5. **Ajouter un lien de paiement simple** (sans intégration code)
   - Option A : **PayPal.me** (rapide, accepte cartes internationales, frais ~3.9%).
   - Option B : **Wise** ou compte bancaire marocain avec lien CMI Lite si disponible.
   - Affichage : bouton « Payer en ligne » dans le message de confirmation WhatsApp, pas sur le site (évite le checkout).

### Phase 3 — Quand vous dépasserez ~50 commandes/semaine

6. **Évaluer une vraie passerelle**
   - **CMI** ou **PayZone** au Maroc (cartes locales + internationales).
   - Migrer vers **Shopify** uniquement si vous voulez un vrai catalogue + gestion stock + livraison automatisée.
   - À ce moment-là, on rouvre ce plan et on intègre.

## Détails techniques (Phase 1)

Modifications front-end uniquement, aucune dépendance, aucun backend :

- `src/components/Contact.tsx` — ajouter une carte « Paiement » avec icônes (Cash, Virement sur demande).
- `src/components/Footer.tsx` — nettoyer les badges paiement pour refléter la réalité.
- `src/components/FAQ.tsx` — ajouter 2 questions (paiement + annulation).
- `src/components/HowToOrder.tsx` — vérifier que l'étape 3 mentionne explicitement « Paiement à la réception ».
- `src/components/WhatsAppModal.tsx` + `src/lib/store.ts` — enrichir le message WhatsApp avec total estimé et mention paiement.
- `src/lib/i18n.ts` — ajouter les nouvelles clés FR/AR.

Aucun appel à `enable_stripe_payments`, `enable_paddle_payments` ou `enable_shopify` à ce stade.

## Ce que vous gagnez

- Site 100% cohérent avec votre réalité opérationnelle.
- Zéro frais mensuel, zéro setup juridique requis.
- Conversion maximale (le cash à la livraison rassure au Maroc).
- Chemin de migration clair quand le volume justifiera une passerelle.
