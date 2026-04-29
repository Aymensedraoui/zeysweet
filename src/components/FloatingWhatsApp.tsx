import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useStore, buildWhatsAppLink } from "@/lib/store";

export default function FloatingWhatsApp() {
  const { cart, giftMessage, lang, setModalOpen } = useStore();
  const [shown, setShown] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShown(true), 1500); return () => clearTimeout(t); }, []);

  const handle = () => {
    if (cart.length) setModalOpen(true);
    else window.open(buildWhatsAppLink([], giftMessage, lang), "_blank");
  };

  return (
    <button
      onClick={handle}
      aria-label="WhatsApp"
      title="WhatsApp"
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-warm transition-all duration-500 ${
        shown ? "scale-100 opacity-100" : "scale-0 opacity-0"
      }`}
      style={{ background: "#25D366" }}
    >
      <span className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: "#25D366" }} />
      <MessageCircle className="w-7 h-7 relative z-10" />
    </button>
  );
}
