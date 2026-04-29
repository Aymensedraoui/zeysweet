import portrait from "@/assets/zey-portrait.jpg";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function Story() {
  const { lang } = useStore();
  return (
    <section id="story" className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-4 bg-rose/15 rounded-3xl rotate-[-2deg]" />
          <img
            src={portrait}
            alt="Zey, fondatrice de Zey's Sweetness, dans sa cuisine"
            loading="lazy"
            className="relative rounded-3xl shadow-warm img-warm w-full max-w-[520px] mx-auto"
          />
          <div className="absolute -bottom-6 -right-2 sm:right-8 bg-cocoa text-cream rounded-full px-5 py-3 font-hand text-xl shadow-lg rotate-3">
            {t("story.since", lang)}
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-6 max-w-lg">
          <p className="font-hand text-2xl text-caramel">{t("story.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa leading-tight">
            {t("story.title.a", lang)} <span className="text-rose">{t("story.title.b", lang)}</span>
          </h2>
          <p className="text-cocoa/75 text-lg">{t("story.p1", lang)}</p>
          <p className="text-cocoa/70">{t("story.p2", lang)}</p>
          <a href="#order" className="btn-outline-cocoa">{t("story.cta", lang)}</a>
        </div>
      </div>
    </section>
  );
}
