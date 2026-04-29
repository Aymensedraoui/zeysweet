import { useState } from "react";
import { X } from "lucide-react";
import {
  useStore, buildWhatsAppLink, cartSubtotal, ZONE_FEE,
  type DeliveryZone,
} from "@/lib/store";
import { t } from "@/lib/i18n";

export default function WhatsAppModal() {
  const {
    modalOpen, setModalOpen, cart, giftMessage, lang,
    customer, setCustomer, clear,
  } = useStore();
  const [touched, setTouched] = useState(false);

  if (!modalOpen) return null;

  const sub = cartSubtotal(cart);
  const fee = ZONE_FEE[customer.zone];
  const total = sub + fee;
  const currency = lang === "fr" ? "MAD" : "درهم";

  const valid =
    customer.name.trim().length >= 2 &&
    customer.phone.trim().length >= 8 &&
    customer.address.trim().length >= 5;

  const link = buildWhatsAppLink(cart, giftMessage, lang, customer);

  const onSend = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!valid) {
      e.preventDefault();
      setTouched(true);
      return;
    }
    setTimeout(() => {
      setModalOpen(false);
      // Optional: clear cart after sending. Comment out if you want to preserve it.
      // clear();
    }, 600);
  };

  const inputCls =
    "w-full mt-1 rounded-xl border border-cocoa/15 bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-cocoa/60 animate-fade-up overflow-y-auto">
      <div className="bg-cream rounded-3xl max-w-md w-full p-6 sm:p-7 border border-caramel/30 shadow-warm my-8">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-hand text-2xl text-caramel">{t("mod.eyebrow", lang)}</p>
            <h3 className="font-display font-bold italic text-2xl text-cocoa">{t("mod.title", lang)}</h3>
          </div>
          <button onClick={() => setModalOpen(false)} aria-label="x"><X className="w-5 h-5 text-cocoa" /></button>
        </div>

        <p className="text-sm text-cocoa/70 mb-4">{t("mod.intro", lang)}</p>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-cocoa/70">{t("mod.name", lang)} *</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer({ name: e.target.value.slice(0, 60) })}
              className={inputCls}
              maxLength={60}
            />
            {touched && customer.name.trim().length < 2 && (
              <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-cocoa/70">{t("mod.phone", lang)} *</label>
            <input
              type="tel"
              inputMode="tel"
              value={customer.phone}
              onChange={(e) => setCustomer({ phone: e.target.value.replace(/[^\d+ ]/g, "").slice(0, 20) })}
              className={inputCls}
              placeholder="+212 6 ..."
            />
            {touched && customer.phone.trim().length < 8 && (
              <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-cocoa/70">{t("mod.zone", lang)}</label>
            <select
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
            <label className="text-xs font-semibold text-cocoa/70">{t("mod.address", lang)} *</label>
            <textarea
              value={customer.address}
              onChange={(e) => setCustomer({ address: e.target.value.slice(0, 200) })}
              rows={2}
              className={inputCls}
              maxLength={200}
            />
            {touched && customer.address.trim().length < 5 && (
              <p className="text-[11px] text-destructive mt-1">{t("mod.req", lang)}</p>
            )}
          </div>
          <div>
            <label className="text-xs font-semibold text-cocoa/70">{t("mod.when", lang)}</label>
            <input
              type="text"
              value={customer.when}
              onChange={(e) => setCustomer({ when: e.target.value.slice(0, 60) })}
              className={inputCls}
              placeholder={t("mod.when.ph", lang)}
              maxLength={60}
            />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mt-4 space-y-1.5 text-sm">
          <div className="flex justify-between text-cocoa/70">
            <span>{t("cart.subtotal", lang)}</span>
            <span>{sub} {currency}</span>
          </div>
          <div className="flex justify-between text-cocoa/70">
            <span>{t("cart.delivery", lang)}</span>
            <span>{fee === 0 ? t("cart.delivery.free", lang) : `${fee} ${currency}`}</span>
          </div>
          <div className="pt-2 border-t border-cocoa/10 flex justify-between font-display font-bold text-cocoa">
            <span>{t("cart.total", lang)}</span>
            <span className="text-caramel">{total} {currency}</span>
          </div>
        </div>

        <a
          href={valid ? link : "#"}
          target={valid ? "_blank" : undefined}
          rel="noopener noreferrer"
          onClick={onSend}
          className={`btn-rose w-full mt-4 ${!valid ? "opacity-60 pointer-events-auto" : ""}`}
        >
          {t("mod.send", lang)}
        </a>
        <button
          onClick={() => setModalOpen(false)}
          className="w-full mt-2 text-sm text-cocoa/60 hover:text-cocoa underline"
        >
          {t("mod.cancel", lang)}
        </button>
      </div>
    </div>
  );
}
