import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useStore, buildWhatsAppLink } from "@/lib/store";
import { t } from "@/lib/i18n";

const links = [
  { href: "#products", k: "nav.products" as const },
  { href: "#story", k: "nav.story" as const },
  { href: "#gifts", k: "nav.gifts" as const },
  { href: "#contact", k: "nav.contact" as const },
];

export default function Navbar() {
  const { cart, setCartOpen, lang, setLang, giftMessage, setModalOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const onOrder = () => {
    if (cart.length) setModalOpen(true);
    else window.open(buildWhatsAppLink([], giftMessage, lang), "_blank");
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
            <button onClick={onOrder} className="hidden sm:inline-flex btn-rose btn-glow !py-2.5 !px-5 text-sm">
              {t("nav.cta", lang)}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-cocoa/5 transition"
              aria-label={t("nav.cart", lang)}
            >
              <ShoppingBag className="w-5 h-5 text-cocoa" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-caramel text-cream text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
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
        </div>
      )}
    </>
  );
}
