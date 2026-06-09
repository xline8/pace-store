import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { InfoPage } from './InfoModal';

interface NavbarProps {
  onCartClick: () => void;
  onInfoClick: (page: InfoPage) => void;
  onMenuClick: () => void; // TAMBAH INI
}

export function Navbar({ onCartClick, onInfoClick, onMenuClick }: NavbarProps) {
  const { totalCount } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-cream-soft/95 backdrop-blur-sm border-b border-black/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger — sambungkan onMenuClick */}
          <button
            onClick={onMenuClick}
            className="p-2 text-ink-muted hover:text-ink transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>

          {/* Nav right */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => onInfoClick('about')}
                className="text-sm text-ink-muted hover:text-ink transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => onInfoClick('faqs')}
                className="text-sm text-ink-muted hover:text-ink transition-colors font-medium"
              >
                FAQs
              </button>
            </nav>
            <button
              onClick={onCartClick}
              className="relative p-2 text-ink hover:text-accent transition-colors"
              aria-label={`Shopping cart, ${totalCount} items`}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-ink text-cream text-[10px] font-semibold rounded-full flex items-center justify-center animate-fade-in">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}