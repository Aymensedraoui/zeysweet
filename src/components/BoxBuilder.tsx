import { useMemo, useState } from "react";
import { Minus, Plus, Check, Sparkles, Gift, Users, AlertCircle, ShoppingBag } from "lucide-react";
import { useStore, WHATSAPP_NUMBER } from "@/lib/store";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

import imgOriginal from "@/assets/cookie-original.jpg";
import imgRedVelvet from "@/assets/cookie-redvelvet.jpg";
import imgPistachio from "@/assets/cookie-pistachio.jpg";
import imgOreo from "@/assets/cookie-oreo.jpg";
import imgLotus from "@/assets/cookie-lotus.jpg";
import imgNutella from "@/assets/cookie-nutella.jpg";
import imgFramboise from "@/assets/cookie-framboise.jpg";
import americanHero from "@/assets/american-classic-hero.png.asset.json";

type Lang = "fr" | "ar";
type Format = "maxi" | "mini";
export type Line = "newyork" | "american";

type Flavor = {
  id: string;
  name: string;
  desc: string;
  image: string;
  accent: string;
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

const NY_BOXES: Record<Format, BoxOption[]> = {
  maxi: [
    { size: 4, price: 110, label: "Pour deux", icon: Users },
    { size: 6, price: 160, label: "Le plus commandé", icon: Sparkles },
    { size: 10, price: 250, label: "Format cadeau", icon: Gift },
  ],
  mini: [
    { size: 10, price: 130, label: "Le plus commandé", icon: Sparkles },
    { size: 20, price: 260, label: "Format cadeau", icon: Gift },
  ],
};

const AMERICAN_BOXES: Record<Format, BoxOption[]> = {
  maxi: [
    { size: 4, price: 70, label: "Pour deux", icon: Users },
    { size: 8, price: 140, label: "Le plus commandé", icon: Sparkles },
    { size: 12, price: 190, label: "Format cadeau", icon: Gift },
  ],
  mini: [
    { size: 4, price: 35, label: "À grignoter" },
    { size: 8, price: 65 },
    { size: 12, price: 99, label: "Le plus commandé", icon: Sparkles },
  ],
};

const FORMAT_LABEL: Record<Format, { fr: string; sub: Record<Line, string> }> = {
  maxi: {
    fr: "Maxi",
    sub: { newyork: "≈ 80g · épais & fourré", american: "≈ 65g · soft-baked généreux" },
  },
  mini: {
    fr: "Mini",
    sub: { newyork: "≈ 35g · format bouchée", american: "≈ 30g · format bouchée" },
  },
};

const LINE_LABEL: Record<Line, string> = {
  newyork: "New York",
  american: "American Classic",
};

const MIN_ORDER = 70;

function buildBoxLink(opts: {
  lang: Lang;
  line: Line;
  format: Format;
  size: number;
  price: number;
  composition: { name: string; qty: number }[];
}) {
  const { lang, line, format, size, price, composition } = opts;
  const formatLabel = format === "maxi" ? "Maxi" : "Mini";
  const lineLabel = LINE_LABEL[line];
  const compLines = composition.length > 0 ? composition.map((c) => `• ${c.qty}× ${c.name}`) : [];
  const lines =
    lang === "ar"
      ? [
          "مرحبا حلاوة زي 🍪",
          "أود طلب :",
          "",
          `🍪 صندوق ${size} كوكيز ${lineLabel} ${formatLabel} — ${price} درهم`,
          ...compLines,
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
          `🍪 Boîte de ${size} cookies ${lineLabel} ${formatLabel} — ${price} MAD`,
          ...compLines,
          "",
          "📍 Rabat / Témara",
          "💵 Paiement à la livraison",
          "",
          "Merci 🤍",
          `(réf : box-${line})`,
        ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function BoxBuilder({ line }: { line: Line }) {
  const lang = useStore((s) => s.lang) as Lang;
  const CATALOG = line === "newyork" ? NY_BOXES : AMERICAN_BOXES;
  const [format, setFormat] = useState<Format>("maxi");
  const [boxIndex, setBoxIndex] = useState(1);
  const [qty, setQty] = useState<Record<string, number>>({});

  const box = CATALOG[format][boxIndex] ?? CATALOG[format][0];
  const total = useMemo(() => Object.values(qty).reduce((a, b) => a + b, 0), [qty]);
  const remaining = Math.max(0, box.size - total);
  const isComplete = line === "american" ? true : total === box.size;
  const underMinimum = box.price < MIN_ORDER;

  const composition = useMemo(
    () =>
      line === "american"
        ? []
        : FLAVORS.filter((f) => qty[f.id] > 0).map((f) => ({
            name: f.name,
            qty: qty[f.id],
          })),
    [qty, line]
  );

  function changeFormat(f: Format) {
    setFormat(f);
    setBoxIndex(Math.min(1, CATALOG[f].length - 1));
    setQty({});
  }
  function changeBox(idx: number) {
    setBoxIndex(idx);
    setQty({});
  }
  function inc(id: string) {
    setQty((q) => {
      if (total >= box.size) return q;
      return { ...q, [id]: (q[id] ?? 0) + 1 };
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
    line,
    format,
    size: box.size,
    price: box.price,
    composition,
  });

  const canOrder = isComplete && !underMinimum;

  return (
    <div className="relative">
      <div className="rounded-[28px] border border-cocoa/10 bg-card/95 shadow-card overflow-hidden">
        {/* Step 1: format + size */}
        <div className="border-b border-cocoa/10 bg-cream/60 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="font-hand text-xl text-caramel leading-none">— Étape 1 —</p>
              <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa mt-1">
                Choisissez votre format & taille
              </h3>
            </div>
            <div className="inline-flex p-1 rounded-full border border-cocoa/15 bg-card shrink-0 self-start lg:self-end">
              {(["maxi", "mini"] as Format[]).map((f) => (
                <button
                  key={f}
                  onClick={() => changeFormat(f)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    format === f ? "bg-cocoa text-cream shadow-sm" : "text-cocoa/70 hover:text-cocoa"
                  }`}
                  aria-pressed={format === f}
                >
                  {FORMAT_LABEL[f].fr}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-cocoa/60 mt-2">{FORMAT_LABEL[format].sub[line]}</p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CATALOG[format].map((b, i) => {
              const active = i === boxIndex;
              const Icon = b.icon;
              const tooSmall = b.price < MIN_ORDER;
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
                  {tooSmall && (
                    <span className="block mt-1 text-[10px] font-medium text-rose/90">
                      + une autre boîte (min. {MIN_ORDER} MAD)
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

        {/* Step 2: content */}
        <div className="p-6 lg:p-8">
          {line === "newyork" ? (
            <>
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

              <div className="mb-5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-cocoa">
                    {total} / {box.size} cookies sélectionnés
                  </span>
                  <span className="text-cocoa/60">
                    {total === box.size ? "Boîte complète 🤍" : `Encore ${remaining} à choisir`}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-cocoa/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose to-caramel transition-all duration-500"
                    style={{ width: `${Math.min(100, (total / box.size) * 100)}%` }}
                  />
                </div>
              </div>

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
                        aria-label={`Ajouter ${f.name}`}
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
                      <div className="px-3 pb-3 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-full border border-cocoa/15 bg-cream/70">
                          <button
                            onClick={() => dec(f.id)}
                            disabled={count === 0}
                            className="w-7 h-7 flex items-center justify-center text-cocoa hover:text-rose disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label={`Retirer ${f.name}`}
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
                            aria-label={`Ajouter ${f.name}`}
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
            </>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-cream">
                <img
                  src={americanHero.url}
                  alt="American Classic Cookie — chocolat & fleur de sel"
                  loading="lazy"
                  className="w-full h-full object-cover img-warm"
                />
              </div>
              <div>
                <p className="font-hand text-xl text-caramel leading-none">— Étape 2 —</p>
                <h3 className="font-display font-bold italic text-2xl lg:text-3xl text-cocoa mt-1">
                  Original — un seul amour
                </h3>
                <p className="text-cocoa/75 mt-3 leading-relaxed">
                  Notre American Classic, c'est le cookie tel qu'il doit être : soft-baked, doré,
                  généreusement parsemé de pépites de chocolat au lait fondantes et d'une touche de
                  fleur de sel. Une seule saveur, parfaitement maîtrisée.
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-cocoa/70">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose" /> Pépites chocolat au lait premium</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose" /> Fleur de sel de Camargue</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-rose" /> Cuit à la commande</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="sticky bottom-0 z-10 border-t border-cocoa/10 bg-cream/95 backdrop-blur-md p-4 lg:p-5">
          {underMinimum && (
            <div className="flex items-center gap-2 text-xs text-rose mb-2.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Commande minimum {MIN_ORDER} MAD — choisissez un format plus grand.</span>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
                Votre boîte
              </p>
              <p className="text-sm text-cocoa truncate">
                <span className="font-semibold">
                  Boîte de {box.size} cookies {LINE_LABEL[line]} {FORMAT_LABEL[format].fr}
                </span>
                {composition.length > 0 && (
                  <span className="text-cocoa/65">
                    {" · "}
                    {composition.map((c) => `${c.qty}× ${c.name}`).join(", ")}
                  </span>
                )}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0 flex-wrap">
              <span className="font-hand text-3xl text-caramel leading-none">{box.price} MAD</span>
              {canOrder ? (
                <>
                  <button
                    onClick={() => {
                      addToCart();
                      toast.success("Boîte ajoutée au panier 🛒");
                    }}
                    className="btn-rose btn-glow !py-3 !px-5 text-sm inline-flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Ajouter au panier
                  </button>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(`box-${line}-direct`)}
                    className="text-xs text-cocoa/65 hover:text-rose underline-offset-4 hover:underline"
                  >
                    ou commander direct sur WhatsApp
                  </a>
                </>
              ) : (
                <button
                  disabled
                  className="btn-rose !py-3 !px-5 text-sm opacity-50 cursor-not-allowed"
                  title={
                    underMinimum
                      ? `Minimum ${MIN_ORDER} MAD`
                      : `Encore ${remaining} cookies à choisir`
                  }
                >
                  {underMinimum
                    ? `Min. ${MIN_ORDER} MAD`
                    : `${remaining} restant${remaining > 1 ? "s" : ""}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
