import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Sparkles, Gift, Users } from "lucide-react";
import nyImg from "@/assets/product-cookie-newyork.jpg";
import amImg from "@/assets/product-cookie-american.jpg";
import datesImg from "@/assets/product-dates.jpg";

type Format = "maxi" | "mini";
type Badge = "top" | "share" | "gift";

type Item = {
  id: string;
  label: string;       // shortened label, e.g. "Boîte de 6" or "À l'unité"
  price: number;
  type: "unit" | "box";
  format?: Format;
  badge?: Badge;
};

type Cookie = {
  id: string;
  title: string;
  desc: string;
  image: string;
  items: Item[];
};

const COOKIES: Cookie[] = [
  {
    id: "ny",
    title: "New York Cookies",
    desc: "Généreux, fondants au cœur, débordants de chocolat. La version la plus indulgente de la maison.",
    image: nyImg,
    items: [
      // Maxi
      { id: "ny-maxi-u", label: "À l'unité", price: 30, type: "unit", format: "maxi" },
      { id: "ny-maxi-4", label: "Boîte de 4", price: 110, type: "box", format: "maxi", badge: "share" },
      { id: "ny-maxi-6", label: "Boîte de 6", price: 160, type: "box", format: "maxi", badge: "top" },
      { id: "ny-maxi-10", label: "Boîte de 10", price: 250, type: "box", format: "maxi", badge: "gift" },
      // Mini
      { id: "ny-mini-u", label: "À l'unité", price: 15, type: "unit", format: "mini" },
      { id: "ny-mini-10", label: "Boîte de 10", price: 130, type: "box", format: "mini", badge: "share" },
      { id: "ny-mini-20", label: "Boîte de 20", price: 260, type: "box", format: "mini", badge: "gift" },
    ],
  },
  {
    id: "am",
    title: "American Cookies",
    desc: "Le classique réconfortant : pépites de chocolat, texture moelleuse, parfait au quotidien.",
    image: amImg,
    items: [
      // Maxi
      { id: "am-maxi-u", label: "À l'unité", price: 20, type: "unit", format: "maxi" },
      { id: "am-maxi-4", label: "Boîte de 4", price: 70, type: "box", format: "maxi", badge: "share" },
      { id: "am-maxi-8", label: "Boîte de 8", price: 140, type: "box", format: "maxi", badge: "top" },
      { id: "am-maxi-12", label: "Boîte de 12", price: 190, type: "box", format: "maxi", badge: "gift" },
      // Mini
      { id: "am-mini-u", label: "À l'unité", price: 10, type: "unit", format: "mini" },
      { id: "am-mini-4", label: "Boîte de 4", price: 35, type: "box", format: "mini" },
      { id: "am-mini-8", label: "Boîte de 8", price: 65, type: "box", format: "mini", badge: "share" },
      { id: "am-mini-12", label: "Boîte de 12", price: 100, type: "box", format: "mini", badge: "gift" },
    ],
  },
];

const BADGE_LABEL: Record<Badge, { label: string; icon: typeof Sparkles }> = {
  top: { label: "Le plus commandé", icon: Sparkles },
  share: { label: "Idéal à partager", icon: Users },
  gift: { label: "Format cadeau", icon: Gift },
};

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

function FormatGroup({
  title,
  items,
  productPrefix,
  lang,
}: {
  title: string;
  items: Item[];
  productPrefix: string;
  lang: "fr" | "ar";
}) {
  const boxes = items.filter((i) => i.type === "box");
  const unit = items.find((i) => i.type === "unit");
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-cocoa/70">
          Format {title}
        </p>
        {unit && (
          <a
            href={waUrlForItem(`${productPrefix} ${title} — à l'unité`, unit.price, `menu-${unit.id}`, lang)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick(`menu-${unit.id}`)}
            className="text-[12px] text-cocoa/65 hover:text-rose underline-offset-4 hover:underline"
          >
            À l'unité · {unit.price} MAD →
          </a>
        )}
      </div>
      <ul className="space-y-2">
        {boxes.map((it) => (
          <li
            key={it.id}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-cocoa/10 bg-cream/60 px-4 py-2.5 hover:border-rose/50 hover:bg-rose/5 transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-cocoa leading-snug">{it.label}</p>
              {it.badge && (
                <span className="inline-flex items-center gap-1 mt-0.5 text-[10.5px] font-medium text-caramel">
                  {(() => {
                    const B = BADGE_LABEL[it.badge].icon;
                    return <B className="w-3 h-3" aria-hidden="true" />;
                  })()}
                  {BADGE_LABEL[it.badge].label}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-hand text-xl text-caramel whitespace-nowrap">
                {it.price} MAD
              </span>
              <a
                href={waUrlForItem(`${productPrefix} ${title} — ${it.label}`, it.price, `menu-${it.id}`, lang)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`menu-${it.id}`)}
                className="btn-rose !py-1.5 !px-3 text-[11px]"
                aria-label={`Commander ${productPrefix} ${title} ${it.label} sur WhatsApp`}
              >
                Commander
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CookieCard({ cookie, lang }: { cookie: Cookie; lang: "fr" | "ar" }) {
  const maxi = cookie.items.filter((i) => i.format === "maxi");
  const mini = cookie.items.filter((i) => i.format === "mini");
  return (
    <article className="bg-card rounded-3xl shadow-card card-premium overflow-hidden flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={cookie.image}
          alt={`${cookie.title} — Zey's Sweetness, Rabat & Témara`}
          loading="lazy"
          width={1024}
          height={768}
          className="w-full h-full object-cover img-warm transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.05]"
        />
      </div>
      <div className="p-6 lg:p-7 flex-1 flex flex-col gap-6">
        <header>
          <h3 className="font-display font-bold text-2xl lg:text-3xl text-cocoa">{cookie.title}</h3>
          <p className="text-sm text-cocoa/70 mt-2 leading-relaxed">{cookie.desc}</p>
        </header>

        <FormatGroup title="Maxi" items={maxi} productPrefix={cookie.title} lang={lang} />
        <FormatGroup title="Mini" items={mini} productPrefix={cookie.title} lang={lang} />

        <a
          href={waUrlForFamily(cookie.title, lang)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(`menu-family-${cookie.id}`)}
          className="btn-outline-cocoa text-sm mt-auto justify-center"
        >
          Commander sur WhatsApp
        </a>
      </div>
    </article>
  );
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
