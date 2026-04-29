import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Key } from "@/lib/i18n";

const faqs: { q: Key; a: Key }[] = [
  { q: "faq.q1", a: "faq.a1" },
  { q: "faq.q2", a: "faq.a2" },
  { q: "faq.q3", a: "faq.a3" },
  { q: "faq.q4", a: "faq.a4" },
  { q: "faq.q5", a: "faq.a5" },
];

export default function FAQ() {
  const { lang } = useStore();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32" style={{ background: "hsl(var(--caramel) / 0.06)" }}>
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="font-hand text-2xl text-caramel">{t("faq.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("faq.title", lang)}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-card rounded-2xl shadow-card overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-cocoa text-lg">{t(f.q, lang)}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-caramel flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-cocoa/70 text-sm leading-relaxed">{t(f.a, lang)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
