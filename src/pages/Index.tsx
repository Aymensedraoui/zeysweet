import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Products from "@/components/Products";
import Story from "@/components/Story";
import Cinematic from "@/components/Cinematic";
import Gifts from "@/components/Gifts";
import HowToOrder from "@/components/HowToOrder";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import OrderCTA from "@/components/OrderCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppModal from "@/components/WhatsAppModal";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ScrollProgress from "@/components/ScrollProgress";
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
      name: "Quels sont les délais de livraison ?",
      acceptedAnswer: { "@type": "Answer", text: "Livraison à Rabat et Témara sous 24h après confirmation sur WhatsApp. Commandez aujourd'hui, recevez demain." },
    },
    {
      "@type": "Question",
      name: "Quels sont les modes de paiement ?",
      acceptedAnswer: { "@type": "Answer", text: "Cash à la livraison à Rabat et Témara. Pour les commandes corporate au-delà de 500 MAD, virement bancaire possible (RIB envoyé sur WhatsApp)." },
    },
    {
      "@type": "Question",
      name: "Puis-je commander un coffret cadeau personnalisé ?",
      acceptedAnswer: { "@type": "Answer", text: "Oui. Composez votre coffret avec nos deux signatures (Cookies + Dattes Farcies aux cajou), avec ruban et message personnalisés. Livraison à Rabat ou Témara." },
    },
  ],
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
        <link rel="canonical" href="https://zeysweet.lovable.app/" />
        <meta property="og:title" content="Zey's Sweetness — Maison de douceurs · Rabat & Témara" />
        <meta property="og:description" content="Cookies Signature et Dattes Farcies aux cajou, faits main à Rabat & Témara. Commande WhatsApp, livraison 24h." />
        <meta property="og:url" content="https://zeysweet.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify(FAQ_JSONLD)}</script>
      </Helmet>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Products />
        <Story />
        <Cinematic />
        <Gifts />
        <HowToOrder />
        <Testimonials />
        <FAQ />
        <Gallery />
        <OrderCTA />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
