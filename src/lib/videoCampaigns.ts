// === Campagnes vidéo (TikTok / Reels) ===
// Numéro WhatsApp configurable + message pré-rempli différent par vidéo.
// Utilisé par la route /wa/:videoId et la page /campagnes.

import { WHATSAPP_NUMBER as DEFAULT_NUMBER } from "./store";

// Override possible via variable d'env Vite : VITE_WHATSAPP_NUMBER="2126XXXXXXXX"
// Sinon on retombe sur le numéro principal défini dans store.ts.
export const CAMPAIGN_WHATSAPP_NUMBER: string =
  (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, "") ||
  DEFAULT_NUMBER;

export type VideoCampaign = {
  id: string;          // slug stable utilisé dans l'URL /wa/:id
  label: string;       // titre interne (affiché dans /campagnes)
  platform: "tiktok" | "instagram" | "reels" | "youtube" | "other";
  message_fr: string;  // message WhatsApp pré-rempli (FR)
  message_ar?: string; // version arabe optionnelle
};

// 👉 Ajoute/édite une vidéo : ajoute une entrée ci-dessous.
// L'id devient l'URL : https://zeysweet.com/wa/<id>
export const VIDEO_CAMPAIGNS: VideoCampaign[] = [
  {
    id: "cookie-signature",
    label: "Lundi · Hero — Le Cookie Signature",
    platform: "tiktok",
    message_fr:
      "Bonjour Zey's 🍪 J'ai vu votre vidéo TikTok du Cookie Signature et j'aimerais commander. Pouvez-vous me dire les saveurs dispo et la prochaine livraison à Rabat ?",
    message_ar:
      "مرحبا حلاوة زي 🍪 شفت الفيديو ديال Cookie Signature، بغيت نطلب. شنو هي النكهات المتوفرة و فوقاش التوصيل بالرباط ؟",
  },
  {
    id: "asmr-dattes",
    label: "Mardi · ASMR — Dattes farcies aux cajou",
    platform: "instagram",
    message_fr:
      "Coucou 🤍 La vidéo ASMR des dattes farcies m'a donné trop envie ! Je voudrais une boîte cadeau, vous avez quel format dispo cette semaine ?",
  },
  {
    id: "ugc-cliente",
    label: "Mercredi · UGC — Témoignage cliente",
    platform: "reels",
    message_fr:
      "Bonjour, j'ai vu le Reel d'une cliente qui adore vos cookies, je voudrais tester aussi ! Quelle est la commande minimum et est-ce livré à Témara ?",
  },
  {
    id: "behind-the-scenes",
    label: "Jeudi · Coulisses atelier",
    platform: "tiktok",
    message_fr:
      "Hello ! J'ai adoré la vidéo des coulisses de l'atelier 🍪 Je veux commander un coffret découverte, c'est possible quand ?",
  },
  {
    id: "story-mariage",
    label: "Vendredi · Storytelling — Dattes de mariage",
    platform: "instagram",
    message_fr:
      "Bonjour Zey's 💍 J'organise un mariage à Rabat et la vidéo des dattes de mariage m'a convaincue. Pouvez-vous m'envoyer les tarifs par 100 pièces ?",
    message_ar:
      "السلام 💍 كنظم عرس بالرباط و الفيديو ديال تمر العرس عجبني بزاف. ممكن تبعتو ليا الأثمنة ديال 100 حبة ؟",
  },
  {
    id: "ramadan-countdown",
    label: "Ramadan · Countdown",
    platform: "tiktok",
    message_fr:
      "Bonjour 🌙 Vu votre vidéo Ramadan, je veux réserver un coffret dattes pour la famille. Quelles sont les dates de livraison avant le mois ?",
  },
  {
    id: "corporate-b2b",
    label: "LinkedIn / B2B — Coffrets corporate",
    platform: "other",
    message_fr:
      "Bonjour, je représente une entreprise à Rabat et j'aimerais un devis pour des coffrets cadeaux corporate (volume 20–100). Pouvez-vous m'envoyer le catalogue PDF ?",
  },
];

export const findCampaign = (id: string) =>
  VIDEO_CAMPAIGNS.find((c) => c.id === id);

export const buildCampaignWaLink = (
  c: VideoCampaign,
  lang: "fr" | "ar" = "fr"
) => {
  const msg = (lang === "ar" && c.message_ar) ? c.message_ar : c.message_fr;
  const text = `${msg}\n\n(réf : video/${c.id})`;
  return `https://wa.me/${CAMPAIGN_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};
