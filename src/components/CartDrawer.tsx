import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, remove, setModalOpen, giftMessage, setGiftMessage } = useStore();
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (!cartOpen) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-cocoa/50 z-50 transition-opacity"
        onClick={() => setCartOpen(false)}
      />
      <aside
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream z-50 shadow-warm flex flex-col"
        style={{ animation: "slide-in 0.3s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <div className="flex items-center justify-between p-6 border-b border-cocoa/10">
          <div>
            <h3 className="font-display font-bold text-2xl text-cocoa">Votre panier</h3>
            <p className="text-xs text-cocoa/60">{cart.length} article(s)</p>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Fermer le panier" className="p-2 hover:bg-cocoa/5 rounded-full">
            <X className="w-5 h-5 text-cocoa" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🍪</div>
              <p className="font-display italic text-xl text-cocoa">Votre panier est vide</p>
              <p className="text-sm text-cocoa/60 mt-2">Une douceur ne se refuse pas.</p>
              <button onClick={() => setCartOpen(false)} className="btn-rose mt-6 !py-2.5 !px-5 text-sm">
                Découvrir nos créations
              </button>
            </div>
          ) : (
            <>
              {cart.map((it) => (
                <div key={it.id} className="flex gap-3 bg-card rounded-2xl p-3 shadow-sm">
                  <img src={it.image} alt={it.name} className="w-16 h-16 rounded-xl object-cover img-warm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-cocoa text-sm truncate">{it.name}</h4>
                    <p className="font-hand text-caramel text-lg leading-none">{it.price * it.qty} MAD</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Diminuer" className="w-7 h-7 rounded-full border border-cocoa/20 flex items-center justify-center hover:bg-cocoa/5">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{it.qty}</span>
                      <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Augmenter" className="w-7 h-7 rounded-full border border-cocoa/20 flex items-center justify-center hover:bg-cocoa/5">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => remove(it.id)} aria-label="Retirer" className="ml-auto p-1 text-cocoa/50 hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <label className="text-xs font-semibold text-cocoa/70 uppercase tracking-wide">
                  💌 Message cadeau (optionnel)
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value.slice(0, 120))}
                  rows={2}
                  placeholder="Un mot doux à inscrire dans le coffret..."
                  className="w-full mt-2 rounded-xl border border-cocoa/15 bg-card p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose"
                />
                <p className="text-[10px] text-cocoa/50 text-right mt-1">{giftMessage.length}/120</p>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-cocoa/10 p-6 space-y-3 bg-card">
            <div className="flex justify-between items-baseline">
              <span className="text-cocoa/70">Sous-total</span>
              <span className="font-display font-bold text-2xl text-cocoa">{total} MAD</span>
            </div>
            <button
              onClick={() => { setCartOpen(false); setModalOpen(true); }}
              className="btn-rose w-full"
            >
              💬 Commander via WhatsApp
            </button>
            <button disabled className="w-full py-3 rounded-full border-2 border-cocoa/15 text-cocoa/40 text-sm cursor-not-allowed">
              Payer en ligne · Bientôt disponible
            </button>
          </div>
        )}
      </aside>
      <style>{`@keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </>
  );
}
