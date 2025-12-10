"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { cn } from "@/lib/utils"

// ================================================
// Review Card Premium
// ================================================

interface ReviewCardProps {
  id: string | number
  name: string
  location?: string
  date?: string
  rating: number
  text: string
  avatar?: string
  productImage?: string
  className?: string
  animated?: boolean
  animationDelay?: number
}

export function ReviewCard({
  id,
  name,
  location,
  date,
  rating,
  text,
  avatar,
  productImage,
  className,
  animated = true,
  animationDelay = 0,
}: ReviewCardProps) {
  const [isVisible, setIsVisible] = useState(!animated)
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

  return (
    <div
      ref={ref}
      className={cn(
        "bg-[var(--background-muted)] p-6 lg:p-8 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{
        borderRadius: "var(--radius-medium)",
        boxShadow: "0 6px 22px rgba(0,0,0,0.06)",
        transitionDelay: `${animationDelay}ms`,
      }}
    >
      {/* Quote Icon */}
      <Quote
        className="w-10 h-10 text-[var(--primary)]/25 mb-4"
        strokeWidth={1}
      />

      {/* Rating - Flower Style */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={cn("text-lg", i < rating ? "opacity-100" : "opacity-30")}
          >
            🌸
          </span>
        ))}
      </div>

      {/* Review Text */}
      <p
        className="font-body text-[var(--text-primary)] mb-6 italic"
        style={{ fontSize: "16px", lineHeight: 1.8 }}
      >
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        {avatar && (
          <div
            className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-[var(--primary)]/20 flex-shrink-0"
          >
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        )}

        {/* Name & Location */}
        <div className="flex-1">
          <p
            className="font-display text-[var(--text-primary)]"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            {name}
          </p>
          {(location || date) && (
            <p
              className="font-body text-[var(--text-secondary)]"
              style={{ fontSize: "13px" }}
            >
              {[location, date].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>

        {/* Product Image */}
        {productImage && (
          <div
            className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0"
            style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          >
            <Image
              src={productImage}
              alt="Sản phẩm đã mua"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}

// ================================================
// Review Card Compact (For carousel)
// ================================================

interface ReviewCardCompactProps {
  name: string
  rating: number
  text: string
  avatar?: string
  className?: string
}

export function ReviewCardCompact({
  name,
  rating,
  text,
  avatar,
  className,
}: ReviewCardCompactProps) {
  return (
    <div
      className={cn(
        "bg-white p-5 transition-all duration-300 hover:shadow-lg",
        className
      )}
      style={{
        borderRadius: "var(--radius-medium)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {avatar && (
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image src={avatar} alt={name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p
            className="font-display text-[var(--text-primary)]"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            {name}
          </p>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={cn("text-xs", i < rating ? "opacity-100" : "opacity-30")}
              >
                ⭐
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Text */}
      <p
        className="font-body text-[var(--text-secondary)] line-clamp-3"
        style={{ fontSize: "14px", lineHeight: 1.6 }}
      >
        "{text}"
      </p>
    </div>
  )
}
