import { Instagram } from "lucide-react";
import cookie from "@/assets/product-cookie.jpg";
import brownie from "@/assets/product-brownie.jpg";
import cheese from "@/assets/product-cheesecake.jpg";
import dates from "@/assets/product-dates.jpg";
import cake from "@/assets/product-cake.jpg";
import gift from "@/assets/product-giftbox.jpg";

const imgs = [cookie, brownie, cheese, dates, cake, gift];

export default function Gallery() {
  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="font-hand text-2xl text-caramel">@zeys.sweetness</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            La vie est plus douce avec Zey's.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto">
          {imgs.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl group block"
            >
              <img src={src} alt={`Zey's Sweetness Instagram post ${i + 1}`} loading="lazy" className="w-full h-full object-cover img-warm group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-cocoa/0 group-hover:bg-cocoa/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram className="w-8 h-8 text-cream" />
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-outline-cocoa">
            <Instagram className="w-4 h-4" /> Suivre @zeys.sweetness
          </a>
        </div>
      </div>
    </section>
  );
}
