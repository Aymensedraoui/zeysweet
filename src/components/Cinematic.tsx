import cookie from "@/assets/cookie-cinematic.jpg";
import { useStore, buildWhatsAppLink } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { t } from "@/lib/i18n";

export default function Cinematic() {
  const { lang } = useStore();
  const waLink = buildWhatsAppLink([], "", lang, { source: "cinematic", productLabel: "Cookie Signature" });

  return (
    <section className="gradient-cocoa text-cream py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-10 left-10 font-hand text-rose/20 text-9xl select-none hidden lg:block">❤</div>
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-rose/20 rounded-full blur-3xl" />
          <img
            src={cookie}
            alt="Stack de cookies signature"
            loading="lazy"
            className="relative rounded-3xl shadow-warm img-warm w-full"
          />
        </div>

        <div className="space-y-6">
          <p className="font-hand text-2xl text-rose">{t("cine.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-5xl lg:text-6xl text-cream leading-tight">
            {t("cine.title.a", lang)} <span className="text-rose">{t("cine.title.b", lang)}</span>
          </h2>
          <ul className="space-y-3 text-cream/85 text-lg">
            <li className="flex gap-3"><span className="text-caramel">✦</span> {t("cine.b1", lang)}</li>
            <li className="flex gap-3"><span className="text-caramel">✦</span> {t("cine.b2", lang)}</li>
            <li className="flex gap-3"><span className="text-caramel">✦</span> {t("cine.b3", lang)}</li>
          </ul>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("cinematic")}
            className="btn-caramel btn-glow"
          >
            {t("cine.cta", lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
