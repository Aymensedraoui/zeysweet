// ⚠️⚠️⚠️ ACTION REQUISE — REMPLIR AVANT LA MISE EN LIGNE ⚠️⚠️⚠️
//
// Ces coordonnées CIH s'affichent au client sur la page de confirmation
// (mode "Virement CIH / CIH Express"). Tant que les champs marqués
// __À_REMPLIR__ ne sont pas changés, le client verra une erreur claire
// au lieu d'un IBAN bidon (voir Checkout.tsx → CihBlock).
//
// 1. accountHolder  → titulaire exact du compte (ex: "ZEY'S SWEETNESS SARL")
// 2. rib            → 24 chiffres CIH (sans espace ou groupé 3-3-16-2)
// 3. cihExpressPhone→ numéro CIH Express (+212 6XX XX XX XX)
//
// Quand c'est fait, supprime les __À_REMPLIR__ et le bloc d'alerte
// disparaît automatiquement.

export const BANK_INFO = {
  bankName: "CIH Bank",
  accountHolder: "__À_REMPLIR__",
  rib: "__À_REMPLIR__",
  cihExpressPhone: "__À_REMPLIR__",
  city: "Rabat",
};

export const PLACEHOLDER_MARKER = "__À_REMPLIR__";

export function isBankInfoConfigured(): boolean {
  return (
    BANK_INFO.accountHolder !== PLACEHOLDER_MARKER &&
    BANK_INFO.rib !== PLACEHOLDER_MARKER &&
    BANK_INFO.cihExpressPhone !== PLACEHOLDER_MARKER
  );
}
