import { giftBoxes } from "@/lib/products";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import type { Key } from "@/lib/i18n";

const occKeys: Key[] = ["gifts.occ.1", "gifts.occ.2", "gifts.occ.3", "gifts.occ.4", "gifts.occ.5"];

export default function Gifts() {
  const { lang } = useStore();
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="gifts" className="py-32 lg:py-48 bg-cream/5 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-hand text-3xl text-caramel mb-4"
          >
            {t("gifts.eyebrow", lang)}
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold italic text-5xl lg:text-7xl text-foreground"
          >
            {t("gifts.title", lang)}
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
            className="text-foreground/70 mt-8 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t("gifts.sub", lang)}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-1 gap-12 lg:gap-16 max-w-xl mx-auto">
          {giftBoxes.map((g, i) => {
            const name = t(g.nameKey, lang);
            return (
              <motion.article
                key={g.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-card rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 card-premium"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={g.image}
                    alt={`${name} — coffret cadeau la Maison`}
                    loading="lazy"
                    className="w-full h-full object-cover img-warm transition-transform duration-[1.5s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                <div className="p-10 lg:p-14 space-y-6 relative">
                  <h3 className="font-display font-bold text-3xl lg:text-4xl text-foreground">{name}</h3>
                  <p className="text-lg text-foreground/60 leading-relaxed">{t(g.descKey, lang)}</p>

                  <div className="pt-4 flex items-center justify-between border-t border-white/5 mt-8">
                    <span className="font-hand text-4xl text-caramel">
                      {g.price > 0 ? `${g.price} ${lang === "fr" ? "MAD" : "درهم"}` : t("gifts.quote", lang)}
                    </span>
                    <a
                      href="#order"
                      className="btn-rose text-sm px-8 py-4 font-bold uppercase tracking-widest"
                    >
                      {t("gifts.custom", lang)}
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-4 lg:gap-6"
        >
          {occKeys.map((k) => (
            <span
              key={k}
              className="px-8 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-caramel/20 text-foreground/80 text-sm font-bold uppercase tracking-widest hover:border-caramel/50 transition-colors"
            >
              {t(k, lang)}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
