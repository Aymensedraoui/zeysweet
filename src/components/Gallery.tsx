import { Instagram } from "lucide-react";
import { useStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import cookie from "@/assets/product-cookie.jpg";
import dates from "@/assets/product-dates.jpg";
import giftCustom from "@/assets/gift-custom.jpg";

// Launch week: only show photos of products we actually sell.
const imgs = [cookie, dates, giftCustom, dates, cookie, giftCustom];

export default function Gallery() {
  const { lang } = useStore();
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="font-hand text-2xl text-caramel">{t("gal.eyebrow", lang)}</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {t("gal.title", lang)}
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto">
          {imgs.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/zeysweetness/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl group block"
            >
              <img src={src} alt={`Zey's Sweetness post ${i + 1}`} loading="lazy" className="w-full h-full object-cover img-warm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram className="w-8 h-8 text-cream" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://www.instagram.com/zeysweetness/" target="_blank" rel="noopener noreferrer" className="btn-outline-cocoa">
            <Instagram className="w-4 h-4" /> {t("gal.follow", lang)}
          </a>
        </div>
      </div>
    </section>
  );
}
