"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "./button"

// ================================================
// Product Card Premium
// ================================================

interface ProductCardProps {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: "new" | "sale" | "bestseller" | "limited"
  rating?: number
  soldCount?: number
  href?: string
  className?: string
  animated?: boolean
  animationDelay?: number
  onAddToCart?: () => void
  onAddToWishlist?: () => void
  onQuickView?: () => void
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  badge,
  rating,
  soldCount,
  href = "#",
  className,
  animated = true,
  animationDelay = 0,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
}: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(!animated)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!animated) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animated])

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ"
  }

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const badgeConfig = {
    new: { text: "Mới", bg: "bg-[var(--info)]" },
    sale: { text: `-${discountPercent}%`, bg: "bg-[var(--danger)]" },
    bestseller: { text: "Bán chạy", bg: "bg-[var(--accent-gold)]" },
    limited: { text: "Giới hạn", bg: "bg-[var(--primary)]" },
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group relative transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bg-white overflow-hidden transition-all duration-400"
        style={{
          borderRadius: "var(--radius-medium)",
          boxShadow: isHovered
            ? "0 10px 36px rgba(0,0,0,0.12)"
            : "0 6px 22px rgba(0,0,0,0.06)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Image Container */}
        <Link href={href} className="block relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-110"
            )}
          />

          {/* Gradient Overlay on Hover */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                "absolute top-3 left-3 px-3 py-1.5 text-white text-xs font-semibold tracking-wide",
                badgeConfig[badge].bg
              )}
              style={{ borderRadius: "var(--radius-soft)" }}
            >
              {badgeConfig[badge].text}
            </span>
          )}

          {/* Quick Actions */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            )}
          >
            <IconButton
              variant="ghost"
              size="sm"
              className={cn(
                "bg-white/90 backdrop-blur-sm shadow-md",
                isLiked && "text-[var(--danger)] bg-red-50"
              )}
              onClick={(e) => {
                e.preventDefault()
                setIsLiked(!isLiked)
                onAddToWishlist?.()
              }}
              aria-label="Add to wishlist"
            >
              <Heart
                className="w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
              />
            </IconButton>

            <IconButton
              variant="ghost"
              size="sm"
              className="bg-white/90 backdrop-blur-sm shadow-md"
              onClick={(e) => {
                e.preventDefault()
                onQuickView?.()
              }}
              aria-label="Quick view"
            >
              <Eye className="w-4 h-4" />
            </IconButton>
          </div>

          {/* Add to Cart Button */}
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300",
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                onAddToCart?.()
              }}
              className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] py-3 font-medium transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
              style={{ borderRadius: "var(--radius-soft)" }}
            >
              <ShoppingBag className="w-4 h-4" />
              <span style={{ fontSize: "14px" }}>Thêm vào giỏ</span>
            </button>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {/* Rating & Sold */}
          {(rating || soldCount) && (
            <div className="flex items-center gap-3 mb-2">
              {rating && (
                <div className="flex items-center gap-1">
                  <span className="text-sm">🌸</span>
                  <span
                    className="font-body text-[var(--text-secondary)]"
                    style={{ fontSize: "13px" }}
                  >
                    {rating}
                  </span>
                </div>
              )}
              {soldCount && (
                <span
                  className="font-body text-[var(--text-muted)]"
                  style={{ fontSize: "13px" }}
                >
                  Đã bán {soldCount}+
                </span>
              )}
            </div>
          )}

          {/* Name */}
          <Link href={href}>
            <h3
              className="font-display text-[var(--text-primary)] mb-3 line-clamp-2 transition-colors duration-300 hover:text-[var(--primary)]"
              style={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.4 }}
            >
              {name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-[var(--primary)]"
              style={{ fontSize: "18px", fontWeight: 600 }}
            >
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span
                className="font-body text-[var(--text-muted)] line-through"
                style={{ fontSize: "14px" }}
              >
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ================================================
// Product Card Compact (For suggestions, etc.)
// ================================================

interface ProductCardCompactProps {
  id: string | number
  name: string
  price: number
  image: string
  href?: string
  className?: string
}

export function ProductCardCompact({
  id,
  name,
  price,
  image,
  href = "#",
  className,
}: ProductCardCompactProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ"
  }

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 p-3 bg-white rounded-lg transition-all duration-300 hover:shadow-md",
        className
      )}
    >
      <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4
          className="font-body text-[var(--text-primary)] truncate transition-colors duration-300 group-hover:text-[var(--primary)]"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          {name}
        </h4>
        <span
          className="font-display text-[var(--primary)]"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {formatPrice(price)}
        </span>
      </div>
    </Link>
  )
}
