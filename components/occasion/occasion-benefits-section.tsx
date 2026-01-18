"use client"

import { motion } from "framer-motion"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION BENEFITS SECTION COMPONENT
// ================================================================

interface Benefit {
  title: string
  description: string
  icon: string
}

interface OccasionBenefitsSectionProps {
  tagline: string
  taglineColor: string
  title: string
  benefits: Benefit[]
}

export function OccasionBenefitsSection({ 
  tagline, 
  taglineColor, 
  title, 
  benefits 
}: OccasionBenefitsSectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <span className={`inline-block font-body ${taglineColor} tracking-[0.25em] uppercase mb-4 text-sm font-medium`}>
            {tagline}
          </span>
          <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
            {title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
              whileHover={{ y: -8 }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {benefit.icon}
              </div>
              <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                {benefit.title}
              </h3>
              <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}