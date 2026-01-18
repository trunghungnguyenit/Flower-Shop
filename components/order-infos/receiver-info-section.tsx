"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { staggerItem } from "@/components/animations/framer-variants"

interface ReceiverInfoSectionProps {
  receiverName: string
  receiverPhone: string
  receiverAddress: string
  cardMessage: string
}

export function ReceiverInfoSection({
  receiverName,
  receiverPhone,
  receiverAddress,
  cardMessage,
}: ReceiverInfoSectionProps) {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          1.3. Thông tin người nhận
        </h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Tên người nhận
            </label>
            <p className="text-[var(--text-primary)] font-medium">{receiverName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Số điện thoại người nhận
            </label>
            <p className="text-[var(--text-primary)] font-medium">{receiverPhone}</p>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Địa chỉ giao hàng cụ thể
          </label>
          <p className="text-[var(--text-primary)] font-medium">{receiverAddress}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Lời nhắn trên thiệp / banner
          </label>
          <p className="text-[var(--text-primary)] font-medium">
            {cardMessage || 'Không có lời nhắn'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}