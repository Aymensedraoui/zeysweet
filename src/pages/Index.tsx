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
import { useStore } from "@/lib/store";
import { useReveal } from "@/hooks/useReveal";

const Index = () => {
  const lang = useStore((s) => s.lang);
  useReveal();
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.title = "Zey's Sweetness — Maison de douceurs · Rabat & Témara";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Maison de douceurs artisanale à Rabat & Témara. Cookies Signature et Dattes Farcies aux noix de cajou, faits main en petite série. Commande WhatsApp, livraison 24h.");
  }, [lang]);

  return (
    <div className="bg-background min-h-screen">
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
