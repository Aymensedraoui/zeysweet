import { useStore, buildWhatsAppLink } from "@/lib/store";

export default function OrderCTA() {
  const { cart, giftMessage, lang, setModalOpen } = useStore();
  const link = buildWhatsAppLink(cart.length ? cart : [], giftMessage, lang);

  return (
    <section id="order" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "hsl(var(--rose) / 0.18)" }}>
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rose/20 blur-3xl" />
      <div className="container mx-auto text-center max-w-3xl relative">
        <p className="font-hand text-2xl text-caramel">Prête à craquer ?</p>
        <h2 className="font-display font-bold italic text-5xl lg:text-6xl text-cocoa mt-3">
          Prête à vous faire <span className="text-rose">plaisir.</span>
        </h2>
        <p className="text-cocoa/75 text-lg mt-6 max-w-xl mx-auto">
          Commandez maintenant et recevez chez vous dans les 24h à Casablanca.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button
            onClick={() => (cart.length ? setModalOpen(true) : (window.location.href = link))}
            className="btn-cocoa text-base"
          >
            💬 Commander via WhatsApp
          </button>
          <a href="#products" className="btn-outline-cocoa text-base">Voir tous les produits</a>
        </div>
      </div>
    </section>
  );
}
