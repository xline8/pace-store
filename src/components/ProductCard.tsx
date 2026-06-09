import { ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { StarRating } from './StarRating';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
  };

  const categoryLabel = product.category
    .split("'s").join('')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  return (
    <article
      onClick={() => onClick(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:border-black/15 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square bg-cream relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {categoryLabel}
        </span>

        <h3 className="text-sm font-medium text-ink leading-snug line-clamp-2 flex-1">
          {product.title}
        </h3>

        <StarRating rating={product.rating.rate} count={product.rating.count} />

        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-semibold text-ink">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-cream text-xs font-medium rounded-full hover:bg-accent-dark transition-colors"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingBag size={12} strokeWidth={2} />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
