import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  VIDEO_CAMPAIGNS,
  CAMPAIGN_WHATSAPP_NUMBER,
  buildCampaignWaLink,
} from "@/lib/videoCampaigns";

const ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "https://zeysweet.com";

export default function Campaigns() {
  const [copied, setCopied] = useState<string>("");

  const copy = async (txt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(id);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      /* no-op */
    }
  };

  return (
    <main className="min-h-screen bg-cream py-16 px-4">
      <Helmet>
        <title>Campagnes vidéo · Zey's Sweetness</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="container mx-auto max-w-3xl">
        <p className="font-hand text-2xl text-caramel">Interne</p>
        <h1 className="font-display italic text-4xl text-cocoa mt-1">
          Liens WhatsApp par vidéo
        </h1>
        <p className="text-cocoa/70 mt-3 mb-2">
          Numéro WhatsApp utilisé : <strong>+{CAMPAIGN_WHATSAPP_NUMBER}</strong>{" "}
          (modifier via <code>VITE_WHATSAPP_NUMBER</code> ou <code>store.ts</code>).
        </p>
        <p className="text-sm text-cocoa/60 mb-10">
          Colle le lien court dans la bio TikTok/Instagram. Il ouvre WhatsApp avec le
          message pré-rempli adapté à la vidéo, et déclenche l'event analytics{" "}
          <code>whatsapp_click · video:&lt;id&gt;</code>.
        </p>

        <div className="space-y-5">
          {VIDEO_CAMPAIGNS.map((c) => {
            const shortUrl = `${ORIGIN}/wa/${c.id}`;
            const directUrl = buildCampaignWaLink(c);
            return (
              <div
                key={c.id}
                className="bg-card rounded-2xl p-5 shadow-card border border-cocoa/5"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-caramel font-semibold">
                      {c.platform}
                    </span>
                    <h2 className="font-display text-xl text-cocoa">{c.label}</h2>
                  </div>
                  <a
                    href={directUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-rose underline shrink-0 mt-1"
                  >
                    tester →
                  </a>
                </div>
                <p className="text-sm text-cocoa/70 italic mb-3 whitespace-pre-line">
                  « {c.message_fr} »
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <code className="text-xs bg-cocoa/5 px-2 py-1 rounded flex-1 min-w-0 truncate">
                    {shortUrl}
                  </code>
                  <button
                    onClick={() => copy(shortUrl, c.id)}
                    className="text-xs btn-cocoa !py-1.5 !px-3"
                  >
                    {copied === c.id ? "Copié ✓" : "Copier"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
