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
    else window.open(buildWhatsAppLink([], giftMessage, lang, { source: "navbar" }), "_blank");
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
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-caramel/10 flex items-center justify-center text-xl group-hover:bg-caramel/20 transition-colors duration-500">
              🍪
            </div>
            <span className="font-display font-bold text-2xl text-foreground tracking-tight group-hover:text-caramel transition-colors duration-500 uppercase">
              Maison <span className="italic font-medium lowercase text-caramel">de</span> douceurs
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[1px] after:bg-caramel after:scale-x-0 after:origin-right hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-500"
              >
                {t(l.k, lang)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors"
              aria-label="Changer de langue"
            >
              {t("nav.lang", lang)}
            </button>
            <button onClick={onOrder} className="hidden sm:inline-flex btn-rose px-8 py-3 text-sm font-bold uppercase tracking-widest" aria-label={t("a11y.whatsapp", lang)}>
              {t("nav.cta", lang)}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/5 transition"
              aria-label={t("nav.cart", lang)}
            >
              <ShoppingBag className="w-6 h-6 text-foreground" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-caramel text-cream text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2"
              aria-label={t("nav.menu", lang)}
            >
              <Menu className="w-7 h-7 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col animate-fade-up">
          <div className="container mx-auto h-[72px] flex items-center justify-between px-6">
            <span className="font-display font-bold text-xl uppercase tracking-widest">Maison de douceurs</span>
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
