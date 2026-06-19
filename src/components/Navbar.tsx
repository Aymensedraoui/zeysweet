import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useStore, buildWhatsAppLink } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { t } from "@/lib/i18n";
import CartButton from "./CartButton";

const links = [
  { href: "#products", k: "nav.products" as const },
  { href: "#story", k: "nav.story" as const },
  { href: "#gifts", k: "nav.gifts" as const },
  { href: "#contact", k: "nav.contact" as const },
];

export default function Navbar() {
  const { lang, setLang } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const onOrder = () => {
    trackWhatsAppClick("navbar");
    window.open(buildWhatsAppLink([], "", lang, { source: "navbar" }), "_blank");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-cream/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_hsl(23_60%_14%/0.18)] border-b border-cocoa/5" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto h-[72px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <span className="text-2xl">🍪</span>
            <span className="font-display font-bold text-xl text-cocoa tracking-tight">
              Zey's <span className="italic text-caramel">Sweetness</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-cocoa/80 hover:text-cocoa relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-rose after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300"
              >
                {t(l.k, lang)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="text-xs font-semibold text-cocoa/70 hover:text-cocoa border border-cocoa/20 rounded-full px-3 py-1.5"
              aria-label="Changer de langue"
            >
              {t("nav.lang", lang)}
            </button>
            <CartButton />
            <button onClick={onOrder} className="hidden sm:inline-flex btn-rose btn-glow !py-2.5 !px-5 text-sm" aria-label={t("a11y.whatsapp", lang)}>
              {t("nav.cta", lang)}
            </button>
            <button
              onClick={onOrder}
              className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-rose text-cream shadow-warm active:scale-95 transition"
              aria-label={t("a11y.whatsapp", lang)}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0012.06 0C5.5 0 .17 5.32.17 11.88c0 2.1.55 4.13 1.6 5.93L0 24l6.34-1.66a11.87 11.87 0 005.72 1.46h.01c6.56 0 11.89-5.32 11.89-11.88 0-3.18-1.24-6.16-3.44-8.44z"/></svg>
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2"
              aria-label={t("nav.menu", lang)}
            >
              <Menu className="w-6 h-6 text-cocoa" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-cocoa text-cream flex flex-col animate-fade-up">
          <div className="container mx-auto h-[72px] flex items-center justify-between">
            <span className="font-display font-bold text-xl">Zey's Sweetness</span>
            <button onClick={() => setOpen(false)} aria-label={t("nav.close", lang)}><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl italic text-cream hover:text-rose transition"
              >
                {t(l.k, lang)}
              </a>
            ))}
          </nav>
          <div className="pb-10 px-6 flex justify-center">
            <button
              onClick={() => { setOpen(false); onOrder(); }}
              className="btn-rose btn-glow w-full max-w-sm"
              aria-label={t("a11y.whatsapp", lang)}
            >
              {t("nav.cta", lang)} · WhatsApp
            </button>
          </div>
        </div>
      )}
    </>
  );
}
