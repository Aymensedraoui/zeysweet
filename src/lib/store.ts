import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "./i18n";

// === IMPORTANT ===
// Replace the digits below with Zey's real WhatsApp Business number.
// Format: country code + number, no "+", no spaces. e.g. "212612345678".
export const WHATSAPP_NUMBER = "212600000000";

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
  when: string;
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
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  setCartOpen: (b: boolean) => void;
  setModalOpen: (b: boolean) => void;
  setLang: (l: Lang) => void;
  setGiftMessage: (s: string) => void;
  setCustomer: (c: Partial<CustomerInfo>) => void;
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
      customer: { name: "", phone: "", address: "", zone: "center", when: "" },
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
    }),
    {
      name: "zey-store-v1",
      partialize: (s) => ({
        cart: s.cart,
        lang: s.lang,
        giftMessage: s.giftMessage,
        customer: s.customer,
      }),
    }
  )
);

export const cartSubtotal = (cart: CartItem[]) =>
  cart.reduce((s, i) => s + i.price * i.qty, 0);

export const buildWhatsAppLink = (
  cart: CartItem[],
  gift: string,
  lang: Lang,
  customer?: CustomerInfo
) => {
  const sub = cartSubtotal(cart);
  const fee = customer ? ZONE_FEE[customer.zone] : 0;
  const total = sub + fee;

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
          customer.zone === "center"
            ? "Casablanca centre"
            : customer.zone === "peri"
            ? "Casablanca périphérie"
            : "Autre ville"
        }`
      );
      if (customer.when) lines.push(`Créneau : ${customer.when}`);
    }
    if (gift) {
      lines.push("");
      lines.push(`💌 Message cadeau : ${gift}`);
    }
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
          customer.zone === "center"
            ? "وسط الدار البيضاء"
            : customer.zone === "peri"
            ? "ضواحي الدار البيضاء"
            : "مدينة أخرى"
        }`
      );
      if (customer.when) lines.push(`الوقت : ${customer.when}`);
    }
    if (gift) {
      lines.push("");
      lines.push(`💌 رسالة الهدية : ${gift}`);
    }
    lines.push("");
    lines.push("شكرا 🤍");
  }

  const text = lines.join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
