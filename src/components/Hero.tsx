import heroCookie from "@/assets/hero-cookie.jpg";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

const marqueeItems = ["Cookies", "Brownies", "Cheesecakes", "Dates", "Cakes", "Coffrets"];

export default function Hero() {
  const { lang } = useStore();
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
            <a href="#products" className="btn-rose">{t("hero.cta1", lang)}</a>
            <a href="#gifts" className="btn-outline-caramel">{t("hero.cta2", lang)}</a>
          </div>
          <div className="flex items-center gap-6 pt-4 animate-fade-up" style={{ animationDelay: "0.85s" }}>
            <div className="flex -space-x-2">
              {["🍪","🍰","🧁"].map((e,i)=>(
                <div key={i} className="w-10 h-10 rounded-full bg-cream border-2 border-rose flex items-center justify-center text-lg shadow-sm">{e}</div>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex text-caramel">{"★★★★★"}</div>
              <p className="text-cocoa/60 text-xs">{t("hero.social", lang)}</p>
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <div className="absolute -inset-8 bg-rose/20 rounded-full blur-3xl" />
          <div className="relative animate-bob">
            <img
              src={heroCookie}
              alt="Le Cookie Signature de Zey - chocolat fondant artisanal"
              className="relative rounded-[2rem] shadow-warm img-warm w-full aspect-square object-cover"
              width={720}
              height={720}
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute -top-4 -right-4 bg-rose rounded-full w-28 h-28 flex flex-col items-center justify-center text-cocoa font-hand shadow-lg rotate-12">
              <span className="text-xs">{t("hero.badge.coup", lang)}</span>
              <span className="text-2xl font-bold leading-none">{t("hero.badge.heart", lang)}</span>
              <span className="text-xs mt-1">35 MAD</span>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-cream rounded-2xl p-4 shadow-card max-w-[220px] hidden sm:block">
              <p className="font-hand text-caramel text-lg">{t("hero.quote", lang)}</p>
              <p className="text-xs text-cocoa/60 mt-1">{t("hero.quote.author", lang)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cocoa text-cream py-5 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 items-center font-display italic text-2xl">
              {marqueeItems.map((m, i) => (
                <span key={i} className="flex items-center gap-12">
                  {m}
                  <span className="text-rose">❤</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
