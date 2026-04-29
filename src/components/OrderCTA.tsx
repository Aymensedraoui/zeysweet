import { useStore, buildWhatsAppLink, cartSubtotal, MIN_ORDER_MAD } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function OrderCTA() {
  const { cart, giftMessage, lang, setModalOpen } = useStore();
  const sub = cartSubtotal(cart);
  const link = buildWhatsAppLink(cart, giftMessage, lang);

  const handle = () => {
    if (cart.length === 0) {
      window.open(link, "_blank");
    } else if (sub < MIN_ORDER_MAD) {
      // Open cart so the user sees the min-order warning
      useStore.setState({ cartOpen: true });
    } else {
      setModalOpen(true);
    }
  };

  return (
    <section id="order" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: "hsl(var(--rose) / 0.18)" }}>
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-rose/20 blur-3xl" />
      <div className="container mx-auto text-center max-w-3xl relative">
        <p className="font-hand text-2xl text-caramel">{t("cta.eyebrow", lang)}</p>
        <h2 className="font-display font-bold italic text-5xl lg:text-6xl text-cocoa mt-3">
          {t("cta.title.a", lang)} <span className="text-rose">{t("cta.title.b", lang)}</span>
        </h2>
        <p className="text-cocoa/75 text-lg mt-6 max-w-xl mx-auto">{t("cta.sub", lang)}</p>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button onClick={handle} className="btn-cocoa text-base">{t("cta.btn", lang)}</button>
          <a href="#products" className="btn-outline-cocoa text-base">{t("cta.see", lang)}</a>
        </div>
      </div>
    </section>
  );
}
