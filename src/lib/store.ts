import { create } from "zustand";

export type Product = {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  badge?: "bestseller" | "nouveau" | "coup";
};

export type CartItem = Product & { qty: number };

type State = {
  cart: CartItem[];
  cartOpen: boolean;
  modalOpen: boolean;
  lang: "fr" | "ar";
  giftMessage: string;
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, q: number) => void;
  clear: () => void;
  setCartOpen: (b: boolean) => void;
  setModalOpen: (b: boolean) => void;
  setLang: (l: "fr" | "ar") => void;
  setGiftMessage: (s: string) => void;
};

export const useStore = create<State>((set) => ({
  cart: [],
  cartOpen: false,
  modalOpen: false,
  lang: "fr",
  giftMessage: "",
  add: (p) =>
    set((s) => {
      const existing = s.cart.find((i) => i.id === p.id);
      if (existing) {
        return { cart: s.cart.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) };
      }
      return { cart: [...s.cart, { ...p, qty: 1 }] };
    }),
  remove: (id) => set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),
  setQty: (id, q) =>
    set((s) => ({
      cart: q <= 0 ? s.cart.filter((i) => i.id !== id) : s.cart.map((i) => (i.id === id ? { ...i, qty: q } : i)),
    })),
  clear: () => set({ cart: [] }),
  setCartOpen: (b) => set({ cartOpen: b }),
  setModalOpen: (b) => set({ modalOpen: b }),
  setLang: (l) => set({ lang: l }),
  setGiftMessage: (s) => set({ giftMessage: s }),
}));

export const buildWhatsAppLink = (cart: CartItem[], gift: string, lang: "fr" | "ar") => {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const intro = lang === "fr" ? "Bonjour Zey's Sweetness 🍪\nJe souhaite commander :" : "مرحبا حلاوة زي 🍪\nأود أن أطلب :";
  const items = cart.map((i) => `- ${i.name} x ${i.qty} (${i.price * i.qty} MAD)`).join("\n");
  const totalLine = lang === "fr" ? `Total estimé : ${total} MAD` : `المجموع : ${total} درهم`;
  const giftLine = gift ? (lang === "fr" ? `Message cadeau : ${gift}` : `رسالة الهدية : ${gift}`) : "";
  const thanks = lang === "fr" ? "Merci !" : "شكرا!";
  const text = [intro, items, totalLine, giftLine, thanks].filter(Boolean).join("\n");
  return `https://wa.me/212600000000?text=${encodeURIComponent(text)}`;
};
