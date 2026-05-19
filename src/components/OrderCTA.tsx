import { useStore, buildWhatsAppLink, cartSubtotal, MIN_ORDER_MAD } from "@/lib/store";
import { t } from "@/lib/i18n";
import { ShieldCheck, Truck, Heart } from "lucide-react";

export default function OrderCTA() {
  const { cart, giftMessage, lang, setModalOpen, firstOrderUsed } = useStore();
  const sub = cartSubtotal(cart);
  const link = buildWhatsAppLink(cart, giftMessage, lang, { source: "order-cta" });

  const handle = () => {
    if (cart.length === 0) {
      window.open(link, "_blank");
    } else if (sub < MIN_ORDER_MAD) {
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

        {!firstOrderUsed && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-card border-2 border-dashed border-rose/60 px-4 py-2 text-sm text-cocoa">
            <span>{t("promo.banner", lang)}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <button onClick={handle} className="btn-rose btn-glow text-base" aria-label={t("a11y.whatsapp", lang)}>{t("cta.btn", lang)}</button>
          <a href="#products" className="btn-outline-cocoa text-base">{t("cta.see", lang)}</a>
        </div>

        {/* Trust strip */}
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-cocoa/70" aria-label="Garanties">
          <li className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-pistachio" aria-hidden="true" />{t("tb.cash", lang)}</li>
          <li className="inline-flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-pistachio" aria-hidden="true" />{t("tb.fast", lang)}</li>
          <li className="inline-flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-rose" aria-hidden="true" />{t("tb.hand", lang)}</li>
        </ul>

        {/* Micro-testimonial */}
        <blockquote className="mt-6 font-hand text-lg text-cocoa/75 max-w-md mx-auto">
          {t("cta.quote", lang)}
        </blockquote>

        <span className="divider-ornament mt-10" />
      </div>
    </section>
  );
}
