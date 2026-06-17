import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Story from "@/components/Story";
import Cinematic from "@/components/Cinematic";
import Gifts from "@/components/Gifts";
import HowToOrder from "@/components/HowToOrder";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
import CinematicLoader from "@/components/CinematicLoader";
import ScrollCinematic from "@/components/ScrollCinematic";
import SectionDivider from "@/components/SectionDivider";
import scroll1 from "@/assets/scroll-1-chocolate.mp4.asset.json";
import scroll2 from "@/assets/scroll-2-dates.mp4.asset.json";
import scroll3 from "@/assets/scroll-3-gift.mp4.asset.json";
import dividerCaramel from "@/assets/divider-caramel.mp4.asset.json";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useStore } from "@/lib/store";
import { useReveal } from "@/hooks/useReveal";

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Où commander des cookies maison à Rabat ?",
      acceptedAnswer: { "@type": "Answer", text: "Zey's Sweetness livre ses Cookies Signature et Dattes Farcies aux noix de cajou à Rabat et Témara, sous 24h. Commandez sur WhatsApp au +212 620 35 53 25." },
    },
    {
      "@type": "Question",
      name: "Quels sont les délais de livraison à Rabat et Témara ?",
      acceptedAnswer: { "@type": "Answer", text: "Livraison à Rabat (Agdal, Hassan, Hay Riad, Souissi, L'Océan) et Témara (Harhoura, Skhirat) sous 24h après confirmation sur WhatsApp. Commandez aujourd'hui avant 18h, recevez demain entre 11h et 19h." },
    },
    {
      "@type": "Question",
      name: "Quels sont les modes de paiement ?",
      acceptedAnswer: { "@type": "Answer", text: "Cash à la livraison à Rabat et Témara. Pour les commandes corporate au-delà de 500 MAD, virement bancaire possible (RIB envoyé sur WhatsApp). Facture entreprise avec ICE disponible." },
    },
    {
      "@type": "Question",
      name: "Puis-je commander un coffret cadeau personnalisé ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui. Composez votre coffret avec nos deux signatures (Cookies Signature + Dattes Farcies aux cajou), ajoutez ruban et carte avec message manuscrit. Livraison soignée à Rabat ou Témara. À partir de 6 pièces." },
    },
    {
      "@type": "Question",
      name: "Combien de dattes farcies prévoir pour un mariage ?",
      acceptedAnswer: { "@type": "Answer", text: "Comptez 8 à 12 dattes farcies aux cajou par invité si elles font partie du buffet dessert principal, 4 à 6 si elles accompagnent une pièce montée. Pour 100 invités, prévoir 800 à 1000 pièces. Commande 7 jours à l'avance au-delà de 500 pièces." },
    },
    {
      "@type": "Question",
      name: "Combien de temps se conservent les cookies et dattes farcies ?",
      acceptedAnswer: { "@type": "Answer", text: "Cookies Signature : 5 jours à température ambiante dans une boîte hermétique. Dattes Farcies aux cajou : 7 jours à température ambiante, 15 jours au réfrigérateur. Réchauffez les cookies 8 secondes au micro-ondes pour retrouver le fondant du jour de cuisson." },
    },
    {
      "@type": "Question",
      name: "Les produits contiennent-ils des allergènes ?",
      acceptedAnswer: { "@type": "Answer", text: "Le Cookie Signature contient gluten (farine de blé), beurre AOP, œufs et noix de pécan. Les Dattes Farcies aux Cajou contiennent des noix de cajou. Indiquez-nous toute allergie sur WhatsApp avant de commander." },
    },
    {
      "@type": "Question",
      name: "Proposez-vous des coffrets cadeaux corporate avec logo entreprise ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui, à partir de 30 boîtes : étiquette imprimée avec votre logo, ruban à votre couleur (15 teintes au choix), carte de vœux personnalisée. Idéal pour cadeaux clients fin d'année, Aïd, Ramadan, séminaires et lancements à Rabat et Témara. Facture entreprise + virement bancaire." },
    },
  ],
};

const PRODUCT_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f6e68386-17a6-43bd-abf1-f47ef502d00b/id-preview-db51dcb7--a640c7ed-e3d9-4125-a3d2-94cdfcad68c9.lovable.app-1777241430790.png";

const COOKIE_PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Cookie Signature — chocolat noir & noix de pécan",
  description: "Cookie maison à la pâte fondante, chocolat noir et noix de pécan. Fait à la main à Rabat, en petite série quotidienne.",
  image: [PRODUCT_IMAGE],
  sku: "ZS-COOKIE-SIG",
  brand: { "@type": "Brand", name: "Zey's Sweetness" },
  offers: {
    "@type": "Offer",
    priceCurrency: "MAD",
    price: "35",
    availability: "https://schema.org/InStock",
    url: "https://zeysweet.com/#products",
    seller: { "@type": "Organization", name: "Zey's Sweetness" },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "18",
    bestRating: "5",
    worstRating: "1",
  },
};

const DATTES_PRODUCT_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Dattes Farcies aux Cajou — boîte de 12",
  description: "Dattes Medjool farcies à la crème de noix de cajou maison. Présentation luxe dorée, parfaite pour les cadeaux et mariages à Rabat & Témara.",
  image: [PRODUCT_IMAGE],
  sku: "ZS-DATTES-12",
  brand: { "@type": "Brand", name: "Zey's Sweetness" },
  offers: {
    "@type": "Offer",
    priceCurrency: "MAD",
    price: "120",
    availability: "https://schema.org/InStock",
    url: "https://zeysweet.com/#products",
    seller: { "@type": "Organization", name: "Zey's Sweetness" },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "12",
    bestRating: "5",
    worstRating: "1",
  },
};


const Index = () => {
  const lang = useStore((s) => s.lang);
  useReveal();
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="bg-background min-h-screen">
      <Helmet>
        <title>Zey's Sweetness — Maison de douceurs · Rabat & Témara</title>
        <meta name="description" content="Maison de douceurs artisanale à Rabat & Témara. Cookies Signature et Dattes Farcies aux cajou, faits main. Commande WhatsApp, livraison 24h." />
        <link rel="canonical" href="https://zeysweet.com/" />
        <link rel="alternate" hrefLang="fr" href="https://zeysweet.com/" />
        <link rel="alternate" hrefLang="ar" href="https://zeysweet.com/" />
        <link rel="alternate" hrefLang="x-default" href="https://zeysweet.com/" />
        <meta property="og:title" content="Zey's Sweetness — Maison de douceurs · Rabat & Témara" />
        <meta property="og:description" content="Cookies Signature et Dattes Farcies aux cajou, faits main à Rabat & Témara. Commande WhatsApp, livraison 24h." />
        <meta property="og:url" content="https://zeysweet.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_MA" />
        <script type="application/ld+json">{JSON.stringify(FAQ_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(COOKIE_PRODUCT_JSONLD)}</script>
        <script type="application/ld+json">{JSON.stringify(DATTES_PRODUCT_JSONLD)}</script>
      </Helmet>
      <CinematicLoader />
      <a href="#main" className="skip-link">
        {lang === "ar" ? "انتقل إلى المحتوى الرئيسي" : "Aller au contenu principal"}
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        
        <ScrollCinematic
          videoUrl={scroll1.url}
          eyebrow="Fait main · Rabat"
          title="Le goût du"
          accent="chocolat fondant"
        />
        <Menu />
        <Story />
        <Cinematic />
        <ScrollCinematic
          videoUrl={scroll2.url}
          eyebrow="Signature"
          title="Dattes farcies,"
          accent="touche royale"
        />
        <Gifts />
        <SectionDivider videoUrl={dividerCaramel.url} label="L'art de la pâtisserie" />
        <HowToOrder />
        <ScrollCinematic
          videoUrl={scroll3.url}
          eyebrow="Coffrets"
          title="Offrir une"
          accent="émotion"
        />
        <Testimonials />
        <FAQ />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
