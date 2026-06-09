import { useEffect } from 'react';
import { X, Home, Info, HelpCircle, ShoppingBag, Tag } from 'lucide-react';
import type { InfoPage } from './InfoModal';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onInfoClick: (page: InfoPage) => void;
  onCartClick: () => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
}

export function MobileMenu({
  open,
  onClose,
  onInfoClick,
  onCartClick,
  categories,
  selectedCategory,
  onCategoryChange,
}: MobileMenuProps) {
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

  const handleInfoClick = (page: InfoPage) => {
    onClose();
    setTimeout(() => onInfoClick(page), 150);
  };

  const handleCartClick = () => {
    onClose();
    setTimeout(() => onCartClick(), 150);
  };

  const handleCategoryClick = (cat: string) => {
    onCategoryChange(cat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer — slides in from left */}
      <aside className="relative w-72 max-w-[85vw] bg-cream-soft h-full flex flex-col shadow-2xl animate-slide-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-black/8">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
              <span className="text-cream text-xs font-display font-semibold">N</span>
            </div>
            <span className="font-display text-base font-medium text-ink">Nextgen</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-ink-muted hover:text-ink transition-colors rounded-full hover:bg-black/5"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          {/* Main nav */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted px-3 mb-2">
              Navigation
            </p>
            {[
              { icon: Home, label: 'Home', action: onClose },
              { icon: Info, label: 'About', action: () => handleInfoClick('about') },
              { icon: HelpCircle, label: 'FAQs', action: () => handleInfoClick('faqs') },
              { icon: ShoppingBag, label: 'Cart', action: handleCartClick },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-black/5 transition-all text-left"
              >
                <Icon size={16} strokeWidth={1.5} />
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-black/8" />

          {/* Category filter */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted px-3 mb-2">
              Categories
            </p>
            <button
              onClick={() => handleCategoryClick('')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                !selectedCategory
                  ? 'bg-ink text-cream'
                  : 'text-ink-muted hover:text-ink hover:bg-black/5'
              }`}
            >
              <Tag size={16} strokeWidth={1.5} />
              All Products
            </button>
            {categories.map((cat) => {
              const label = cat
                .split("'s").join('')
                .replace(/\b\w/g, (c) => c.toUpperCase())
                .trim();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left capitalize ${
                    selectedCategory === cat
                      ? 'bg-ink text-cream'
                      : 'text-ink-muted hover:text-ink hover:bg-black/5'
                  }`}
                >
                  <Tag size={16} strokeWidth={1.5} />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-black/8" />

          {/* Footer links */}
          <div className="space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted px-3 mb-2">
              Support
            </p>
            {[
              { label: 'Customer Support', page: 'customer-support' as InfoPage },
              { label: 'Delivery Details', page: 'delivery-details' as InfoPage },
              { label: 'Terms & Conditions', page: 'terms' as InfoPage },
              { label: 'Privacy Policy', page: 'privacy' as InfoPage },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => handleInfoClick(page)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-black/5 transition-all text-left"
              >
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom brand note */}
        <div className="px-5 py-4 border-t border-black/8">
          <p className="text-[11px] text-ink-muted">
            Nextgen &copy; 2004. All Rights Reserved.
          </p>
        </div>
      </aside>
    </div>
  );
}