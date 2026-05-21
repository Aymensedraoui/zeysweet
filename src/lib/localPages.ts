import coffretsCorporateImg from "@/assets/local/coffrets-corporate.jpg";

export type FAQ = { q: string; a: string };
export type Section = { title: string; body: string; bullets?: string[] };

export type LocalPage = {
  slug: string;
  city: "Rabat" | "Témara";
  metaTitle: string;
  metaDesc: string;
  h1: string;
  kicker: string;
  intro: string;
  zones: string[];
  product: { name: string; price: string; priceValue: string };
  heroImage?: string;
  ogImage?: string;
  sections: Section[];
  faqs: FAQ[];
  crossLinks: { to: string; label: string }[];
};

export const LOCAL_PAGES: Record<string, LocalPage> = {
  "cookies-rabat": {
    slug: "cookies-rabat",
    city: "Rabat",
    metaTitle: "Cookies maison à Rabat | Maison de douceurs — Livraison 24h",
    metaDesc:
      "Cookies Signature chocolat noir & noix de pécan, faits main à Rabat. Livraison Agdal, Hassan, Hay Riad, Souissi. Commande WhatsApp.",
    h1: "Cookies maison à Rabat — Livraison 24h",
    kicker: "Pâtisserie artisanale · Rabat",
    intro:
      "Vous cherchez des cookies maison à Rabat ? Maison de douceurs, c'est une maison de douceurs artisanale qui prépare chaque cookie à la main, en petite série, dans sa cuisine de Rabat. Chocolat noir 70%, noix de pécan grillées, beurre fondu — pas de mix industriel, pas de conservateur, juste la recette qu'on a peaufinée pendant des mois. Commande sur WhatsApp et livraison sous 24h chez vous.",
    zones: ["Agdal", "Hassan", "Hay Riad", "Souissi", "L'Océan", "Yacoub El Mansour", "Centre-ville", "Aviation"],
    product: { name: "Cookie Signature", price: "35 MAD / pièce", priceValue: "35" },
    sections: [
      {
        title: "Pourquoi nos cookies sont différents",
        body:
          "On a goûté tous les cookies de Rabat avant de se lancer. La majorité sont trop sucrés, trop secs, ou cuits à l'avance. Nos cookies sortent du four le jour de la livraison, croustillants sur les bords, fondants au cœur, avec de vrais morceaux de chocolat noir Valrhona et de la noix de pécan grillée maison.",
        bullets: [
          "Chocolat noir 70% Valrhona en gros morceaux",
          "Noix de pécan grillées à la commande",
          "Beurre AOP, farine T55, sucre muscovado",
          "Cuits le jour J — jamais la veille",
          "0 conservateur, 0 colorant",
        ],
      },
      {
        title: "Zones de livraison à Rabat",
        body:
          "On livre gratuitement dans tout Rabat. Les principaux quartiers desservis : Agdal, Hassan, Hay Riad, Souissi, L'Océan, Yacoub El Mansour, Aviation, Centre-ville. Si votre quartier n'est pas listé, demandez-nous sur WhatsApp — on s'arrange presque toujours.",
      },
      {
        title: "Prix et formats",
        body:
          "À l'unité : 35 MAD. Pack de 6 : 195 MAD. Pack de 12 : 375 MAD. Pour les commandes corporate (entreprises, événements, mariages à Rabat), on prépare des plateaux personnalisés à partir de 500 MAD avec ruban et carte.",
      },
      {
        title: "Comment commander",
        body:
          "1. Vous nous écrivez sur WhatsApp au +212 620 35 53 25 avec votre commande et votre quartier à Rabat. 2. On confirme le créneau de livraison (généralement le lendemain entre 11h et 19h). 3. Paiement cash à la livraison. C'est tout.",
      },
    ],
    faqs: [
      {
        q: "Quel est le délai de livraison à Rabat ?",
        a: "24h après confirmation sur WhatsApp. Commandez aujourd'hui avant 18h, vous recevez demain. Pour une commande urgente le jour même, contactez-nous tôt le matin.",
      },
      {
        q: "La livraison est-elle gratuite dans tout Rabat ?",
        a: "Oui, livraison gratuite à Agdal, Hassan, Hay Riad, Souissi, L'Océan, Yacoub El Mansour et Centre-ville Rabat. Pour Salé, +30 MAD.",
      },
      {
        q: "Quel est le mode de paiement ?",
        a: "Cash à la livraison pour les particuliers à Rabat. Virement bancaire possible pour les commandes corporate au-delà de 500 MAD.",
      },
      {
        q: "Combien de temps les cookies se conservent-ils ?",
        a: "5 jours dans une boîte hermétique à température ambiante. Réchauffez 8 secondes au micro-ondes pour retrouver le fondant du jour J.",
      },
    ],
    crossLinks: [
      { to: "/cookies-agdal", label: "Cookies à Agdal →" },
      { to: "/cookies-hay-riad", label: "Cookies à Hay Riad →" },
      { to: "/dattes-farcies-temara", label: "Dattes farcies à Témara →" },
    ],
  },

  "cookies-agdal": {
    slug: "cookies-agdal",
    city: "Rabat",
    metaTitle: "Cookies maison Agdal Rabat | Maison de douceurs — Livraison gratuite",
    metaDesc:
      "Cookies artisanaux chocolat noir & noix de pécan livrés gratuitement à Agdal Rabat. Faits main, sous 24h. Commande WhatsApp.",
    h1: "Cookies maison à Agdal — Livraison gratuite",
    kicker: "Quartier Agdal · Rabat",
    intro:
      "Agdal, c'est notre quartier préféré pour livrer. Avenue de France, rue Oqba, place Abraham Lincoln, résidences Atlas, Riad — partout entre l'avenue Ibn Sina et l'avenue Fal Ould Oumeir, on livre gratuitement sous 24h. Cookies cuits le matin même, fondants au cœur, chocolat noir 70% et noix de pécan grillée.",
    zones: ["Avenue de France", "Rue Oqba", "Place Abraham Lincoln", "Résidence Atlas", "Riad", "Rue Tansift", "Avenue Fal Ould Oumeir"],
    product: { name: "Cookie Signature", price: "35 MAD / pièce", priceValue: "35" },
    sections: [
      {
        title: "Pourquoi commander chez nous à Agdal",
        body:
          "Agdal regorge de cafés et de pâtisseries, mais peu proposent du vrai fait-maison livré chaud. Nos cookies sortent du four au moment de la livraison — pas de cookies de 3 jours réchauffés. Idéal pour un goûter entre collègues à l'avenue de France, un cadeau de remerciement à un voisin, ou simplement un dimanche cocooning.",
        bullets: [
          "Livraison gratuite tout Agdal",
          "Cuits à la commande — jamais à l'avance",
          "Chocolat noir Valrhona 70% + pécan grillée",
          "Créneau sur RDV (vous êtes là, on sonne)",
          "Cash à la livraison ou virement",
        ],
      },
      {
        title: "Idées d'occasions",
        body:
          "Un petit-déjeuner cabinet médical, un anniversaire surprise à la résidence Atlas, un goûter d'enfants à l'école Paul-Cézanne, un cadeau client à votre agence avenue de France. Pour les commandes au-delà de 12 cookies, on personnalise la boîte avec ruban et carte.",
      },
      {
        title: "Délai et créneaux à Agdal",
        body:
          "Confirmation WhatsApp, livraison J+1 entre 11h et 19h. Pour les commandes du matin (avant 9h), c'est possible avec 48h d'avance. On vous prévient 30 minutes avant l'arrivée pour que vous soyez chez vous ou en bas de la résidence.",
      },
    ],
    faqs: [
      {
        q: "Vous livrez vraiment gratuitement partout à Agdal ?",
        a: "Oui, de l'avenue de France jusqu'à l'avenue Atlas, en passant par Tansift, Oqba et toutes les résidences entre Ibn Sina et Fal Ould Oumeir. Pas de minimum de commande pour la livraison gratuite à Agdal.",
      },
      {
        q: "Combien de temps avant je dois commander ?",
        a: "24h avant idéalement. Pour une commande de moins de 6 cookies, on peut parfois faire le jour même si vous nous écrivez tôt le matin.",
      },
      {
        q: "Vous livrez aux résidences avec gardien ?",
        a: "Oui, on dépose au gardien si vous nous prévenez, ou on monte directement chez vous. Précisez l'étage et le n° d'appartement dans le message WhatsApp.",
      },
    ],
    crossLinks: [
      { to: "/cookies-hay-riad", label: "Cookies à Hay Riad →" },
      { to: "/cookies-rabat", label: "Cookies à Rabat (tous quartiers) →" },
    ],
  },

  "cookies-hay-riad": {
    slug: "cookies-hay-riad",
    city: "Rabat",
    metaTitle: "Cookies maison Hay Riad | Maison de douceurs — Livraison Rabat",
    metaDesc:
      "Cookies premium chocolat noir & noix de pécan, livrés à Hay Riad Rabat. Faits main, ingrédients haut de gamme. Cadeaux et coffrets sur mesure.",
    h1: "Cookies premium à Hay Riad — Livraison 24h",
    kicker: "Quartier Hay Riad · Rabat",
    intro:
      "Hay Riad mérite des cookies à la hauteur. Beurre AOP, chocolat Valrhona, noix de pécan grillée maison, cuisson minute. On livre gratuitement à Hay Riad, du Mall jusqu'à l'Imam Malik, en passant par les résidences le long de l'avenue Annakhil et de Mehdi Ben Barka.",
    zones: ["Avenue Annakhil", "Avenue Mehdi Ben Barka", "Imam Malik", "Riad Sunrise", "Le Triangle", "Résidences golf", "Arribat Center"],
    product: { name: "Cookie Signature", price: "35 MAD / pièce", priceValue: "35" },
    sections: [
      {
        title: "Des cookies pensés pour les gourmets de Hay Riad",
        body:
          "Vous avez accès à tout à Hay Riad : Paul, Magnolia, Arribat… mais pas à du vrai cookie maison cuit le jour J. C'est exactement notre proposition : des cookies épais, fondants à cœur, avec des ingrédients qu'on assume de citer. Chocolat noir Valrhona 70%, beurre AOP français, sucre muscovado, farine T55, sel de Guérande.",
        bullets: [
          "Livraison gratuite tout Hay Riad",
          "Coffrets cadeaux disponibles (ruban, carte, message)",
          "Packs de 6, 12, 24 ou plateau corporate",
          "Possibilité de personnaliser pour entreprises (logo sur étiquette)",
          "Conservation 5 jours dans la boîte hermétique fournie",
        ],
      },
      {
        title: "Idéal pour cadeaux et événements à Hay Riad",
        body:
          "Cadeau de bienvenue invité, retour d'hôpital, anniversaire surprise, remerciement pour une associée, accueil de tournoi de golf. Pour les commandes corporate à Arribat Center ou aux tours administratives, on prépare des plateaux de 30 à 200 pièces.",
      },
      {
        title: "Livraison à Hay Riad",
        body:
          "On livre du lundi au samedi, créneau au choix entre 11h et 19h. Si vous travaillez et préférez la livraison au bureau, dites-le, on adapte. Paiement cash à la livraison, ou virement pour les commandes au-delà de 500 MAD.",
      },
    ],
    faqs: [
      {
        q: "Vous proposez des coffrets cadeau ?",
        a: "Oui : boîte kraft premium, ruban beige, carte avec message manuscrit. À partir de 6 cookies. Pour les coffrets corporate (avec logo), à partir de 30 boîtes.",
      },
      {
        q: "Vous livrez au bureau ou uniquement à domicile ?",
        a: "Les deux. Précisez juste l'adresse exacte et le créneau dans le message WhatsApp. Pour Arribat Center et les tours, on monte à l'étage.",
      },
      {
        q: "Vous faites des commandes pour mariage ou événement ?",
        a: "Oui, à partir de 50 cookies. Comptez 48 à 72h d'avance. Pour les mariages à Hay Riad ou aux Jardins de l'Agdal, on peut aussi combiner avec nos dattes farcies aux cajou.",
      },
    ],
    crossLinks: [
      { to: "/coffrets-cadeaux-corporate-rabat", label: "Coffrets corporate à Rabat →" },
      { to: "/dattes-mariage-rabat", label: "Dattes farcies pour mariage →" },
      { to: "/cookies-rabat", label: "Cookies à Rabat (tous quartiers) →" },
    ],
  },

  "dattes-mariage-rabat": {
    slug: "dattes-mariage-rabat",
    city: "Rabat",
    metaTitle: "Dattes farcies mariage Rabat | Maison de douceurs — Plateaux sur mesure",
    metaDesc:
      "Dattes Medjool fourrées cajou pour mariage, baby shower et événement à Rabat. Plateaux de 50 à 500 pièces, ruban personnalisé. Devis WhatsApp.",
    h1: "Dattes farcies pour mariage à Rabat — Plateaux sur mesure",
    kicker: "Mariages & événements · Rabat",
    intro:
      "Pour un mariage à Rabat, les dattes farcies sont l'un des desserts les plus appréciés — moelleuses, élégantes, faciles à servir, et symboliquement parfaites. Maison de douceurs prépare des plateaux sur mesure de 50 à 500 pièces, avec des dattes Medjool calibre Jumbo et une pâte de noix de cajou faite minute. Personnalisation ruban et étiquette.",
    zones: ["Rabat", "Salé", "Témara", "Skhirat", "Bouznika", "Mehdia"],
    product: { name: "Plateau Dattes Farcies — 100 pièces", price: "850 MAD", priceValue: "850" },
    sections: [
      {
        title: "Pourquoi nos dattes pour votre mariage",
        body:
          "On a livré dattes pour mariages à Rabat, Salé et Témara, et on a appris une chose : les invitées remarquent immédiatement la différence entre une vraie pâte de cajou maison et un fourrage industriel. Notre pâte est broyée le jour J, jamais avant. Nos dattes Medjool sont sélectionnées calibre Jumbo. Le résultat : moelleux, croquant, parfumé fleur d'oranger.",
        bullets: [
          "Dattes Medjool calibre Jumbo, sélection main",
          "Pâte de noix de cajou broyée le jour J",
          "Miel toutes-fleurs marocain + fleur d'oranger",
          "Plateaux dorés, doublure tissu, ruban à votre couleur",
          "Livraison J-1 ou jour J selon le format",
        ],
      },
      {
        title: "Combien de pièces pour mon mariage ?",
        body:
          "Règle simple : 8 à 12 pièces par invité si les dattes sont l'un des desserts principaux ; 4 à 6 si elles accompagnent une pièce montée. Pour 100 invités, on recommande 800 à 1000 pièces. Pour 300 invités, 2500 pièces — à commander 7 jours à l'avance pour ce volume.",
      },
      {
        title: "Personnalisation et présentation",
        body:
          "Ruban à votre couleur (beige, ivoire, rose poudré, doré). Étiquette imprimée avec vos initiales ou la date du mariage. Plateaux dorés ou argentés selon votre décor. Pour les baby showers, possibilité de mettre des rubans roses ou bleus, et même de mixer 2 garnitures (cajou + amande).",
      },
      {
        title: "Délais et logistique mariage",
        body:
          "Pour les volumes mariage (>200 pièces), on demande 7 jours d'avance. Pour les volumes moyens (50-200 pièces) : 72h suffisent. Livraison à la salle des fêtes, au domicile familial, ou au traiteur — on coordonne avec votre wedding planner si vous en avez un.",
      },
    ],
    faqs: [
      {
        q: "Vous livrez le jour du mariage à la salle ?",
        a: "Oui. On coordonne avec votre traiteur ou wedding planner. Livraison entre 14h et 18h selon l'heure du dîner. Pour des mariages le samedi, on peut aussi livrer le vendredi soir au domicile familial.",
      },
      {
        q: "Quel est le délai minimum pour 500 pièces ?",
        a: "7 jours d'avance. Au-delà de 1000 pièces, 10 jours. On préfère préparer en plusieurs sessions pour garder une qualité constante.",
      },
      {
        q: "Quel est le prix par pièce pour un grand volume ?",
        a: "Tarif dégressif. À partir de 200 pièces : 8 MAD/pièce. À partir de 500 pièces : 7 MAD/pièce. Devis précis sur WhatsApp avec date du mariage et nombre d'invités.",
      },
      {
        q: "Vous proposez d'autres garnitures que la cajou ?",
        a: "Notre signature reste cajou. Sur demande pour les grands événements, on peut ajouter amande, pistache ou pâte de noix. À voir ensemble sur WhatsApp.",
      },
    ],
    crossLinks: [
      { to: "/dattes-farcies-temara", label: "Dattes farcies à Témara →" },
      { to: "/coffrets-cadeaux-corporate-rabat", label: "Coffrets corporate à Rabat →" },
    ],
  },

  "coffrets-cadeaux-corporate-rabat": {
    slug: "coffrets-cadeaux-corporate-rabat",
    city: "Rabat",
    metaTitle: "Coffrets cadeaux entreprise Rabat | Maison de douceurs — Personnalisés",
    metaDesc:
      "Coffrets cadeaux corporate à Rabat : cookies et dattes farcies aux cajou, étiquette avec logo, ruban personnalisé. À partir de 30 boîtes. Devis WhatsApp.",
    h1: "Coffrets cadeaux corporate à Rabat — Personnalisés à votre logo",
    kicker: "B2B · Rabat & Témara",
    intro:
      "Pour vos cadeaux clients, fin d'année, séminaires, lancements produits ou onboarding, on prépare des coffrets corporate à votre image. Cookies Signature, Dattes Farcies aux cajou, ou mix des deux. Étiquette avec votre logo, ruban à votre couleur, livraison groupée à Rabat ou éclatée à plusieurs adresses.",
    zones: ["Rabat", "Témara", "Hay Riad (zone affaires)", "Agdal", "Centre administratif", "Salé"],
    product: { name: "Coffret Mixte Corporate", price: "À partir de 95 MAD/boîte", priceValue: "95" },
    sections: [
      {
        title: "Pourquoi un coffret artisanal plutôt qu'industriel ?",
        body:
          "Un cadeau client qui se mange, c'est un cadeau qu'on remarque. Encore faut-il qu'il soit bon. Beaucoup de cadeaux corporate finissent à la poubelle parce qu'ils sont trop sucrés, industriels ou attendus. Nos coffrets se démarquent immédiatement : packaging premium, vrais ingrédients, message manuscrit possible. Vos clients s'en souviennent.",
        bullets: [
          "Étiquette imprimée avec votre logo (à partir de 30 boîtes)",
          "Ruban à votre couleur (15 teintes au choix)",
          "Carte de vœux avec message personnalisé",
          "Livraison groupée OU éclatée multi-adresses",
          "Facture entreprise + virement bancaire",
        ],
      },
      {
        title: "Formats et tarifs",
        body:
          "Coffret Cookies (6 pièces) : 95 MAD/boîte. Coffret Dattes (12 pièces) : 120 MAD/boîte. Coffret Mixte (3 cookies + 6 dattes) : 130 MAD/boîte. Coffret Prestige (12 cookies + 12 dattes, boîte luxe) : 280 MAD/boîte. Tarif dégressif au-delà de 100 boîtes.",
      },
      {
        title: "Personnalisation",
        body:
          "Vous nous envoyez votre logo (PNG, fond transparent), on prépare une maquette d'étiquette pour validation. Pour les fêtes (Aïd, fin d'année, Ramadan), on prévoit la livraison 48-72h avant la date clé. Pour les séminaires, livraison à votre salle ou hôtel.",
      },
      {
        title: "Occasions corporate fréquentes",
        body:
          "Fin d'année (décembre), Aïd El-Fitr et Aïd El-Adha, fête de l'entreprise, lancement produit, onboarding nouveaux collaborateurs, remerciement post-projet, cadeau partenaires VIP, mariage d'un client important. Nos clients récurrents sont des cabinets de conseil, banques, agences, cliniques privées et fondations à Rabat.",
      },
    ],
    faqs: [
      {
        q: "Quel est le minimum de commande pour la personnalisation ?",
        a: "30 boîtes pour l'étiquette avec logo. En dessous, on personnalise le ruban et la carte, mais pas l'étiquette imprimée.",
      },
      {
        q: "Vous facturez à l'entreprise avec TVA ?",
        a: "Oui, facture régulière avec n° d'ICE. Paiement par virement bancaire. Le RIB est envoyé sur WhatsApp avec le devis.",
      },
      {
        q: "Vous pouvez livrer à 50 adresses différentes ?",
        a: "Oui, à Rabat et Témara. Vous nous envoyez la liste (Excel ou Google Sheet) avec nom, adresse, téléphone. Frais de livraison éclatée : 25 MAD par adresse au-delà de 10.",
      },
      {
        q: "Combien de temps avant je dois commander ?",
        a: "Pour 50 boîtes ou moins : 5 jours. Pour 100+ boîtes : 10 jours. Pour les périodes chargées (Aïd, fin d'année), commandez 3 semaines à l'avance pour garantir la date.",
      },
    ],
    crossLinks: [
      { to: "/cookies-hay-riad", label: "Cookies à Hay Riad →" },
      { to: "/dattes-mariage-rabat", label: "Dattes pour mariage Rabat →" },
    ],
    heroImage: coffretsCorporateImg,
    ogImage: coffretsCorporateImg,
  },

  "dattes-farcies-temara": {
    slug: "dattes-farcies-temara",
    city: "Témara",
    metaTitle: "Dattes farcies à Témara | Maison de douceurs — Cajou & Miel",
    metaDesc:
      "Dattes fourrées aux noix de cajou, faites main. Livraison Témara, Harhoura, Skhirat. Idéal mariage, Ramadan, cadeau corporate. Commande WhatsApp.",
    h1: "Dattes farcies aux cajou à Témara — Livraison 24h",
    kicker: "Confiserie artisanale · Témara",
    intro:
      "Vous cherchez des dattes farcies à Témara pour un mariage, Ramadan, l'Aïd, ou un cadeau corporate ? Maison de douceurs prépare ses dattes fourrées aux noix de cajou à la main, une par une, dans sa cuisine au Maroc. Dattes Medjool moelleuses, pâte de cajou maison, finition miel et fleur d'oranger. Livraison gratuite à Témara, Harhoura et Skhirat sous 24h.",
    zones: ["Témara centre", "Harhoura", "Skhirat", "Plage des Nations", "Sablette", "Ain Atiq", "Massira"],
    product: { name: "Dattes Farcies aux Cajou — Boîte de 12", price: "120 MAD", priceValue: "120" },
    sections: [
      {
        title: "Nos dattes farcies, fabrication maison",
        body:
          "On choisit des dattes Medjool calibre Jumbo, on les dénoyaute à la main, on les farcit d'une pâte de noix de cajou grillée et broyée minute (pas d'arôme, pas d'huile de palme), et on les enrobe d'un voile de miel toutes-fleurs avec une pointe de fleur d'oranger. Le résultat : moelleux, croquant, parfumé — rien à voir avec les dattes farcies industrielles qu'on trouve en grande surface.",
        bullets: [
          "Dattes Medjool calibre Jumbo",
          "Pâte de noix de cajou maison, broyée le jour J",
          "Miel toutes-fleurs marocain + fleur d'oranger",
          "Boîte cadeau avec ruban, prête à offrir",
          "0 conservateur, 0 sucre ajouté",
        ],
      },
      {
        title: "Zones de livraison à Témara et alentours",
        body:
          "Livraison à Témara centre, Harhoura, Skhirat, Plage des Nations, Sablette, Ain Atiq et Massira. Pour Rabat également gratuit. Hors zone : on chiffre sur WhatsApp.",
      },
      {
        title: "Pour quelles occasions ?",
        body:
          "Nos dattes farcies sont la signature pour : mariages (comptez 8 à 12 pièces par invité au dessert), baby showers, Ramadan et f'tour, Aïd El-Fitr, cadeaux corporate fin d'année, retours de pèlerinage. On personnalise la boîte avec votre logo ou un message à partir de 30 boîtes.",
      },
      {
        title: "Conservation et présentation",
        body:
          "Les dattes farcies se conservent 7 jours à température ambiante dans la boîte fermée, ou 15 jours au frais. Chaque boîte de 12 arrive avec ruban beige et carte de dégustation. Pour les mariages, on propose des plateaux de 50, 100 ou 200 pièces.",
      },
    ],
    faqs: [
      {
        q: "Combien de dattes farcies par personne pour un mariage à Témara ?",
        a: "Comptez 8 à 12 pièces par invité si elles font partie du buffet dessert, 4 à 6 si elles accompagnent une pièce montée. Pour 100 invités, on recommande 1000 pièces.",
      },
      {
        q: "Quel est le délai de livraison à Témara ?",
        a: "24h après confirmation sur WhatsApp. Pour les grosses commandes (>200 pièces) ou mariages, prévoyez 48 à 72h.",
      },
      {
        q: "Peut-on personnaliser la boîte cadeau ?",
        a: "Oui, à partir de 30 boîtes : ruban à votre couleur, étiquette ou carte avec message. À partir de 100 boîtes : étiquette imprimée avec logo entreprise pour les cadeaux corporate.",
      },
      {
        q: "Combien de temps se conservent les dattes farcies ?",
        a: "7 jours à température ambiante dans la boîte fermée, 15 jours au réfrigérateur. À sortir 20 minutes avant dégustation pour retrouver le moelleux.",
      },
    ],
    crossLinks: [
      { to: "/dattes-mariage-rabat", label: "Dattes farcies pour mariage Rabat →" },
      { to: "/cookies-rabat", label: "Cookies maison à Rabat →" },
    ],
  },
};
