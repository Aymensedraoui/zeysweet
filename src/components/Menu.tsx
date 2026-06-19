import { useState } from "react";
import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Gift, ArrowLeft, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import datesImg from "@/assets/product-dates.jpg";
import BoxBuilder, { type Line } from "./BoxBuilder";
import americanHero from "@/assets/american-classic-hero.png.asset.json";
import newyorkHero from "@/assets/newyork-cookie-hero.png.asset.json";

function waUrlForItem(productLabel: string, price: number, source: string, lang: "fr" | "ar") {
  const lines =
    lang === "ar"
      ? [
          "مرحبا حلاوة زي 🍪",
          "أود أن أطلب :",
          "",
          `• ${productLabel} — ${price} درهم`,
          "",
          "📍 الرباط / تمارة",
          "💵 الدفع نقدا عند التسليم",
          "",
          "شكرا 🤍",
        ]
      : [
          "Bonjour Zey's Sweetness 🍪",
          "Je souhaite commander :",
          "",
          `• ${productLabel} — ${price} MAD`,
          "",
          "📍 Rabat / Témara",
          "💵 Paiement à la livraison",
          "",
          "Merci 🤍",
          `(réf : ${source})`,
        ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function waUrlForFamily(title: string, lang: "fr" | "ar") {
  const text =
    lang === "ar"
      ? `مرحبا حلاوة زي 🍪\nأرغب في طلب من ${title}. هل يمكنكم مساعدتي ؟\nشكرا 🤍`
      : `Bonjour Zey's Sweetness 🍪\nJe souhaite commander dans la gamme ${title}. Pouvez-vous me conseiller ?\nMerci 🤍`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function DatesBanner({ lang }: { lang: "fr" | "ar" }) {
  const price = 120;
  const productLabel = "Dattes Farcies aux Cajou — Boîte de 12";
  const addItem = useCart((s) => s.addItem);
  const addToCart = () => {
    addItem({
      kind: "dates",
      title: productLabel,
      unitPrice: price,
      image: datesImg,
    });
    toast.success("Ajoutée au panier 🛒");
  };
  return (
    <article className="bg-card rounded-3xl shadow-card card-premium overflow-hidden grid md:grid-cols-5">
      <div className="md:col-span-2 aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
        <img
          src={datesImg}
          alt="Dattes Medjool farcies aux noix de cajou — Zey's Sweetness, Rabat & Témara"
          loading="lazy"
          width={1024}
          height={768}
          className="w-full h-full object-cover img-warm"
        />
      </div>
      <div className="md:col-span-3 p-7 lg:p-10 flex flex-col gap-5 justify-center">
        <span className="inline-flex items-center gap-1.5 self-start text-[11px] uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full bg-rose/20 text-cocoa">
          <Gift className="w-3 h-3" aria-hidden="true" /> Format cadeau
        </span>
        <h3 className="font-display font-bold italic text-3xl lg:text-4xl text-cocoa">
          Dattes Farcies aux Cajou
        </h3>
        <p className="text-cocoa/70 leading-relaxed">
          Dattes Medjool farcies à la main à la crème de noix de cajou maison. Présentation
          luxe dorée, parfaite à offrir pour vos cadeaux, mariages et tables de Ramadan.
        </p>
        <div className="flex items-end gap-4 pt-1">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/55">Boîte de 12</p>
            <p className="font-hand text-4xl text-caramel leading-none mt-1">{price} MAD</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={addToCart}
            className="btn-rose text-sm inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Ajouter au panier
          </button>
          <a
            href={waUrlForItem(productLabel, price, "menu-dattes-12", lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("menu-dattes-12")}
            className="btn-outline-cocoa text-sm"
          >
            Commander direct WhatsApp
          </a>
          <a
            href={waUrlForFamily("Dattes Farcies (mariage / corporate)", lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("menu-dattes-bulk")}
            className="btn-outline-cocoa text-sm"
          >
            Mariage & corporate
          </a>
        </div>
      </div>
    </article>
  );
}

const LINES: { id: Line; name: string; tagline: string; desc: string; flavorsLabel: string; priceFrom: string; image: string; accent: string }[] = [
  {
    id: "american",
    name: "American Classic",
    tagline: "Soft-baked, fondant, signature",
    desc: "Le cookie tel qu'on l'aime : doré, soft-baked, pépites de chocolat au lait et fleur de sel. Une seule saveur, parfaitement maîtrisée.",
    flavorsLabel: "Original — Chocolat & fleur de sel",
    priceFrom: "dès 35 MAD",
    image: americanHero.url,
    accent: "from-caramel/20 to-cream",
  },
  {
    id: "newyork",
    name: "New York Cookie",
    tagline: "Épais, fourré, généreux",
    desc: "Le cookie style new-yorkais : épais, moelleux à cœur, fourré à la commande. 7 saveurs à mixer librement dans votre boîte.",
    flavorsLabel: "7 saveurs · Mix & Match",
    priceFrom: "dès 110 MAD",
    image: newyorkHero.url,
    accent: "from-rose/20 to-cream",
  },
];

export default function Menu() {
  const lang = useStore((s) => s.lang);
  const [selectedLine, setSelectedLine] = useState<Line | null>(null);

  return (
    <section id="products" className="py-24 lg:py-32 paper-texture scroll-mt-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="font-hand text-2xl text-caramel">— Notre Carte —</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            {selectedLine
              ? `Composez votre boîte ${LINES.find((l) => l.id === selectedLine)?.name}`
              : "Deux signatures, un savoir-faire"}
          </h2>
          <p className="text-cocoa/70 mt-5 text-base lg:text-lg">
            {selectedLine
              ? "Choisissez votre format, votre taille, on s'occupe du reste."
              : "Choisissez votre gamme : l'American Classic soft-baked ou la New York épaisse & fourrée."}
          </p>
          <p className="text-xs text-cocoa/55 mt-3">Commande minimum 70 MAD · Livraison Rabat & Témara</p>
        </div>

        {/* Chooser OR Builder */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          {selectedLine === null ? (
            <div className="grid md:grid-cols-2 gap-5 lg:gap-7">
              {LINES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLine(l.id)}
                  className="group relative text-left rounded-[28px] overflow-hidden border border-cocoa/10 bg-card shadow-card hover:shadow-[0_24px_60px_-20px_hsl(20_30%_20%/0.35)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={l.image}
                      alt={`${l.name} — Zey's Sweetness`}
                      loading="lazy"
                      className="w-full h-full object-cover img-warm transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${l.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply`} />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/95 backdrop-blur text-[11px] uppercase tracking-[0.2em] font-semibold text-cocoa">
                      {l.flavorsLabel}
                    </span>
                  </div>
                  <div className="p-6 lg:p-8">
                    <p className="font-hand text-lg text-caramel leading-none">— {l.tagline} —</p>
                    <h3 className="font-display font-bold italic text-3xl lg:text-4xl text-cocoa mt-1.5">
                      {l.name}
                    </h3>
                    <p className="text-sm text-cocoa/70 mt-3 leading-relaxed">{l.desc}</p>
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-cocoa/10">
                      <span className="font-hand text-2xl text-caramel">{l.priceFrom}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa group-hover:text-rose transition-colors">
                        Composer ma boîte
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/95 backdrop-blur flex items-center justify-center text-cocoa group-hover:bg-rose group-hover:text-cream transition-all">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              {/* Inline back button — branded, clearly visible */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <button
                  onClick={() => {
                    setSelectedLine(null);
                    requestAnimationFrame(() => {
                      document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-cocoa/20 bg-card hover:border-rose hover:bg-rose/5 px-4 py-2.5 text-sm font-semibold text-cocoa shadow-sm hover:shadow-md transition-all"
                  aria-label="Revenir au choix des gammes"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  Changer de gamme
                </button>
                <span className="text-xs text-cocoa/55 hidden sm:inline">
                  Vous composez : <span className="font-semibold text-cocoa">{LINES.find((l) => l.id === selectedLine)?.name}</span>
                </span>
              </div>

              <BoxBuilder line={selectedLine} />

              {/* Floating mobile back-pill — always reachable */}
              <button
                onClick={() => {
                  setSelectedLine(null);
                  requestAnimationFrame(() => {
                    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  });
                }}
                className="md:hidden fixed left-4 z-40 inline-flex items-center gap-2 rounded-full bg-cocoa text-cream px-4 py-3 text-xs font-semibold shadow-warm border border-cream/20 backdrop-blur active:scale-95 transition-transform"
                style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
                aria-label="Revenir au choix des gammes"
              >
                <ArrowLeft className="w-4 h-4" />
                Changer de gamme
              </button>
            </div>
          )}
        </div>


        {/* Dates section */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <span className="h-px flex-1 bg-cocoa/15" />
            <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa whitespace-nowrap">
              Nos Dattes Farcies
            </h3>
            <span className="h-px flex-1 bg-cocoa/15" />
          </div>
          <DatesBanner lang={lang} />
        </div>

        {/* Practical info */}
        <div className="max-w-4xl mx-auto mt-16 lg:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {[
            { t: "Commande WhatsApp", s: "Direct, sans friction" },
            { t: "Réponse < 1 heure", s: "Pendant nos horaires" },
            { t: "Livraison Rabat & Témara", s: "Soignée, sous 24h" },
            { t: "Paiement à la livraison", s: "Cash à la remise" },
          ].map((b) => (
            <div key={b.t} className="rounded-2xl border border-cocoa/10 bg-card/70 px-4 py-4">
              <p className="text-sm font-semibold text-cocoa">{b.t}</p>
              <p className="text-xs text-cocoa/65 mt-1">{b.s}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-cocoa/55 mt-4">
          Horaires : Lundi – Samedi · 10h – 20h
        </p>
      </div>
    </section>
  );
}
