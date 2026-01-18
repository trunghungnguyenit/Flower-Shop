"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { staggerItem } from "@/components/animations/framer-variants"

export function CashPaymentSection() {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-green-50 border border-green-200 rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-green-800">
          Thanh toán tiền mặt
        </h2>
      </div>
      <p className="text-green-700">
        Bạn đã chọn thanh toán tiền mặt khi nhận hàng. 
        Nhân viên sẽ liên hệ để xác nhận đơn.
      </p>
    </motion.div>
  )
}