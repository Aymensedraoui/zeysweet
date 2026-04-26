import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Products from "@/components/Products";
import Story from "@/components/Story";
import Cinematic from "@/components/Cinematic";
import Gifts from "@/components/Gifts";
import HowToOrder from "@/components/HowToOrder";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import OrderCTA from "@/components/OrderCTA";
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
    document.title = "Zey's Sweetness — Pâtisserie Artisanale à Casablanca";
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", "Cookies, brownies et coffrets maison à Casablanca. Commandez sur WhatsApp. Livraison 24h.");
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
        <Gallery />
        <OrderCTA />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppModal />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
