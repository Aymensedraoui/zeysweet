import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const links = [
  { href: "#products", fr: "Nos Douceurs", ar: "حلوياتنا" },
  { href: "#story", fr: "Notre Histoire", ar: "قصتنا" },
  { href: "#gifts", fr: "Coffrets Cadeaux", ar: "علب الهدايا" },
  { href: "#order", fr: "Commander", ar: "اطلب" },
];

export default function Navbar() {
  const { cart, setCartOpen, lang, setLang } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const count = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-cream/90 backdrop-blur-md shadow-sm" : "bg-transparent"
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
                {lang === "fr" ? l.fr : l.ar}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "fr" ? "ar" : "fr")}
              className="text-xs font-semibold text-cocoa/70 hover:text-cocoa border border-cocoa/20 rounded-full px-3 py-1.5"
              aria-label="Changer de langue"
            >
              {lang === "fr" ? "FR | عر" : "عر | FR"}
            </button>
            <a href="#order" className="hidden sm:inline-flex btn-rose !py-2.5 !px-5 text-sm">
              {lang === "fr" ? "Commander" : "اطلب"}
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-cocoa/5 transition"
              aria-label="Panier"
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
              aria-label="Menu"
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
            <button onClick={() => setOpen(false)} aria-label="Fermer"><X className="w-6 h-6" /></button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl italic text-cream hover:text-rose transition"
              >
                {lang === "fr" ? l.fr : l.ar}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
