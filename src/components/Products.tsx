import { Plus } from "lucide-react";
import { products } from "@/lib/products";
import { useStore, localized } from "@/lib/store";
import { t } from "@/lib/i18n";
import { toast } from "sonner";

export default function Products() {
  const { add, lang, setCartOpen } = useStore();
  return (
    <section id="products" className="py-24 lg:py-32 paper-texture">
      <div className="container mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12 lg:mb-16">
          <p className="font-hand text-2xl text-caramel">{t("products.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("products.title", lang)}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p, i) => {
            const badgeText =
              p.badge === "nouveau"
                ? t("products.badge.nouveau", lang)
                : p.badge
                ? t("products.badge.bestseller", lang)
                : null;
            const badgeCls = p.badge === "nouveau" ? "bg-pistachio text-cocoa" : "bg-rose text-cocoa";
            const name = localized(p.name, lang);
            return (
              <article
                key={p.id}
                className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-all duration-500 hover:-translate-y-1.5 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {badgeText && <span className={`ribbon ${badgeCls}`}>{badgeText}</span>}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${name} — Zey's Sweetness`}
                    loading="lazy"
                    className="w-full h-full object-cover img-warm transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-cocoa">{name}</h3>
                  <p className="text-sm text-cocoa/60">{localized(p.desc, lang)}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-hand text-3xl text-caramel">
                      {p.price} {lang === "fr" ? "MAD" : "درهم"}
                    </span>
                    <button
                      onClick={() => {
                        add(p);
                        setCartOpen(true);
                        toast.success(t("products.added", lang), { description: name });
                      }}
                      className="btn-rose !py-2.5 !px-4 text-sm"
                      aria-label={`${t("products.add", lang)} ${name}`}
                    >
                      <Plus className="w-4 h-4" /> {t("products.add", lang)}
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
