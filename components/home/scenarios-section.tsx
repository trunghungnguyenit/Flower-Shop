"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { scenarios } from "@/data/homepage-data"
import { staggerContainer, staggerItem, staggerItemScale, premiumEase } from "@/components/animations/framer-variants"

// ================================================================
// SCENARIOS SECTION - "Bạn Đang Ở Hoàn Cảnh Nào?"
// ================================================================
export function ScenariosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Tìm hoa phù hợp
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Bạn Đang Ở Tình Huống Nào?
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Chúng tôi giúp bạn chọn mẫu hoa phù hợp nhất cho từng khoảnh khắc.
          </motion.p>
        </motion.div>

        {/* Scenarios Grid - 3x2 desktop, 2x3 tablet, 1x6 mobile */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {scenarios.map((scenario, index) => {
            const IconComponent = scenario.icon
            return (
              <motion.div
                key={index}
                variants={staggerItemScale}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}
              >
                <Link
                  href={scenario.href}
                  className="group relative flex flex-col items-center justify-center p-5 lg:p-6 bg-white border border-[var(--border-soft)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(217,124,138,0.15)]"
                  style={{
                    borderRadius: "var(--radius-medium)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Icon Wrapper - Pastel Circle */}
                  <motion.div
                    className="w-14 h-14 lg:w-16 lg:h-16 mb-4 flex items-center justify-center bg-[var(--secondary)] border border-[var(--border-soft)] rounded-full transition-all duration-300 group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/20"
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ duration: 0.2, ease: premiumEase }}
                  >
                    <IconComponent
                      className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--primary-dark)]"
                      strokeWidth={1.75}
                    />
                  </motion.div>

                  {/* Title */}
                  <h4
                    className="font-display text-[var(--text-primary)] text-center mb-2 transition-colors duration-300 group-hover:text-[var(--primary-dark)]"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {scenario.title}
                  </h4>

                  {/* Tagline */}
                  <p
                    className="font-body text-[var(--text-secondary)] text-center mb-3 line-clamp-2"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    {scenario.tagline}
                  </p>

                  {/* Count Badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 bg-[var(--primary)]/10 rounded-full font-body text-[var(--primary-dark)] transition-colors duration-300 group-hover:bg-[var(--primary)]/20"
                    style={{ fontSize: "12px", fontWeight: 500 }}
                  >
                    {scenario.count}+ mẫu hoa
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}