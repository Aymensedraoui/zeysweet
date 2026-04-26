import { Instagram, MessageCircle, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream/85 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] text-[20rem] font-display italic flex items-center justify-center pointer-events-none select-none">
        🍪
      </div>
      <div className="container mx-auto grid md:grid-cols-4 gap-10 relative">
        <div>
          <h3 className="font-display font-bold text-2xl text-cream">Zey's <span className="italic text-rose">Sweetness</span></h3>
          <p className="font-hand text-xl text-rose mt-2">Made with love. Tasted with joy.</p>
          <p className="text-sm mt-4 text-cream/60 max-w-xs">
            Pâtisserie artisanale, à la main, à Casablanca. Pour les bons moments — et tous les autres aussi.
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Liens</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#products" className="hover:text-rose">Nos produits</a></li>
            <li><a href="#gifts" className="hover:text-rose">Coffrets cadeaux</a></li>
            <li><a href="#story" className="hover:text-rose">À propos</a></li>
            <li><a href="#order" className="hover:text-rose">Commander</a></li>
            <li><a href="#" className="hover:text-rose">Livraison</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Instagram className="w-4 h-4 text-rose" /> @zeys.sweetness</li>
            <li className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-rose" /> +212 6 00 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-rose" /> contact@zeyssweetness.ma</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-cream mb-4">Paiement</h4>
          <div className="flex flex-wrap gap-2">
            {["WhatsApp", "Cash", "CMI", "Visa"].map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-md bg-cream/10 text-xs">{p}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-14 pt-6 border-t border-cream/10 text-center text-xs text-cream/50">
        © 2026 Zey's Sweetness — Fait avec <span className="text-rose">❤</span> au Maroc
      </div>
    </footer>
  );
}
