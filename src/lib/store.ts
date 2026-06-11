import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Lang } from "./i18n";

// === Brand contact constants ===
export const WHATSAPP_NUMBER = "212620355325";
export const CONTACT_EMAIL = "contact@zeysweet.com";
export const CONTACT_PHONE_DISPLAY = "+212 620 35 53 25";

export type LocalizedText = string | { fr: string; ar: string };

export type Product = {
  id: string;
  name: LocalizedText;
  desc: LocalizedText;
  price: number;
  image: string;
  badge?: "bestseller" | "nouveau" | "coup";
};

export const localized = (v: LocalizedText, lang: Lang): string =>
  typeof v === "string" ? v : v[lang];

type State = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      lang: "fr",
      setLang: (l) => set({ lang: l }),
    }),
    {
      name: "zey-store-v2",
      partialize: (s) => ({ lang: s.lang }),
    }
  )
);

type BuildOpts = {
  source?: string;
  productLabel?: string;
  price?: number;
};

/**
 * Build a pre-filled WhatsApp link. All site CTAs go through this.
 * Signature kept positional-compatible so legacy callers using
 * `buildWhatsAppLink([], "", lang, { source })` continue to work.
 */
export const buildWhatsAppLink = (
  _legacyCart: unknown,
  _legacyGift: unknown,
  lang: Lang,
  opts: BuildOpts = {}
) => {
  const { source, productLabel, price } = opts;
  const lines: string[] = [];

  if (lang === "fr") {
    lines.push("Bonjour Zey's Sweetness 🍪");
    lines.push("Je souhaite passer une commande.");
    if (productLabel) {
      lines.push("");
      lines.push(
        `• ${productLabel}${typeof price === "number" ? ` — ${price} MAD` : ""}`
      );
    }
    lines.push("");
    lines.push("📍 Rabat / Témara");
    lines.push("💵 Paiement à la livraison");
    lines.push("");
    lines.push("Merci 🤍");
    if (source) lines.push(`(réf : ${source})`);
  } else {
    lines.push("مرحبا حلاوة زي 🍪");
    lines.push("أود تقديم طلب.");
    if (productLabel) {
      lines.push("");
      lines.push(
        `• ${productLabel}${typeof price === "number" ? ` — ${price} درهم` : ""}`
      );
    }
    lines.push("");
    lines.push("📍 الرباط / تمارة");
    lines.push("💵 الدفع نقدا عند التسليم");
    lines.push("");
    lines.push("شكرا 🤍");
    if (source) lines.push(`(مرجع : ${source})`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
};
