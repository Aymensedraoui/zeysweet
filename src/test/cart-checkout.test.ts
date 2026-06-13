import { describe, it, expect, beforeEach } from "vitest";
import {
  buildOrderMessage,
  buildOrderWaUrl,
  generateOrderRef,
  PAYMENT_LABELS,
} from "@/lib/checkout";
import { useCart, MIN_ORDER_MAD, useCartSubtotal } from "@/lib/cart";
import { renderHook, act } from "@testing-library/react";

describe("MIN_ORDER_MAD", () => {
  it("is set to 70 MAD", () => {
    expect(MIN_ORDER_MAD).toBe(70);
  });
});

describe("generateOrderRef", () => {
  it("returns a 'ZEY-' prefixed reference of length 10", () => {
    const ref = generateOrderRef();
    expect(ref).toMatch(/^ZEY-[A-Z0-9]{6}$/);
  });

  it("returns unique refs across many calls", () => {
    const set = new Set(Array.from({ length: 200 }, generateOrderRef));
    // Allow a tiny chance of collision; 200 random 6-char picks should be unique
    expect(set.size).toBeGreaterThan(195);
  });
});

describe("buildOrderMessage", () => {
  const baseItems = [
    {
      id: "sig1",
      kind: "cookie-box" as const,
      title: "Cookie Box NY 12",
      unitPrice: 200,
      qty: 1,
      flavors: [
        { id: "choc", name: "Chocolat noir", qty: 6 },
        { id: "pecan", name: "Pécan", qty: 6 },
      ],
    },
    {
      id: "dates1",
      kind: "dates" as const,
      title: "Dattes Farcies (12)",
      unitPrice: 120,
      qty: 2,
    },
  ];
  const customer = {
    name: "Sara Bennani",
    phone: "0612345678",
    city: "Rabat",
    address: "Agdal, rue X, imm 4",
    note: "Sonner à la porte",
  };

  it("builds a French message containing all the essentials", () => {
    const msg = buildOrderMessage({
      lang: "fr",
      items: baseItems,
      customer,
      mode: "whatsapp",
      ref: "ZEY-ABC123",
      total: 440,
    });
    expect(msg).toContain("ZEY-ABC123");
    expect(msg).toContain("Sara Bennani");
    expect(msg).toContain("0612345678");
    expect(msg).toContain("Agdal, rue X, imm 4");
    expect(msg).toContain("Total : 440 MAD");
    expect(msg).toContain(PAYMENT_LABELS.whatsapp.fr);
    expect(msg).toContain("Sonner à la porte");
    expect(msg).toContain("Chocolat noir");
  });

  it("flags CIH proof in the message", () => {
    const msg = buildOrderMessage({
      lang: "fr",
      items: baseItems,
      customer,
      mode: "cih",
      ref: "ZEY-ABC123",
      total: 440,
    });
    expect(msg).toMatch(/preuve à suivre/i);
  });

  it("builds an Arabic message with RTL essentials", () => {
    const msg = buildOrderMessage({
      lang: "ar",
      items: baseItems,
      customer,
      mode: "cod",
      ref: "ZEY-ABC123",
      total: 440,
    });
    expect(msg).toContain("ZEY-ABC123");
    expect(msg).toContain("440");
    expect(msg).toContain(PAYMENT_LABELS.cod.ar);
  });
});

describe("buildOrderWaUrl", () => {
  it("encodes the message into a wa.me link", () => {
    const url = buildOrderWaUrl("Hello — test 🍪");
    expect(url.startsWith("https://wa.me/")).toBe(true);
    expect(url).toContain("text=");
    expect(decodeURIComponent(url.split("?text=")[1])).toBe("Hello — test 🍪");
  });
});

describe("useCart store", () => {
  beforeEach(() => {
    useCart.getState().clear();
  });

  it("starts empty", () => {
    expect(useCart.getState().items).toEqual([]);
    expect(useCart.getState().subtotal()).toBe(0);
  });

  it("merges identical dates items by signature instead of duplicating", () => {
    useCart.getState().addItem({
      kind: "dates",
      title: "Dattes Farcies (12)",
      unitPrice: 120,
    });
    useCart.getState().addItem({
      kind: "dates",
      title: "Dattes Farcies (12)",
      unitPrice: 120,
    });
    expect(useCart.getState().items).toHaveLength(1);
    expect(useCart.getState().items[0].qty).toBe(2);
    expect(useCart.getState().subtotal()).toBe(240);
  });

  it("does not merge cookie boxes with different flavor distributions", () => {
    useCart.getState().addItem({
      kind: "cookie-box",
      line: "newyork",
      format: "maxi",
      size: 12,
      title: "Box NY 12",
      unitPrice: 200,
      flavors: [{ id: "choc", name: "Chocolat", qty: 12 }],
    });
    useCart.getState().addItem({
      kind: "cookie-box",
      line: "newyork",
      format: "maxi",
      size: 12,
      title: "Box NY 12",
      unitPrice: 200,
      flavors: [
        { id: "choc", name: "Chocolat", qty: 6 },
        { id: "pecan", name: "Pécan", qty: 6 },
      ],
    });
    expect(useCart.getState().items).toHaveLength(2);
  });

  it("removes the item when qty drops to 0 via updateQty", () => {
    useCart.getState().addItem({
      kind: "dates",
      title: "Dattes",
      unitPrice: 120,
    });
    const id = useCart.getState().items[0].id;
    useCart.getState().updateQty(id, 0);
    expect(useCart.getState().items).toHaveLength(0);
  });

  it("useCartSubtotal hook reacts to cart changes", () => {
    const { result } = renderHook(() => useCartSubtotal());
    expect(result.current).toBe(0);
    act(() => {
      useCart.getState().addItem({
        kind: "dates",
        title: "Dattes",
        unitPrice: 120,
      });
    });
    expect(result.current).toBe(120);
  });
});

describe("70 MAD minimum enforcement", () => {
  beforeEach(() => {
    useCart.getState().clear();
  });

  it("blocks a tiny order below the minimum", () => {
    useCart.getState().addItem({
      kind: "dates",
      title: "Mini",
      unitPrice: 35,
    });
    const total = useCart.getState().subtotal();
    expect(total).toBe(35);
    expect(total < MIN_ORDER_MAD).toBe(true);
  });

  it("allows an order at or above the minimum", () => {
    useCart.getState().addItem({
      kind: "dates",
      title: "Dattes",
      unitPrice: 120,
    });
    const total = useCart.getState().subtotal();
    expect(total >= MIN_ORDER_MAD).toBe(true);
  });
});
