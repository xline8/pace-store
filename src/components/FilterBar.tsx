import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { Category, SortOption } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  sortOption: SortOption;
  onSortChange: (v: SortOption) => void;
  minRating: number;
  onMinRatingChange: (v: number) => void;
  totalResults: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
  minRating,
  onMinRatingChange,
  totalResults,
}: FilterBarProps) {
  const hasFilters = searchQuery || selectedCategory || sortOption !== 'default' || minRating > 0;

  const clearAll = () => {
    onSearchChange('');
    onCategoryChange('');
    onSortChange('default');
    onMinRatingChange(0);
  };

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" strokeWidth={2} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-black/10 rounded-xl text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none focus:border-ink/30 focus:ring-2 focus:ring-ink/5 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pl-9 pr-8 py-2.5 bg-white border border-black/10 rounded-xl text-sm text-ink focus:outline-none focus:border-ink/30 transition-all cursor-pointer"
          >
            <option value="default">Default Order</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onCategoryChange('')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            !selectedCategory
              ? 'bg-ink text-cream border-ink'
              : 'bg-white text-ink-muted border-black/10 hover:border-ink/30 hover:text-ink'
          }`}
        >
          All
        </button>
        {categories.map((cat) => {
          const label = cat.split("'s").join('').replace(/\b\w/g, (c) => c.toUpperCase()).trim();
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-ink text-cream border-ink'
                  : 'bg-white text-ink-muted border-black/10 hover:border-ink/30 hover:text-ink'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Rating filter + results count */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-ink-muted">Min rating:</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((r) => (
              <button
                key={r}
                onClick={() => onMinRatingChange(r === minRating ? 0 : r)}
                className={`px-2.5 py-1 text-xs rounded-lg border font-medium transition-all ${
                  minRating === r && r > 0
                    ? 'bg-accent text-white border-accent'
                    : 'bg-white text-ink-muted border-black/10 hover:border-ink/20'
                }`}
              >
                {r === 0 ? 'Any' : `${r}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-muted">
            {totalResults} product{totalResults !== 1 ? 's' : ''}
          </span>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors"
            >
              <X size={11} />
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
