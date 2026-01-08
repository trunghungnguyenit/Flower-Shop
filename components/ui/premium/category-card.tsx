"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ================================================
// Category Card Premium
// ================================================

interface CategoryCardProps {
  name: string
  description?: string
  image: string
  href: string
  productCount?: number
  className?: string
  variant?: "default" | "featured" | "minimal"
  animated?: boolean
  animationDelay?: number
}

export function CategoryCard({
  name,
  description,
  image,
  href,
  productCount,
  className,
  variant = "default",
  animated = true,
  animationDelay = 0,
}: CategoryCardProps) {
  const [isVisible, setIsVisible] = useState(!animated)
  const [isHovered, setIsHovered] = useState(false)
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

  // Default variant
  if (variant === "default") {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          className
        )}
        style={{
          borderRadius: "var(--radius-large)",
          transitionDelay: `${animationDelay}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="block aspect-[4/5] relative">
          {/* Background Image */}
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              isHovered && "scale-110"
            )}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
              opacity: isHovered ? 1 : 0.85,
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Product Count */}
            {productCount && (
              <span
                className={cn(
                  "self-start px-3 py-1 bg-white/20 backdrop-blur-sm text-white/90 mb-3 transition-all duration-300",
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
                style={{ borderRadius: "var(--radius-round)", fontSize: "12px" }}
              >
                {productCount} sản phẩm
              </span>
            )}

            {/* Name */}
            <h3
              className="font-display text-white mb-2"
              style={{ fontSize: "22px", fontWeight: 600 }}
            >
              {name}
            </h3>

            {/* Description */}
            {description && (
              <p
                className={cn(
                  "font-body text-white/80 mb-4 transition-all duration-300",
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
                style={{ fontSize: "14px", lineHeight: 1.5 }}
              >
                {description}
              </p>
            )}

            {/* Arrow */}
            <div
              className={cn(
                "flex items-center gap-2 text-white transition-all duration-300",
                isHovered ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
              )}
            >
              <span style={{ fontSize: "14px", fontWeight: 500 }}>Xem ngay</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Featured variant (larger, with more emphasis)
  if (variant === "featured") {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative overflow-hidden transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          className
        )}
        style={{
          borderRadius: "var(--radius-xl)",
          transitionDelay: `${animationDelay}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={href} className="block aspect-[3/4] lg:aspect-[4/5] relative">
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              isHovered && "scale-105"
            )}
          />

          {/* Decorative Border */}
          <div
            className={cn(
              "absolute inset-4 border-2 border-white/30 transition-all duration-500",
              isHovered ? "opacity-100 inset-6" : "opacity-50"
            )}
            style={{ borderRadius: "var(--radius-large)" }}
          />

          {/* Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(217,124,138,0.8) 0%, rgba(217,124,138,0.3) 40%, transparent 100%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
            <h3
              className="font-display text-white mb-2"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}
            >
              {name}
            </h3>

            {description && (
              <p
                className="font-body text-white/90 mb-6 max-w-xs"
                style={{ fontSize: "15px", lineHeight: 1.6 }}
              >
                {description}
              </p>
            )}

            <span
              className={cn(
                "inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--primary)] font-medium transition-all duration-300",
                isHovered && "scale-105 shadow-lg"
              )}
              style={{ borderRadius: "var(--radius-round)", fontSize: "14px" }}
            >
              Khám phá
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </div>
    )
  }

  // Minimal variant
  return (
    <div
      ref={ref}
      className={cn(
        "group transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <Link href={href} className="block">
        {/* Image */}
        <div
          className="relative aspect-square mb-4 overflow-hidden"
          style={{ borderRadius: "var(--radius-medium)" }}
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Name */}
        <h3
          className="font-display text-[var(--text-primary)] text-center transition-colors duration-300 group-hover:text-[var(--primary)]"
          style={{ fontSize: "16px", fontWeight: 500 }}
        >
          {name}
        </h3>

        {productCount && (
          <p
            className="font-body text-[var(--text-secondary)] text-center mt-1"
            style={{ fontSize: "13px" }}
          >
            {productCount} sản phẩm
          </p>
        )}
      </Link>
    </div>
  )
}
