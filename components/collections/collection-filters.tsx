"use client"

import { Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  name: string
  count: number
}

interface CollectionFiltersProps {
  occasions: FilterOption[]
  giftGuides: FilterOption[]
  selectedOccasion: string
  selectedGiftGuide: string
  viewMode: "grid" | "list"
  filteredProductsCount: number
  onOccasionChange: (occasionId: string) => void
  onGiftGuideChange: (guideId: string) => void
  onViewModeChange: (mode: "grid" | "list") => void
}

export function CollectionFilters({
  occasions,
  giftGuides,
  selectedOccasion,
  selectedGiftGuide,
  viewMode,
  filteredProductsCount,
  onOccasionChange,
  onGiftGuideChange,
  onViewModeChange,
}: CollectionFiltersProps) {
  return (
    <div className="flex flex-col gap-6 mb-12">
      {/* Occasions */}
      <div>
        <h3 className="font-medium text-[var(--text-primary)] mb-3">Dịp sử dụng:</h3>
        <div className="flex flex-wrap gap-3">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => onOccasionChange(occasion.id)}
              className={cn(
                "px-6 py-3 rounded-full font-body font-medium transition-all duration-300",
                selectedOccasion === occasion.id
                  ? "bg-[var(--text-primary)] text-white"
                  : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
              )}
              style={{ fontSize: "14px" }}
            >
              {occasion.name} ({occasion.count})
            </button>
          ))}
        </div>
      </div>

      {/* Gift Guides */}
      <div>
        <h3 className="font-medium text-[var(--text-primary)] mb-3">Tặng cho ai:</h3>
        <div className="flex flex-wrap gap-3">
          {giftGuides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => onGiftGuideChange(guide.id)}
              className={cn(
                "px-6 py-3 rounded-full font-body font-medium transition-all duration-300",
                selectedGiftGuide === guide.id
                  ? "bg-[var(--text-primary)] text-white"
                  : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
              )}
              style={{ fontSize: "14px" }}
            >
              {guide.name} ({guide.count})
            </button>
          ))}
        </div>
      </div>

      {/* View Mode */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-[var(--text-secondary)]">
          Hiển thị {filteredProductsCount} sản phẩm
        </div>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={cn(
              "p-2 rounded-md transition-all duration-300",
              viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}