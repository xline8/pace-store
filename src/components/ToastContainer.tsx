import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3 bg-ink text-cream px-4 py-3 rounded-2xl shadow-xl min-w-64 max-w-80 animate-toast-in"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
            <ShoppingBag size={14} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold">{toast.message}</p>
            <p className="text-xs text-cream/60 truncate mt-0.5">{toast.productTitle}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-cream/50 hover:text-cream transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
