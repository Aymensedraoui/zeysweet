import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Gift } from "lucide-react";
import datesImg from "@/assets/product-dates.jpg";
import BoxBuilder from "./BoxBuilder";

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
          <a
            href={waUrlForItem(productLabel, price, "menu-dattes-12", lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("menu-dattes-12")}
            className="btn-rose text-sm"
          >
            Commander sur WhatsApp
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

export default function Menu() {
  const lang = useStore((s) => s.lang);

  return (
    <section id="products" className="py-24 lg:py-32 paper-texture">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <p className="font-hand text-2xl text-caramel">— Notre Carte —</p>
          <h2 className="font-display font-bold italic text-4xl lg:text-5xl text-cocoa mt-2">
            Nos Douceurs
          </h2>
          <p className="text-cocoa/70 mt-5 text-base lg:text-lg">
            Formats disponibles à l'unité et en boîte, pour vos envies du quotidien,
            vos cadeaux gourmands et vos commandes à partager.
          </p>
        </div>

        {/* Cookies section */}
        <div className="max-w-6xl mx-auto mb-16 lg:mb-20">
          <div className="flex items-center gap-4 mb-8 lg:mb-10">
            <span className="h-px flex-1 bg-cocoa/15" />
            <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa whitespace-nowrap">
              Nos Cookies
            </h3>
            <span className="h-px flex-1 bg-cocoa/15" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {COOKIES.map((c) => (
              <CookieCard key={c.id} cookie={c} lang={lang} />
            ))}
          </div>
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
