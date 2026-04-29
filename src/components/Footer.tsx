import { Instagram, MessageCircle, Mail } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useStore();
  return (
    <footer className="bg-cocoa text-cream/85 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] text-[20rem] font-display italic flex items-center justify-center pointer-events-none select-none">
        🍪
      </div>
      <div className="container mx-auto grid md:grid-cols-4 gap-10 relative">
        <div>
          <h3 className="font-display font-bold text-2xl text-cream">Zey's <span className="italic text-rose">Sweetness</span></h3>
          <p className="font-hand text-xl text-rose mt-2">{t("ft.tag", lang)}</p>
          <p className="text-sm mt-4 text-cream/60 max-w-xs">{t("ft.about", lang)}</p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">{t("ft.links", lang)}</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#products" className="hover:text-rose">{t("nav.products", lang)}</a></li>
            <li><a href="#gifts" className="hover:text-rose">{t("nav.gifts", lang)}</a></li>
            <li><a href="#story" className="hover:text-rose">{t("nav.story", lang)}</a></li>
            <li><a href="#order" className="hover:text-rose">{t("nav.order", lang)}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">{t("ft.contact", lang)}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Instagram className="w-4 h-4 text-rose" /> @zeys.sweetness</li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-rose" /> +212 6 00 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-rose" /> contact@zeyssweetness.ma</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">{t("ft.payment", lang)}</h4>
          <div className="flex flex-wrap gap-2">
            {["WhatsApp", "Cash", "CMI", "Visa"].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-md bg-cream/10 text-xs">{p}</span>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-xs text-cream/60">
            <li><a href="#" className="hover:text-rose">{t("ft.legal", lang)}</a></li>
            <li><a href="#" className="hover:text-rose">{t("ft.cgv", lang)}</a></li>
            <li><a href="#" className="hover:text-rose">{t("ft.privacy", lang)}</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-14 pt-6 border-t border-cream/10 text-center text-xs text-cream/50">
        {t("ft.copyright", lang)}
      </div>
    </footer>
  );
}
