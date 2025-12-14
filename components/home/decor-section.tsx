"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Palette, ArrowRight } from "lucide-react"
import { decorIdeas } from "@/data/homepage-data"
import { staggerContainer, staggerItem, staggerItemLeft, staggerItemRight, premiumEase } from "@/components/animations/framer-variants"

// ================================================================
// DECOR SECTION - "Trang Trí Ngôi Nhà"
// ================================================================
export function DecorSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-alt)] overflow-hidden"
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
            Ý tưởng decor
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Trang Trí Ngôi Nhà Với Hoa Tươi
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Gợi ý giúp không gian của bạn trở nên ấm áp, sang trọng và tràn đầy sức sống.
          </motion.p>
        </motion.div>

        {/* Decor Grid - alternating left/right animations */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {decorIdeas.map((decor, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? staggerItemLeft : staggerItemRight}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href="#"
                className="group block overflow-hidden bg-white"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={decor.image}
                    alt={decor.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Tone Colors Badge */}
                  <div
                    className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm"
                    style={{ borderRadius: "var(--radius-round)" }}
                  >
                    <Palette className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
                    <div className="flex gap-1">
                      {decor.toneColors.map((color, i) => (
                        <span
                          key={i}
                          className="w-4 h-4 rounded-full border border-white"
                          style={{ backgroundColor: color, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3
                    className="font-display text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ fontSize: "17px", fontWeight: 600 }}
                  >
                    {decor.title}
                  </h3>

                  <p
                    className="font-body text-[var(--text-secondary)] mb-4 line-clamp-2"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {decor.subtitle}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}