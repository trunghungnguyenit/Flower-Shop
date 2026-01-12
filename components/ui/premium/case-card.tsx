"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

// ================================================
// Case Card - Real Stories from Customers
// ================================================

interface CaseCardProps {
  image: string
  title: string
  subtitle: string
  customerName?: string
  occasion?: string
  href?: string
  className?: string
  animated?: boolean
  animationDelay?: number
}

export function CaseCard({
  image,
  title,
  subtitle,
  customerName,
  occasion,
  href = "#",
  className,
  animated = false,
  animationDelay = 0,
}: CaseCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-white transition-all duration-500",
        animated ? "opacity-100 translate-y-0" : "",
        className
      )}
      style={{
        borderRadius: "var(--radius-large)",
        boxShadow: "var(--shadow-card)",
        animationDelay: animated ? `${animationDelay}ms` : undefined,
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
        />

        {/* Occasion Badge */}
        {occasion && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm"
            style={{ borderRadius: "var(--radius-round)", fontSize: "12px" }}
          >
            <span className="font-body font-medium text-[var(--primary)]">
              {occasion}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
          {/* Quote Icon */}
          <div
            className="w-10 h-10 mb-4 flex items-center justify-center bg-[var(--primary)]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
            style={{ borderRadius: "var(--radius-medium)" }}
          >
            <Quote className="w-5 h-5 text-black" strokeWidth={1.5} />
          </div>

          {/* Customer Name */}
          {customerName && (
            <p
              className="font-body text-[var(--primary-light)] mb-1"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              {customerName}
            </p>
          )}

          {/* Title */}
          <h3
            className="font-display text-black mb-2 line-clamp-2"
            style={{ fontSize: "20px", fontWeight: 600, lineHeight: 1.3 }}
          >
            {title}
          </h3>

          {/* Subtitle */}
          <p
            className="font-body text-black/80 mb-4 line-clamp-2"
            style={{ fontSize: "14px", lineHeight: 1.6 }}
          >
            {subtitle}
          </p>

          {/* CTA */}
          <div
            className="inline-flex items-center gap-2 text-black/90 group-hover:text-black transition-colors duration-300"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <span className="font-body">Xem chi tiết</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ================================================
// Case Card Compact - For smaller displays
// ================================================

interface CaseCardCompactProps {
  image: string
  title: string
  customerName: string
  occasion: string
  href?: string
  className?: string
}

export function CaseCardCompact({
  image,
  title,
  customerName,
  occasion,
  href = "#",
  className,
}: CaseCardCompactProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex gap-4 p-4 bg-white hover:bg-[var(--background-muted)] transition-all duration-300",
        className
      )}
      style={{
        borderRadius: "var(--radius-medium)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Image */}
      <div
        className="relative w-20 h-20 flex-shrink-0 overflow-hidden"
        style={{ borderRadius: "var(--radius-soft)" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className="font-body text-[var(--primary)] mb-0.5"
          style={{ fontSize: "12px", fontWeight: 500 }}
        >
          {occasion}
        </p>
        <h4
          className="font-display text-[var(--text-primary)] mb-1 line-clamp-1"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {title}
        </h4>
        <p
          className="font-body text-[var(--text-secondary)]"
          style={{ fontSize: "13px" }}
        >
          {customerName}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 self-center"
      />
    </Link>
  )
}
