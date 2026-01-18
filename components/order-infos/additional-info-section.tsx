"use client"

import { motion } from "framer-motion"
import { FileText } from "lucide-react"
import { staggerItem } from "@/components/animations/framer-variants"

interface AdditionalInfoSectionProps {
  note?: string
  paymentMethod: string
}

export function AdditionalInfoSection({ note, paymentMethod }: AdditionalInfoSectionProps) {
  // Format payment method
  const formatPaymentMethod = (method: string) => {
    return method === 'qr-code' ? 'Quét mã QR' : 'Trả tiền mặt khi nhận hàng'
  }

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          1.4. Thông tin khác
        </h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Ghi chú thêm của khách
          </label>
          <p className="text-[var(--text-primary)] font-medium">
            {note || 'Không có ghi chú thêm'}
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Phương thức thanh toán đã chọn
          </label>
          <p className="text-[var(--text-primary)] font-medium">
            {formatPaymentMethod(paymentMethod)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}