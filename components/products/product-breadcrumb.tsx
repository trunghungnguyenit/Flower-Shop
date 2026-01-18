"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { premiumEase } from "@/components/animations/framer-variants"

interface ProductBreadcrumbProps {
  productName: string
}

export function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
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
      <Link 
        href="/collection" 
        className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
      >
        Bộ sưu tập
      </Link>
      <span className="text-[var(--text-muted)]">/</span>
      <span className="text-[var(--text-primary)]">{productName}</span>
    </motion.div>
  )
}