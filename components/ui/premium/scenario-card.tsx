"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ================================================
// Scenario Card - "Bạn đang ở hoàn cảnh nào?"
// ================================================

interface ScenarioCardProps {
  image: string
  title: string
  tagline: string
  href: string
  icon?: string
  className?: string
  animated?: boolean
  animationDelay?: number
}

export function ScenarioCard({
  image,
  title,
  tagline,
  href,
  icon,
  className,
  animated = false,
  animationDelay = 0,
}: ScenarioCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-white transition-all duration-500 hover:-translate-y-1",
        animated ? "opacity-100 translate-y-0" : "",
        className
      )}
      style={{
        borderRadius: "var(--radius-large)",
        boxShadow: "var(--shadow-card)",
        animationDelay: animated ? `${animationDelay}ms` : undefined,
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Floating Icon */}
        {icon && (
          <div
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
            style={{ borderRadius: "var(--radius-medium)" }}
          >
            <span className="text-2xl">{icon}</span>
          </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-display text-black mb-1"
            style={{ fontSize: "20px", fontWeight: 600 }}
          >
            {title}
          </h3>
          <p
            className="font-body text-black/80 mb-3"
            style={{ fontSize: "14px", lineHeight: 1.5 }}
          >
            {tagline}
          </p>

          {/* Hover CTA */}
          <div
            className="inline-flex items-center gap-2 text-[var(--primary-light)] opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            <span className="font-body">Xem gợi ý</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ================================================
// Scenario Card Featured - Larger highlight version
// ================================================

interface ScenarioCardFeaturedProps {
  image: string
  title: string
  tagline: string
  description: string
  href: string
  icon?: string
  className?: string
}

export function ScenarioCardFeatured({
  image,
  title,
  tagline,
  description,
  href,
  icon,
  className,
}: ScenarioCardFeaturedProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-white",
        className
      )}
      style={{
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Side */}
        <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Icon Badge */}
          {icon && (
            <div
              className="absolute top-6 left-6 w-14 h-14 flex items-center justify-center bg-white/95 backdrop-blur-sm"
              style={{
                borderRadius: "var(--radius-medium)",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <span className="text-3xl">{icon}</span>
            </div>
          )}
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <span
            className="inline-block font-body text-[var(--primary)] tracking-[0.15em] uppercase mb-3"
            style={{ fontSize: "12px", fontWeight: 600 }}
          >
            {tagline}
          </span>

          <h3
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1.2 }}
          >
            {title}
          </h3>

          <p
            className="font-body text-[var(--text-secondary)] mb-6"
            style={{ fontSize: "15px", lineHeight: 1.7 }}
          >
            {description}
          </p>

          {/* CTA Button */}
          <div
            className="inline-flex items-center gap-2 text-[var(--primary)] group-hover:gap-3 transition-all duration-300"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            <span className="font-body">Khám phá ngay</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ================================================
// Scenario Card Mini - For grid displays
// ================================================

interface ScenarioCardMiniProps {
  title: string
  icon: string
  href: string
  count?: number
  className?: string
}

export function ScenarioCardMini({
  title,
  icon,
  href,
  count,
  className,
}: ScenarioCardMiniProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col items-center justify-center p-6 bg-white hover:bg-[var(--background-muted)] border border-[var(--border-soft)] hover:border-[var(--primary)]/30 transition-all duration-300",
        className
      )}
      style={{ borderRadius: "var(--radius-large)" }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 mb-4 flex items-center justify-center bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20 transition-colors duration-300"
        style={{ borderRadius: "var(--radius-medium)" }}
      >
        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
      </div>

      {/* Title */}
      <h4
        className="font-display text-[var(--text-primary)] text-center mb-1"
        style={{ fontSize: "16px", fontWeight: 600 }}
      >
        {title}
      </h4>

      {/* Count */}
      {count !== undefined && (
        <p
          className="font-body text-[var(--text-muted)]"
          style={{ fontSize: "13px" }}
        >
          {count}+ mẫu hoa
        </p>
      )}
    </Link>
  )
}
