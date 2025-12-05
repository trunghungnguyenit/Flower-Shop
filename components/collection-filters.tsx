"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

interface Category {
  id: string
  name: string
}

interface CollectionFiltersProps {
  categories: Category[]
  occasions: Category[]
  selectedCategory: string
  selectedOccasion: string
}

export function CollectionFilters({
  categories,
  occasions,
  selectedCategory,
  selectedOccasion,
}: CollectionFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (type: "category" | "occasion", value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "all") {
      params.delete(type)
    } else {
      params.set(type, value)
    }

    router.push(`/bo-suu-tap?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="mb-8 space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Loại hoa</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("category", category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-primary/10"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Occasion Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Theo dịp</h3>
        <div className="flex flex-wrap gap-2">
          {occasions.map((occasion) => (
            <Button
              key={occasion.id}
              variant={selectedOccasion === occasion.id ? "default" : "outline"}
              size="sm"
              onClick={() => updateFilter("occasion", occasion.id)}
              className={
                selectedOccasion === occasion.id
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-primary/10"
              }
            >
              {occasion.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
