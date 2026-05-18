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

export function trackPageView(path: string) {
  try {
    window.gtag?.("event", "page_view", { page_path: path });
    window.fbq?.("track", "PageView");
  } catch {
    /* no-op */
  }
}
