"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product } from "@/lib/products"

interface SuggestionSliderProps {
  products: Product[]
  title?: string
}

export function SuggestionSlider({
  products,
  title = "Có thể bạn sẽ thích",
}: SuggestionSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return

    const scrollAmount = 300
    const newScrollPosition =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount)

    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    })
  }

  if (products.length === 0) return null

  return (
    <section
      className="py-16 bg-[var(--secondary)]"
      style={{ padding: "var(--spacing-xxl) 0" }}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className="font-display text-[var(--text-primary)]"
            style={{ fontSize: "28px", fontWeight: 600 }}
          >
            {title}
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center border border-[var(--border-soft)] bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-smooth"
              style={{ borderRadius: "50%" }}
              aria-label="Cuộn trái"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center border border-[var(--border-soft)] bg-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-smooth"
              style={{ borderRadius: "50%" }}
              aria-label="Cuộn phải"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {products.map((product, index) => (
            <Link
              key={product.id}
              href={`/san-pham/${product.slug}`}
              className="group flex-shrink-0 animate-fade-in-up"
              style={{
                scrollSnapAlign: "start",
                animationDelay: `${index * 50}ms`,
                width: "220px",
              }}
            >
              <article
                className="bg-white overflow-hidden transition-smooth hover:shadow-[var(--shadow-hover)]"
                style={{
                  borderRadius: "var(--radius-medium)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "1/1" }}
                >
                  <Image
                    src={product.image || "/placeholder.svg?height=220&width=220"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="220px"
                  />
                </div>

                {/* Content */}
                <div className="p-3" style={{ padding: "var(--spacing-sm) var(--spacing-md)" }}>
                  <h3
                    className="font-body text-[var(--text-primary)] line-clamp-1 mb-1 group-hover:text-[var(--primary)] transition-colors"
                    style={{ fontSize: "14px", fontWeight: 500 }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="font-body font-semibold text-[var(--primary)]"
                    style={{ fontSize: "13px" }}
                  >
                    {product.price}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
