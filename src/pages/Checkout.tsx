import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Copy,
  MessageCircle,
  Building2,
  Banknote,
  AlertCircle,
  PartyPopper,
} from "lucide-react";
import { useCart, useCartSubtotal, MIN_ORDER_MAD } from "@/lib/cart";
import {
  buildOrderMessage,
  buildOrderWaUrl,
  copyToClipboard,
  generateOrderRef,
  PAYMENT_LABELS,
  type CustomerInfo,
  type PaymentMode,
} from "@/lib/checkout";
import { BANK_INFO } from "@/lib/bankInfo";
import { useStore } from "@/lib/store";
import { trackWhatsAppClick, trackOrderSubmit } from "@/lib/analytics";
import { toast } from "sonner";

type Step = 1 | 2 | 3 | "done";

const MODE_META: Record<
  PaymentMode,
  { icon: typeof MessageCircle; title: string; desc: string; accent: string }
> = {
  whatsapp: {
    icon: MessageCircle,
    title: "Validation par WhatsApp",
    desc: "On confirme votre commande en moins d'une heure.",
    accent: "from-[#25D366]/20 to-cream",
  },
  cih: {
    icon: Building2,
    title: "Virement CIH / CIH Express",
    desc: "Payez par virement, on prépare dès réception de la preuve.",
    accent: "from-caramel/20 to-cream",
  },
  cod: {
    icon: Banknote,
    title: "Payer à la livraison",
    desc: "Réglez en espèces à la remise — Rabat & Témara.",
    accent: "from-rose/20 to-cream",
  },
};

export default function Checkout() {
  const navigate = useNavigate();
  const lang = useStore((s) => s.lang);
  const { items, clear } = useCart();
  const total = useCartSubtotal();
  const [step, setStep] = useState<Step>(1);
  const [mode, setMode] = useState<PaymentMode>("whatsapp");
  const [orderRef] = useState(generateOrderRef);
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    phone: "",
    city: "Rabat",
    address: "",
    note: "",
  });

  useEffect(() => {
    if (items.length === 0 && step !== "done") {
      // empty cart guard
    }
  }, [items.length, step]);

  const message = useMemo(
    () =>
      buildOrderMessage({
        lang,
        items,
        customer,
        mode,
        ref: orderRef,
        total,
      }),
    [lang, items, customer, mode, orderRef, total]
  );
  const waUrl = buildOrderWaUrl(message);

  const underMin = total < MIN_ORDER_MAD;
  const step1Valid =
    customer.name.trim().length >= 2 &&
    customer.phone.trim().length >= 8 &&
    customer.city.trim().length >= 2 &&
    customer.address.trim().length >= 4;

  const confirm = () => {
    if (underMin || items.length === 0) return;
    trackWhatsAppClick(`checkout-${mode}`);
    trackOrderSubmit({ value: total, items: items.length, source: `checkout-${mode}` });
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setStep("done");
  };

  if (items.length === 0 && step !== "done") {
    return (
      <main className="min-h-screen paper-texture flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <span className="text-6xl">🛒</span>
          <h1 className="font-display font-bold italic text-3xl text-cocoa mt-4">
            Votre panier est vide
          </h1>
          <p className="text-cocoa/70 mt-2">
            Composez une boîte avant de passer à la commande.
          </p>
          <Link
            to="/#products"
            className="btn-rose !py-3 !px-6 mt-6 inline-flex text-sm"
          >
            Voir la carte
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen paper-texture py-10 lg:py-16">
      <div className="container mx-auto max-w-5xl px-4">
        {step !== "done" && (
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cocoa/70 hover:text-rose mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Continuer mes achats
          </Link>
        )}

        {step !== "done" && <Stepper step={step as 1 | 2 | 3} />}

        {step !== "done" && underMin && (
          <div className="mt-5 flex items-start gap-2 rounded-2xl border border-rose/30 bg-rose/10 px-4 py-3 text-sm text-rose">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Commande minimum <strong>{MIN_ORDER_MAD} MAD</strong>. Total actuel : {total} MAD —
              ajoutez encore <strong>{MIN_ORDER_MAD - total} MAD</strong> pour valider.
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 mt-6">
          <div className="rounded-[28px] border border-cocoa/10 bg-card shadow-card p-6 lg:p-8">
            {step === 1 && (
              <section>
                <h1 className="font-display font-bold italic text-3xl text-cocoa">
                  Vos coordonnées
                </h1>
                <p className="text-sm text-cocoa/65 mt-1">
                  On en a besoin pour préparer et livrer votre commande.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet"
                    value={customer.name}
                    onChange={(v) => setCustomer({ ...customer, name: v })}
                    placeholder="Sara Bennani"
                    required
                  />
                  <Field
                    label="Téléphone"
                    type="tel"
                    value={customer.phone}
                    onChange={(v) => setCustomer({ ...customer, phone: v })}
                    placeholder="06 12 34 56 78"
                    required
                  />
                  <Field
                    label="Ville"
                    value={customer.city}
                    onChange={(v) => setCustomer({ ...customer, city: v })}
                    placeholder="Rabat / Témara"
                    required
                  />
                  <Field
                    label="Adresse"
                    value={customer.address}
                    onChange={(v) => setCustomer({ ...customer, address: v })}
                    placeholder="Quartier, rue, immeuble, étage"
                    required
                  />
                  <div className="sm:col-span-2">
                    <Field
                      label="Note (optionnel)"
                      value={customer.note ?? ""}
                      onChange={(v) => setCustomer({ ...customer, note: v })}
                      placeholder="Ex : livraison après 18 h, sonner à la porte..."
                      multiline
                    />
                  </div>
                </div>

                <div className="mt-7 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="btn-rose !py-3 !px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Étape suivante →
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h1 className="font-display font-bold italic text-3xl text-cocoa">
                  Mode de paiement
                </h1>
                <p className="text-sm text-cocoa/65 mt-1">
                  Choisissez ce qui vous arrange — tout est validé sur WhatsApp.
                </p>

                <div className="mt-6 grid gap-3">
                  {(Object.keys(MODE_META) as PaymentMode[]).map((m) => {
                    const meta = MODE_META[m];
                    const Icon = meta.icon;
                    const active = mode === m;
                    return (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className={`relative text-left rounded-2xl border p-5 transition-all ${
                          active
                            ? "border-rose bg-rose/5 ring-2 ring-rose/30"
                            : "border-cocoa/15 hover:border-cocoa/30 bg-card"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center text-cocoa shrink-0`}
                          >
                            <Icon className="w-5 h-5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-display font-bold text-lg text-cocoa">
                              {meta.title}
                            </p>
                            <p className="text-sm text-cocoa/70 mt-0.5">
                              {meta.desc}
                            </p>
                          </div>
                          <span
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 ${
                              active
                                ? "bg-rose border-rose"
                                : "border-cocoa/25"
                            }`}
                          >
                            {active && (
                              <Check
                                className="w-3 h-3 text-cream"
                                strokeWidth={3}
                              />
                            )}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-7 flex justify-between gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-cocoa/70 hover:text-rose"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-rose !py-3 !px-6 text-sm"
                  >
                    Voir le récapitulatif →
                  </button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h1 className="font-display font-bold italic text-3xl text-cocoa">
                  Récapitulatif
                </h1>
                <p className="text-sm text-cocoa/65 mt-1">
                  Vérifiez tout avant d'envoyer votre commande.
                </p>

                <div className="mt-6 rounded-2xl border border-cocoa/10 bg-cream/60 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
                    Livré à
                  </p>
                  <p className="text-sm text-cocoa mt-1">
                    <span className="font-semibold">{customer.name}</span> ·{" "}
                    {customer.phone}
                  </p>
                  <p className="text-sm text-cocoa/75">
                    {customer.city} — {customer.address}
                  </p>
                  {customer.note && (
                    <p className="text-xs text-cocoa/60 mt-1 italic">
                      Note : {customer.note}
                    </p>
                  )}
                </div>

                <div className="mt-4 rounded-2xl border border-cocoa/10 p-5">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
                    Mode de paiement
                  </p>
                  <p className="text-sm font-semibold text-cocoa mt-1">
                    {PAYMENT_LABELS[mode].fr}
                  </p>
                </div>

                {underMin && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-rose">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Commande minimum {MIN_ORDER_MAD} MAD — ajoutez encore{" "}
                      {MIN_ORDER_MAD - total} MAD.
                    </span>
                  </div>
                )}

                <div className="mt-7 flex justify-between gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm text-cocoa/70 hover:text-rose"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={confirm}
                    disabled={underMin}
                    className="btn-rose btn-glow !py-3.5 !px-7 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirmer la commande →
                  </button>
                </div>
              </section>
            )}

            {step === "done" && (
              <ConfirmationView
                mode={mode}
                orderRef={orderRef}
                total={total}
                waUrl={waUrl}
                onNew={() => {
                  clear();
                  navigate("/");
                }}
              />
            )}
          </div>

          {step !== "done" && <Summary />}
        </div>
      </div>
    </main>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: "Coordonnées" },
    { n: 2, label: "Paiement" },
    { n: 3, label: "Récapitulatif" },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
      {steps.map((s, i) => {
        const active = s.n === step;
        const done = s.n < step;
        return (
          <li key={s.n} className="flex items-center gap-2 sm:gap-3">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                done
                  ? "bg-cocoa text-cream"
                  : active
                    ? "bg-rose text-cream"
                    : "bg-cocoa/10 text-cocoa/50"
              }`}
            >
              {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : s.n}
            </span>
            <span
              className={`font-semibold ${
                active ? "text-cocoa" : "text-cocoa/55"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <span className="w-6 sm:w-10 h-px bg-cocoa/15 ml-1" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const cls =
    "w-full rounded-xl border border-cocoa/15 bg-cream/50 px-4 py-2.5 text-sm text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:ring-2 focus:ring-rose/40 focus:border-rose transition";
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-cocoa/75 mb-1.5">
        {label}
        {required && <span className="text-rose"> *</span>}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className={cls + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </label>
  );
}

function Summary() {
  const { items, subtotal } = useCart();
  const total = subtotal();
  return (
    <aside className="rounded-[28px] border border-cocoa/10 bg-card shadow-card p-6 h-fit lg:sticky lg:top-24">
      <p className="text-[11px] uppercase tracking-[0.18em] text-cocoa/60 font-semibold">
        Votre commande
      </p>
      <ul className="mt-4 space-y-3 max-h-[280px] overflow-y-auto pr-1">
        {items.map((it) => (
          <li key={it.id} className="flex justify-between gap-3 text-sm">
            <div className="min-w-0">
              <p className="text-cocoa font-semibold leading-snug">
                {it.qty}× {it.title}
              </p>
              {it.flavors && it.flavors.length > 0 && (
                <p className="text-[11px] text-cocoa/55 leading-snug">
                  {it.flavors.map((f) => `${f.qty}× ${f.name}`).join(", ")}
                </p>
              )}
            </div>
            <span className="text-cocoa shrink-0 tabular-nums">
              {it.unitPrice * it.qty} MAD
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-cocoa/10 mt-5 pt-4 flex items-baseline justify-between">
        <span className="text-sm text-cocoa/70">Total</span>
        <span className="font-hand text-3xl text-caramel leading-none">
          {total} MAD
        </span>
      </div>
      <p className="text-[11px] text-cocoa/55 mt-2">
        Livraison Rabat & Témara · sous 24 h
      </p>
    </aside>
  );
}

function ConfirmationView({
  mode,
  orderRef,
  total,
  waUrl,
  onNew,
}: {
  mode: PaymentMode;
  orderRef: string;
  total: number;
  waUrl: string;
  onNew: () => void;
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-rose/15 flex items-center justify-center">
        <PartyPopper className="w-7 h-7 text-rose" />
      </div>
      <h1 className="font-display font-bold italic text-3xl text-cocoa mt-4">
        Commande envoyée 🤍
      </h1>
      <p className="text-sm text-cocoa/65 mt-2">
        Référence : <span className="font-semibold text-cocoa">{orderRef}</span>
      </p>

      {mode === "whatsapp" && (
        <div className="mt-6 rounded-2xl bg-cream/70 border border-cocoa/10 p-5 text-left">
          <p className="text-sm text-cocoa">
            Votre WhatsApp s'est ouvert avec le récapitulatif. <strong>Envoyez le message</strong> pour valider votre commande — on répond en moins d'une heure.
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rose w-full !py-3 mt-4 inline-flex justify-center text-sm"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Rouvrir WhatsApp
          </a>
        </div>
      )}

      {mode === "cih" && <CihBlock total={total} orderRef={orderRef} waUrl={waUrl} />}

      {mode === "cod" && (
        <div className="mt-6 rounded-2xl bg-cream/70 border border-cocoa/10 p-5 text-left">
          <p className="text-sm text-cocoa">
            Votre commande est enregistrée. <strong>On vous appelle dans l'heure</strong> pour confirmer adresse et créneau de livraison. Vous réglez en espèces à la remise 💵
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-cocoa w-full !py-3 mt-4 inline-flex justify-center text-sm"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Rouvrir WhatsApp
          </a>
        </div>
      )}

      <button
        onClick={onNew}
        className="text-sm text-cocoa/70 hover:text-rose mt-6 underline-offset-4 hover:underline"
      >
        Passer une nouvelle commande
      </button>
    </div>
  );
}

function CihBlock({
  total,
  orderRef,
  waUrl,
}: {
  total: number;
  orderRef: string;
  waUrl: string;
}) {
  const copy = async (label: string, value: string) => {
    const ok = await copyToClipboard(value);
    if (ok) toast.success(`${label} copié`);
    else toast.error("Copie impossible");
  };
  const rows: { label: string; value: string }[] = [
    { label: "Bénéficiaire", value: BANK_INFO.accountHolder },
    { label: "Banque", value: BANK_INFO.bankName },
    { label: "RIB", value: BANK_INFO.rib },
    { label: "CIH Express", value: BANK_INFO.cihExpressPhone },
    { label: "Montant", value: `${total} MAD` },
    { label: "Référence à mentionner", value: orderRef },
  ];
  return (
    <div className="mt-6 rounded-2xl bg-cream/70 border border-cocoa/10 p-5 text-left space-y-4">
      <p className="text-sm text-cocoa">
        Effectuez le virement avec les infos ci-dessous, puis envoyez la preuve sur WhatsApp pour que l'on prépare votre commande.
      </p>
      <div className="rounded-xl border border-cocoa/10 bg-card divide-y divide-cocoa/10">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.18em] text-cocoa/55 font-semibold">
                {r.label}
              </p>
              <p className="text-sm text-cocoa font-mono break-all">
                {r.value}
              </p>
            </div>
            <button
              onClick={() => copy(r.label, r.value)}
              className="shrink-0 w-9 h-9 rounded-full border border-cocoa/15 text-cocoa/70 hover:text-rose hover:border-rose flex items-center justify-center"
              aria-label={`Copier ${r.label}`}
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-rose btn-glow w-full !py-3 inline-flex justify-center text-sm"
      >
        <MessageCircle className="w-4 h-4 mr-1" />
        Envoyer la preuve sur WhatsApp
      </a>
      <p className="text-[11px] text-cocoa/55 text-center">
        Astuce : joignez la capture d'écran du virement à votre message WhatsApp.
      </p>
    </div>
  );
}
