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

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-10 max-w-3xl mx-auto reveal-stagger">
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
                className="group relative bg-card rounded-3xl overflow-hidden shadow-card card-premium"
              >
                {badgeText && <span className={`ribbon ${badgeCls}`}>{badgeText}</span>}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={`${name} — Zey's Sweetness · Rabat & Témara`}
                    loading="lazy"
                    className="w-full h-full object-cover img-warm transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.07]"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display font-bold text-xl text-cocoa">{name}</h3>
                  <p className="text-sm text-cocoa/60">{localized(p.desc, lang)}</p>
                  <p
                    className="text-[11px] text-cocoa/55 italic flex items-start gap-1.5 pt-1"
                    title={t("allergen", lang)}
                  >
                    <span aria-hidden="true">⚠</span>
                    <span><span className="font-semibold not-italic">{t("allergen.short", lang)} :</span> {t("allergen", lang).replace(/^[^:]+:\s*/, "")}</span>
                  </p>
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
