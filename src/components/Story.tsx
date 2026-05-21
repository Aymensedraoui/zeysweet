import portrait from "@/assets/zey-portrait.jpg";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";

export default function Story() {
  const { lang } = useStore();
  const shouldReduceMotion = useReducedMotion();
  return (
    <section id="story" className="py-32 lg:py-48 bg-cream/5 relative overflow-hidden">
      <div className="container mx-auto grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-2 lg:order-1"
        >
          <div className="absolute -inset-10 bg-rose/5 rounded-full blur-[100px]" />
          <div className="relative group">
            <div className="absolute -inset-4 bg-rose/10 rounded-[3rem] rotate-[-2deg] transition-transform group-hover:rotate-0 duration-700" />
            <img
              src={portrait}
              alt="Zey, fondatrice de Maison de douceurs, dans sa cuisine"
              loading="lazy"
              className="relative rounded-[2.5rem] shadow-2xl img-warm w-full max-w-[520px] mx-auto transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <motion.div
              animate={shouldReduceMotion ? { rotate: 3 } : { rotate: [3, 1, 3], y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-2 sm:right-8 bg-cocoa text-cream rounded-full px-8 py-4 font-hand text-2xl shadow-2xl"
            >
              {t("story.since", lang)}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="order-1 lg:order-2 space-y-10"
        >
          <div className="space-y-6">
            <p className="font-hand text-3xl text-caramel">{t("story.eyebrow", lang)}</p>
            <h2 className="font-display font-bold italic text-5xl lg:text-7xl text-foreground leading-tight">
              {t("story.title.a", lang)} <br />
              <span className="text-rose inline-block mt-2">{t("story.title.b", lang)}</span>
            </h2>
          </div>
          <div className="space-y-8 text-xl text-foreground/70 leading-relaxed">
            <p>{t("story.p1", lang)}</p>
            <p>{t("story.p2", lang)}</p>
          </div>
          <div className="pt-6">
            <a href="#products" className="btn-outline-caramel text-lg px-10 py-5">{t("story.cta", lang)}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
