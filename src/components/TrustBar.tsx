import { Leaf, HandHeart, Package, Heart } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { Key } from "@/lib/i18n";

const items: { icon: any; tk: Key; sk: Key }[] = [
  { icon: Leaf, tk: "trust.1.t", sk: "trust.1.s" },
  { icon: HandHeart, tk: "trust.2.t", sk: "trust.2.s" },
  { icon: Package, tk: "trust.3.t", sk: "trust.3.s" },
  { icon: Heart, tk: "trust.4.t", sk: "trust.4.s" },
];

export default function TrustBar() {
  const { lang } = useStore();
  return (
    <section className="py-12" style={{ background: "hsl(var(--caramel) / 0.08)" }}>
      <div className="container mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-2 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="w-14 h-14 rounded-full bg-cream flex items-center justify-center shadow-sm">
              <it.icon className="w-6 h-6 text-cocoa" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-semibold text-cocoa text-base">{t(it.tk, lang)}</h3>
            <p className="text-xs text-cocoa/60">{t(it.sk, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
