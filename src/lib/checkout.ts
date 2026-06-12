import { WHATSAPP_NUMBER } from "@/lib/store";
import type { CartItem } from "@/lib/cart";

export type PaymentMode = "whatsapp" | "cih" | "cod";

export type CustomerInfo = {
  name: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
};

export const PAYMENT_LABELS: Record<PaymentMode, { fr: string; ar: string; short: string }> = {
  whatsapp: { fr: "Validation par WhatsApp", ar: "تأكيد عبر واتساب", short: "WhatsApp" },
  cih: { fr: "Virement CIH / CIH Express", ar: "تحويل بنكي CIH", short: "Virement CIH" },
  cod: { fr: "Paiement à la livraison", ar: "الدفع عند التسليم", short: "À la livraison" },
};

export function generateOrderRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `ZEY-${s}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function itemLine(it: CartItem): string {
  const base = `${it.qty}× ${it.title}`;
  const price = `${it.unitPrice * it.qty} MAD`;
  if (it.flavors && it.flavors.length > 0) {
    const fl = it.flavors.map((f) => `${f.qty}× ${f.name}`).join(", ");
    return `• ${base} (${fl}) — ${price}`;
  }
  return `• ${base} — ${price}`;
}

export function buildOrderMessage(opts: {
  lang: "fr" | "ar";
  items: CartItem[];
  customer: CustomerInfo;
  mode: PaymentMode;
  ref: string;
  total: number;
}): string {
  const { lang, items, customer, mode, ref, total } = opts;
  const modeLabel = PAYMENT_LABELS[mode][lang];

  if (lang === "ar") {
    const lines = [
      "مرحبا حلاوة زي 🍪",
      `طلب جديد — مرجع ${ref}`,
      "",
      ...items.map(itemLine),
      "",
      `المجموع : ${total} درهم`,
      `طريقة الدفع : ${modeLabel}${mode === "cih" ? " (سأرسل إثبات الدفع)" : ""}`,
      "",
      `الزبون : ${customer.name}`,
      `📞 ${customer.phone}`,
      `📍 ${customer.city} — ${customer.address}`,
    ];
    if (customer.note) lines.push(`ملاحظة : ${customer.note}`);
    lines.push("", "شكرا 🤍");
    return lines.join("\n");
  }

  const lines = [
    "Bonjour Zey's Sweetness 🍪",
    `Nouvelle commande — réf ${ref}`,
    "",
    ...items.map(itemLine),
    "",
    `Total : ${total} MAD`,
    `Mode : ${modeLabel}${mode === "cih" ? " (preuve à suivre)" : ""}`,
    "",
    `Client : ${customer.name}`,
    `📞 ${customer.phone}`,
    `📍 ${customer.city} — ${customer.address}`,
  ];
  if (customer.note) lines.push(`Note : ${customer.note}`);
  lines.push("", "Merci 🤍");
  return lines.join("\n");
}

export function buildOrderWaUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
