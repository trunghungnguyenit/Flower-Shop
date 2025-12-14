"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { 
  ArrowRight, 
  Clock, 
  MapPin, 
  Mail, 
  Facebook, 
  Instagram, 
  Phone 
} from "lucide-react"
import { CONTACT } from "@/lib/constants"

// ================================================================
// ANIMATION VARIANTS
// ================================================================
const premiumEase = [0.25, 0.1, 0.25, 1] as const

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
}

const staggerContainerSlow = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  }
}

const staggerItem = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

const staggerItemLeft = {
  initial: { opacity: 0, x: -32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

const staggerItemRight = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

// ================================================================
// FOOTER SECTION
// ================================================================
export function FooterSection() {
  const newsletterRef = useRef<HTMLDivElement>(null)
  const mainFooterRef = useRef<HTMLDivElement>(null)
  const isNewsletterInView = useInView(newsletterRef, { once: true, amount: 0.3 })
  const isMainFooterInView = useInView(mainFooterRef, { once: true, amount: 0.2 })

  return (
    <footer className="bg-[var(--text-primary)] text-white">
      {/* Newsletter */}
      <div ref={newsletterRef} className="border-b border-white/10">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-12 lg:py-16">
          <motion.div
            className="grid lg:grid-cols-2 gap-8 items-center"
            initial="initial"
            animate={isNewsletterInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItemLeft}>
              <h3
                className="font-display text-white mb-3"
                style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}
              >
                Đăng ký nhận ưu đãi
              </h3>
              <p
                className="font-body text-white/70"
                style={{ fontSize: "15px", lineHeight: 1.6 }}
              >
                Nhận thông tin khuyến mãi & mẫu hoa mới mỗi tuần. Giảm ngay 10% cho đơn hàng đầu tiên!
              </p>
            </motion.div>

            <motion.form
              className="flex gap-3"
              variants={staggerItemRight}
            >
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 h-12 px-5 bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                required
              />
              <motion.button
                type="submit"
                className="flex-shrink-0 h-12 px-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-colors duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                Đăng ký
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div ref={mainFooterRef} className="mx-auto max-w-[1240px] px-4 lg:px-8 py-14 lg:py-20">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12"
          initial="initial"
          animate={isMainFooterInView ? "animate" : "initial"}
          variants={staggerContainerSlow}
        >
          {/* Brand */}
          <motion.div className="col-span-2 lg:col-span-1" variants={staggerItem}>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                }}
              >
                <span className="text-2xl">🌸</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-semibold text-white">Hoa Tươi</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-body">
                  Đà Nẵng • Quảng Nam
                </span>
              </div>
            </Link>

            <p
              className="font-body text-white/70 mb-6"
              style={{ fontSize: "14px", lineHeight: 1.7 }}
            >
              Mang vẻ đẹp của thiên nhiên vào cuộc sống. Hoa tươi mỗi ngày, giao hàng nhanh chóng.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: "#1877F2" },
                { icon: Instagram, color: "#E4405F" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)", transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" strokeWidth={1.5} />
                </motion.a>
              ))}
              <motion.a
                href="#"
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)", transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-bold">Z</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Links */}
          {[
            {
              title: "Liên kết",
              links: ["Về chúng tôi", "Bộ sưu tập", "Liên hệ", "Blog"],
            },
            {
              title: "Dịch vụ",
              links: ["Bó hoa tươi", "Lẵng hoa", "Hoa cưới", "Hoa khai trương"],
            },
            {
              title: "Theo dịp",
              links: ["Sinh nhật", "Tình yêu", "Cưới hỏi", "Tết"],
            },
          ].map((column, index) => (
            <motion.div key={index} variants={staggerItem}>
              <h4
                className="font-display text-white mb-5"
                style={{ fontSize: "16px", fontWeight: 600 }}
              >
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href="#"
                      className="font-body text-white/70 hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                      style={{ fontSize: "14px" }}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact */}
          <motion.div className="col-span-2 md:col-span-1" variants={staggerItem}>
            <h4
              className="font-display text-white mb-5"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-white/70" style={{ fontSize: "14px" }}>
                  {CONTACT.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                <a
                  href={CONTACT.phoneLink}
                  className="font-body text-white/70 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                <a
                  href={CONTACT.emailLink}
                  className="font-body text-white/70 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-white/70" style={{ fontSize: "14px" }}>
                  {CONTACT.workingHours} ({CONTACT.workingDays})
                  <br />
                  <span className="text-[var(--primary)]">Nhận đặt 24/7</span>
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        className="border-t border-white/10"
        initial={{ opacity: 0 }}
        animate={isMainFooterInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: premiumEase }}
      >
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="font-body text-white/50 text-center md:text-left"
              style={{ fontSize: "13px" }}
            >
              © 2025 Hoa Tươi Đà Nẵng. Thiết kế với{" "}
              <span className="text-[var(--primary)]">♥</span> bởi đội ngũ yêu hoa.
            </p>
            <div className="flex items-center gap-6">
              {["Chính sách giao hàng", "Chính sách đổi trả", "Chính sách bảo mật"].map((policy, index) => (
                <Link
                  key={index}
                  href="#"
                  className="font-body text-white/50 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "13px" }}
                >
                  {policy}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}