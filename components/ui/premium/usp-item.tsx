"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

// ================================================
// USP Item Premium
// ================================================

interface USPItemProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  variant?: "default" | "card" | "inline"
  animated?: boolean
  animationDelay?: number
}

export function USPItem({
  icon: Icon,
  title,
  description,
  className,
  variant = "default",
  animated = true,
  animationDelay = 0,
}: USPItemProps) {
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
          "flex flex-col items-center text-center transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          className
        )}
        style={{ transitionDelay: `${animationDelay}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon Container */}
        <div
          className={cn(
            "w-16 h-16 flex items-center justify-center mb-5 transition-all duration-400",
            isHovered && "scale-110"
          )}
          style={{
            borderRadius: "var(--radius-large)",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
            boxShadow: isHovered
              ? "0 8px 24px rgba(217,124,138,0.4)"
              : "0 4px 16px rgba(217,124,138,0.25)",
          }}
        >
          <Icon className="w-7 h-7 text-black" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className="font-display text-[var(--text-primary)] mb-2"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-body text-[var(--text-secondary)] max-w-xs"
          style={{ fontSize: "15px", lineHeight: 1.6 }}
        >
          {description}
        </p>
      </div>
    )
  }

  // Card variant
  if (variant === "card") {
    return (
      <div
        ref={ref}
        className={cn(
          "group bg-white p-6 lg:p-8 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          className
        )}
        style={{
          borderRadius: "var(--radius-medium)",
          boxShadow: isHovered
            ? "0 10px 36px rgba(0,0,0,0.12)"
            : "0 6px 22px rgba(0,0,0,0.06)",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transitionDelay: `${animationDelay}ms`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon */}
        <div
          className={cn(
            "w-14 h-14 flex items-center justify-center mb-5 transition-all duration-400",
            isHovered ? "bg-[var(--primary)] text-black" : "bg-[var(--primary)]/10 text-[var(--primary)]"
          )}
          style={{ borderRadius: "var(--radius-medium)" }}
        >
          <Icon className="w-6 h-6" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3
          className="font-display text-[var(--text-primary)] mb-2"
          style={{ fontSize: "17px", fontWeight: 600 }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-body text-[var(--text-secondary)]"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          {description}
        </p>
      </div>
    )
  }

  // Inline variant
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-start gap-4 transition-all duration-500",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
        className
      )}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center flex-shrink-0"
        style={{
          borderRadius: "var(--radius-medium)",
          background: "var(--primary)",
          boxShadow: "0 4px 12px rgba(217,124,138,0.3)",
        }}
      >
        <Icon className="w-5 h-5 text-black" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div>
        <h3
          className="font-display text-[var(--text-primary)] mb-1"
          style={{ fontSize: "16px", fontWeight: 600 }}
        >
          {title}
        </h3>
        <p
          className="font-body text-[var(--text-secondary)]"
          style={{ fontSize: "14px", lineHeight: 1.5 }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

// ================================================
// USP Stats Item
// ================================================

interface USPStatsProps {
  number: string
  label: string
  className?: string
  animated?: boolean
  animationDelay?: number
}

export function USPStats({
  number,
  label,
  className,
  animated = true,
  animationDelay = 0,
}: USPStatsProps) {
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
        "text-center transition-all duration-500",
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90",
        className
      )}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <p
        className="font-display text-[var(--primary)]"
        style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600 }}
      >
        {number}
      </p>
      <p
        className="font-body text-[var(--text-secondary)]"
        style={{ fontSize: "14px" }}
      >
        {label}
      </p>
    </div>
  )
}
