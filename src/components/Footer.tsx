import { Instagram, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { t } from "@/lib/i18n";

const IG_URL = "https://www.instagram.com/zeysweetness/";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

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
            <li><a href="/#products" className="hover:text-rose">{t("nav.products", lang)}</a></li>
            <li><a href="/#gifts" className="hover:text-rose">{t("nav.gifts", lang)}</a></li>
            <li><a href="/#story" className="hover:text-rose">{t("nav.story", lang)}</a></li>
            <li><a href="/#contact" className="hover:text-rose">{t("nav.contact", lang)}</a></li>
            <li><Link to="/cookies-rabat" className="hover:text-rose">Cookies à Rabat</Link></li>
            <li><Link to="/cookies-agdal" className="hover:text-rose">Cookies à Agdal</Link></li>
            <li><Link to="/cookies-hay-riad" className="hover:text-rose">Cookies à Hay Riad</Link></li>
            <li><Link to="/dattes-farcies-temara" className="hover:text-rose">Dattes farcies à Témara</Link></li>
            <li><Link to="/dattes-mariage-rabat" className="hover:text-rose">Dattes pour mariage</Link></li>
            <li><Link to="/coffrets-cadeaux-corporate-rabat" className="hover:text-rose">Coffrets corporate</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">{t("ft.contact", lang)}</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose">
                <Instagram className="w-4 h-4 text-rose" /> @zeysweetness
              </a>
            </li>
            <li>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-rose">
                <MessageCircle className="w-4 h-4 text-rose" /> +212 620 35 53 25
              </a>
            </li>
            <li>
              <a href="mailto:contact@zeyssweetness.ma" className="flex items-center gap-2 hover:text-rose">
                <Mail className="w-4 h-4 text-rose" /> contact@zeyssweetness.ma
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">{t("ft.payment", lang)}</h4>
          <div className="flex flex-wrap gap-2">
            {[t("ft.pay.cash", lang), t("ft.pay.transfer", lang), t("ft.pay.whatsapp", lang)].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-md bg-cream/10 text-xs">{p}</span>
            ))}
          </div>
          <ul className="mt-6 space-y-2 text-xs text-cream/60">
            <li><Link to="/legal/mentions-legales" className="hover:text-rose">{t("ft.legal", lang)}</Link></li>
            <li><Link to="/legal/cgv" className="hover:text-rose">{t("ft.cgv", lang)}</Link></li>
            <li><Link to="/legal/confidentialite" className="hover:text-rose">{t("ft.privacy", lang)}</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-14 pt-6 border-t border-cream/10 text-center text-xs text-cream/50">
        {t("ft.copyright", lang)}
      </div>
    </footer>
  );
}
