"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Palette } from "lucide-react"
import { cn } from "@/lib/utils"

// ================================================
// Decor Card - Home Decoration with Flowers
// ================================================

interface DecorCardProps {
  image: string
  title: string
  subtitle: string
  toneColors?: string[]
  href: string
  className?: string
  animated?: boolean
  animationDelay?: number
}

export function DecorCard({
  image,
  title,
  subtitle,
  toneColors = [],
  href,
  className,
  animated = false,
  animationDelay = 0,
}: DecorCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block overflow-hidden bg-white transition-all duration-500 hover:-translate-y-2",
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
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Tone Colors Badge */}
        {toneColors.length > 0 && (
          <div
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm"
            style={{ borderRadius: "var(--radius-round)" }}
          >
            <Palette className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
            <div className="flex gap-1">
              {toneColors.map((color, index) => (
                <span
                  key={index}
                  className="w-4 h-4 rounded-full border border-white"
                  style={{ backgroundColor: color, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors duration-300"
          style={{ fontSize: "18px", fontWeight: 600 }}
        >
          {title}
        </h3>

        <p
          className="font-body text-[var(--text-secondary)] mb-4 line-clamp-2"
          style={{ fontSize: "14px", lineHeight: 1.6 }}
        >
          {subtitle}
        </p>

        {/* CTA */}
        <div
          className="inline-flex items-center gap-2 text-[var(--primary)]"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          <span className="font-body">Xem ý tưởng</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  )
}

// ================================================
// Decor Card Large - Featured decor inspiration
// ================================================

interface DecorCardLargeProps {
  image: string
  title: string
  subtitle: string
  description: string
  toneColors?: string[]
  href: string
  className?: string
}

export function DecorCardLarge({
  image,
  title,
  subtitle,
  description,
  toneColors = [],
  href,
  className,
}: DecorCardLargeProps) {
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
      {/* Full-width Image */}
      <div className="relative aspect-[21/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

        {/* Content on Image */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-xl p-8 lg:p-12">
            <span
              className="inline-block font-body text-[var(--primary-light)] tracking-[0.15em] uppercase mb-3"
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              {subtitle}
            </span>

            <h3
              className="font-display text-black mb-4"
              style={{ fontSize: "32px", fontWeight: 600, lineHeight: 1.2 }}
            >
              {title}
            </h3>

            <p
              className="font-body text-black/80 mb-6"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
            >
              {description}
            </p>

            {/* Color Palette */}
            {toneColors.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <span className="font-body text-black/60" style={{ fontSize: "13px" }}>
                  Tone màu gợi ý:
                </span>
                <div className="flex gap-1.5">
                  {toneColors.map((color, index) => (
                    <span
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white/50"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div
              className="inline-flex items-center gap-2 text-black group-hover:gap-3 transition-all duration-300"
              style={{ fontSize: "15px", fontWeight: 600 }}
            >
              <span className="font-body">Khám phá ý tưởng</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ================================================
// Decor Card Compact - For sidebar or smaller spaces
// ================================================

interface DecorCardCompactProps {
  image: string
  title: string
  toneColors?: string[]
  href: string
  className?: string
}

export function DecorCardCompact({
  image,
  title,
  toneColors = [],
  href,
  className,
}: DecorCardCompactProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-4 p-3 bg-white hover:bg-[var(--background-muted)] transition-all duration-300",
        className
      )}
      style={{
        borderRadius: "var(--radius-medium)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* Image */}
      <div
        className="relative w-16 h-16 flex-shrink-0 overflow-hidden"
        style={{ borderRadius: "var(--radius-soft)" }}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className="font-display text-[var(--text-primary)] mb-1 line-clamp-1"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {title}
        </h4>

        {/* Tone Colors */}
        {toneColors.length > 0 && (
          <div className="flex gap-1">
            {toneColors.slice(0, 4).map((color, index) => (
              <span
                key={index}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Arrow */}
      <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-300 flex-shrink-0" />
    </Link>
  )
}
