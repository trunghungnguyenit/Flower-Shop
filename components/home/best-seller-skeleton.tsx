"use client"

export function BestSellerSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="group animate-pulse">
          {/* Image Skeleton */}
          <div 
            className="relative aspect-[3/4] bg-gray-200 mb-4"
            style={{ borderRadius: "var(--radius-medium)" }}
          />
          
          {/* Info Skeleton */}
          <div>
            {/* Title */}
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            
            {/* Price */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-200 rounded w-16" />
              <div className="h-3 bg-gray-200 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}