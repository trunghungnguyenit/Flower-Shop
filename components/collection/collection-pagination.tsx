"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface CollectionPaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export function CollectionPagination({
  currentPage,
  totalPages,
}: CollectionPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    router.push(`/bo-suu-tap?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const showPages = 5 // Maximum pages to show

    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i)
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <nav
      aria-label="Phân trang"
      className="flex items-center justify-center gap-2 mt-12"
      style={{ marginTop: "var(--spacing-xxl)" }}
    >
      {/* Previous Button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "w-10 h-10 flex items-center justify-center border transition-smooth font-body",
          currentPage === 1
            ? "border-[var(--border-soft)] text-[var(--text-secondary)] cursor-not-allowed opacity-50"
            : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
        )}
        style={{ borderRadius: "var(--radius-round)" }}
        aria-label="Trang trước"
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-[var(--text-secondary)] font-body"
                style={{ fontSize: "14px" }}
              >
                ...
              </span>
            )
          }

          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "w-10 h-10 flex items-center justify-center border transition-smooth font-body font-medium",
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 hover:text-[var(--primary)]"
              )}
              style={{
                borderRadius: "var(--radius-round)",
                fontSize: "14px",
              }}
              aria-label={`Trang ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "w-10 h-10 flex items-center justify-center border transition-smooth font-body",
          currentPage === totalPages
            ? "border-[var(--border-soft)] text-[var(--text-secondary)] cursor-not-allowed opacity-50"
            : "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/5"
        )}
        style={{ borderRadius: "var(--radius-round)" }}
        aria-label="Trang sau"
      >
        <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
      </button>
    </nav>
  )
}
