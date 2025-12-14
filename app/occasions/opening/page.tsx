"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Store,
  TrendingUp,
  Star,
  Gift,
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
  Trophy,
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
  const colors = ["#FFD700", "#FF6347", "#32CD32", "#FF69B4", "#00CED1", "#FF8C00"]

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

export default function OpeningFlowersPage() {
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
            <span className="text-[var(--text-primary)] font-medium">Khai trương</span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Store className="w-6 h-6 text-orange-600" strokeWidth={1.5} />
                </div>
                <span className="font-body text-orange-600 tracking-[0.25em] uppercase text-sm font-medium">
                  Khai trương thành công
                </span>
              </div>

              <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
                Hoa Khai Trương
                <br />
                <span className="text-orange-600">Thịnh Vượng Phát Đạt</span>
              </h1>

              <p className="font-body text-[var(--text-secondary)] mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
                Chúc mừng khai trương với những lẵng hoa tươi đẹp, mang ý nghĩa may mắn và thành công trong kinh doanh.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#hoa-khai-truong"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                >
                  Xem hoa khai trương
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-body font-medium transition-all duration-300"
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
                  src="opening-hero.jpg"
                  alt="Hoa khai trương"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🎊
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-xl animate-pulse">
                🏪
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="hoa-khai-truong" className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-orange-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Ý nghĩa hoa khai trương
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Tại Sao Chọn Hoa Khai Trương?
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Hoa khai trương không chỉ trang trí mà còn mang ý nghĩa phong thủy, thu hút khách hàng và đem lại may mắn.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Thu Hút Khách Hàng",
                description: "Tạo ấn tượng tốt và thu hút khách hàng ghé thăm",
                color: "orange"
              },
              {
                icon: Star,
                title: "Ý Nghĩa May Mắn",
                description: "Mang lại vận may và thành công trong kinh doanh",
                color: "yellow"
              },
              {
                icon: Gift,
                title: "Thể Hiện Lòng Chúc Mừng",
                description: "Gửi lời chúc mừng chân thành đến chủ cửa hàng",
                color: "green"
              },
              {
                icon: Trophy,
                title: "Tạo Không Khí Lễ Hội",
                description: "Làm cho ngày khai trương thêm trang trọng",
                color: "red"
              }
            ].map((feature, index) => (
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
                  feature.color === "orange" && "bg-orange-100",
                  feature.color === "yellow" && "bg-yellow-100",
                  feature.color === "green" && "bg-green-100",
                  feature.color === "red" && "bg-red-100"
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6",
                    feature.color === "orange" && "text-orange-600",
                    feature.color === "yellow" && "text-yellow-600",
                    feature.color === "green" && "text-green-600",
                    feature.color === "red" && "text-red-600"
                  )} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                  {feature.title}
                </h3>
                <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Flowers Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-orange-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Hoa khai trương phổ biến
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Loại Hoa Khai Trương Được Ưa Chuộng
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Lan Hồ Điệp",
                description: "Biểu tượng của sự sang trọng và thịnh vượng",
                image: "/flowers/orchid-opening.jpg",
                meaning: "Thịnh vượng"
              },
              {
                name: "Hoa Hướng Dương",
                description: "Tượng trưng cho sự tích cực và thành công",
                image: "/flowers/sunflower-opening.jpg",
                meaning: "Thành công"
              },
              {
                name: "Hoa Cúc Vàng",
                description: "Mang ý nghĩa tài lộc và may mắn",
                image: "/flowers/yellow-chrysanthemum.jpg",
                meaning: "Tài lộc"
              }
            ].map((flower, index) => (
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
                    src={flower.image}
                    alt={flower.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-medium rounded-full">
                      {flower.meaning}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "20px" }}>
                    {flower.name}
                  </h3>
                  <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                    {flower.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-600 to-orange-700">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-orange-600" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Đặt Hoa Khai Trương Ngay
            </h2>

            <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Liên hệ ngay để đặt những lẵng hoa khai trương đẹp nhất, giao hàng đúng giờ trong khu vực Đà Nẵng - Quảng Nam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-body font-medium transition-all duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Zalo
              </a>
            </div>

            <p className="font-body text-[var(--text-muted)] text-sm mt-6">
              🎉 Miễn phí thiết kế banner chúc mừng khi đặt lẵng hoa từ 500k
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