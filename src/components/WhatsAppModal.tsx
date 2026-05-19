import { useState, useEffect, useRef } from "react";
import { X, Plus, Minus, Trash2, Phone, Mail, MessageCircle, Sparkles } from "lucide-react";
import {
  useStore, buildWhatsAppLink, cartSubtotal, promoDiscount, ZONE_FEE,
  CONTACT_EMAIL, CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER, PROMO_CODE,
  localized, type DeliveryZone,
} from "@/lib/store";
import { products } from "@/lib/products";
import { t } from "@/lib/i18n";
import { trackOrderSubmit, trackWhatsAppClick } from "@/lib/analytics";
import { toast } from "sonner";



export default function WhatsAppModal() {
  const {
    modalOpen, setModalOpen, cart, giftMessage, setGiftMessage, lang,
    customer, setCustomer, add, setQty, remove,
    promoApplied, setPromoApplied, firstOrderUsed, markFirstOrderUsed,
  } = useStore();
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, setModalOpen]);

  if (!modalOpen) return null;

  const sub = cartSubtotal(cart);
  const discount = promoDiscount(sub, promoApplied);
  const fee = ZONE_FEE[customer.zone];
  const total = Math.max(0, sub - discount) + fee;
  const currency = lang === "fr" ? "MAD" : "درهم";

  const valid =
    cart.length > 0 &&
    customer.name.trim().length >= 2 &&
    customer.phone.trim().length >= 8 &&
    customer.address.trim().length >= 5;

  const link = buildWhatsAppLink(cart, giftMessage, lang, {
    customer, promoApplied, source: "modal",
  });

  const onSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) {
      e.preventDefault();
      setTouched(true);
      return;
    }
    trackOrderSubmit({ value: total, items: cart.reduce((s, i) => s + i.qty, 0), source: "modal", promo: promoApplied });
    trackWhatsAppClick("modal:submit");
    if (promoApplied) markFirstOrderUsed();
    setTimeout(() => setModalOpen(false), 600);
  };

  const inputCls =
    "w-full mt-1 rounded-xl border border-cocoa/15 bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose";

  // Min date = today (no past delivery)
  const today = new Date().toISOString().split("T")[0];

  const sectionCls = "rounded-2xl bg-card border border-cocoa/10 p-5";
  const sectionTitleCls = "font-display font-bold text-cocoa text-lg mb-3";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-stretch md:items-center justify-center md:p-4 bg-cocoa/60 animate-fade-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div
        ref={dialogRef}
        className="bg-cream w-full md:max-w-2xl md:rounded-3xl border border-caramel/30 shadow-warm flex flex-col max-h-[100dvh] md:max-h-[92dvh]"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-5 md:p-6 border-b border-cocoa/10 shrink-0">
          <div>
            <p className="font-hand text-xl text-caramel">{t("mod.eyebrow", lang)}</p>
            <h3 id="checkout-title" className="font-display font-bold italic text-2xl text-cocoa">
              {t("mod.title", lang)}
            </h3>
          </div>
          <button
            onClick={() => setModalOpen(false)}
            aria-label={t("nav.close", lang)}
            className="p-2 -m-2 hover:bg-cocoa/5 rounded-full"
          >
            <X className="w-5 h-5 text-cocoa" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-5">
          {/* Promo banner */}
          {!firstOrderUsed && (
            <div className="rounded-2xl p-4 border-2 border-dashed border-rose/60 bg-rose/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-rose mt-0.5 shrink-0" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-display font-bold text-cocoa">{t("mod.promo.title", lang)}</p>
                <p className="text-sm text-cocoa/75 mt-0.5">{t("mod.promo.body", lang)}</p>
              </div>
              <button
                onClick={() => setPromoApplied(!promoApplied)}
                className={`shrink-0 text-xs font-semibold rounded-full px-3 py-2 transition ${
                  promoApplied ? "bg-pistachio text-cocoa" : "bg-rose text-cocoa hover:brightness-105"
                }`}
              >
                {promoApplied ? t("mod.promo.applied", lang) : t("mod.promo.apply", lang)}
              </button>
            </div>
          )}

          {/* Step 1: order */}
          <section className={sectionCls} aria-labelledby="step-1">
            <h4 id="step-1" className={sectionTitleCls}>{t("mod.step1", lang)}</h4>
            {cart.length === 0 && (
              <p className="text-sm text-destructive mb-3">{t("mod.empty", lang)}</p>
            )}
            <div className="space-y-2">
              {cart.map((it) => {
                const name = localized(it.name, lang);
                return (
                  <div key={it.id} className="flex gap-3 items-center bg-cream/60 rounded-xl p-2.5">
                    <img src={it.image} alt={name} className="w-12 h-12 rounded-lg object-cover" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-cocoa truncate">{name}</p>
                      <p className="text-xs text-caramel font-semibold">{it.price * it.qty} {currency}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Diminuer" className="w-7 h-7 rounded-full border border-cocoa/20 flex items-center justify-center hover:bg-cocoa/5">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Augmenter" className="w-7 h-7 rounded-full border border-cocoa/20 flex items-center justify-center hover:bg-cocoa/5">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(it.id)} aria-label="Retirer" className="ml-1 p-1 text-cocoa/50 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick add picker */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-cocoa/60 uppercase tracking-wide mb-2">{t("mod.addmore", lang)}</p>
              <div className="grid grid-cols-2 gap-2">
                {products.map((p) => {
                  const inCart = cart.find((c) => c.id === p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => add(p)}
                      className="flex items-center gap-2 p-2 rounded-xl border border-cocoa/15 hover:border-rose hover:bg-rose/5 transition text-left"
                      aria-label={`Ajouter ${localized(p.name, lang)}`}
                    >
                      <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-cocoa truncate">{localized(p.name, lang)}</p>
                        <p className="text-[11px] text-caramel">{p.price} {currency}{inCart ? ` · ×${inCart.qty}` : ""}</p>
                      </div>
                      <Plus className="w-4 h-4 text-rose shrink-0" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Step 2: gift */}
          <section className={sectionCls} aria-labelledby="step-2">
            <h4 id="step-2" className={sectionTitleCls}>{t("mod.step2", lang)}</h4>
            <textarea
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value.slice(0, 120))}
              rows={2}
              placeholder={t("cart.gift.ph", lang)}
              className={inputCls}
              aria-label={t("cart.gift", lang)}
            />
            <p className="text-[10px] text-cocoa/50 text-right mt-1">{giftMessage.length}/120</p>
          </section>

          {/* Step 3: customer */}
          <section className={sectionCls} aria-labelledby="step-3">
            <h4 id="step-3" className={sectionTitleCls}>{t("mod.step3", lang)}</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="cust-name" className="text-xs font-semibold text-cocoa/70">{t("mod.name", lang)} *</label>
                <input
                  id="cust-name"
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ name: e.target.value.slice(0, 60) })}
                  className={inputCls}
                  maxLength={60}
                  autoComplete="name"
                />
                {touched && customer.name.trim().length < 2 && (
                  <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
                )}
              </div>
              <div>
                <label htmlFor="cust-phone" className="text-xs font-semibold text-cocoa/70">{t("mod.phone", lang)} *</label>
                <input
                  id="cust-phone"
                  type="tel"
                  inputMode="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ phone: e.target.value.replace(/[^\d+ ]/g, "").slice(0, 20) })}
                  className={inputCls}
                  placeholder="+212 6 ..."
                  autoComplete="tel"
                />
                {touched && customer.phone.trim().length < 8 && (
                  <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
                )}
              </div>
            </div>
          </section>

          {/* Step 4: delivery */}
          <section className={sectionCls} aria-labelledby="step-4">
            <h4 id="step-4" className={sectionTitleCls}>{t("mod.step4", lang)}</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="cust-zone" className="text-xs font-semibold text-cocoa/70">{t("mod.zone", lang)}</label>
                <select
                  id="cust-zone"
                  value={customer.zone}
                  onChange={(e) => setCustomer({ zone: e.target.value as DeliveryZone })}
                  className={inputCls}
                >
                  <option value="center">{t("mod.zone.center", lang)}</option>
                  <option value="peri">{t("mod.zone.peri", lang)}</option>
                  <option value="other">{t("mod.zone.other", lang)}</option>
                </select>
              </div>
              <div>
                <label htmlFor="cust-address" className="text-xs font-semibold text-cocoa/70">{t("mod.address", lang)} *</label>
                <textarea
                  id="cust-address"
                  value={customer.address}
                  onChange={(e) => setCustomer({ address: e.target.value.slice(0, 200) })}
                  rows={2}
                  className={inputCls}
                  maxLength={200}
                  autoComplete="street-address"
                />
                {touched && customer.address.trim().length < 5 && (
                  <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="cust-date" className="text-xs font-semibold text-cocoa/70">{t("mod.date", lang)}</label>
                  <input
                    id="cust-date"
                    type="date"
                    min={today}
                    value={customer.deliveryDate}
                    onChange={(e) => setCustomer({ deliveryDate: e.target.value })}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="cust-slot" className="text-xs font-semibold text-cocoa/70">{t("mod.slot", lang)}</label>
                  <select
                    id="cust-slot"
                    value={customer.deliverySlot}
                    onChange={(e) => setCustomer({ deliverySlot: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">{t("mod.slot.pick", lang)}</option>
                    <option value="morning">{t("mod.slot.morning", lang)}</option>
                    <option value="noon">{t("mod.slot.noon", lang)}</option>
                    <option value="afternoon">{t("mod.slot.afternoon", lang)}</option>
                    <option value="evening">{t("mod.slot.evening", lang)}</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky footer: summary + CTA + fallback */}
        <div className="border-t border-cocoa/10 bg-card p-5 md:p-6 shrink-0 space-y-3">
          <div className="text-sm space-y-1">
            <div className="flex justify-between text-cocoa/70">
              <span>{t("cart.subtotal", lang)}</span>
              <span>{sub} {currency}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-pistachio font-semibold">
                <span>{t("mod.discount", lang)}</span>
                <span>−{discount} {currency}</span>
              </div>
            )}
            <div className="flex justify-between text-cocoa/70">
              <span>{t("cart.delivery", lang)}</span>
              <span>{fee === 0 ? t("cart.delivery.free", lang) : `${fee} ${currency}`}</span>
            </div>
            <div className="pt-1.5 border-t border-cocoa/10 flex justify-between font-display font-bold text-cocoa">
              <span>{t("cart.total", lang)}</span>
              <span className="text-caramel text-lg">{total} {currency}</span>
            </div>
          </div>

          <a
            href={valid ? link : "#"}
            target={valid ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={onSend}
            aria-label={t("a11y.whatsapp", lang)}
            className={`btn-rose btn-glow w-full ${!valid ? "opacity-60" : ""}`}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            {t("mod.send", lang)}
          </a>

          {/* Fallback contact */}
          <div className="pt-1 border-t border-cocoa/5">
            <p className="text-[11px] text-cocoa/60 text-center mb-2">{t("mod.fallback", lang)}</p>
            <div className="flex gap-2">
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full border border-cocoa/15 text-xs font-medium text-cocoa hover:bg-cocoa/5"
                aria-label={`${t("mod.call", lang)} ${CONTACT_PHONE_DISPLAY}`}
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Commande Zey's Sweetness")}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2 rounded-full border border-cocoa/15 text-xs font-medium text-cocoa hover:bg-cocoa/5"
                aria-label={`${t("mod.email", lang)} ${CONTACT_EMAIL}`}
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {t("mod.email", lang)}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
