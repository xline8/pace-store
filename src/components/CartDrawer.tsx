import { useEffect } from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, totalCount, totalPrice, removeItem } = useCart();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCheckout = () => {
    onClose();
    setTimeout(() => onCheckout(), 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <aside className="relative w-full max-w-sm bg-cream-soft h-full flex flex-col shadow-2xl animate-slide-up sm:animate-none">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} className="text-ink" />
            <h2 className="font-display text-lg font-medium text-ink">Cart</h2>
            {totalCount > 0 && (
              <span className="w-5 h-5 bg-ink text-cream text-[10px] font-semibold rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-2 text-ink-muted hover:text-ink transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag size={40} strokeWidth={1} className="text-ink/20 mb-4" />
              <p className="text-ink-muted text-sm">Your cart is empty</p>
              <p className="text-ink-muted/60 text-xs mt-1">Browse products and add items</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-white rounded-2xl p-3 border border-black/5">
                <div className="w-16 h-16 rounded-xl bg-cream flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink line-clamp-2 leading-snug">{item.product.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-ink">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-muted">x{item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-ink-muted/50 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-black/8 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-muted font-medium">Total</span>
              <span className="text-lg font-semibold text-ink">${totalPrice.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
