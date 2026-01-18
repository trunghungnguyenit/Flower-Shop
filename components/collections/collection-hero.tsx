"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

const premiumEase = [0.25, 0.1, 0.25, 1] as const

export function CollectionHero() {
  return (
    <section className="pt-24 pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-body mb-8">
          <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)] font-medium">Bộ sưu tập</span>
        </nav>

        {/* Hero Content */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
            Bộ Sưu Tập
            <br />
            <span className="text-[var(--text-primary)]">Hoa Tươi Đẹp Nhất</span>
          </h1>

          <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
            Khám phá bộ sưu tập hoa tươi đa dạng với nhiều mẫu mã đẹp mắt, phù hợp cho mọi dịp và không gian.
          </p>
        </motion.div>
      </div>
    </section>
  )
}