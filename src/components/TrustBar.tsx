import { Leaf, HandHeart, Package, Heart } from "lucide-react";

const items = [
  { icon: Leaf, title: "Ingrédients naturels", sub: "Sans conservateurs" },
  { icon: HandHeart, title: "Fait à la main", sub: "Petites fournées" },
  { icon: Package, title: "Livraison soignée", sub: "Casablanca 24h" },
  { icon: Heart, title: "Fait avec amour", sub: "Chaque bouchée" },
];

export default function TrustBar() {
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
            <h3 className="font-display font-semibold text-cocoa text-base">{it.title}</h3>
            <p className="text-xs text-cocoa/60">{it.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
