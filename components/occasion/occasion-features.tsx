"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION FEATURES COMPONENT
// ================================================================

interface Feature {
  icon: React.ComponentType<any>
  title: string
  description: string
  color: string
}

interface OccasionFeaturesProps {
  sectionId: string
  tagline: string
  taglineColor: string
  title: string
  description: string
  features: Feature[]
}

export function OccasionFeatures({ 
  sectionId, 
  tagline, 
  taglineColor, 
  title, 
  description, 
  features 
}: OccasionFeaturesProps) {
  return (
    <section id={sectionId} className="py-16 lg:py-24 bg-[var(--background-muted)]">
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
          <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            {description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
              whileHover={{ y: -8 }}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                feature.color === "pink" && "bg-pink-100",
                feature.color === "purple" && "bg-purple-100",
                feature.color === "yellow" && "bg-yellow-100",
                feature.color === "blue" && "bg-blue-100",
                feature.color === "gray" && "bg-gray-100",
                feature.color === "slate" && "bg-slate-100",
                feature.color === "zinc" && "bg-zinc-100",
                feature.color === "neutral" && "bg-neutral-100",
                feature.color === "green" && "bg-green-100",
                feature.color === "emerald" && "bg-emerald-100",
                feature.color === "orange" && "bg-orange-100",
                feature.color === "red" && "bg-red-100",
                feature.color === "rose" && "bg-rose-100",
                feature.color === "indigo" && "bg-indigo-100",
                feature.color === "amber" && "bg-amber-100"
              )}>
                <feature.icon className={cn(
                  "w-6 h-6",
                  feature.color === "pink" && "text-pink-600",
                  feature.color === "purple" && "text-purple-600",
                  feature.color === "yellow" && "text-yellow-600",
                  feature.color === "blue" && "text-blue-600",
                  feature.color === "gray" && "text-gray-600",
                  feature.color === "slate" && "text-slate-600",
                  feature.color === "zinc" && "text-zinc-600",
                  feature.color === "neutral" && "text-neutral-600",
                  feature.color === "green" && "text-green-600",
                  feature.color === "emerald" && "text-emerald-600",
                  feature.color === "orange" && "text-orange-600",
                  feature.color === "red" && "text-red-600",
                  feature.color === "rose" && "text-rose-600",
                  feature.color === "indigo" && "text-indigo-600",
                  feature.color === "amber" && "text-amber-600"
                )} strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                {feature.title}
              </h3>
              <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}