"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import { realCases } from "@/data/homepage-data"
import { staggerContainer, staggerItem, staggerItemScale, premiumEase } from "@/components/animations/framer-variants"

// ================================================================
// REAL CASES SECTION - "Khoảnh Khắc Thật"
// ================================================================
export function RealCasesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-muted)] overflow-hidden"
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
            Câu chuyện thật
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Khoảnh Khắc Thật – Câu Chuyện Thật
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Những khoảnh khắc xúc động được lưu giữ qua từng bó hoa mà khách hàng đã tin tưởng gửi gắm.
          </motion.p>
        </motion.div>

        {/* Cases Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {realCases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden bg-white"
              style={{
                borderRadius: "var(--radius-large)",
                boxShadow: "var(--shadow-card)",
              }}
              variants={staggerItemScale}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Occasion Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "12px" }}
                >
                  <span className="font-body font-medium text-[var(--primary)]">
                    {caseItem.occasion}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="w-10 h-10 mb-3 flex items-center justify-center bg-[var(--primary)]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    style={{ borderRadius: "var(--radius-medium)" }}
                  >
                    <Quote className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>

                  <p
                    className="font-body text-[var(--primary-light)] mb-1"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {caseItem.customerName}
                  </p>

                  <h3
                    className="font-display text-white mb-2 line-clamp-2"
                    style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {caseItem.title}
                  </h3>

                  <p
                    className="font-body text-white/80 line-clamp-2"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    {caseItem.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}