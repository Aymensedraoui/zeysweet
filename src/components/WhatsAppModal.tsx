import { X } from "lucide-react";
import { useStore, buildWhatsAppLink } from "@/lib/store";

export default function WhatsAppModal() {
  const { modalOpen, setModalOpen, cart, giftMessage, lang, clear } = useStore();
  if (!modalOpen) return null;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const link = buildWhatsAppLink(cart, giftMessage, lang);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-cocoa/60 animate-fade-up">
      <div className="bg-cream rounded-3xl max-w-md w-full p-7 border border-caramel/30 shadow-warm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-hand text-2xl text-caramel">Presque prêt !</p>
            <h3 className="font-display font-bold italic text-2xl text-cocoa">Votre commande est prête !</h3>
          </div>
          <button onClick={() => setModalOpen(false)} aria-label="Fermer"><X className="w-5 h-5 text-cocoa" /></button>
        </div>

        <p className="text-sm text-cocoa/70 mb-5">
          Nous allons ouvrir WhatsApp avec votre résumé. Zey vous répondra dans les plus brefs délais.
        </p>

        <div className="bg-card rounded-2xl p-4 max-h-56 overflow-y-auto space-y-2 mb-4">
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between text-sm">
              <span className="text-cocoa">{i.name} <span className="text-cocoa/50">× {i.qty}</span></span>
              <span className="font-medium text-cocoa">{i.price * i.qty} MAD</span>
            </div>
          ))}
          <div className="pt-2 border-t border-cocoa/10 flex justify-between font-display font-bold text-cocoa">
            <span>Total</span>
            <span className="text-caramel">{total} MAD</span>
          </div>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { setTimeout(() => { setModalOpen(false); }, 500); }}
          className="btn-rose w-full"
        >
          Envoyer sur WhatsApp ✓
        </a>
        <button
          onClick={() => setModalOpen(false)}
          className="w-full mt-2 text-sm text-cocoa/60 hover:text-cocoa underline"
        >
          Modifier ma sélection
        </button>
      </div>
    </div>
  );
}
