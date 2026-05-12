import { MessageCircle, MapPin, Clock, Instagram } from "lucide-react";
import { useStore, buildWhatsAppLink, WHATSAPP_NUMBER } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function Contact() {
  const { lang, cart, giftMessage, setModalOpen } = useStore();
  const onOrder = () => {
    if (cart.length) setModalOpen(true);
    else window.open(buildWhatsAppLink([], giftMessage, lang), "_blank");
  };

  const cards = [
    { icon: MessageCircle, t: "contact.whatsapp", v: "+212 6 00 00 00 00", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { icon: MapPin, t: "contact.zone", v: t("contact.zone.v", lang) },
    { icon: Clock, t: "contact.hours", v: t("contact.hours.v", lang) },
    { icon: Instagram, t: "contact.insta", v: "@zeysweetness", href: "https://www.instagram.com/zeysweetness/" },
  ] as const;

  return (
    <section id="contact" className="py-24 lg:py-32" style={{ background: "hsl(var(--cream))" }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <p className="font-hand text-2xl text-caramel">{t("contact.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("contact.title", lang)}
          </h2>
          <p className="text-cocoa/70 mt-3">{t("contact.sub", lang)}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map((c, i) => {
            const inner = (
              <>
                <div className="w-12 h-12 rounded-full mx-auto bg-rose/20 flex items-center justify-center mb-3">
                  <c.icon className="w-5 h-5 text-cocoa" strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-semibold text-cocoa text-base">{t(c.t, lang)}</h3>
                <p className="text-sm text-cocoa/65 mt-1">{c.v}</p>
              </>
            );
            const cls = "bg-card rounded-2xl p-6 shadow-card text-center block transition hover:shadow-warm hover:-translate-y-0.5";
            return "href" in c && c.href ? (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
            ) : (
              <div key={i} className={cls}>{inner}</div>
            );
          })}
        </div>

        <p className="text-center text-sm text-cocoa/70 max-w-2xl mx-auto mb-6">
          💵 {t("contact.payment", lang)}
        </p>

        <div className="text-center">
          <button onClick={onOrder} className="btn-cocoa">{t("contact.cta", lang)}</button>
        </div>
      </div>
    </section>
  );
}
