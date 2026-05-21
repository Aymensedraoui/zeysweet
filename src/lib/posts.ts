// Blog posts data. Markdown-lite (paragraphs split by blank lines, "## " headings, "- " bullets).
// Kept as a typed data file so SEO is fully SSR-friendly via react-helmet-async, no CMS needed.

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  excerpt: string;
  date: string; // ISO
  updated?: string;
  readingMinutes: number;
  author: string;
  category: "Ramadan" | "Mariage" | "Conseils" | "Corporate" | "Conservation";
  keywords: string[];
  body: string; // simple markdown
  related?: string[]; // slugs
  crossLinks?: { to: string; label: string }[];
};

const AUTHOR = "Maison de douceurs";

export const POSTS: Record<string, Post> = {
  "idees-cadeaux-ramadan-2026-rabat": {
    slug: "idees-cadeaux-ramadan-2026-rabat",
    title: "Idées cadeaux Ramadan 2026 à Rabat : 9 coffrets qui font plaisir",
    metaTitle: "Cadeaux Ramadan 2026 à Rabat — 9 idées de coffrets gourmands",
    metaDesc:
      "Coffrets dattes farcies, cookies maison, paniers gourmets : 9 idées de cadeaux Ramadan 2026 à offrir à Rabat. Livraison 24h, fait main.",
    excerpt:
      "Du coffret de dattes farcies aux paniers gourmands, voici 9 idées concrètes pour offrir à vos proches pendant le Ramadan 2026 à Rabat.",
    date: "2026-02-01",
    readingMinutes: 6,
    author: AUTHOR,
    category: "Ramadan",
    keywords: ["cadeaux Ramadan Rabat", "coffret Ramadan", "dattes farcies Ramadan", "Ftour cadeau"],
    body: `Le Ramadan est le moment de l'année où l'on offre le plus à Rabat. Entre la famille, les voisins, les collègues et les invités du Ftour, les occasions de faire un petit geste se multiplient. Voici 9 idées de cadeaux Ramadan 2026, testées et approuvées par nos clientes à Rabat et Témara.

## 1. Le coffret de dattes farcies aux noix de cajou
C'est l'incontournable. Une boîte de 12 ou 24 pièces, présentation soignée, ruban. Effet garanti chez la belle-mère ou pour un Ftour entre amis. Comptez 120 MAD la boîte de 12.

## 2. Le duo cookies + dattes
Pour ceux qui aiment varier : 6 cookies signature + 12 dattes farcies dans une même boîte. Idéal pour un cadeau "tout-en-un" sans avoir à choisir.

## 3. Le panier gourmand familial
Quand on veut marquer le coup. Boîte de 24 dattes, 12 cookies, et une touche personnalisée (carte manuscrite, parfum d'ambiance). On le prépare sur commande, 48h à l'avance.

## 4. Le coffret bureau
Pour offrir au bureau pendant Ramadan : une boîte mixte que tout le monde peut piquer en open-space. Discret, élégant, partageable.

## 5. Le mini-coffret de bienvenue
Pour les invités qui viennent rompre le jeûne chez vous. 4 dattes + 2 cookies par personne, dans un petit pochon en kraft. Souvenir parfait.

## 6. Les dattes farcies thématiques
On peut personnaliser le farci : pâte d'amande, pistache, ganache chocolat. À demander sur WhatsApp 48h avant.

## 7. Le cadeau "merci"
Pour la femme de ménage, la nounou, le gardien. Un petit coffret de 6 dattes + ruban, ça fait toujours plaisir et ça reste abordable.

## 8. Le coffret livré directement à un proche
Vous êtes loin de Rabat ? On livre à votre place. Vous payez par virement, on dépose le coffret avec votre mot personnel.

## 9. La box surprise Ramadan
On vous laisse choisir la couleur, le budget et le ton du message. On compose la box selon ce que vous nous dites de la personne. C'est le cadeau qui surprend.

## Comment commander avant le rush
Le pic de commandes Ramadan tombe les 5 derniers jours avant le mois sacré. Commandez **au moins 7 jours à l'avance** pour les coffrets sur mesure. Pour les boîtes standards, 24-48h suffisent. WhatsApp : +212 620 35 53 25.`,
    related: ["combien-dattes-mariage-marocain", "cadeaux-corporate-fin-annee-rabat"],
    crossLinks: [
      { to: "/dattes-farcies-temara", label: "Voir nos dattes farcies à Témara" },
      { to: "/coffrets-cadeaux-corporate-rabat", label: "Coffrets corporate à Rabat" },
    ],
  },

  "combien-dattes-mariage-marocain": {
    slug: "combien-dattes-mariage-marocain",
    title: "Combien de pièces de dattes farcies prévoir pour un mariage marocain ?",
    metaTitle: "Dattes farcies pour mariage : combien en prévoir ? — Guide Rabat",
    metaDesc:
      "Calculez le nombre exact de dattes farcies pour votre mariage à Rabat : barème par invité, mhanchas, hennas, kelma. Guide pratique et budget.",
    excerpt:
      "Mariage à Rabat : voici le barème précis pour ne ni manquer, ni gaspiller — par invité, par étape (kelma, henna, lila, walima).",
    date: "2026-02-08",
    readingMinutes: 5,
    author: AUTHOR,
    category: "Mariage",
    keywords: ["dattes mariage Rabat", "combien dattes mariage", "négafa Rabat", "kelma henna walima"],
    body: `On reçoit la question chaque semaine : *"Pour 200 invités, je prends combien de dattes ?"*. La réponse dépend de l'étape (kelma, henna, walima) et du format que vous servez. Voici le barème qu'on utilise avec nos clientes à Rabat.

## Le barème simple, par étape
**Kelma (cérémonie religieuse)** : 1 datte par invité présent. C'est symbolique, pas besoin d'en prévoir plus.

**Henna / Lila** : 2 à 3 dattes par invité. C'est le moment où l'on grignote longtemps, avec le thé.

**Walima (réception principale)** : 3 à 4 pièces par invité, posées sur les tables de Ftour ou en accueil.

**Petits déjeuners du lendemain** : 2 dattes par invité qui dort sur place.

## Exemple concret : mariage 200 invités
- Kelma (60 personnes) : 60 pièces
- Henna (120 personnes) : 300 pièces (2,5/personne)
- Walima (200 personnes) : 700 pièces (3,5/personne)
- **Total : ~1 060 pièces**, soit ~88 boîtes de 12. Budget indicatif : ~8 800 MAD.

## Variétés à panacher
Pour casser la monotonie, on conseille 3 farcis différents : cajou (le classique), pâte d'amande rose (pour la photo), ganache chocolat (les enfants adorent). En général : 50% cajou, 30% amande, 20% chocolat.

## Quand commander
Pour un mariage de plus de 500 pièces, commandez **3 semaines à l'avance**. On bloque le créneau et on livre en 2 fois (J-1 pour la henna, J+0 matin pour la walima). Sur WhatsApp : +212 620 35 53 25.

## Présentation
Trois options : boîte standard (la plus économique), boîte cadeau ruban (pour le cadeau d'invité), ou présentoir argenté loué (pour la table d'honneur). On vous conseille selon le budget et le style de votre négafa.`,
    related: ["idees-cadeaux-ramadan-2026-rabat", "conservation-dattes-farcies"],
    crossLinks: [
      { to: "/dattes-mariage-rabat", label: "Dattes pour mariage à Rabat" },
      { to: "/dattes-farcies-temara", label: "Dattes farcies à Témara" },
    ],
  },

  "cookies-maison-vs-industriels": {
    slug: "cookies-maison-vs-industriels",
    title: "Cookies maison vs industriels : ce qui change vraiment",
    metaTitle: "Cookies maison vs industriels : 6 différences (Rabat)",
    metaDesc:
      "Beurre, farine, chocolat, conservation : voici ce qui sépare un cookie maison d'un cookie industriel. Comparatif honnête, exemples Rabat.",
    excerpt:
      "Pourquoi un cookie maison à 35 MAD n'a rien à voir avec un cookie industriel à 8 MAD : ingrédients, cuisson, conservation, prix.",
    date: "2026-02-15",
    readingMinutes: 5,
    author: AUTHOR,
    category: "Conseils",
    keywords: ["cookies maison Rabat", "cookies artisanaux", "pâtisserie artisanale Maroc"],
    body: `On nous demande souvent pourquoi un cookie la Maison coûte 35 MAD alors qu'on en trouve à 8 MAD au supermarché. La réponse tient en 6 différences, qu'on assume entièrement.

## 1. Le beurre, pas la margarine
Industriel : graisse végétale hydrogénée, parfois huile de palme. Maison : beurre 82% de matière grasse, fondu pour développer les arômes. C'est ce qui donne le goût "fondant chaud" qu'on ne retrouve nulle part ailleurs.

## 2. Le chocolat, en pépites réelles
Industriel : pépites bas de gamme à 30% de cacao, ou pire, chips de "préparation chocolatée". Maison : chocolat noir 70% cassé à la main en morceaux irréguliers. Quand vous mordez, vous tombez sur un vrai morceau, pas une miette.

## 3. La cuisson, le jour J
Industriel : cuit 2 mois avant, sous-vide. Maison : enfourné le matin de la livraison. Croustillant dehors, fondant dedans. Au bout de 48h, c'est moins bien — c'est pour ça qu'on ne stocke pas.

## 4. La farine, pas de mix
Industriel : prémix avec sucre, levure, conservateurs, émulsifiants. Maison : farine T55, sucre roux, levure, sel. Cinq ingrédients, point.

## 5. Pas de conservateur
Un cookie maison se conserve 3-5 jours, point. Un cookie industriel tient 3 mois — c'est l'indicateur le plus fiable de la différence.

## 6. Le prix reflète le vrai coût
Le beurre à 82% coûte 4x une margarine. Le chocolat 70% coûte 3x un chocolat industriel. La cuisson le jour J demande du temps. À 35 MAD le cookie, on est à la marge artisanale honnête.

## Le test à faire chez vous
Posez un cookie maison et un cookie industriel côte à côte. Cassez les deux. Le maison va s'effriter en morceaux denses, l'industriel va se casser net comme un biscuit. Goûtez : le maison libère le beurre et le chocolat en bouche, l'industriel laisse une sensation grasse au palais.

## Commander
Cookies signature à Rabat & Témara, livraison 24h sur WhatsApp : +212 620 35 53 25.`,
    related: ["conservation-dattes-farcies", "cadeaux-corporate-fin-annee-rabat"],
    crossLinks: [
      { to: "/cookies-rabat", label: "Cookies à Rabat" },
      { to: "/cookies-agdal", label: "Cookies à Agdal" },
    ],
  },

  "cadeaux-corporate-fin-annee-rabat": {
    slug: "cadeaux-corporate-fin-annee-rabat",
    title: "Cadeaux corporate fin d'année : 7 idées originales à Rabat",
    metaTitle: "Cadeaux d'entreprise fin d'année à Rabat — 7 idées 2026",
    metaDesc:
      "Cadeaux corporate à Rabat : 7 idées de coffrets gourmands pour clients, équipes et partenaires. Personnalisation logo, livraison groupée 24h.",
    excerpt:
      "Au-delà de la clé USB et de la tasse logotée : 7 cadeaux corporate qui marquent vraiment, à offrir à Rabat en fin d'année.",
    date: "2026-02-22",
    readingMinutes: 6,
    author: AUTHOR,
    category: "Corporate",
    keywords: ["cadeau entreprise Rabat", "cadeau corporate Maroc", "coffret client fin année"],
    body: `Vous cherchez un cadeau de fin d'année pour vos clients, équipes ou partenaires à Rabat ? Les goodies génériques (tasse, agenda, clé USB) ne marquent plus personne. Voici 7 alternatives gourmandes qu'on prépare pour les entreprises de Rabat-Salé.

## 1. Le coffret client premium
Boîte de 24 dattes farcies + 12 cookies, présentation noire mat avec logo doré. Effet "haut de gamme" garanti pour vos top clients. À partir de 250 MAD/coffret, dégressif au volume.

## 2. Les boîtes équipe à partager
Une grande boîte de 50 pièces déposée en open-space le vendredi. Plus convivial qu'un cadeau individuel, moins cher au global, tout le monde y goûte.

## 3. Le mini-coffret welcome onboarding
Pour les nouveaux salariés : une petite boîte de 6 dattes + 3 cookies + carte de bienvenue. Format compact, posé sur le bureau le jour J.

## 4. Le coffret avec carte personnalisée
On imprime votre message manuscrit (ou typographié) sur une carte glissée dans le coffret. Effet "fait main" sans le travail de tout écrire.

## 5. Le calendrier de l'Avent gourmand
24 mini-pochons avec une douceur par jour, livré en novembre. Adapté pour les équipes ou les enfants des collaborateurs.

## 6. Le coffret événementiel (séminaire, lancement)
Pour vos évènements à Rabat (séminaire, lancement produit, AG) : on prépare 30 à 300 coffrets identiques, livrés sur place le matin J.

## 7. Le bon cadeau "à choisir"
Vous offrez un bon d'achat la Maison à votre client : il commande lui-même la quantité et le format qu'il veut. Pratique quand on ne connaît pas les goûts.

## Personnalisation logo
On colle un sticker logo sur la boîte (logo fourni en PNG transparent). Pour 50 coffrets et plus : impression directe sur ruban personnalisé.

## Délais
Commandez **2 semaines à l'avance** pour les volumes > 50 coffrets. Livraison groupée sur un site Rabat ou Témara, ou éclatée sur plusieurs adresses (frais supplémentaires).

Devis sur WhatsApp : +212 620 35 53 25.`,
    related: ["idees-cadeaux-ramadan-2026-rabat", "cookies-maison-vs-industriels"],
    crossLinks: [
      { to: "/coffrets-cadeaux-corporate-rabat", label: "Coffrets corporate Rabat" },
      { to: "/cookies-hay-riad", label: "Cookies à Hay Riad" },
    ],
  },

  "conservation-dattes-farcies": {
    slug: "conservation-dattes-farcies",
    title: "Conservation des dattes farcies : guide complet",
    metaTitle: "Conservation dattes farcies : durée, température, congélation",
    metaDesc:
      "Combien de temps se gardent les dattes farcies ? Frigo, ambiante, congélateur : guide complet pour préserver fraîcheur et texture.",
    excerpt:
      "Frigo ou ambiante ? Congélation possible ? Voici comment garder vos dattes farcies fraîches sans altérer le goût.",
    date: "2026-03-01",
    readingMinutes: 4,
    author: AUTHOR,
    category: "Conservation",
    keywords: ["conservation dattes farcies", "dattes au frigo", "congeler dattes"],
    body: `Vous venez de recevoir un coffret de dattes farcies et vous vous demandez comment les conserver sans qu'elles dessèchent ni ramollissent ? Voici le guide qu'on remet à toutes nos clientes.

## À température ambiante
Dans leur boîte fermée, à l'abri de la lumière directe et de la chaleur, les dattes farcies se gardent **7 à 10 jours**. C'est l'idéal pour le goût et la texture — le farci reste crémeux, la datte reste moelleuse.

## Au réfrigérateur
Au frigo dans une boîte hermétique, elles tiennent **3 semaines**. Petit conseil : sortez-les **30 minutes avant** de les servir. Froides, elles perdent en aromatique et le farci durcit.

## Au congélateur
Oui, c'est possible. Emballez par 6 dans du film alimentaire + sac congélation. Tenue : **3 mois**. Décongélation : 4h au frigo puis 30 min à température ambiante. La texture reste excellente, le farci est intact.

## Les erreurs à éviter
- Les laisser à côté du four ou en plein soleil : le sucre fond, le farci coule.
- Les mettre au frigo sans boîte fermée : elles prennent les odeurs.
- Les empiler les unes sur les autres sans séparateur : elles collent et perdent leur forme.

## Signes que ce n'est plus bon
- Croûte cristallisée à la surface (sucre qui ressort) : encore comestible mais texture altérée.
- Odeur fermentée : à jeter.
- Moisissure visible (très rare) : à jeter.

## Notre conseil
Achetez la quantité juste, mangez dans les 10 jours. Pour un mariage ou un évènement, commandez J-1 et conservez à température ambiante — pas besoin de frigo. WhatsApp : +212 620 35 53 25.`,
    related: ["combien-dattes-mariage-marocain", "idees-cadeaux-ramadan-2026-rabat"],
    crossLinks: [
      { to: "/dattes-farcies-temara", label: "Dattes farcies à Témara" },
      { to: "/dattes-mariage-rabat", label: "Dattes pour mariage à Rabat" },
    ],
  },
};

export const POSTS_LIST: Post[] = Object.values(POSTS).sort(
  (a, b) => +new Date(b.date) - +new Date(a.date),
);
