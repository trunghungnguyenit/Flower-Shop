"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { cn } from "@/lib/utils"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION CTA COMPONENT
// ================================================================

interface OccasionCTAProps {
  icon: React.ComponentType<any>
  iconBgColor: string
  iconColor: string
  buttonBgColor: string
  buttonHoverBgColor: string
  buttonBorderColor: string
  bgGradient: string
  title: string
  description: string
  note?: string
  onPhoneClick?: (e: React.MouseEvent) => void
}

export function OccasionCTA({ 
  icon: IconComponent, 
  iconBgColor, 
  iconColor, 
  buttonBgColor,
  buttonHoverBgColor,
  buttonBorderColor,
  bgGradient, 
  title, 
  description, 
  note,
  onPhoneClick 
}: OccasionCTAProps) {
  return (
    <section className={`py-16 lg:py-24 ${bgGradient}`}>
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <IconComponent className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
            {title}
          </h2>

          <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-body font-medium transition-all duration-300 hover:scale-105",
                buttonBgColor,
                buttonHoverBgColor
              )}
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              onClick={onPhoneClick}
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 border-2 font-body font-medium transition-all duration-300 hover:text-white",
                buttonBorderColor,
                iconColor,
                buttonHoverBgColor
              )}
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat Zalo
            </a>
          </div>

          {note && (
            <p className="font-body text-[var(--text-muted)] text-sm mt-6">
              {note}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}