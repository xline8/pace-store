import { useEffect } from 'react';
import { X, ShoppingBag, Tag } from 'lucide-react';
import type { Product } from '../types';
import { StarRating } from './StarRating';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart();

  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  if (!product) return null;

  const categoryLabel = product.category
    .split("'s").join('')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full sm:max-w-2xl bg-cream-soft rounded-t-3xl sm:rounded-3xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-ink-muted hover:text-ink transition-all"
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="w-full sm:w-72 flex-shrink-0 bg-cream rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none flex items-center justify-center p-8 min-h-56">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-52 w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex-1 p-6 flex flex-col gap-4">
            {/* Category badge */}
            <div className="flex items-center gap-2">
              <Tag size={12} className="text-accent" strokeWidth={2} />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
                {categoryLabel}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-display text-xl font-medium text-ink leading-tight">
              {product.title}
            </h2>

            {/* Price */}
            <div className="text-2xl font-semibold text-ink">
              ${product.price.toFixed(2)}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating.rate} count={product.rating.count} size={14} />
              <span className="text-xs text-ink-muted">{product.rating.count} reviews</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/8" />

            {/* Description */}
            <p className="text-sm text-ink-muted leading-relaxed line-clamp-5">
              {product.description}
            </p>

            {/* Shipping info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-xl p-3 border border-black/5">
                <p className="text-ink-muted">Discount</p>
                <p className="font-semibold text-ink mt-0.5">Disc 50%</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-black/5">
                <p className="text-ink-muted">Delivery</p>
                <p className="font-semibold text-ink mt-0.5">3–4 Working Days</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => { addItem(product); onClose(); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-ink text-cream font-medium rounded-2xl hover:bg-accent-dark transition-colors text-sm mt-auto"
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
