import { Plus } from "lucide-react";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

const badgeMap = {
  bestseller: { label: "Coup de cœur", cls: "bg-rose text-cocoa" },
  nouveau: { label: "Nouveau", cls: "bg-pistachio text-cocoa" },
  coup: { label: "Coup de cœur", cls: "bg-rose text-cocoa" },
};

export default function Products() {
  const add = useStore((s) => s.add);
  return (
    <section id="products" className="py-24 lg:py-32 paper-texture">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <p className="font-hand text-2xl text-caramel">— Nos Créations —</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            Ce qui rend nos clients accros.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => {
            const b = p.badge ? badgeMap[p.badge] : null;
            return (
              <article
                key={p.id}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-500 hover:-translate-y-1.5 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {b && <span className={`ribbon ${b.cls}`}>{b.label}</span>}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${p.name} — Zey's Sweetness`}
                    loading="lazy"
                    className="w-full h-full object-cover img-warm transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-cocoa">{p.name}</h3>
                  <p className="text-sm text-cocoa/60">{p.desc}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-hand text-3xl text-caramel">{p.price} MAD</span>
                    <button
                      onClick={() => {
                        add(p);
                        toast.success("Ajouté au panier ✓", { description: p.name });
                      }}
                      className="btn-rose !py-2.5 !px-4 text-sm"
                      aria-label={`Ajouter ${p.name} au panier`}
                    >
                      <Plus className="w-4 h-4" /> Ajouter
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
