import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Key } from "@/lib/i18n";

const reviews: { qk: Key; nk: Key; ck: Key }[] = [
  { qk: "tst.1.q", nk: "tst.1.n", ck: "tst.1.c" },
  { qk: "tst.2.q", nk: "tst.2.n", ck: "tst.2.c" },
  { qk: "tst.3.q", nk: "tst.3.n", ck: "tst.3.c" },
];

export default function Testimonials() {
  const { lang } = useStore();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto text-center max-w-3xl">
        <p className="font-hand text-2xl text-caramel">{t("tst.eyebrow", lang)}</p>
        <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2 mb-12">
          {t("tst.title", lang)}
        </h2>

        <div
          className="relative min-h-[220px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-500 ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex justify-center gap-1 text-caramel mb-4">
                {[...Array(5)].map((_, k) => <Star key={k} className="w-5 h-5 fill-current" />)}
              </div>
              <blockquote className="font-display italic text-2xl lg:text-3xl text-cocoa leading-snug">
                "{t(r.qk, lang)}"
              </blockquote>
              <p className="mt-6 text-cocoa/60">
                <span className="font-hand text-xl text-caramel">— {t(r.nk, lang)}</span>, {t(r.ck, lang)}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Témoignages">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              role="tab"
              aria-selected={idx === i}
              aria-label={`Témoignage ${idx + 1} sur ${reviews.length}`}
              className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-caramel" : "w-2 bg-cocoa/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
