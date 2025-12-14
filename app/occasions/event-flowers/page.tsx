"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Users,
  Camera,
  Mic,
  ChevronRight,
  ShoppingCart,
  Send,
  Phone,
  MessageCircle,
  Check,
  ArrowRight,
  Menu,
  X,
  Clock,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Sparkles,
  Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { CONTACT, SHOP_INFO } from "@/lib/constants"
import { useCart } from "@/lib/cart-context"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
}

// ================================================================
// CONFETTI COMPONENT
// ================================================================

function Confetti({ active, position }: { active: boolean; position: { x: number; y: number } }) {
  const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]

  if (!active) return null

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: position.x, top: position.y }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200 - 50,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function EventFlowersPage() {
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <Link href="/occasions" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
              Dịp lễ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)] font-medium">Hoa sự kiện</span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
                <span className="font-body text-purple-600 tracking-[0.25em] uppercase text-sm font-medium">
                  Sự kiện đặc biệt
                </span>
              </div>

              <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
                Hoa Trang Trí Sự Kiện
                <br />
                <span className="text-purple-600">Ấn Tượng Khó Quên</span>
              </h1>

              <p className="font-body text-[var(--text-secondary)] mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
                Tạo nên những sự kiện đáng nhớ với dịch vụ trang trí hoa chuyên nghiệp cho hội nghị, tiệc, lễ kỷ niệm và các sự kiện đặc biệt.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#hoa-su-kien"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                >
                  Xem dịch vụ
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-body font-medium transition-all duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Tư vấn ngay
                </a>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="event-hero.jpg"
                  alt="Hoa trang trí sự kiện"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🎪
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                🎭
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hoa-su-kien" className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-purple-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Dịch vụ hoa sự kiện
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Các Loại Sự Kiện Chúng Tôi Phục Vụ
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Từ hội nghị doanh nghiệp đến tiệc sinh nhật, chúng tôi cung cấp dịch vụ trang trí hoa toàn diện.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Hội Nghị & Seminar",
                description: "Trang trí chuyên nghiệp cho sự kiện doanh nghiệp",
                color: "purple"
              },
              {
                icon: Camera,
                title: "Tiệc & Lễ Kỷ Niệm",
                description: "Tạo không gian lãng mạn cho các buổi tiệc",
                color: "pink"
              },
              {
                icon: Mic,
                title: "Sự Kiện Ra Mắt",
                description: "Trang trí ấn tượng cho lễ ra mắt sản phẩm",
                color: "blue"
              },
              {
                icon: Award,
                title: "Lễ Trao Giải",
                description: "Không gian trang trọng cho lễ trao giải",
                color: "green"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
                whileHover={{ y: -8 }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                  service.color === "purple" && "bg-purple-100",
                  service.color === "pink" && "bg-pink-100",
                  service.color === "blue" && "bg-blue-100",
                  service.color === "green" && "bg-green-100"
                )}>
                  <service.icon className={cn(
                    "w-6 h-6",
                    service.color === "purple" && "text-purple-600",
                    service.color === "pink" && "text-pink-600",
                    service.color === "blue" && "text-blue-600",
                    service.color === "green" && "text-green-600"
                  )} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                  {service.title}
                </h3>
                <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-purple-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Ưu điểm vượt trội
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Tại Sao Chọn Dịch Vụ Của Chúng Tôi?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Thiết Kế Chuyên Nghiệp",
                description: "Đội ngũ thiết kế giàu kinh nghiệm, am hiểu xu hướng trang trí hiện đại",
                image: "/services/professional-design.jpg",
                icon: "🎨"
              },
              {
                title: "Thi Công Nhanh Chóng",
                description: "Thi công và lắp đặt nhanh chóng, đảm bảo tiến độ sự kiện",
                image: "/services/quick-setup.jpg",
                icon: "⚡"
              },
              {
                title: "Hoa Tươi Chất Lượng",
                description: "Sử dụng hoa tươi nhập khẩu và trong nước chất lượng cao",
                image: "/services/quality-flowers.jpg",
                icon: "🌺"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
                whileHover={{ y: -8 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "20px" }}>
                    {feature.title}
                  </h3>
                  <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-purple-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Quy trình làm việc
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              4 Bước Đơn Giản Để Có Sự Kiện Hoàn Hảo
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Tư Vấn & Khảo Sát",
                description: "Tìm hiểu yêu cầu và khảo sát địa điểm tổ chức"
              },
              {
                step: "02", 
                title: "Thiết Kế & Báo Giá",
                description: "Thiết kế concept và gửi báo giá chi tiết"
              },
              {
                step: "03",
                title: "Chuẩn Bị Hoa",
                description: "Chuẩn bị và gia công hoa theo thiết kế"
              },
              {
                step: "04",
                title: "Thi Công & Bàn Giao",
                description: "Thi công tại địa điểm và bàn giao hoàn thiện"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
              >
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-display font-bold text-xl">
                  {process.step}
                </div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                  {process.title}
                </h3>
                <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-600 to-purple-700">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-purple-600" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Đặt Dịch Vụ Trang Trí Sự Kiện
            </h2>

            <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất cho sự kiện của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                onClick={handleConfetti}
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-body font-medium transition-all duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Zalo
              </a>
            </div>

            <p className="font-body text-[var(--text-muted)] text-sm mt-6">
              🎉 Miễn phí tư vấn thiết kế - Giảm 10% cho khách hàng đặt sớm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Confetti */}
      <Confetti active={confettiState.active} position={confettiState.position} />

      {/* Footer */}
      <FooterSection />
    </main>
  )
}