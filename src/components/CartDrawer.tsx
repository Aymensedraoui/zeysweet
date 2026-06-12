import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart, MIN_ORDER_MAD } from "@/lib/cart";

export default function CartDrawer() {
  const { items, isOpen, setOpen, updateQty, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const total = subtotal();
  const underMin = total > 0 && total < MIN_ORDER_MAD;

  const goCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md bg-cream border-l border-cocoa/10 flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-cocoa/10">
          <SheetTitle className="font-display font-bold italic text-2xl text-cocoa flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Votre panier
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
            <span className="text-5xl mb-3">🍪</span>
            <p className="font-display text-xl text-cocoa">Panier vide</p>
            <p className="text-sm text-cocoa/65 mt-1.5">
              Composez une boîte pour commencer.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex gap-3 rounded-2xl border border-cocoa/10 bg-card p-3"
                >
                  {it.image && (
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-cream shrink-0">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-cocoa leading-snug">
                      {it.title}
                    </p>
                    {it.flavors && it.flavors.length > 0 && (
                      <p className="text-[11px] text-cocoa/60 mt-0.5 line-clamp-2">
                        {it.flavors.map((f) => `${f.qty}× ${f.name}`).join(" · ")}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center rounded-full border border-cocoa/15 bg-cream/70">
                        <button
                          onClick={() => updateQty(it.id, it.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center text-cocoa hover:text-rose"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-semibold tabular-nums">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => updateQty(it.id, it.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center text-cocoa hover:text-rose"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-hand text-xl text-caramel leading-none">
                        {it.unitPrice * it.qty} MAD
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(it.id)}
                    className="text-cocoa/40 hover:text-rose self-start p-1"
                    aria-label="Retirer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-cocoa/10 bg-card/95 backdrop-blur p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-cocoa/70">Sous-total</span>
                <span className="font-hand text-3xl text-caramel leading-none">
                  {total} MAD
                </span>
              </div>
              {underMin && (
                <div className="flex items-center gap-2 text-xs text-rose">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Commande minimum {MIN_ORDER_MAD} MAD — ajoutez encore{" "}
                    {MIN_ORDER_MAD - total} MAD.
                  </span>
                </div>
              )}
              <button
                onClick={goCheckout}
                disabled={underMin}
                className="btn-rose btn-glow w-full !py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Passer commande →
              </button>
              <p className="text-[11px] text-center text-cocoa/55">
                3 modes de paiement · WhatsApp, virement CIH, à la livraison
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
