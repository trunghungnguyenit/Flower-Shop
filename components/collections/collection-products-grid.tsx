"use client"

import { cn } from "@/lib/utils"
import { Product } from "@/api/api.type"
import { CollectionProductCard } from "./collection-product-card"
import { CollectionEmptyState } from "./collection-empty-state"

interface CollectionProductsGridProps {
  products: Product[]
  viewMode: "grid" | "list"
  onConfetti: (e: React.MouseEvent) => void
}

export function CollectionProductsGrid({
  products,
  viewMode,
  onConfetti,
}: CollectionProductsGridProps) {
  if (products.length === 0) {
    return <CollectionEmptyState />
  }

  return (
    <div className={cn(
      "grid gap-6 lg:gap-8",
      viewMode === "grid" 
        ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
        : "grid-cols-1 md:grid-cols-2"
    )}>
      {products.map((product, index) => (
        <CollectionProductCard 
          key={product.id} 
          product={product} 
          index={index} 
          onConfetti={onConfetti} 
        />
      ))}
    </div>
  )
}