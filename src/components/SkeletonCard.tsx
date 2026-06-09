export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-black/5">
      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 animate-pulse" />
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-3 w-16 bg-gray-100 rounded-full animate-pulse" />
        {/* Title */}
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-100 rounded-full animate-pulse" />
        </div>
        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-3 w-3 bg-gray-100 rounded-sm animate-pulse" />
          ))}
          <div className="h-3 w-8 bg-gray-100 rounded-full animate-pulse ml-1" />
        </div>
        {/* Price + button */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
          <div className="h-8 w-24 bg-gray-100 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {[...Array(20)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
