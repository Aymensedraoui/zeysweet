import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { motion, useReducedMotion } from "framer-motion";
import type { Key } from "@/lib/i18n";

const steps: { n: string; icon: string; tk: Key; sk: Key }[] = [
  { n: "01", icon: "🍪", tk: "how.s1.t", sk: "how.s1.s" },
  { n: "02", icon: "💬", tk: "how.s2.t", sk: "how.s2.s" },
  { n: "03", icon: "📦", tk: "how.s3.t", sk: "how.s3.s" },
];

const PAYMENT_NOTE: { fr: string; ar: string } = {
  fr: "💵 Paiement à la livraison (cash) — virement bancaire possible pour les coffrets cadeaux et commandes corporate.",
  ar: "💵 الدفع نقدا عند التسليم — التحويل البنكي ممكن لعلب الهدايا وطلبات الشركات.",
};

export default function HowToOrder() {
  const { lang } = useStore();
  const shouldReduceMotion = useReducedMotion();
  return (
    <section className="py-32 lg:py-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-secondary/20 pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-28">
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-hand text-3xl text-caramel mb-4"
          >
            {t("how.eyebrow", lang)}
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="font-display font-bold italic text-5xl lg:text-7xl text-foreground"
          >
            {t("how.title", lang)}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : i * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              <div className="bg-card/50 backdrop-blur-xl rounded-[3rem] p-10 lg:p-14 text-center border border-white/5 shadow-2xl transition-all duration-700 group-hover:bg-card group-hover:-translate-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-caramel to-rose flex items-center justify-center text-4xl shadow-2xl mx-auto mb-8 transition-transform duration-700 group-hover:scale-110">
                  {s.icon}
                </div>
                <p className="font-hand text-4xl text-caramel/40 mb-4">{s.n}</p>
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-foreground mb-4">{t(s.tk, lang)}</h3>
                <p className="text-lg text-foreground/60 leading-relaxed">{t(s.sk, lang)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center text-lg text-foreground/40 max-w-3xl mx-auto italic"
        >
          {PAYMENT_NOTE[lang]}
        </motion.p>
      </div>
    </section>
  );
}
