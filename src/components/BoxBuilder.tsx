import { useMemo, useState } from "react";
import { Minus, Plus, Check, Sparkles, Gift, Users } from "lucide-react";
import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";

import imgOriginal from "@/assets/cookie-original.jpg";
import imgRedVelvet from "@/assets/cookie-redvelvet.jpg";
import imgPistachio from "@/assets/cookie-pistachio.jpg";
import imgOreo from "@/assets/cookie-oreo.jpg";
import imgLotus from "@/assets/cookie-lotus.jpg";
import imgNutella from "@/assets/cookie-nutella.jpg";
import imgFramboise from "@/assets/cookie-framboise.jpg";

type Lang = "fr" | "ar";
type Format = "maxi" | "mini";

type Flavor = {
  id: string;
  name: string;
  desc: string;
  image: string;
  accent: string; // hex tint for the card halo
};

const FLAVORS: Flavor[] = [
  { id: "original", name: "Original", desc: "Chocolat noir & pépites — le classique signature.", image: imgOriginal, accent: "#a45a2a" },
  { id: "redvelvet", name: "Red Velvet", desc: "Cacao rouge, chocolat blanc, cœur cream cheese.", image: imgRedVelvet, accent: "#b8324a" },
  { id: "pistachio", name: "Pistache", desc: "Pistaches torréfiées & glaçage chocolat blanc.", image: imgPistachio, accent: "#7da06a" },
  { id: "oreo", name: "Oreo", desc: "Cookie cacao chargé d'éclats Oreo et de crème.", image: imgOreo, accent: "#2d2522" },
  { id: "lotus", name: "Lotus Biscoff", desc: "Caramel Biscoff fondant, biscuit croustillant.", image: imgLotus, accent: "#c6863a" },
  { id: "nutella", name: "Nutella", desc: "Cœur coulant Nutella, généreusement fourré.", image: imgNutella, accent: "#5a2d1a" },
  { id: "framboise", name: "Framboise", desc: "Framboise fraîche & éclats de chocolat blanc.", image: imgFramboise, accent: "#d65a7a" },
];

type BoxOption = {
  size: number;
  price: number;
  label?: string;
  icon?: typeof Sparkles;
};

const BOXES: Record<Format, BoxOption[]> = {
  maxi: [
    { size: 4, price: 110, label: "Pour deux", icon: Users },
    { size: 6, price: 160, label: "Le plus commandé", icon: Sparkles },
    { size: 10, price: 250, label: "Format cadeau", icon: Gift },
    { size: 12, price: 290 },
  ],
  mini: [
    { size: 6, price: 80, label: "À grignoter" },
    { size: 10, price: 130, label: "Le plus commandé", icon: Sparkles },
    { size: 20, price: 260, label: "Format cadeau", icon: Gift },
  ],
};

const FORMAT_LABEL: Record<Format, { fr: string; ar: string; sub: string }> = {
  maxi: { fr: "Maxi", ar: "كبير", sub: "≈ 80g · format généreux" },
  mini: { fr: "Mini", ar: "صغير", sub: "≈ 35g · format bouchée" },
};

function buildBoxLink(opts: {
  lang: Lang;
  format: Format;
  size: number;
  price: number;
  composition: { id: string; name: string; qty: number }[];
}) {
  const { lang, format, size, price, composition } = opts;
  const formatLabel = format === "maxi" ? "Maxi" : "Mini";
  const lines =
    lang === "ar"
      ? [
          "مرحبا حلاوة زي 🍪",
          "أود طلب صندوق مختار :",
          "",
          `🍪 صندوق ${size} كوكيز ${formatLabel} — ${price} درهم`,
          ...composition.map((c) => `• ${c.qty}× ${c.name}`),
          "",
          "📍 الرباط / تمارة",
          "💵 الدفع نقدا عند التسليم",
          "",
          "شكرا 🤍",
        ]
      : [
          "Bonjour Zey's Sweetness 🍪",
          "Je souhaite commander ma boîte sur mesure :",
          "",
          `🍪 Boîte de ${size} cookies ${formatLabel} — ${price} MAD`,
          ...composition.map((c) => `• ${c.qty}× ${c.name}`),
          "",
          "📍 Rabat / Témara",
          "💵 Paiement à la livraison",
          "",
          "Merci 🤍",
          "(réf : box-builder)",
        ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function BoxBuilder() {
  const lang = useStore((s) => s.lang) as Lang;
  const [format, setFormat] = useState<Format>("maxi");
  const [boxIndex, setBoxIndex] = useState(1); // default: 6 maxi
  const [qty, setQty] = useState<Record<string, number>>({});

  const box = BOXES[format][boxIndex] ?? BOXES[format][0];
  const total = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);
  const remaining = Math.max(0, box.size - total);
  const isComplete = total === box.size;

  const composition = useMemo(
    () =>
      FLAVORS.filter((f) => qty[f.id] > 0).map((f) => ({
        id: f.id,
        name: f.name,
        qty: qty[f.id],
      })),
    [qty]
  );

  function changeFormat(f: Format) {
    setFormat(f);
    setBoxIndex(f === "maxi" ? 1 : 1);
    setQty({});
  }

  function changeBox(idx: number) {
    setBoxIndex(idx);
    setQty({});
  }

  function inc(id: string) {
    setQty((q) => {
      const current = q[id] ?? 0;
      if (total >= box.size) return q;
      return { ...q, [id]: current + 1 };
    });
  }
  function dec(id: string) {
    setQty((q) => {
      const current = q[id] ?? 0;
      if (current <= 0) return q;
      const next = { ...q, [id]: current - 1 };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }
  function reset() {
    setQty({});
  }

  const link = buildBoxLink({
    lang,
    format,
    size: box.size,
    price: box.price,
    composition,
  });

  return (
    <div className="relative">
      {/* Builder shell */}
      <div className="rounded-[28px] border border-cocoa/10 bg-card/95 shadow-card overflow-hidden">
        {/* Top: format + size selectors */}
        <div className="border-b border-cocoa/10 bg-cream/60 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-hand text-xl text-caramel leading-none">— Étape 1 —</p>
              <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa mt-1">
                Choisissez votre format & taille
              </h3>
            </div>

            {/* Format toggle */}
            <div className="inline-flex p-1 rounded-full border border-cocoa/15 bg-card shrink-0 self-start lg:self-end">
              {(["maxi", "mini"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => changeFormat(f)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    format === f
                      ? "bg-cocoa text-cream shadow-sm"
                      : "text-cocoa/70 hover:text-cocoa"
                  }`}
                  aria-pressed={format === f}
                >
                  {FORMAT_LABEL[f].fr}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-cocoa/60 mt-2">{FORMAT_LABEL[format].sub}</p>

          {/* Box size cards */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BOXES[format].map((b, i) => {
              const active = i === boxIndex;
              const Icon = b.icon;
              return (
                <button
                  key={b.size}
                  onClick={() => changeBox(i)}
                  className={`relative text-left rounded-2xl border px-4 py-3.5 transition-all ${
                    active
                      ? "border-rose bg-rose/10 ring-2 ring-rose/30"
                      : "border-cocoa/15 bg-card hover:border-cocoa/30 hover:bg-cream/80"
                  }`}
                  aria-pressed={active}
                >
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
                    Boîte de
                  </p>
                  <p className="font-display font-bold text-2xl text-cocoa leading-none mt-1">
                    {b.size}
                  </p>
                  <p className="font-hand text-lg text-caramel mt-1">{b.price} MAD</p>
                  {b.label && (
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-medium text-cocoa/70">
                      {Icon && <Icon className="w-2.5 h-2.5" aria-hidden="true" />}
                      {b.label}
                    </span>
                  )}
                  {active && (
                    <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-rose flex items-center justify-center">
                      <Check className="w-3 h-3 text-cream" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: flavors */}
        <div className="p-6 lg:p-8">
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <p className="font-hand text-xl text-caramel leading-none">— Étape 2 —</p>
              <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa mt-1">
                Composez vos saveurs
              </h3>
              <p className="text-sm text-cocoa/65 mt-1">
                Mixez librement parmi nos {FLAVORS.length} saveurs — autant que vous voulez de chacune.
              </p>
            </div>
            {total > 0 && (
              <button
                onClick={reset}
                className="text-xs text-cocoa/60 hover:text-rose underline-offset-4 hover:underline shrink-0"
              >
                Réinitialiser
              </button>
            )}
          </div>

          {/* Progress */}
          <div className="mb-5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-cocoa">
                {total} / {box.size} cookies sélectionnés
              </span>
              <span className="text-cocoa/60">
                {isComplete ? "Boîte complète 🤍" : `Encore ${remaining} à choisir`}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-cocoa/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose to-caramel transition-all duration-500"
                style={{ width: `${Math.min(100, (total / box.size) * 100)}%` }}
              />
            </div>
          </div>

          {/* Flavors grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
            {FLAVORS.map((f) => {
              const count = qty[f.id] ?? 0;
              const active = count > 0;
              const disabled = !active && remaining === 0;
              return (
                <div
                  key={f.id}
                  className={`group relative rounded-2xl overflow-hidden border transition-all ${
                    active
                      ? "border-rose shadow-[0_8px_28px_-12px_hsl(355_60%_70%/0.55)] ring-2 ring-rose/30"
                      : disabled
                        ? "border-cocoa/10 opacity-50"
                        : "border-cocoa/10 hover:border-cocoa/30 hover:shadow-card"
                  } bg-card`}
                >
                  <button
                    type="button"
                    onClick={() => !disabled && inc(f.id)}
                    disabled={disabled}
                    className="block w-full text-left disabled:cursor-not-allowed"
                    aria-label={`Ajouter ${f.name} à la boîte`}
                  >
                    <div className="aspect-square overflow-hidden bg-cream relative">
                      <img
                        src={f.image}
                        alt={`Cookie ${f.name} — Zey's Sweetness`}
                        loading="lazy"
                        width={512}
                        height={512}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      {active && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-rose text-cream text-[11px] font-bold font-display">
                          ×{count}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-display font-bold text-[15px] text-cocoa leading-tight">
                        {f.name}
                      </p>
                      <p className="text-[11px] text-cocoa/65 leading-snug mt-0.5 line-clamp-2">
                        {f.desc}
                      </p>
                    </div>
                  </button>

                  {/* Stepper */}
                  <div className="px-3 pb-3 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-full border border-cocoa/15 bg-cream/70">
                      <button
                        onClick={() => dec(f.id)}
                        disabled={count === 0}
                        className="w-7 h-7 flex items-center justify-center text-cocoa hover:text-rose disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label={`Retirer un ${f.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-cocoa tabular-nums">
                        {count}
                      </span>
                      <button
                        onClick={() => !disabled && inc(f.id)}
                        disabled={disabled}
                        className="w-7 h-7 flex items-center justify-center text-cocoa hover:text-rose disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label={`Ajouter un ${f.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {active && (
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ backgroundColor: f.accent }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary bar */}
        <div className="sticky bottom-0 z-10 border-t border-cocoa/10 bg-cream/95 backdrop-blur-md p-4 lg:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
                Votre boîte
              </p>
              <p className="text-sm text-cocoa truncate">
                <span className="font-semibold">
                  Boîte de {box.size} cookies {FORMAT_LABEL[format].fr}
                </span>
                {composition.length > 0 && (
                  <span className="text-cocoa/65">
                    {" · "}
                    {composition.map((c) => `${c.qty}× ${c.name}`).join(", ")}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-hand text-3xl text-caramel leading-none">
                {box.price} MAD
              </span>
              {isComplete ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("box-builder")}
                  className="btn-rose btn-glow !py-3 !px-5 text-sm"
                >
                  Commander sur WhatsApp
                </a>
              ) : (
                <button
                  disabled
                  className="btn-rose !py-3 !px-5 text-sm opacity-50 cursor-not-allowed"
                  title={`Encore ${remaining} cookies à choisir`}
                >
                  {remaining} restant{remaining > 1 ? "s" : ""}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
