import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { Sparkles, Gift, Users } from "lucide-react";

type Item = {
  id: string;
  name: string;
  price: number;
  type: "unit" | "box";
  badge?: "top" | "share" | "gift";
};

type Family = {
  id: string;
  title: string;
  desc: string;
  accent: string; // bg color class for header chip
  items: Item[];
};

const FAMILIES: Family[] = [
  {
    id: "ny",
    title: "New York Cookies",
    desc: "Cookies généreux, fondants au cœur, gourmands et élégants — en format maxi ou mini.",
    accent: "bg-caramel/15 text-caramel",
    items: [
      { id: "ny-maxi-u", name: "New York Cookie Maxi", price: 30, type: "unit" },
      { id: "ny-mini-u", name: "New York Cookie Mini", price: 15, type: "unit" },
      { id: "ny-maxi-4", name: "Boîte de 4 New York Cookies Maxi", price: 110, type: "box", badge: "share" },
      { id: "ny-maxi-6", name: "Boîte de 6 New York Cookies Maxi", price: 160, type: "box", badge: "top" },
      { id: "ny-maxi-10", name: "Boîte de 10 New York Cookies Maxi", price: 250, type: "box", badge: "gift" },
      { id: "ny-mini-10", name: "Boîte de 10 Mini New York Cookies", price: 130, type: "box", badge: "share" },
      { id: "ny-mini-20", name: "Boîte de 20 Mini New York Cookies", price: 260, type: "box", badge: "gift" },
    ],
  },
  {
    id: "am",
    title: "American Cookies",
    desc: "Une version plus classique et réconfortante, parfaite au quotidien — en format maxi ou mini.",
    accent: "bg-pistachio/25 text-cocoa",
    items: [
      { id: "am-maxi-u", name: "American Cookie Maxi", price: 20, type: "unit" },
      { id: "am-mini-u", name: "American Cookie Mini", price: 10, type: "unit" },
      { id: "am-maxi-4", name: "Boîte de 4 American Cookies Maxi", price: 70, type: "box", badge: "share" },
      { id: "am-maxi-8", name: "Boîte de 8 American Cookies Maxi", price: 140, type: "box", badge: "top" },
      { id: "am-maxi-12", name: "Boîte de 12 American Cookies Maxi", price: 190, type: "box", badge: "gift" },
      { id: "am-mini-4", name: "Boîte de 4 Mini American Cookies", price: 35, type: "box" },
      { id: "am-mini-8", name: "Boîte de 8 Mini American Cookies", price: 65, type: "box", badge: "share" },
      { id: "am-mini-12", name: "Boîte de 12 Mini American Cookies", price: 100, type: "box", badge: "gift" },
    ],
  },
  {
    id: "dattes",
    title: "Dattes Farcies",
    desc: "Dattes Medjool farcies à la main à la crème de noix de cajou — présentation luxe dorée, parfaite à offrir.",
    accent: "bg-rose/20 text-cocoa",
    items: [
      { id: "dattes-12", name: "Dattes Farcies aux Cajou — Boîte de 12", price: 120, type: "box", badge: "gift" },
    ],
  },
];

const BADGE_LABEL: Record<NonNullable<Item["badge"]>, { label: string; icon: typeof Sparkles }> = {
  top: { label: "Le plus commandé", icon: Sparkles },
  share: { label: "Idéal à partager", icon: Users },
  gift: { label: "Format cadeau", icon: Gift },
};

function waUrl(item: Item, source: string, lang: "fr" | "ar") {
  const lines =
    lang === "ar"
      ? [
          "مرحبا حلاوة زي 🍪",
          "أود أن أطلب :",
          "",
          `• ${item.name} — ${item.price} درهم`,
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
          `• ${item.name} — ${item.price} MAD`,
          "",
          "📍 Rabat / Témara",
          "💵 Paiement à la livraison",
          "",
          "Merci 🤍",
          `(réf : ${source})`,
        ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function familyWaUrl(family: Family, lang: "fr" | "ar") {
  const text =
    lang === "ar"
      ? `مرحبا حلاوة زي 🍪\nأرغب في معرفة المزيد عن ${family.title}.\nشكرا 🤍`
      : `Bonjour Zey's Sweetness 🍪\nJe souhaite commander dans la gamme ${family.title}. Pouvez-vous me conseiller ?\nMerci 🤍`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
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

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {FAMILIES.map((fam) => {
            const units = fam.items.filter((i) => i.type === "unit");
            const boxes = fam.items.filter((i) => i.type === "box");
            return (
              <article
                key={fam.id}
                className="bg-card rounded-3xl shadow-card card-premium overflow-hidden flex flex-col"
              >
                <header className="p-6 lg:p-7 border-b border-cocoa/10">
                  <span className={`inline-block text-[11px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full ${fam.accent}`}>
                    Collection
                  </span>
                  <h3 className="font-display font-bold text-2xl lg:text-3xl text-cocoa mt-3">
                    {fam.title}
                  </h3>
                  <p className="text-sm text-cocoa/70 mt-2 leading-relaxed">{fam.desc}</p>
                </header>

                <div className="p-6 lg:p-7 flex-1 flex flex-col gap-6">
                  {/* Boxes — emphasized */}
                  {boxes.length > 0 && (
                    <div>
                      <p className="font-hand text-xl text-caramel mb-3">Nos boîtes</p>
                      <ul className="space-y-2.5">
                        {boxes.map((it) => (
                          <li
                            key={it.id}
                            className="group flex items-center justify-between gap-3 rounded-2xl border border-cocoa/10 bg-cream/50 px-4 py-3 hover:border-rose/50 hover:bg-rose/5 transition-colors"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-[15px] font-semibold text-cocoa leading-snug">
                                {it.name.replace(/^Boîte de \d+\s/, (m) => m)}
                              </p>
                              {it.badge && (
                                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-caramel">
                                  {(() => {
                                    const B = BADGE_LABEL[it.badge].icon;
                                    return <B className="w-3 h-3" aria-hidden="true" />;
                                  })()}
                                  {BADGE_LABEL[it.badge].label}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-hand text-2xl text-caramel whitespace-nowrap">
                                {it.price} MAD
                              </span>
                              <a
                                href={waUrl(it, `menu-${it.id}`, lang)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick(`menu-${it.id}`)}
                                className="btn-rose !py-2 !px-3 text-xs"
                                aria-label={`Commander ${it.name} sur WhatsApp`}
                              >
                                Commander
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Units — secondary */}
                  {units.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-cocoa/55 mb-3">
                        À l'unité
                      </p>
                      <ul className="divide-y divide-cocoa/10">
                        {units.map((it) => (
                          <li key={it.id} className="flex items-center justify-between gap-3 py-2.5">
                            <span className="text-sm text-cocoa/85">{it.name}</span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="text-sm font-semibold text-cocoa whitespace-nowrap">
                                {it.price} MAD
                              </span>
                              <a
                                href={waUrl(it, `menu-${it.id}`, lang)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick(`menu-${it.id}`)}
                                className="text-xs font-medium text-cocoa/70 hover:text-rose underline-offset-4 hover:underline"
                                aria-label={`Commander ${it.name} sur WhatsApp`}
                              >
                                Commander →
                              </a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <a
                    href={familyWaUrl(fam, lang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`menu-family-${fam.id}`)}
                    className="btn-outline-cocoa text-sm mt-auto justify-center"
                  >
                    Commander sur WhatsApp
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Practical info */}
        <div className="max-w-4xl mx-auto mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
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
