"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// ================================================
// Section Title Component
// ================================================

interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  accentColor?: "primary" | "gold"
  className?: string
  animated?: boolean
}

export function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  accentColor = "primary",
  className,
  animated = true,
}: SectionTitleProps) {
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
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animated])

  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }

  const accentStyles = {
    primary: "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]",
    gold: "bg-gradient-to-r from-[var(--accent-gold)] to-[#FFE4A0]",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4 mb-12 lg:mb-16",
        alignStyles[align],
        className
      )}
    >
      {/* Label / Eyebrow */}
      {label && (
        <span
          className={cn(
            "inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ fontSize: "13px", fontWeight: 500 }}
        >
          {label}
        </span>
      )}

      {/* Main Title */}
      <h2
        className={cn(
          "font-display text-[var(--text-primary)] transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{
          fontSize: "clamp(32px, 5vw, 44px)",
          fontWeight: 600,
          lineHeight: 1.2,
          transitionDelay: "100ms",
        }}
      >
        {title}
      </h2>

      {/* Accent Underline */}
      <div
        className={cn(
          "h-1 rounded-full transition-all duration-700",
          accentStyles[accentColor],
          isVisible ? "w-16 opacity-100" : "w-0 opacity-0"
        )}
        style={{ transitionDelay: "200ms" }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            "font-body text-[var(--text-secondary)] max-w-2xl transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            fontSize: "17px",
            lineHeight: 1.7,
            transitionDelay: "300ms",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

// ================================================
// Section Wrapper Component
// ================================================

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  background?: "white" | "muted" | "alt"
  id?: string
}

export function SectionWrapper({
  children,
  className,
  background = "white",
  id,
}: SectionWrapperProps) {
  const bgStyles = {
    white: "bg-white",
    muted: "bg-[var(--background-muted)]",
    alt: "bg-[var(--background-alt)]",
  }

  return (
    <section
      id={id}
      className={cn(bgStyles[background], className)}
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">{children}</div>
    </section>
  )
}
