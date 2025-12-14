"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Clock, MapPin, Check, Phone, MessageCircle, Send } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { staggerContainer, staggerItemLeft, premiumEase } from "@/components/animations/framer-variants"

// ================================================================
// QUICK ORDER SECTION
// ================================================================
export function QuickOrderSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItemLeft}
              className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Đặt hoa nhanh
            </motion.span>

            <motion.h2
              variants={staggerItemLeft}
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              Gửi Yêu Thương
              <br />
              <span className="text-gradient-primary">Chỉ 3 Bước Đơn Giản</span>
            </motion.h2>

            <motion.p
              variants={staggerItemLeft}
              className="font-body text-[var(--text-secondary)] mb-8 max-w-lg"
              style={{ fontSize: "16px", lineHeight: 1.8 }}
            >
              Điền thông tin bên dưới, đội ngũ tư vấn sẽ liên hệ bạn ngay trong vòng 15 phút để hỗ trợ
              chọn mẫu hoa phù hợp nhất.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={staggerItemLeft} className="space-y-4 mb-10">
              {[
                { icon: Clock, text: "Phản hồi trong 15 phút" },
                { icon: MapPin, text: "Giao hàng nhanh 2 giờ" },
                { icon: Check, text: "Tư vấn miễn phí" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: premiumEase }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      borderRadius: "var(--radius-medium)",
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                    }}
                  >
                    <benefit.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <span
                    className="font-body text-[var(--text-primary)]"
                    style={{ fontSize: "15px", fontWeight: 500 }}
                  >
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Alternative Contact */}
            <motion.div
              variants={staggerItemLeft}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href={CONTACT.phoneLink}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-[var(--border-soft)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTACT.phoneDisplay}
              </motion.a>

              <motion.a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0068FF] rounded-full text-white hover:bg-[#0058DD] transition-colors duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Chat Zalo
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
          >
            <motion.div
              className="bg-white p-6 lg:p-10 relative"
              style={{
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
              }}
              whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)", transition: { duration: 0.3 } }}
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                    style={{ borderRadius: "var(--radius-xl)" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 mb-6 flex items-center justify-center bg-[var(--success)]/10 rounded-full"
                    >
                      <Check className="w-10 h-10 text-[var(--success)]" strokeWidth={1.5} />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="font-display text-[var(--text-primary)] mb-2 text-center"
                      style={{ fontSize: "24px", fontWeight: 600 }}
                    >
                      Gửi thành công!
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="font-body text-[var(--text-secondary)] text-center"
                      style={{ fontSize: "15px" }}
                    >
                      Chúng tôi sẽ liên hệ bạn trong 15 phút
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h3
                  className="font-display text-[var(--text-primary)] mb-2"
                  style={{ fontSize: "22px", fontWeight: 600 }}
                >
                  Đặt Hoa Ngay
                </h3>
                <p
                  className="font-body text-[var(--text-secondary)]"
                  style={{ fontSize: "14px" }}
                >
                  Điền form để nhận tư vấn miễn phí
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Họ tên <span className="text-[var(--danger)]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Số điện thoại <span className="text-[var(--danger)]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="0905 xxx xxx"
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Dịp đặt hoa
                    </label>
                    <select
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 appearance-none"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                    >
                      <option value="">Chọn dịp...</option>
                      <option value="sinh-nhat">Sinh nhật</option>
                      <option value="tinh-yeu">Tình yêu / Valentine</option>
                      <option value="cuoi">Cưới hỏi</option>
                      <option value="khai-truong">Khai trương</option>
                      <option value="chia-buon">Chia buồn</option>
                      <option value="khac">Dịp khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Ngân sách
                    </label>
                    <select
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 appearance-none"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                    >
                      <option value="">Chọn ngân sách...</option>
                      <option value="200-500">200.000đ - 500.000đ</option>
                      <option value="500-1000">500.000đ - 1.000.000đ</option>
                      <option value="1000-2000">1.000.000đ - 2.000.000đ</option>
                      <option value="2000+">Trên 2.000.000đ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                    Ghi chú (tùy chọn)
                  </label>
                  <textarea
                    placeholder="Mô tả yêu cầu của bạn: màu sắc, loại hoa, thời gian giao..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 resize-none"
                    style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-colors duration-300 disabled:opacity-70"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(var(--primary-rgb), 0.3)", transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Gửi yêu cầu tư vấn
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p
                  className="font-body text-[var(--text-muted)] text-center"
                  style={{ fontSize: "12px" }}
                >
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}