"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { staggerItem } from "@/components/animations/framer-variants"

export function ContactSupportSection() {
  return (
    <motion.div
      variants={staggerItem}
      className="bg-[var(--background-muted)] rounded-xl p-6 text-center"
    >
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
        Cần hỗ trợ?
      </h3>
      <p className="text-[var(--text-secondary)] mb-4">
        Nhân viên sẽ liên hệ với bạn trong vòng 15 phút. 
        Nếu cần hỗ trợ ngay, vui lòng liên hệ:
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" asChild>
          <a href="tel:0901333434">
            <Phone className="w-4 h-4 mr-2" />
            0901 333 434
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat Zalo
          </a>
        </Button>
      </div>
    </motion.div>
  )
}