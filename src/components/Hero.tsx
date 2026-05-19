import { useEffect, useRef } from "react";
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
  const imgWrapRef = useRef<HTMLDivElement>(null);

  // Subtle scroll parallax on the hero image
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (imgWrapRef.current && y < 900) {
          imgWrapRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onOrder = () => {
    if (cart.length) setModalOpen(true);
    else window.open(buildWhatsAppLink([], giftMessage, lang, { source: "hero" }), "_blank");
  };

  return (
    <section className="relative min-h-screen pt-[72px] flex flex-col">
      <div className="container mx-auto flex-1 grid lg:grid-cols-2 gap-12 items-center py-12 lg:py-20">
        <div className="space-y-6 lg:space-y-8 max-w-xl">
          <p className="font-hand text-2xl text-caramel animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.eyebrow", lang)}
          </p>
          <h1
            className="font-display font-bold italic text-5xl sm:text-6xl lg:text-7xl text-cocoa leading-[1.05] animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            {t("hero.title.a", lang)} <span className="text-rose">{t("hero.title.b", lang)}</span>
          </h1>
          <p
            className="text-lg text-cocoa/75 max-w-md animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            {t("hero.subtitle", lang)}
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <button
              onClick={onOrder}
              className="btn-rose btn-glow"
              aria-label={t("a11y.whatsapp", lang)}
            >
              {t("hero.cta1", lang)}
            </button>
            <a href="#products" className="btn-outline-cocoa">{t("hero.cta2", lang)}</a>
          </div>
          {!firstOrderUsed && (
            <p className="text-sm text-cocoa/80 bg-rose/15 border border-rose/40 rounded-full px-4 py-2 inline-block animate-fade-up" style={{ animationDelay: "0.7s" }}>
              {t("promo.banner", lang)}
            </p>
          )}
          <ul className="flex flex-wrap gap-2.5 pt-2 animate-fade-up" style={{ animationDelay: "0.75s" }} aria-label="Nos engagements">
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> {t("hero.chip.1", lang)}</li>
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> {t("hero.chip.2", lang)}</li>
            <li className="chip-trust"><span className="dot" aria-hidden="true" /> {t("hero.chip.3", lang)}</li>
          </ul>
          <div className="flex items-center gap-4 pt-4 animate-fade-up" style={{ animationDelay: "0.85s" }}>
            <span className="divider-ornament !w-12 !mx-0" aria-hidden="true" />
            <p className="text-cocoa/75 text-xs tracking-wide uppercase">{t("hero.social", lang)}</p>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="absolute -inset-8 bg-rose/20 rounded-full blur-3xl" />
          <div ref={imgWrapRef} className="relative will-change-transform">
            <div className="animate-float-soft">
              <img
                src={heroCookie}
                alt="Le Cookie Signature de Zey's Sweetness — Rabat & Témara"
                className="relative rounded-[2rem] shadow-warm img-warm w-full aspect-square object-cover"
                width={720}
                height={720}
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-rose rounded-full w-28 h-28 flex flex-col items-center justify-center text-cocoa font-hand shadow-lg rotate-12">
              <span className="text-xs">{t("hero.badge.coup", lang)}</span>
              <span className="text-2xl font-bold leading-none">{t("hero.badge.heart", lang)}</span>
              <span className="text-xs mt-1">35 MAD</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream rounded-2xl p-4 shadow-card max-w-[240px] hidden sm:block">
              <p className="font-hand text-caramel text-lg leading-snug">{t("hero.quote", lang)}</p>
              <p className="text-xs text-cocoa/60 mt-1">{t("hero.quote.author", lang)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cocoa text-cream py-5 overflow-hidden border-y border-cream/5">
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
