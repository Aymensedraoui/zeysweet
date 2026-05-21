import { Plus, ShoppingBag } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { products } from "@/lib/products";
import { useStore, localized } from "@/lib/store";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

export default function Products() {
  const { add, lang, setCartOpen } = useStore();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="products" className="py-32 lg:py-48 paper-texture relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-caramel/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-28">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-hand text-3xl text-caramel mb-4"
          >
            {t("products.eyebrow", lang)}
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="font-display font-bold italic text-5xl lg:text-7xl text-foreground"
          >
            {t("products.title", lang)}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-px w-24 bg-caramel/30 mx-auto mt-8"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {products.map((p, i) => {
            const badgeText =
              p.badge === "nouveau"
                ? t("products.badge.nouveau", lang)
                : p.badge
                ? t("products.badge.bestseller", lang)
                : null;
            const name = localized(p.name, lang);

            return (
              <motion.article
                key={p.id}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: shouldReduceMotion ? 0 : i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] card-premium shadow-2xl">
                  {badgeText && (
                    <div className="absolute top-6 left-6 z-20">
                      <span className="bg-rose/90 backdrop-blur-md text-cocoa text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2 rounded-full">
                        {badgeText}
                      </span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-cocoa/40 z-10 group-hover:bg-transparent transition-colors duration-700" />
                  <img
                    src={p.image}
                    alt={`${name} — Maison de douceurs · Rabat & Témara`}
                    loading="lazy"
                    className="w-full h-full object-cover img-warm transition-transform duration-[1.5s] ease-[cubic-bezier(.16,1,0.3,1)] group-hover:scale-[1.15] group-hover:rotate-1"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 translate-y-12 group-hover:translate-y-0 transition-all duration-700 ease-out z-20">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-display font-bold text-3xl lg:text-4xl text-foreground">{name}</h3>
                        <span className="font-hand text-3xl text-caramel">
                          {p.price} <span className="text-lg font-sans align-middle ml-1">{lang === "fr" ? "MAD" : "درهم"}</span>
                        </span>
                      </div>

                      <p className="text-foreground/70 text-lg leading-relaxed max-w-sm">
                        {localized(p.desc, lang)}
                      </p>

                      <div className="pt-4 flex flex-wrap items-center gap-6">
                        <button
                          onClick={() => {
                            add(p);
                            setCartOpen(true);
                            toast.success(t("products.added", lang), { description: name });
                          }}
                          className="btn-rose group/btn px-8 py-4 flex items-center gap-3 overflow-hidden relative"
                        >
                          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                          <ShoppingBag className="w-5 h-5 group-hover/btn:scale-110 transition-transform relative z-10" />
                          <span className="font-bold tracking-wide uppercase text-sm relative z-10">{t("products.add", lang)}</span>
                        </button>

                        <div
                          className="text-[10px] uppercase tracking-widest text-foreground/40 italic flex items-center gap-2"
                          title={t("allergen", lang)}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose/40" />
                          <span>{t("allergen.short", lang)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Depth Decoration */}
                <div className="absolute -inset-4 border border-white/5 rounded-[3rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
