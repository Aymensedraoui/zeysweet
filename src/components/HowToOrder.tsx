import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Key } from "@/lib/i18n";

const steps: { n: string; icon: string; tk: Key; sk: Key }[] = [
  { n: "01", icon: "🍪", tk: "how.s1.t", sk: "how.s1.s" },
  { n: "02", icon: "💬", tk: "how.s2.t", sk: "how.s2.s" },
  { n: "03", icon: "📦", tk: "how.s3.t", sk: "how.s3.s" },
];

export default function HowToOrder() {
  const { lang } = useStore();
  return (
    <section className="py-24 lg:py-32 relative" style={{ background: "hsl(var(--pistachio) / 0.08)" }}>
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="font-hand text-2xl text-pistachio">{t("how.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("how.title", lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative bg-card rounded-3xl p-8 text-center shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full gradient-cocoa text-cream flex items-center justify-center text-2xl shadow-lg">
                {s.icon}
              </div>
              <p className="font-hand text-3xl text-caramel mt-6">{s.n}</p>
              <h3 className="font-display font-bold text-xl text-cocoa mt-2">{t(s.tk, lang)}</h3>
              <p className="text-sm text-cocoa/60 mt-2">{t(s.sk, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
