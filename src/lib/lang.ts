// Détection de langue FR/AR partagée par toutes les redirections WhatsApp.
// Ordre de priorité :
//   1) ?lang=fr|ar dans l'URL (force, ex. depuis une bio sociale)
//   2) langue sélectionnée par l'utilisateur sur le site (zustand persisté)
//   3) langue du navigateur (ar* → ar, sinon fr)
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "./store";
import type { Lang } from "./i18n";

export function detectLang(
  forced: string | null | undefined,
  stored: Lang | undefined
): Lang {
  if (forced === "ar" || forced === "fr") return forced;
  if (stored === "ar" || stored === "fr") return stored;
  if (typeof navigator !== "undefined") {
    const nav = (navigator.language || "").toLowerCase();
    if (nav.startsWith("ar")) return "ar";
  }
  return "fr";
}

export function useDetectedLang(): Lang {
  const [params] = useSearchParams();
  const storedLang = useStore((s) => s.lang);
  return useMemo(
    () => detectLang(params.get("lang"), storedLang),
    [params, storedLang]
  );
}
