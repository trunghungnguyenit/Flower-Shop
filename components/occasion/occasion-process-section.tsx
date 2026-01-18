"use client"

import { motion } from "framer-motion"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION PROCESS SECTION COMPONENT
// ================================================================

interface ProcessStep {
  step: string
  title: string
  description: string
}

interface OccasionProcessSectionProps {
  tagline: string
  taglineColor: string
  title: string
  steps: ProcessStep[]
  stepBgColor: string
}

export function OccasionProcessSection({ 
  tagline, 
  taglineColor, 
  title, 
  steps, 
  stepBgColor 
}: OccasionProcessSectionProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((process, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
            >
              <div className={`w-16 h-16 ${stepBgColor} text-white rounded-full flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl`}>
                {process.step}
              </div>
              <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                {process.title}
              </h3>
              <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {process.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}