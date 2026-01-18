"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { premiumEase } from "@/components/animations/framer-variants"

export function OrderInfoHeader() {
  return (
    <>
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: premiumEase }}
        className="flex items-center gap-2 mb-8"
      >
        <Link 
          href="/" 
          className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
        >
          Trang chủ
        </Link>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-[var(--text-primary)]">Thông tin đặt</span>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: premiumEase }}
        className="text-center mb-8"
      >
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4">
          Thông tin đặt hàng
        </h1>
        <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
          Cảm ơn bạn đã đặt hàng! Vui lòng kiểm tra thông tin bên dưới và thực hiện thanh toán nếu cần.
        </p>
      </motion.div>
    </>
  )
}