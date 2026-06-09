import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import {
  buildCampaignWaLink,
  findCampaign,
  CAMPAIGN_WHATSAPP_NUMBER,
} from "@/lib/videoCampaigns";
import { trackWhatsAppClick } from "@/lib/analytics";

export default function WaRedirect() {
  const { videoId = "" } = useParams();
  const [params] = useSearchParams();
  const lang = (params.get("lang") === "ar" ? "ar" : "fr") as "fr" | "ar";
  const campaign = findCampaign(videoId);

  useEffect(() => {
    if (!campaign) return;
    trackWhatsAppClick(`video:${campaign.id}`);
    const url = buildCampaignWaLink(campaign, lang);
    // petit délai pour laisser le tracking partir
    const t = setTimeout(() => window.location.replace(url), 250);
    return () => clearTimeout(t);
  }, [campaign, lang]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream p-6 text-center">
      <div className="max-w-md">
        {campaign ? (
          <>
            <p className="font-hand text-2xl text-caramel mb-2">Un instant…</p>
            <h1 className="font-display italic text-3xl text-cocoa mb-4">
              On t'ouvre WhatsApp 🍪
            </h1>
            <p className="text-cocoa/70 mb-6">
              Si rien ne se passe,{" "}
              <a
                href={buildCampaignWaLink(campaign, lang)}
                className="underline text-rose font-semibold"
              >
                clique ici
              </a>
              .
            </p>
            <p className="text-xs text-cocoa/50">
              Campagne : {campaign.label} · Numéro : +{CAMPAIGN_WHATSAPP_NUMBER}
            </p>
          </>
        ) : (
          <>
            <h1 className="font-display italic text-3xl text-cocoa mb-3">
              Lien introuvable
            </h1>
            <p className="text-cocoa/70 mb-6">
              Cette campagne vidéo n'existe pas ou a été retirée.
            </p>
            <Link to="/" className="btn-rose">Retour à l'accueil</Link>
          </>
        )}
      </div>
    </main>
  );
}
