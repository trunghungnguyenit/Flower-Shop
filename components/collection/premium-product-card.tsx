"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface PremiumProductCardProps {
  id: string
  name: string
  price: string
  image: string
  slug: string
  badge?: "best-seller" | "contact" | null
  index?: number
}

export function PremiumProductCard({
  name,
  price,
  image,
  slug,
  badge,
  index = 0,
}: PremiumProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const isContactPrice = price === "Liên hệ báo giá"

  return (
    <Link
      href={`/san-pham/${slug}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <article
        className="relative bg-white overflow-hidden transition-smooth hover:shadow-[var(--shadow-hover)]"
        style={{
          borderRadius: "var(--radius-medium)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {/* Image Container */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "4/5" }}
        >
          {/* Shimmer Loading */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[var(--background-muted)] animate-pulse" />
          )}

          <Image
            src={image || "/placeholder.svg?height=500&width=400"}
            alt={name}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-[1.04]",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Badge */}
          {badge && (
            <span
              className="absolute top-3 left-3 px-3 py-1 text-white font-body font-medium"
              style={{
                fontSize: "11px",
                borderRadius: "var(--radius-round)",
                backgroundColor: badge === "best-seller" ? "var(--primary-dark)" : "var(--accent)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {badge === "best-seller" ? "Best Seller" : "Liên hệ"}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className={cn(
              "absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300",
              "hover:bg-white hover:scale-110",
              isLiked && "bg-[var(--primary)]/10"
            )}
            style={{ borderRadius: "50%" }}
            aria-label={isLiked ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors",
                isLiked ? "fill-[var(--primary)] text-[var(--primary)]" : "text-[var(--text-secondary)]"
              )}
              strokeWidth={1.5}
            />
          </button>

          {/* Quick View Button - appears on hover */}
          <button
            onClick={(e) => {
              e.preventDefault()
              // Could open a quick view modal
            }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-body font-medium"
            style={{
              fontSize: "13px",
              borderRadius: "var(--radius-round)",
            }}
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
            Xem nhanh
          </button>
        </div>

        {/* Content */}
        <div className="p-4" style={{ padding: "var(--spacing-md)" }}>
          <h3
            className="font-display text-[var(--text-primary)] line-clamp-2 mb-2 group-hover:text-[var(--primary)] transition-colors"
            style={{
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: 1.4,
              minHeight: "44px",
            }}
          >
            {name}
          </h3>

          <div className="flex items-center justify-between">
            <p
              className={cn(
                "font-body font-semibold",
                isContactPrice ? "text-[var(--accent)]" : "text-[var(--primary)]"
              )}
              style={{ fontSize: "15px" }}
            >
              {price}
            </p>

            {/* Small CTA indicator */}
            <span
              className="text-[var(--text-secondary)] font-body opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ fontSize: "12px" }}
            >
              Xem chi tiết →
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Skeleton version for loading state
export function ProductCardSkeleton() {
  return (
    <div
      className="bg-white overflow-hidden animate-pulse"
      style={{
        borderRadius: "var(--radius-medium)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div
        className="bg-[var(--background-muted)]"
        style={{ aspectRatio: "4/5" }}
      />
      <div className="p-4" style={{ padding: "var(--spacing-md)" }}>
        <div
          className="h-4 bg-[var(--background-muted)] mb-2"
          style={{ borderRadius: "var(--radius-soft)", width: "80%" }}
        />
        <div
          className="h-4 bg-[var(--background-muted)] mb-3"
          style={{ borderRadius: "var(--radius-soft)", width: "60%" }}
        />
        <div
          className="h-4 bg-[var(--background-muted)]"
          style={{ borderRadius: "var(--radius-soft)", width: "40%" }}
        />
      </div>
    </div>
  )
}
