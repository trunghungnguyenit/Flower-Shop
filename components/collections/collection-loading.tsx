"use client"

export function CollectionLoading() {
  return (
    <div className="grid gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border-soft)]">
          <div className="aspect-square bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="flex justify-between items-center">
              <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}