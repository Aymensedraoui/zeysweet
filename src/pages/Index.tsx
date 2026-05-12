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

const Index = () => {
  const lang = useStore((s) => s.lang);
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.title = "Zey's Sweetness — Cookies & Dates Farcies à Casablanca";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Zey's Sweetness — pâtisserie artisanale à Casablanca. Cookies Signature & Dates Farcies aux cajou faits maison. Commande WhatsApp, livraison 24h.");
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
