import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import heroCookie from "@/assets/hero-cookie.jpg";
import { useStore, buildWhatsAppLink } from "@/lib/store";
import { t } from "@/lib/i18n";

const marqueeItems = [
  "Cookies Signature",
  "Dattes Farcies aux cajou",
  "Fait main",
  "Rabat & Témara",
  "Petite série",
  "Livraison 24h",
];

export default function Hero() {
  const { lang, cart, giftMessage, setModalOpen, firstOrderUsed } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const onOrder = () => {
    if (cart.length) setModalOpen(true);
    else window.open(buildWhatsAppLink([], giftMessage, lang, { source: "hero" }), "_blank");
  };

  return (
    <section className="relative min-h-screen pt-[72px] flex flex-col overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[50%] h-[50%] bg-caramel/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[50%] h-[50%] bg-rose/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/4 left-1/4 w-[1px] h-[400px] bg-gradient-to-b from-transparent via-rose/20 to-transparent rotate-45 opacity-30" />
        <div className="absolute top-1/3 right-1/4 w-[1px] h-[300px] bg-gradient-to-b from-transparent via-caramel/20 to-transparent -rotate-45 opacity-30" />
      </div>

      <div className="container mx-auto flex-1 grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20 relative z-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 lg:space-y-10 max-w-xl"
        >
          <div className="space-y-4">
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 0.8 }}
              className="font-hand text-3xl text-caramel"
            >
              {t("hero.eyebrow", lang)}
            </motion.p>
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: 0.8 }}
              className="font-display font-bold italic text-5xl sm:text-7xl lg:text-8xl text-foreground leading-[1] tracking-tight"
            >
              {t("hero.title.a", lang)} <br />
              <span className="text-rose inline-block mt-2">{t("hero.title.b", lang)}</span>
            </motion.h1>
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: 0.8 }}
              className="text-lg lg:text-xl text-foreground/70 max-w-md leading-relaxed"
            >
              {t("hero.subtitle", lang)}
            </motion.p>
          </div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: 0.8 }}
            className="flex flex-wrap gap-6 items-center"
          >
            <button
              onClick={onOrder}
              className="btn-rose btn-glow text-lg px-10 py-5 group relative overflow-hidden"
              aria-label={t("a11y.whatsapp", lang)}
            >
              <span className="relative z-20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cocoa animate-pulse" />
                {t("hero.cta1", lang)}
              </span>
              <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
            <a
              href="#products"
              className="text-foreground/80 hover:text-foreground font-medium flex items-center gap-2 group transition-colors"
            >
              {t("hero.cta2", lang)}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="space-y-6 pt-4"
          >
            {!firstOrderUsed && (
              <p className="text-sm text-rose/90 bg-rose/10 border border-rose/20 rounded-full px-5 py-2.5 inline-block backdrop-blur-sm">
                {t("promo.banner", lang)}
              </p>
            )}
            <ul className="flex flex-wrap gap-4" aria-label="Nos engagements">
              <li className="flex items-center gap-2 text-sm font-medium text-foreground/60 border border-foreground/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-caramel" /> {t("hero.chip.1", lang)}
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-foreground/60 border border-foreground/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-caramel" /> {t("hero.chip.2", lang)}
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-foreground/60 border border-foreground/10 rounded-full px-4 py-1.5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-caramel" /> {t("hero.chip.3", lang)}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            style={{ y: y1 }}
            className="relative z-20"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-caramel/20 rounded-[2.5rem] blur-2xl group-hover:bg-caramel/30 transition-colors duration-700" />
              <img
                src={heroCookie}
                alt="Le Cookie Signature de Maison de douceurs — Rabat & Témara"
                className="relative rounded-[2.5rem] shadow-2xl img-warm w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                width={720}
                height={900}
                loading="eager"
                fetchPriority="high"
              />

              <motion.div
                animate={shouldReduceMotion ? { rotate: 12 } : { rotate: [12, 8, 12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-caramel rounded-full w-32 h-32 flex flex-col items-center justify-center text-cream font-hand shadow-2xl z-30"
              >
                <span className="text-xs uppercase tracking-widest">{t("hero.badge.coup", lang)}</span>
                <span className="text-3xl font-bold leading-none my-1">{t("hero.badge.heart", lang)}</span>
                <span className="text-sm font-sans font-bold">35 MAD</span>
              </motion.div>

              <div className="absolute -bottom-8 -left-8 bg-card/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl max-w-[280px] hidden sm:block z-30">
                <p className="font-hand text-caramel text-xl leading-snug italic">"{t("hero.quote", lang).replace(/[«»]/g, "")}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-px bg-caramel/30" />
                  <p className="text-xs text-foreground/50 uppercase tracking-widest font-bold">{t("hero.quote.author", lang).replace("— ", "")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Decorative Elements */}
          {!shouldReduceMotion && (
            <>
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] -left-10 w-20 h-20 bg-rose/20 rounded-full blur-xl z-10"
              />
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] -right-10 w-24 h-24 bg-caramel/20 rounded-full blur-xl z-10"
              />
            </>
          )}
        </motion.div>
      </div>

      <div className="bg-secondary text-foreground/40 py-8 overflow-hidden border-y border-white/5 backdrop-blur-sm relative z-20">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 items-center font-display italic text-2xl">
              {marqueeItems.map((m, i) => (
                <span key={i} className="flex items-center gap-12 text-cream/90">
                  {m}
                  <span className="text-rose/80">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
