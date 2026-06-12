import { ShoppingBag } from "lucide-react";
import { useCart, useCartCount } from "@/lib/cart";

export default function CartButton({ className = "" }: { className?: string }) {
  const count = useCartCount();
  const setOpen = useCart((s) => s.setOpen);

  return (
    <button
      onClick={() => setOpen(true)}
      aria-label={`Voir le panier (${count} article${count > 1 ? "s" : ""})`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full border border-cocoa/20 text-cocoa hover:bg-cocoa hover:text-cream transition-colors ${className}`}
    >
      <ShoppingBag className="w-4 h-4" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose text-cream text-[10px] font-bold flex items-center justify-center tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
