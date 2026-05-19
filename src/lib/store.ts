import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "./i18n";

// === IMPORTANT ===
// Replace the digits below with Zey's real WhatsApp Business number.
// Format: country code + number, no "+", no spaces. e.g. "212612345678".
export const WHATSAPP_NUMBER = "212620355325";
export const CONTACT_EMAIL = "contact@zeysweet.com";
export const CONTACT_PHONE_DISPLAY = "+212 620 35 53 25";
export const PROMO_CODE = "BIENVENUE10";
export const PROMO_PCT = 0.10;

export const MIN_ORDER_MAD = 150;

export type LocalizedText = string | { fr: string; ar: string };

export type Product = {
  id: string;
  name: LocalizedText;
  desc: LocalizedText;
  price: number;
  image: string;
  badge?: "bestseller" | "nouveau" | "coup";
};

export type CartItem = Product & { qty: number };

export type DeliveryZone = "center" | "peri" | "other";

export const ZONE_FEE: Record<DeliveryZone, number> = {
  center: 0,
  peri: 30,
  other: 80,
};

export type CustomerInfo = {
  name: string;
  phone: string;
  address: string;
  zone: DeliveryZone;
  when: string;        // legacy free-text, kept for back-compat in WA message
  deliveryDate: string; // YYYY-MM-DD
  deliverySlot: string; // morning|noon|afternoon|evening
};

export const localized = (v: LocalizedText, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

type State = {
  cart: CartItem[];
  cartOpen: boolean;
  modalOpen: boolean;
  lang: Lang;
  giftMessage: string;
  customer: CustomerInfo;
  promoApplied: boolean;     // user toggled BIENVENUE10
  firstOrderUsed: boolean;   // once true, no more first-order banner
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  setCartOpen: (b: boolean) => void;
  setModalOpen: (b: boolean) => void;
  setLang: (l: Lang) => void;
  setGiftMessage: (s: string) => void;
  setCustomer: (c: Partial<CustomerInfo>) => void;
  setPromoApplied: (b: boolean) => void;
  markFirstOrderUsed: () => void;
};

const MAX_QTY = 20;

export const useStore = create<State>()(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      modalOpen: false,
      lang: "fr",
      giftMessage: "",
      customer: { name: "", phone: "", address: "", zone: "center", when: "", deliveryDate: "", deliverySlot: "" },
      promoApplied: false,
      firstOrderUsed: false,
      add: (p) =>
        set((s) => {
          const existing = s.cart.find((i) => i.id === p.id);
          if (existing) {
            return {
              cart: s.cart.map((i) =>
                i.id === p.id ? { ...i, qty: Math.min(i.qty + 1, MAX_QTY) } : i
              ),
            };
          }
          return { cart: [...s.cart, { ...p, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),
      setQty: (id, q) =>
        set((s) => ({
          cart:
            q <= 0
              ? s.cart.filter((i) => i.id !== id)
              : s.cart.map((i) =>
                  i.id === id ? { ...i, qty: Math.min(q, MAX_QTY) } : i
                ),
        })),
      clear: () => set({ cart: [], giftMessage: "" }),
      setCartOpen: (b) => set({ cartOpen: b }),
      setModalOpen: (b) => set({ modalOpen: b }),
      setLang: (l) => set({ lang: l }),
      setGiftMessage: (s) => set({ giftMessage: s }),
      setCustomer: (c) =>
        set((s) => ({ customer: { ...s.customer, ...c } })),
      setPromoApplied: (b) => set({ promoApplied: b }),
      markFirstOrderUsed: () => set({ firstOrderUsed: true, promoApplied: false }),
    }),
    {
      name: "zey-store-v1",
      partialize: (s) => ({
        cart: s.cart,
        lang: s.lang,
        giftMessage: s.giftMessage,
        customer: s.customer,
        promoApplied: s.promoApplied,
        firstOrderUsed: s.firstOrderUsed,
      }),
    }
  )
);

export const cartSubtotal = (cart: CartItem[]) =>
  cart.reduce((s, i) => s + i.price * i.qty, 0);

export const promoDiscount = (sub: number, applied: boolean) =>
  applied ? Math.round(sub * PROMO_PCT) : 0;

type BuildOpts = {
  customer?: CustomerInfo;
  promoApplied?: boolean;
  source?: string;
};

const SLOT_LABEL_FR: Record<string, string> = {
  morning: "Matin (10h–12h)",
  noon: "Midi (12h–14h)",
  afternoon: "Après-midi (14h–17h)",
  evening: "Fin de journée (17h–20h)",
};
const SLOT_LABEL_AR: Record<string, string> = {
  morning: "صباحا (10–12)",
  noon: "ظهرا (12–14)",
  afternoon: "بعد الظهر (14–17)",
  evening: "آخر النهار (17–20)",
};

export const buildWhatsAppLink = (
  cart: CartItem[],
  gift: string,
  lang: Lang,
  customerOrOpts?: CustomerInfo | BuildOpts
) => {
  const opts: BuildOpts =
    customerOrOpts && "name" in (customerOrOpts as CustomerInfo)
      ? { customer: customerOrOpts as CustomerInfo }
      : ((customerOrOpts as BuildOpts) ?? {});
  const { customer, promoApplied = false, source } = opts;

  const sub = cartSubtotal(cart);
  const fee = customer ? ZONE_FEE[customer.zone] : 0;
  const discount = promoDiscount(sub, promoApplied);
  const total = Math.max(0, sub - discount) + fee;

  const slotLabel = (s: string) =>
    (lang === "fr" ? SLOT_LABEL_FR : SLOT_LABEL_AR)[s] || "";

  const whenLine = (c: CustomerInfo) => {
    const parts: string[] = [];
    if (c.deliveryDate) parts.push(c.deliveryDate);
    if (c.deliverySlot) parts.push(slotLabel(c.deliverySlot));
    if (!parts.length && c.when) return c.when;
    return parts.join(" · ");
  };

  const lines: string[] = [];
  if (lang === "fr") {
    lines.push("Bonjour Zey's Sweetness 🍪");
    lines.push("Je souhaite passer une commande :");
    lines.push("");
    cart.forEach((i) =>
      lines.push(`• ${localized(i.name, lang)} × ${i.qty} — ${i.price * i.qty} MAD`)
    );
    lines.push("");
    lines.push(`Sous-total : ${sub} MAD`);
    if (discount > 0) lines.push(`Code ${PROMO_CODE} : −${discount} MAD`);
    if (customer) {
      lines.push(`Livraison : ${fee === 0 ? "Offerte" : fee + " MAD"}`);
      lines.push(`Total estimé : ${total} MAD`);
      lines.push("");
      lines.push("— Mes coordonnées —");
      if (customer.name) lines.push(`Nom : ${customer.name}`);
      if (customer.phone) lines.push(`Téléphone : ${customer.phone}`);
      if (customer.address) lines.push(`Adresse : ${customer.address}`);
      lines.push(
        `Zone : ${
          customer.zone === "center" ? "Rabat" :
          customer.zone === "peri" ? "Témara / Harhoura / Salé" : "Autre ville"
        }`
      );
      const w = whenLine(customer);
      if (w) lines.push(`Créneau : ${w}`);
    }
    if (gift) {
      lines.push("");
      lines.push(`💌 Message cadeau : ${gift}`);
    }
    lines.push("");
    lines.push("💵 Paiement : cash à la livraison (sauf accord contraire).");
    if (source) lines.push(`(réf : ${source})`);
    lines.push("");
    lines.push("Merci 🤍");
  } else {
    lines.push("مرحبا حلاوة زي 🍪");
    lines.push("أود تقديم طلب :");
    lines.push("");
    cart.forEach((i) =>
      lines.push(`• ${localized(i.name, lang)} × ${i.qty} — ${i.price * i.qty} درهم`)
    );
    lines.push("");
    lines.push(`المجموع الفرعي : ${sub} درهم`);
    if (discount > 0) lines.push(`كود ${PROMO_CODE} : −${discount} درهم`);
    if (customer) {
      lines.push(`التوصيل : ${fee === 0 ? "مجانا" : fee + " درهم"}`);
      lines.push(`المجموع : ${total} درهم`);
      lines.push("");
      lines.push("— معلوماتي —");
      if (customer.name) lines.push(`الاسم : ${customer.name}`);
      if (customer.phone) lines.push(`الهاتف : ${customer.phone}`);
      if (customer.address) lines.push(`العنوان : ${customer.address}`);
      lines.push(
        `المنطقة : ${
          customer.zone === "center" ? "الرباط" :
          customer.zone === "peri" ? "تمارة / هرهورة / سلا" : "مدينة أخرى"
        }`
      );
      const w = whenLine(customer);
      if (w) lines.push(`الوقت : ${w}`);
    }
    if (gift) {
      lines.push("");
      lines.push(`💌 رسالة الهدية : ${gift}`);
    }
    lines.push("");
    lines.push("💵 الدفع : نقدا عند التسليم (ما لم يتفق على غير ذلك).");
    if (source) lines.push(`(مرجع : ${source})`);
    lines.push("");
    lines.push("شكرا 🤍");
  }

  const text = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
