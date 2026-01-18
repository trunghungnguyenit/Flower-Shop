"use client"

import { motion } from "framer-motion"
import { MessageCircle, Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"

const premiumEase = [0.25, 0.1, 0.25, 1] as const

export function CollectionCTA() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
      <div className="mx-auto max-w-[900px] px-4 lg:px-8">
        <motion.div
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-8 h-8 text-[var(--primary)]" strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
            Cần Tư Vấn Chọn Hoa?
          </h2>

          <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            Liên hệ với chúng tôi để được tư vấn miễn phí về các mẫu hoa phù hợp nhất cho nhu cầu của bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary-success)] hover:bg-[var(--primary-success)] text-white font-body font-medium transition-all duration-300 hover:scale-105"
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: {CONTACT.phoneDisplay}
            </a>
            <a
              href={CONTACT.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-body font-medium transition-all duration-300"
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
            >
              <MessageCircle className="w-5 h-5" />
              Chat Zalo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}