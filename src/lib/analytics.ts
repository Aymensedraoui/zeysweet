// Lightweight analytics wrapper for GA4 + Meta Pixel.
// IDs are loaded at runtime from index.html (gtag + fbq snippets).
// Replace the placeholder IDs in index.html with the real ones.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackWhatsAppClick(source: string) {
  try {
    window.gtag?.("event", "whatsapp_click", {
      event_category: "engagement",
      event_label: source,
    });
    window.fbq?.("track", "Lead", { source });
  } catch {
    /* no-op */
  }
}

export function trackOrderSubmit(payload: {
  value: number;
  items: number;
  source?: string;
  promo?: boolean;
}) {
  try {
    window.gtag?.("event", "generate_lead", {
      currency: "MAD",
      value: payload.value,
      items: payload.items,
      source: payload.source,
      promo: payload.promo ? "BIENVENUE10" : undefined,
    });
    window.fbq?.("track", "InitiateCheckout", {
      value: payload.value,
      currency: "MAD",
      num_items: payload.items,
    });
  } catch {
    /* no-op */
  }
}

export function trackPageView(path: string) {
  try {
    window.gtag?.("event", "page_view", { page_path: path });
    window.fbq?.("track", "PageView");
  } catch {
    /* no-op */
  }
}
