import { Helmet } from "react-helmet-async";
import { Link, useLocation, Navigate } from "react-router-dom";
import { MapPin, Clock, MessageCircle, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import { buildWhatsAppLink } from "@/lib/store";

type FAQ = { q: string; a: string };
type Section = { title: string; body: string; bullets?: string[] };

type LocalPage = {
  slug: string;
  city: "Rabat" | "Témara";
  metaTitle: string;
  metaDesc: string;
  h1: string;
  kicker: string;
  intro: string;
  zones: string[];
  product: { name: string; price: string; image?: string };
  sections: Section[];
  faqs: FAQ[];
  crossLink: { to: string; label: string };
};

const PAGES: Record<string, LocalPage> = {
  "cookies-rabat": {
    slug: "cookies-rabat",
    city: "Rabat",
    metaTitle: "Cookies maison à Rabat | Zey's Sweetness — Livraison 24h",
    metaDesc:
      "Cookies Signature chocolat noir & noix de pécan, faits main à Rabat. Livraison Agdal, Hassan, Hay Riad, Souissi. Commande WhatsApp.",
    h1: "Cookies maison à Rabat — Livraison 24h",
    kicker: "Pâtisserie artisanale · Rabat",
    intro:
      "Vous cherchez des cookies maison à Rabat ? Zey's Sweetness, c'est une maison de douceurs artisanale qui prépare chaque cookie à la main, en petite série, dans sa cuisine de Rabat. Chocolat noir 70%, noix de pécan grillées, beurre fondu — pas de mix industriel, pas de conservateur, juste la recette qu'on a peaufinée pendant des mois. Commande sur WhatsApp et livraison sous 24h chez vous.",
    zones: ["Agdal", "Hassan", "Hay Riad", "Souissi", "L'Océan", "Yacoub El Mansour", "Centre-ville", "Aviation"],
    product: { name: "Cookie Signature", price: "35 MAD / pièce" },
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
    crossLink: { to: "/dattes-farcies-temara", label: "Voir aussi : Dattes farcies à Témara →" },
  },
  "dattes-farcies-temara": {
    slug: "dattes-farcies-temara",
    city: "Témara",
    metaTitle: "Dattes farcies à Témara | Zey's Sweetness — Cajou & Miel",
    metaDesc:
      "Dattes fourrées aux noix de cajou, faites main. Livraison Témara, Harhoura, Skhirat. Idéal mariage, Ramadan, cadeau corporate. Commande WhatsApp.",
    h1: "Dattes farcies aux cajou à Témara — Livraison 24h",
    kicker: "Confiserie artisanale · Témara",
    intro:
      "Vous cherchez des dattes farcies à Témara pour un mariage, Ramadan, l'Aïd, ou un cadeau corporate ? Zey's Sweetness prépare ses dattes fourrées aux noix de cajou à la main, une par une, dans sa cuisine au Maroc. Dattes Medjool moelleuses, pâte de cajou maison, finition miel et fleur d'oranger. Livraison gratuite à Témara, Harhoura et Skhirat sous 24h.",
    zones: ["Témara centre", "Harhoura", "Skhirat", "Plage des Nations", "Sablette", "Ain Atiq", "Massira"],
    product: { name: "Dattes Farcies aux Cajou — Boîte de 12", price: "120 MAD" },
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
    crossLink: { to: "/cookies-rabat", label: "Voir aussi : Cookies maison à Rabat →" },
  },
};

const ORG_NAME = "Zey's Sweetness";
const PHONE = "+212620355325";
const BASE = "https://zeysweet.com";

function buildJsonLd(p: LocalPage) {
  const url = `${BASE}/${p.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: ORG_NAME,
      image: `${BASE}/og-image.jpg`,
      url,
      telephone: PHONE,
      priceRange: "MAD",
      address: {
        "@type": "PostalAddress",
        addressLocality: p.city,
        addressCountry: "MA",
      },
      areaServed: p.zones.map((z) => ({ "@type": "Place", name: z })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.product.name,
      description: p.intro,
      brand: { "@type": "Brand", name: ORG_NAME },
      image: `${BASE}/og-image.jpg`,
      offers: {
        "@type": "Offer",
        priceCurrency: "MAD",
        price: p.product.priceValue,
        availability: "https://schema.org/InStock",
        url,
        seller: { "@type": "Organization", name: ORG_NAME },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "47",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: BASE + "/" },
        { "@type": "ListItem", position: 2, name: p.h1, item: url },
      ],
    },
  ];
}

export default function LocalLanding() {
  const { pathname } = useLocation();
  const slug = pathname.replace(/^\/+/, "").replace(/\/$/, "");
  const page = PAGES[slug];
  if (!page) return <Navigate to="/404" replace />;

  const waLink = buildWhatsAppLink([], "", "fr");
  const jsonLd = buildJsonLd(page);
  const url = `${BASE}/${page.slug}`;

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDesc} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDesc} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        {jsonLd.map((j, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(j)}</script>
        ))}
      </Helmet>

      <ScrollProgress />
      <Navbar />

      <main className="pt-[72px]">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <nav className="text-xs text-cocoa/60 mb-6" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-rose">Accueil</Link>
            <span className="mx-2">/</span>
            <span>{page.city}</span>
          </nav>
          <p className="font-hand text-2xl text-rose mb-3">{page.kicker}</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-cocoa max-w-3xl leading-tight">
            {page.h1}
          </h1>
          <p className="mt-6 text-lg text-cocoa/80 max-w-2xl">{page.intro}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-rose btn-glow inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Commander sur WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-cocoa/20 text-cocoa hover:bg-cocoa/5 font-semibold">
              Appeler {PHONE}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-cocoa/70">
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-rose" /> Livraison {page.city}</span>
            <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4 text-rose" /> Sous 24h</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="w-4 h-4 text-rose" /> Fait main</span>
          </div>
        </section>

        {/* Sections */}
        <section className="container mx-auto px-4 pb-16 space-y-16">
          {page.sections.map((s, i) => (
            <article key={i} className="max-w-3xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cocoa mb-4">{s.title}</h2>
              <p className="text-cocoa/80 leading-relaxed">{s.body}</p>
              {s.bullets && (
                <ul className="mt-5 space-y-2">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-cocoa/80">
                      <Check className="w-5 h-5 text-rose mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {/* Zones chips */}
          <article className="max-w-3xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-cocoa mb-4">Quartiers livrés à {page.city}</h2>
            <div className="flex flex-wrap gap-2">
              {page.zones.map((z) => (
                <span key={z} className="px-4 py-2 rounded-full bg-cream border border-cocoa/10 text-sm text-cocoa">{z}</span>
              ))}
            </div>
          </article>
        </section>

        {/* FAQ */}
        <section className="bg-cream/60 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-cocoa mb-10">Questions fréquentes</h2>
            <div className="space-y-6">
              {page.faqs.map((f, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 shadow-sm border border-cocoa/5">
                  <h3 className="font-display text-lg font-semibold text-cocoa mb-2">{f.q}</h3>
                  <p className="text-cocoa/75">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA + cross link */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cocoa mb-4">Prêt à commander à {page.city} ?</h2>
          <p className="text-cocoa/70 mb-8 max-w-xl mx-auto">Réponse sur WhatsApp en moins d'une heure. Livraison 24h, paiement cash.</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-rose btn-glow inline-flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Commander maintenant
          </a>
          <div className="mt-12">
            <Link to={page.crossLink.to} className="text-rose hover:text-cocoa font-medium underline underline-offset-4">
              {page.crossLink.label}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
