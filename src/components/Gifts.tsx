import { giftBoxes } from "@/lib/products";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Key } from "@/lib/i18n";

const occKeys: Key[] = ["gifts.occ.1", "gifts.occ.2", "gifts.occ.3", "gifts.occ.4", "gifts.occ.5"];

export default function Gifts() {
  const { lang } = useStore();
  return (
    <section id="gifts" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-hand text-2xl text-caramel">{t("gifts.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("gifts.title", lang)}
          </h2>
          <p className="text-cocoa/70 mt-4">{t("gifts.sub", lang)}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {giftBoxes.map((g, i) => {
            const name = t(g.nameKey, lang);
            return (
              <article
                key={g.id}
                className="bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-warm transition-all hover:-translate-y-2 duration-500 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={g.image} alt={`${name} — coffret cadeau Zey's`} loading="lazy" className="w-full h-full object-cover img-warm hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-2xl text-cocoa">{name}</h3>
                  <p className="text-sm text-cocoa/60">{t(g.descKey, lang)}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-hand text-2xl text-caramel">
                      {g.price > 0 ? `${g.price} ${lang === "fr" ? "MAD" : "درهم"}` : t("gifts.quote", lang)}
                    </span>
                    <a href="#order" className="btn-outline-cocoa !py-2 !px-4 text-sm">{t("gifts.custom", lang)}</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {occKeys.map((k) => (
            <span key={k} className="px-5 py-2 rounded-full bg-card border border-caramel/30 text-cocoa text-sm font-medium shadow-sm">
              {t(k, lang)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
