"use client"

import { motion } from "framer-motion"
import { User } from "lucide-react"
import { staggerItem } from "@/components/animations/framer-variants"

interface SenderInfoSectionProps {
  senderName: string
  senderPhone: string
}

export function SenderInfoSection({ senderName, senderPhone }: SenderInfoSectionProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          1.1. Thông tin người đặt
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Tên người đặt
          </label>
          <p className="text-[var(--text-primary)] font-medium">{senderName}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Số điện thoại người đặt
          </label>
          <p className="text-[var(--text-primary)] font-medium">{senderPhone}</p>
        </div>
      </div>
    </motion.div>
  )
}