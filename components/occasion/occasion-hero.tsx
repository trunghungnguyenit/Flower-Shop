"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronRight, ArrowRight, MessageCircle } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { cn } from "@/lib/utils"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION HERO COMPONENT
// ================================================================

interface OccasionHeroProps {
  breadcrumb: {
    current: string
  }
  hero: {
    icon: React.ComponentType<any>
    iconBgColor: string
    iconColor: string
    buttonBgColor: string
    buttonHoverBgColor: string
    buttonBorderColor: string
    floatingBgColor: string
    tagline: string
    title: string
    subtitle: string
    description: string
    ctaText: string
    ctaHref: string
    image: string
    imageAlt: string
    floatingElements: {
      primary: string
      secondary: string
    }
  }
}

export function OccasionHero({ breadcrumb, hero }: OccasionHeroProps) {
  const IconComponent = hero.icon

  return (
    <section className="pt-24 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body mb-8">
          <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          <Link href="/occasions" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
            Dịp lễ
          </Link>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)] font-medium">{breadcrumb.current}</span>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", hero.iconBgColor)}>
                <IconComponent className={cn("w-6 h-6", hero.iconColor)} strokeWidth={1.5} />
              </div>
              <span className={cn("font-body tracking-[0.25em] uppercase text-sm font-medium", hero.iconColor)}>
                {hero.tagline}
              </span>
            </div>

            <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
              {hero.title}
              <br />
              <span className={hero.iconColor}>{hero.subtitle}</span>
            </h1>

            <p className="font-body text-[var(--text-secondary)] mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
              {hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={hero.ctaHref}
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-body font-medium transition-all duration-300 hover:scale-105",
                  hero.buttonBgColor,
                  hero.buttonHoverBgColor
                )}
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                {hero.ctaText}
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2 px-8 py-4 border-2 font-body font-medium transition-all duration-300 hover:text-white",
                  hero.buttonBorderColor,
                  hero.iconColor,
                  hero.buttonHoverBgColor
                )}
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Tư vấn ngay
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Floating elements */}
            <div className={cn("absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center text-2xl animate-bounce", hero.floatingBgColor)}>
              {hero.floatingElements.primary}
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center text-xl animate-pulse">
              {hero.floatingElements.secondary}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}