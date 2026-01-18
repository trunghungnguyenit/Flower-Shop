"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION INFO SECTION COMPONENT
// ================================================================

interface InfoItem {
  title: string
  items: string[]
}

interface OccasionInfoSectionProps {
  icon: React.ComponentType<any>
  iconBgColor: string
  iconColor: string
  title: string
  infoItems: InfoItem[]
}

export function OccasionInfoSection({ 
  icon: IconComponent, 
  iconBgColor, 
  iconColor, 
  title, 
  infoItems 
}: OccasionInfoSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <IconComponent className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              {title}
            </h2>
          </div>

          <div className={`grid ${infoItems.length > 1 ? 'md:grid-cols-2' : ''} gap-8`}>
            {infoItems.map((info, index) => (
              <div key={index}>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-4" style={{ fontSize: "20px" }}>
                  {info.title}
                </h3>
                <ul className="space-y-3 font-body text-[var(--text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  {info.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}