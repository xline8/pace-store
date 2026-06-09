import { useState, useMemo } from 'react';
import type { Product, SortOption } from './types';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SkeletonGrid } from './components/SkeletonCard';
import { ErrorState } from './components/ErrorState';
import { ToastContainer } from './components/ToastContainer';
import { CartDrawer } from './components/CartDrawer';
import { InfoModal, type InfoPage } from './components/InfoModal';
import { CheckoutModal } from './components/CheckoutModal';
import { MobileMenu } from './components/MobileMenu';

function AppInner() {
  const { products, categories, loading, error, refetch } = useProducts();
  const [menuOpen, setMenuOpen] = useState(false);

  // Filter & sort state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [minRating, setMinRating] = useState(0);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [infoPage, setInfoPage] = useState<InfoPage | null>(null);

  // Debounced search
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Derived: filtered + sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (minRating > 0) {
      result = result.filter((p) => p.rating.rate >= minRating);
    }

    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }

    return result;
  }, [products, selectedCategory, debouncedSearch, minRating, sortOption]);

  // Footer link groups
  const footerLinks: { title: string; links: { label: string; page: InfoPage }[] }[] = [
    {
      title: 'COMPANY',
      links: [
        { label: 'About', page: 'about' },
        { label: 'Features', page: 'features' },
        { label: 'Works', page: 'works' },
        { label: 'Career', page: 'career' },
      ],
    },
    {
      title: 'HELP',
      links: [
        { label: 'Customer Support', page: 'customer-support' },
        { label: 'Delivery Details', page: 'delivery-details' },
        { label: 'Terms & Conditions', page: 'terms' },
        { label: 'Privacy Policy', page: 'privacy' },
      ],
    },
    {
      title: 'FAQ',
      links: [
        { label: 'Account', page: 'account' },
        { label: 'Manage Deliveries', page: 'manage-deliveries' },
        { label: 'Orders', page: 'orders' },
        { label: 'Payments', page: 'payments' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { label: 'Free eBooks', page: 'ebooks' },
        { label: 'Development Tutorial', page: 'tutorial' },
        { label: 'How to — Blog', page: 'blog' },
        { label: 'Youtube Playlist', page: 'youtube' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-cream font-sans text-ink">
      <Navbar
        onCartClick={() => setCartOpen(true)}
        onInfoClick={(page) => setInfoPage(page)}
        onMenuClick={() => setMenuOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero title */}
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Collection</p>
          <h1 className="font-display text-3xl sm:text-4xl font-medium text-ink">
            All Products
          </h1>
        </div>

        {/* Filter bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          totalResults={filteredProducts.length}
        />

        {loading && <SkeletonGrid />}

        {!loading && error && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-ink-muted">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="font-display text-lg font-medium text-ink mb-1">No products found</h3>
            <p className="text-sm text-ink-muted">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-black/8 bg-cream-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
                  <span className="text-cream text-xs font-display font-semibold">P</span>
                </div>
                <span className="font-display text-base font-medium text-ink">Pace Store</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed max-w-[200px]">
                We have clothes that suits your style and which you are proud to wear.
              </p>
            </div>

            {/* Footer link columns */}
            {footerLinks.map((col) => (
              <div key={col.title} className="space-y-3">
                <p className="text-[10px] font-semibold tracking-widest text-ink-muted uppercase">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map(({ label, page }) => (
                    <li key={label}>
                      <button
                        onClick={() => setInfoPage(page)}
                        className="text-xs text-ink-muted hover:text-ink transition-colors text-left"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-ink-muted">Pace Store &copy; 2026, All Rights Reserved</p>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              {['VISA', 'Mastercard', 'PayPal', 'Apple Pay', 'G Pay'].map((m) => (
                <button
                  key={m}
                  onClick={() => setInfoPage('payments')}
                  className="px-2 py-1 border border-black/10 rounded hover:border-black/25 transition-colors"
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <InfoModal page={infoPage} onClose={() => setInfoPage(null)} />
      <ToastContainer />
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onInfoClick={(page) => setInfoPage(page)}
        onCartClick={() => setCartOpen(true)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
