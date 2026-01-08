"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SlidersHorizontal,
  Gift,
  Heart,
  Cake,
  PartyPopper,
  Flower2,
  X,
} from "lucide-react"

interface FilterSidebarProps {
  selectedCategory: string
  selectedOccasion: string
  selectedPrice: string
  selectedColor: string
  sortBy: string
}

const occasions = [
  { id: "tet", name: "Tết", icon: Gift },
  { id: "sinh-nhat", name: "Sinh nhật", icon: Cake },
  { id: "tinh-yeu", name: "Tình yêu", icon: Heart },
  { id: "cuoi", name: "Cưới", icon: PartyPopper },
  { id: "khai-truong", name: "Khai trương", icon: PartyPopper },
  { id: "chia-buon", name: "Chia buồn", icon: Flower2 },
  { id: "trang-tri", name: "Trang trí", icon: Flower2 },
]

const priceRanges = [
  { id: "all", name: "Tất cả mức giá" },
  { id: "under-300", name: "Dưới 300.000đ" },
  { id: "300-500", name: "300.000đ - 500.000đ" },
  { id: "500-800", name: "500.000đ - 800.000đ" },
  { id: "800-1500", name: "800.000đ - 1.500.000đ" },
  { id: "over-1500", name: "Trên 1.500.000đ" },
]

const colors = [
  { id: "pastel", name: "Pastel", color: "#F4EDEE" },
  { id: "red", name: "Đỏ", color: "#E64A4A" },
  { id: "pink", name: "Hồng", color: "#D97C8A" },
  { id: "yellow", name: "Vàng", color: "#FFC107" },
  { id: "white", name: "Trắng", color: "#FFFFFF" },
  { id: "mix", name: "Mix", color: "linear-gradient(135deg, #D97C8A 0%, #FFC107 50%, #E64A4A 100%)" },
]

const sortOptions = [
  { id: "popular", name: "Phổ biến nhất" },
  { id: "price-asc", name: "Giá tăng dần" },
  { id: "price-desc", name: "Giá giảm dần" },
  { id: "newest", name: "Mới cập nhật" },
  { id: "best-seller", name: "Bán chạy nhất" },
]

export function FilterSidebar({
  selectedOccasion,
  selectedPrice,
  selectedColor,
  sortBy,
}: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "all" || value === "") {
      params.delete(key)
    } else {
      params.set(key, value)
    }

    router.push(`/collection?${params.toString()}`, { scroll: false })
  }

  const clearAllFilters = () => {
    router.push("/collection", { scroll: false })
  }

  const hasActiveFilters = selectedOccasion !== "all" || selectedPrice !== "all" || selectedColor !== "all"

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort - Mobile only in sheet */}
      <div className="lg:hidden">
        <h3
          className="text-[var(--text-primary)] uppercase tracking-wider mb-3 font-body"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          Sắp xếp
        </h3>
        <Select value={sortBy} onValueChange={(value) => updateFilter("sort", value)}>
          <SelectTrigger
            className="w-full bg-white border-[var(--border-soft)] font-body"
            style={{ borderRadius: "var(--radius-medium)" }}
          >
            <SelectValue placeholder="Sắp xếp theo" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id} className="font-body">
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Occasion Filter */}
      <div>
        <h3
          className="text-[var(--text-primary)] uppercase tracking-wider mb-3 font-body"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          Theo dịp
        </h3>
        <div className="space-y-2">
          {occasions.map((occasion) => {
            const Icon = occasion.icon
            const isSelected = selectedOccasion === occasion.id
            return (
              <label
                key={occasion.id}
                className="flex items-center gap-3 p-2 cursor-pointer hover:bg-[var(--background-muted)] transition-smooth group"
                style={{ borderRadius: "var(--radius-soft)" }}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={(checked) =>
                    updateFilter("occasion", checked ? occasion.id : "all")
                  }
                  className="border-[var(--border-soft)] data-[state=checked]:bg-[var(--primary)] data-[state=checked]:border-[var(--primary)]"
                />
                <Icon
                  className={`w-4 h-4 transition-smooth ${
                    isSelected ? "text-[var(--primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--primary)]"
                  }`}
                  strokeWidth={1.5}
                />
                <span
                  className={`font-body transition-smooth ${
                    isSelected ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"
                  }`}
                  style={{ fontSize: "14px" }}
                >
                  {occasion.name}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3
          className="text-[var(--text-primary)] uppercase tracking-wider mb-3 font-body"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          Theo giá
        </h3>
        <Select value={selectedPrice} onValueChange={(value) => updateFilter("price", value)}>
          <SelectTrigger
            className="w-full bg-white border-[var(--border-soft)] font-body"
            style={{ borderRadius: "var(--radius-medium)" }}
          >
            <SelectValue placeholder="Chọn mức giá" />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range.id} value={range.id} className="font-body">
                {range.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color Filter */}
      <div>
        <h3
          className="text-[var(--text-primary)] uppercase tracking-wider mb-3 font-body"
          style={{ fontSize: "12px", fontWeight: 600 }}
        >
          Theo màu sắc
        </h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const isSelected = selectedColor === color.id
            return (
              <button
                key={color.id}
                onClick={() => updateFilter("color", isSelected ? "all" : color.id)}
                className={`flex items-center gap-2 px-3 py-1.5 border transition-smooth font-body ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)]/10"
                    : "border-[var(--border-soft)] hover:border-[var(--primary)]"
                }`}
                style={{
                  borderRadius: "var(--radius-round)",
                  fontSize: "13px",
                }}
              >
                <span
                  className="w-4 h-4 border border-[var(--border-soft)]"
                  style={{
                    borderRadius: "50%",
                    background: color.color,
                  }}
                />
                <span className={isSelected ? "text-[var(--primary)] font-medium" : "text-[var(--text-secondary)]"}>
                  {color.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={clearAllFilters}
          className="w-full border-[var(--danger)] text-[var(--danger)] hover:bg-[var(--danger)] hover:text-white font-body transition-smooth"
          style={{ borderRadius: "var(--radius-medium)" }}
        >
          <X className="w-4 h-4 mr-2" />
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:block w-[280px] shrink-0"
        style={{ marginRight: "var(--spacing-xl)" }}
      >
        <div
          className="sticky top-[100px] bg-[var(--background-muted)] border border-[var(--border-soft)] p-6"
          style={{
            borderRadius: "var(--radius-medium)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-display text-[var(--text-primary)]"
              style={{ fontSize: "20px", fontWeight: 600 }}
            >
              Bộ lọc
            </h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[var(--text-secondary)] hover:text-[var(--danger)] transition-smooth font-body"
                style={{ fontSize: "13px" }}
              >
                Xóa tất cả
              </button>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed bottom-6 right-6 z-40 shadow-lg bg-[var(--primary)] text-white border-0 hover:bg-[var(--primary-dark)] font-body"
              style={{
                borderRadius: "var(--radius-round)",
                padding: "12px 20px",
              }}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Bộ lọc
              {hasActiveFilters && (
                <span
                  className="ml-2 w-5 h-5 flex items-center justify-center bg-white text-[var(--primary)] text-xs font-semibold"
                  style={{ borderRadius: "50%" }}
                >
                  !
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[85vh] bg-white"
            style={{ borderRadius: "var(--radius-medium) var(--radius-medium) 0 0" }}
          >
            <SheetHeader className="mb-6">
              <SheetTitle className="font-display text-[var(--text-primary)]" style={{ fontSize: "24px" }}>
                Bộ lọc sản phẩm
              </SheetTitle>
            </SheetHeader>
            <div className="overflow-y-auto h-[calc(100%-80px)] pb-20">
              <FilterContent />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-[var(--border-soft)]">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] font-body"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                Áp dụng bộ lọc
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

// Sort dropdown for desktop (placed in product grid area)
export function SortDropdown({ sortBy }: { sortBy: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "popular") {
      params.delete("sort")
    } else {
      params.set("sort", value)
    }
    router.push(`/collection?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="hidden lg:flex items-center gap-3">
      <span className="text-[var(--text-secondary)] font-body" style={{ fontSize: "14px" }}>
        Sắp xếp:
      </span>
      <Select value={sortBy} onValueChange={updateSort}>
        <SelectTrigger
          className="w-[180px] bg-white border-[var(--border-soft)] font-body"
          style={{ borderRadius: "var(--radius-medium)" }}
        >
          <SelectValue placeholder="Phổ biến nhất" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.id} value={option.id} className="font-body">
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
