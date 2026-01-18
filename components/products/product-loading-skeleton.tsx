"use client"

import { HeaderSection } from "@/components/header"

export function ProductLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
            {/* Content skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}