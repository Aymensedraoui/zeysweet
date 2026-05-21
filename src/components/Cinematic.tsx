import cookie from "@/assets/cookie-cinematic.jpg";
import { useStore, localized } from "@/lib/store";
import { products } from "@/lib/products";
import { toast } from "sonner";
import { t } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

export default function Cinematic() {
  const { add, lang } = useStore();
  const shouldReduceMotion = useReducedMotion();
  const cookieProduct = products.find((p) => p.id === "cookie")!;

  return (
    <section className="gradient-cocoa text-cream py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute top-0 right-0 font-hand text-rose/5 text-[40rem] select-none leading-none -translate-y-1/4 translate-x-1/4">❤</div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-rose/10 rounded-[3rem] blur-3xl group-hover:bg-rose/20 transition-colors duration-700" />
          <img
            src={cookie}
            alt="Stack de cookies signature"
            loading="lazy"
            className="relative rounded-[3rem] shadow-2xl img-warm w-full transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="space-y-6">
            <p className="font-hand text-3xl text-rose">{t("cine.eyebrow", lang)}</p>
            <h2 className="font-display font-bold italic text-5xl lg:text-7xl text-cream leading-tight">
              {t("cine.title.a", lang)} <br />
              <span className="text-rose inline-block mt-2">{t("cine.title.b", lang)}</span>
            </h2>
          </div>

          <ul className="space-y-6 text-cream/80 text-xl">
            {[t("cine.b1", lang), t("cine.b2", lang), t("cine.b3", lang)].map((text, i) => (
              <motion.li
                key={i}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.2 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="flex-shrink-0 w-6 h-px bg-caramel" />
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>

          <div className="pt-6">
            <button
              onClick={() => {
                add(cookieProduct);
                toast.success(`${localized(cookieProduct.name, lang)} ✓`);
              }}
              className="btn-caramel btn-glow text-lg px-10 py-5 group"
            >
              <span className="relative z-10">{t("cine.cta", lang)}</span>
              <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
