import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartFlavor = { id: string; name: string; qty: number };

export type CartItem = {
  id: string; // signature so identical configurations merge
  kind: "cookie-box" | "dates";
  line?: "newyork" | "american";
  format?: "maxi" | "mini";
  size?: number;
  flavors?: CartFlavor[]; // for NY boxes
  title: string; // human label
  unitPrice: number; // MAD per unit
  qty: number;
  image?: string;
};

function signatureFor(it: Omit<CartItem, "id" | "qty">): string {
  if (it.kind === "cookie-box") {
    const flavors = (it.flavors ?? [])
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((f) => `${f.id}:${f.qty}`)
      .join(",");
    return `box|${it.line}|${it.format}|${it.size}|${flavors}`;
  }
  return `dates|${it.title}|${it.unitPrice}`;
}

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id" | "qty"> & { qty?: number }) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (v: boolean) => void;
  subtotal: () => number;
  count: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (raw) => {
        const id = signatureFor(raw);
        const qty = raw.qty ?? 1;
        set((s) => {
          const existing = s.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === id ? { ...i, qty: i.qty + qty } : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [...s.items, { ...raw, id, qty } as CartItem],
            isOpen: true,
          };
        });
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      setOpen: (v) => set({ isOpen: v }),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
    }),
    {
      name: "zey-cart-v1",
      partialize: (s) => ({ items: s.items }),
    }
  )
);

export const MIN_ORDER_MAD = 70;

// Reactive selectors — always recompute when items change so totals
// stay perfectly in sync between drawer, navbar badge and checkout.
export const useCartItems = () => useCart((s) => s.items);
export const useCartSubtotal = () =>
  useCart((s) =>
    s.items.reduce((sum, i) => sum + (Number(i.unitPrice) || 0) * (Number(i.qty) || 0), 0)
  );
export const useCartCount = () =>
  useCart((s) => s.items.reduce((n, i) => n + (Number(i.qty) || 0), 0));
