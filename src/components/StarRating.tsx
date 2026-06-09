import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}

export function StarRating({ rating, count, size = 12, showCount = true }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const partial = !filled && rating >= star - 0.5;
          return (
            <span key={star} className="relative inline-flex">
              <Star
                size={size}
                className="text-gray-200"
                fill="currentColor"
                strokeWidth={0}
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : '50%' }}
                >
                  <Star
                    size={size}
                    className="text-accent"
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-ink-muted font-medium">{rating.toFixed(1)}</span>
      )}
      {showCount && count !== undefined && (
        <span className="text-xs text-ink-muted/70">({count})</span>
      )}
    </div>
  );
}
