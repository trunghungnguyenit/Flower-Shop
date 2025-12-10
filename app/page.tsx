"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import {
  Menu, X, Phone, MessageCircle, ArrowRight, Heart, ShoppingCart,
  Truck, Clock, Gift, MapPin, Shield, Sparkles, Check, Star, Quote,
  Send, Play, ChevronLeft, ChevronRight, Palette, Mail, Facebook, Instagram,
  // Scenario icons
  HeartHandshake, Cake, Flower2, Store, Gem, Home, type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT, SHOP_INFO } from "@/lib/constants"

// ================================================================
// FRAMER MOTION ANIMATION VARIANTS - PREMIUM SCROLL ANIMATIONS
// ================================================================

// Premium easing curve - smooth and elegant
const premiumEase = [0.25, 0.1, 0.25, 1] as const
const smoothSpring = { type: "spring", stiffness: 100, damping: 15 }

// Base transition settings
const baseTransition = {
  duration: 0.6,
  ease: premiumEase,
}

// ========================
// FADE ANIMATIONS
// ========================

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, duration: 0.7 }
  },
  exit: { opacity: 0, y: -20 }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: baseTransition
  },
  exit: { opacity: 0 }
}

// ========================
// SCALE ANIMATIONS
// ========================

const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: baseTransition
  },
  exit: { opacity: 0, scale: 0.95 }
}

const scaleInUp = {
  initial: { opacity: 0, scale: 0.96, y: 28 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...baseTransition, duration: 0.7 }
  },
}

// ========================
// SLIDE ANIMATIONS
// ========================

const slideInLeft = {
  initial: { opacity: 0, x: -32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: baseTransition
  },
  exit: { opacity: 0, x: -30 }
}

const slideInRight = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: baseTransition
  },
  exit: { opacity: 0, x: 30 }
}

// ========================
// STAGGER CONTAINERS
// ========================

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
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

// ========================
// STAGGER ITEMS
// ========================

const staggerItem = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase }
  }
}

const staggerItemScale = {
  initial: { opacity: 0, y: 20, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
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

// ========================
// SECTION TITLE ANIMATION
// ========================

const sectionTitleVariants = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: premiumEase,
    }
  }
}

// ========================
// CARD HOVER ANIMATIONS
// ========================

const cardHover = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.25, ease: premiumEase }
  }
}

const iconHover = {
  rest: { rotate: 0 },
  hover: {
    rotate: 3,
    transition: { duration: 0.2, ease: premiumEase }
  }
}

// ================================================================
// DATA & CONSTANTS
// ================================================================

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/dich-vu" },
  { name: "Bộ sưu tập", href: "/bo-suu-tap" },
  { name: "Blog", href: "/blog" },
  { name: "Liên hệ", href: "#lien-he" },
]

const heroSlides = [
  {
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    title: "Trao Yêu Thương",
    subtitle: "Gửi Trọn Cảm Xúc Bằng Hoa Tươi",
    description: "Hoa tươi 100% mỗi ngày • Thiết kế tinh tế • Giao nhanh trong 2 giờ tại Đà Nẵng – Quảng Nam",
  },
  {
    image: "/red-roses-luxury-basket-arrangement.jpg",
    title: "Lãng Mạn Từng Cánh Hoa",
    subtitle: "Dành Tặng Người Thương",
    description: "Hàng ngàn mẫu hoa đẹp • Thiết kế riêng theo yêu cầu",
  },
  {
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    title: "Ngày Trọng Đại",
    subtitle: "Hoàn Hảo Với Hoa Tươi",
    description: "Chuyên hoa cưới • Trang trí sự kiện cao cấp",
  },
]

const bestSellers = [
  {
    id: 1,
    name: "Hồng Pastel Ngọt Ngào",
    description: "Sắc hồng nhẹ nhàng – tinh tế, hoàn hảo để tặng người thương.",
    price: 450000,
    originalPrice: 550000,
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    badge: "Best Seller",
    rating: 4.9,
    sold: 234,
  },
  {
    id: 2,
    name: "Lẵng Hoa Hồng Đỏ",
    description: "Biểu tượng của đam mê và sự lãng mạn nồng nàn.",
    price: 680000,
    image: "/red-roses-luxury-basket-arrangement.jpg",
    badge: "Hot",
    rating: 4.8,
    sold: 189,
  },
  {
    id: 3,
    name: "Hoa Cưới Trắng Tinh Khôi",
    description: "Tối giản – trang nhã – điểm nhấn cho ngày trọng đại.",
    price: 850000,
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    rating: 5.0,
    sold: 156,
  },
  {
    id: 4,
    name: "Bó Hoa Pastel Mix",
    description: "Kết hợp nhiều sắc pastel, trẻ trung và thanh lịch.",
    price: 520000,
    originalPrice: 600000,
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    badge: "Sale",
    rating: 4.7,
    sold: 201,
  },
  {
    id: 5,
    name: "Hướng Dương Rực Rỡ",
    description: "Mang đến năng lượng tích cực và niềm vui tràn đầy.",
    price: 380000,
    image: "/sunflower-birthday-bouquet.jpg",
    rating: 4.9,
    sold: 178,
  },
]

const realCases = [
  {
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    customerName: "Anh Minh",
    title: "Tặng vợ nhân kỷ niệm 3 năm",
    subtitle: "Bó hoa được thiết kế tinh tế, đại diện cho tình yêu bền chặt và sự trân trọng dành cho người bạn đời.",
    occasion: "Kỷ niệm",
  },
  {
    image: "/red-roses-luxury-basket-arrangement.jpg",
    customerName: "Chị Hương",
    title: "Khai trương cửa hàng mới",
    subtitle: "Lẵng hoa sang trọng – giao đúng giờ, mang theo lời chúc hồng phát và may mắn đầu năm.",
    occasion: "Khai trương",
  },
  {
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    customerName: "Cô dâu Linh",
    title: "Ngày cưới trong mơ",
    subtitle: "Thiết kế hoa cưới nhẹ nhàng, thanh thoát – hoàn thiện vẻ đẹp của cô dâu trong khoảnh khắc trọng đại.",
    occasion: "Cưới hỏi",
  },
  {
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    customerName: "Bé Na",
    title: "Sinh nhật tuổi 5",
    subtitle: "Bó hoa pastel dễ thương – mang đến trọn vẹn niềm vui cho bé suốt cả ngày dài.",
    occasion: "Sinh nhật",
  },
]

const scenarios: {
  icon: LucideIcon
  title: string
  tagline: string
  href: string
  count: number
}[] = [
  { icon: HeartHandshake, title: "Tặng người yêu", tagline: "Nói những điều khó nói bằng sắc hoa lãng mạn.", href: "/bo-suu-tap?scenario=tinh-yeu", count: 86 },
  { icon: Cake, title: "Sinh nhật", tagline: "Gửi lời chúc trọn vẹn và đầy bất ngờ.", href: "/bo-suu-tap?scenario=sinh-nhat", count: 72 },
  { icon: Flower2, title: "Tặng mẹ", tagline: "Tri ân dịu dàng dành cho người phụ nữ tuyệt vời nhất.", href: "/bo-suu-tap?scenario=tang-me", count: 54 },
  { icon: Store, title: "Khai trương", tagline: "Tượng trưng cho may mắn và khởi đầu thuận lợi.", href: "/bo-suu-tap?scenario=khai-truong", count: 48 },
  { icon: Gem, title: "Cưới hỏi", tagline: "Thanh lịch – trang trọng – hoàn hảo cho ngày trọng đại.", href: "/bo-suu-tap?scenario=cuoi", count: 65 },
  { icon: Home, title: "Trang trí nhà", tagline: "Làm bừng sáng không gian sống mỗi ngày.", href: "/bo-suu-tap?scenario=trang-tri", count: 42 },
]

const decorIdeas = [
  {
    image: "/decorative-flowers-home-interior-design.jpg",
    title: "Hoa cho phòng khách",
    subtitle: "Điểm nhấn tinh tế, thu hút ánh nhìn ngay khi bước vào nhà.",
    toneColors: ["#D97C8A", "#E8A4AF", "#FAF7F8"],
  },
  {
    image: "/dining-table-flowers.jpg",
    title: "Hoa bàn ăn",
    subtitle: "Mang lại sự ấm cúng và gắn kết trong từng bữa ăn gia đình.",
    toneColors: ["#FFFFFF", "#F7D88A", "#E8C4C8"],
  },
  {
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    title: "Hoa tone pastel",
    subtitle: "Thanh lịch – nhẹ nhàng – hoàn hảo cho căn hộ phong cách hiện đại.",
    toneColors: ["#E8A4AF", "#F7D88A", "#C9E4DE"],
  },
  {
    image: "/office-flower-arrangement.jpg",
    title: "Hoa ban công",
    subtitle: "Tươi sáng mỗi buổi sáng – tạo năng lượng tích cực cho ngày mới.",
    toneColors: ["#F7D88A", "#FFE4A0", "#4CAF50"],
  },
]

const giftGuides: {
  icon: LucideIcon
  title: string
  description: string
  href: string
}[] = [
  { icon: Heart, title: "Cho người yêu", description: "Hoa hồng – hoa lan: đại diện cho tình yêu sâu đậm và chân thành.", href: "#" },
  { icon: Flower2, title: "Cho mẹ", description: "Hoa ly – cẩm chướng: gửi lời tri ân đến đấng sinh thành.", href: "#" },
  { icon: Sparkles, title: "Cho bạn thân", description: "Hoa hướng dương – hoa mix: mang đến sự vui tươi và năng lượng tích cực.", href: "#" },
  { icon: Gift, title: "Cho sếp", description: "Lẵng hoa sang trọng – tinh tế, thể hiện sự trân trọng và chuyên nghiệp.", href: "#" },
  { icon: Gem, title: "Cho vợ/chồng", description: "Thiết kế cao cấp – giúp giữ trọn ngọn lửa yêu thương.", href: "#" },
]

const categories = [
  { name: "Sinh nhật", image: "/birthday-flower-bouquet-celebration.jpg", href: "/bo-suu-tap?category=sinh-nhat", count: 45 },
  { name: "Tình yêu", image: "/romantic-red-roses-bouquet-luxury-gift.jpg", href: "/bo-suu-tap?category=tinh-yeu", count: 62 },
  { name: "Cưới hỏi", image: "/wedding-flowers-bridal-bouquet-elegant.jpg", href: "/bo-suu-tap?category=cuoi", count: 38 },
  { name: "Khai trương", image: "/grand-opening-flower-stand.jpg", href: "/bo-suu-tap?category=khai-truong", count: 28 },
  { name: "Chia buồn", image: "/sympathy-white-flowers-arrangement.jpg", href: "/bo-suu-tap?category=chia-buon", count: 22 },
  { name: "Trang trí", image: "/decorative-flowers-interior-design.jpg", href: "/bo-suu-tap?category=trang-tri", count: 35 },
  { name: "Hoa Tết", image: "/vietnamese-tet-flowers-mai-dao.jpg", href: "/bo-suu-tap?category=tet", count: 40 },
  { name: "Chúc mừng", image: "/congratulation-flower-basket.jpg", href: "/bo-suu-tap?category=chuc-mung", count: 32 },
  { name: "Sự kiện", image: "/event-flower-decoration.jpg", href: "/bo-suu-tap?category=su-kien", count: 25 },
]

const uspItems = [
  { icon: Truck, title: "Freeship 5km", description: "Giao nhanh – an toàn – đúng mẫu" },
  { icon: Clock, title: "Giao Nhanh 2 Giờ", description: "Ưu tiên những đơn gấp, chuẩn thời gian" },
  { icon: Gift, title: "Combo Ưu Đãi", description: "Tiết kiệm hơn – giá trị nhiều hơn" },
  { icon: Shield, title: "Hoa Tươi 100%", description: "Hoàn tiền nếu hoa không đạt chất lượng" },
]

const reviews = [
  {
    name: "Nguyễn Thị Hương",
    avatar: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    rating: 5,
    content: "Hoa tươi lâu, thiết kế đẹp hơn cả mong đợi. Giao nhanh và rất chuyên nghiệp.",
    productImage: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    date: "2 ngày trước",
  },
  {
    name: "Trần Văn Minh",
    avatar: "/red-roses-luxury-basket-arrangement.jpg",
    rating: 5,
    content: "Vợ mình rất xúc động khi nhận hoa. Shop làm chỉn chu từng chi tiết.",
    productImage: "/red-roses-luxury-basket-arrangement.jpg",
    date: "1 tuần trước",
  },
  {
    name: "Lê Thị Mai",
    avatar: "/white-wedding-bouquet-elegant-roses.jpg",
    rating: 5,
    content: "Hoa cưới đẹp xuất sắc. Đội ngũ tư vấn nhiệt tình và dễ thương.",
    productImage: "/white-wedding-bouquet-elegant-roses.jpg",
    date: "2 tuần trước",
  },
]

const blogPosts = [
  { title: "Cách chọn hoa theo tính cách người nhận", subtitle: "Gợi ý riêng cho từng cá tính – chọn đúng mẫu, đúng thông điệp.", image: "/pastel-pink-roses-bouquet-soft-elegant.jpg", href: "#" },
  { title: "Ý nghĩa 7 màu hoa phổ biến", subtitle: "Mỗi màu hoa là một câu chuyện – hãy khám phá điều phù hợp nhất.", image: "/red-roses-luxury-basket-arrangement.jpg", href: "#" },
  { title: "Mẹo giữ hoa tươi lâu đến 2 tuần", subtitle: "Các bước đơn giản nhưng hiệu quả cao – ai cũng áp dụng được.", image: "/white-wedding-bouquet-elegant-roses.jpg", href: "#" },
  { title: "Top 10 bó hoa tặng người yêu", subtitle: "Lựa chọn tinh tế giúp nàng cảm thấy được yêu thương hơn.", image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg", href: "#" },
]

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function HomePageV3() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero */}
      <HeroSection />

      {/* Best Seller */}
      <BestSellerSection />

      {/* Real Cases - Khoảnh Khắc Thật */}
      <RealCasesSection />

      {/* Scenarios - Bạn Đang Ở Hoàn Cảnh Nào? */}
      <ScenariosSection />

      {/* Decor Ideas - Trang Trí Ngôi Nhà */}
      <DecorSection />

      {/* Gift Guide - Gợi Ý Quà Theo Người Nhận */}
      <GiftGuideSection />

      {/* Categories - Hoa Theo Dịp */}
      <CategoriesSection />

      {/* USP */}
      <UspSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* Blog */}
      <BlogSection />

      {/* Quick Order Form */}
      <QuickOrderSection />

      {/* Footer */}
      <FooterSection />

      {/* Sticky Contact */}
      <StickyContact />
    </main>
  )
}

// ================================================================
// HEADER SECTION
// ================================================================

function HeaderSection() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-3"
          : "bg-transparent backdrop-blur-sm py-5"
      )}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
              isScrolled ? "bg-[var(--primary)]/15" : "bg-white/20 backdrop-blur-sm"
            )}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌸</span>
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xl font-display font-semibold tracking-wide transition-colors duration-300",
                isScrolled ? "text-[var(--text-primary)]" : "text-white"
              )}
            >
              Hoa Tươi
            </span>
            <span
              className={cn(
                "text-[10px] tracking-[0.25em] uppercase font-body transition-colors duration-300",
                isScrolled ? "text-[var(--text-secondary)]" : "text-white/80"
              )}
            >
              Đà Nẵng • Quảng Nam
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-body font-medium transition-colors duration-300 py-2 group",
                isScrolled
                  ? "text-[var(--text-primary)] hover:text-[var(--primary)]"
                  : "text-white/90 hover:text-white"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300",
                  isScrolled ? "bg-[var(--primary)]" : "bg-white"
                )}
              />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={CONTACT.phoneLink}
            className={cn(
              "flex items-center gap-2 text-sm font-body font-medium transition-colors duration-300",
              isScrolled
                ? "text-[var(--text-primary)] hover:text-[var(--primary)]"
                : "text-white/90 hover:text-white"
            )}
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <span>{CONTACT.phoneDisplay}</span>
          </a>

          <a
            href={CONTACT.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all duration-300 hover:scale-105",
              isScrolled
                ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            )}
            style={{ borderRadius: "var(--radius-round)" }}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Zalo
          </a>

          <button
            className={cn(
              "relative p-2.5 transition-colors duration-300",
              isScrolled ? "text-[var(--text-primary)]" : "text-white"
            )}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            className={cn(
              "relative p-2 transition-colors duration-300",
              isScrolled ? "text-[var(--text-primary)]" : "text-white"
            )}
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center">
              2
            </span>
          </button>
          <button
            className={cn(
              "p-2 transition-colors duration-300",
              isScrolled ? "text-[var(--text-primary)]" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white/98 backdrop-blur-xl",
          mobileMenuOpen ? "max-h-[400px] border-t border-[var(--border-soft)]" : "max-h-0"
        )}
      >
        <div className="px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-base font-body font-medium text-[var(--text-primary)] hover:text-[var(--primary)] py-3 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-6 mt-4 border-t border-[var(--border-soft)] flex flex-col gap-3">
            <a href={CONTACT.phoneLink} className="flex items-center gap-3 text-[var(--text-primary)] py-2">
              <Phone className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.5} />
              <span className="font-body font-medium">{CONTACT.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[var(--primary)] text-white font-body font-medium"
              style={{ borderRadius: "var(--radius-medium)" }}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

// ================================================================
// HERO SECTION - PREMIUM FRAMER MOTION
// ================================================================

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms for depth effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slides with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="absolute inset-0"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Premium Animation Layers */}
      <SoftGradientMotion />
      <PremiumFloatingPetals />
      <SoftLightLeaks />

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="inline-block font-body text-[var(--primary-light)] tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Hoa tươi mỗi ngày
            </motion.span>

            {/* Title with AnimatePresence for smooth transitions */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className="font-display text-white mb-4"
                style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 600, lineHeight: 1.1 }}
              >
                {heroSlides[currentSlide].title}
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-[var(--primary-light)]"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
                className="font-body text-white/80 mb-8 max-w-lg"
                style={{ fontSize: "18px", lineHeight: 1.7 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/bo-suu-tap"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                >
                  Xem Bộ Sưu Tập
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-body font-medium border border-white/30 transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Tư Vấn Qua Zalo
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 transition-all duration-300",
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            )}
            style={{ borderRadius: "var(--radius-round)" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-white/60"
      >
        <span className="font-body text-xs tracking-wider uppercase">Cuộn xuống</span>
        <motion.div
          className="w-px h-12 bg-white/30 relative overflow-hidden"
        >
          <motion.div
            className="w-full h-4 bg-white"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ================================================================
// BEST SELLER SECTION
// ================================================================

function BestSellerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      {/* Particle Glow Animation */}
      <ParticleGlow />

      <div className="mx-auto max-w-[1240px] px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Sản phẩm nổi bật
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Best Seller
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Những thiết kế hoa được yêu thích nhất – tươi mới, sang trọng và phù hợp cho mọi dịp đặc biệt.
          </motion.p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              className="group"
              variants={staggerItemScale}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link href={`/san-pham/${product.id}`} className="block">
                {/* Image */}
                <div
                  className="relative aspect-[3/4] overflow-hidden mb-4"
                  style={{ borderRadius: "var(--radius-medium)" }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <span
                      className={cn(
                        "absolute top-3 left-3 px-3 py-1 text-white text-xs font-body font-medium",
                        product.badge === "Best Seller" && "bg-[var(--primary)]",
                        product.badge === "Hot" && "bg-[var(--danger)]",
                        product.badge === "Sale" && "bg-[var(--accent-gold)] text-[var(--text-primary)]"
                      )}
                      style={{ borderRadius: "var(--radius-round)" }}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
                  </button>

                  {/* Quick Add */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] font-body font-medium text-sm hover:bg-[var(--primary)] hover:text-white transition-colors duration-300"
                      style={{ borderRadius: "var(--radius-soft)" }}
                      onClick={(e) => e.preventDefault()}
                    >
                      Thêm vào giỏ
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3
                    className="font-display text-[var(--text-primary)] mb-1 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-sm">🌸</span>
                    <span className="font-body text-[var(--text-secondary)]" style={{ fontSize: "13px" }}>
                      {product.rating} ({product.sold} đã bán)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span
                      className="font-display text-[var(--primary)]"
                      style={{ fontSize: "16px", fontWeight: 600 }}
                    >
                      {product.price.toLocaleString()}đ
                    </span>
                    {product.originalPrice && (
                      <span
                        className="font-body text-[var(--text-muted)] line-through"
                        style={{ fontSize: "13px" }}
                      >
                        {product.originalPrice.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
        >
          <Link
            href="/bo-suu-tap"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--primary)] text-[var(--primary)] font-body font-medium hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
            style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
          >
            Xem tất cả
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// REAL CASES SECTION - "Khoảnh Khắc Thật"
// ================================================================

function RealCasesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Câu chuyện thật
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Khoảnh Khắc Thật – Câu Chuyện Thật
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Những khoảnh khắc xúc động được lưu giữ qua từng bó hoa mà khách hàng đã tin tưởng gửi gắm.
          </motion.p>
        </motion.div>

        {/* Cases Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {realCases.map((caseItem, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden bg-white"
              style={{
                borderRadius: "var(--radius-large)",
                boxShadow: "var(--shadow-card)",
              }}
              variants={staggerItemScale}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Occasion Badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "12px" }}
                >
                  <span className="font-body font-medium text-[var(--primary)]">
                    {caseItem.occasion}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="w-10 h-10 mb-3 flex items-center justify-center bg-[var(--primary)]/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                    style={{ borderRadius: "var(--radius-medium)" }}
                  >
                    <Quote className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>

                  <p
                    className="font-body text-[var(--primary-light)] mb-1"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    {caseItem.customerName}
                  </p>

                  <h3
                    className="font-display text-white mb-2 line-clamp-2"
                    style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.3 }}
                  >
                    {caseItem.title}
                  </h3>

                  <p
                    className="font-body text-white/80 line-clamp-2"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    {caseItem.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// SCENARIOS SECTION - "Bạn Đang Ở Hoàn Cảnh Nào?"
// ================================================================

function ScenariosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Tìm hoa phù hợp
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Bạn Đang Ở Tình Huống Nào?
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Chúng tôi giúp bạn chọn mẫu hoa phù hợp nhất cho từng khoảnh khắc.
          </motion.p>
        </motion.div>

        {/* Scenarios Grid - 3x2 desktop, 2x3 tablet, 1x6 mobile */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {scenarios.map((scenario, index) => {
            const IconComponent = scenario.icon
            return (
              <motion.div
                key={index}
                variants={staggerItemScale}
                whileHover={{ y: -4, transition: { duration: 0.25, ease: premiumEase } }}
              >
                <Link
                  href={scenario.href}
                  className="group relative flex flex-col items-center justify-center p-5 lg:p-6 bg-white border border-[var(--border-soft)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-[0_8px_30px_rgba(217,124,138,0.15)]"
                  style={{
                    borderRadius: "var(--radius-medium)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Icon Wrapper - Pastel Circle */}
                  <motion.div
                    className="w-14 h-14 lg:w-16 lg:h-16 mb-4 flex items-center justify-center bg-[var(--secondary)] border border-[var(--border-soft)] rounded-full transition-all duration-300 group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/20"
                    whileHover={{ rotate: 3, scale: 1.05 }}
                    transition={{ duration: 0.2, ease: premiumEase }}
                  >
                    <IconComponent
                      className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--primary-dark)]"
                      strokeWidth={1.75}
                    />
                  </motion.div>

                  {/* Title */}
                  <h4
                    className="font-display text-[var(--text-primary)] text-center mb-2 transition-colors duration-300 group-hover:text-[var(--primary-dark)]"
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {scenario.title}
                  </h4>

                  {/* Tagline */}
                  <p
                    className="font-body text-[var(--text-secondary)] text-center mb-3 line-clamp-2"
                    style={{ fontSize: "13px", lineHeight: 1.5 }}
                  >
                    {scenario.tagline}
                  </p>

                  {/* Count Badge */}
                  <span
                    className="inline-flex items-center px-3 py-1 bg-[var(--primary)]/10 rounded-full font-body text-[var(--primary-dark)] transition-colors duration-300 group-hover:bg-[var(--primary)]/20"
                    style={{ fontSize: "12px", fontWeight: 500 }}
                  >
                    {scenario.count}+ mẫu hoa
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// DECOR SECTION - "Trang Trí Ngôi Nhà"
// ================================================================

function DecorSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-alt)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Ý tưởng decor
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Trang Trí Ngôi Nhà Với Hoa Tươi
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Gợi ý giúp không gian của bạn trở nên ấm áp, sang trọng và tràn đầy sức sống.
          </motion.p>
        </motion.div>

        {/* Decor Grid - alternating left/right animations */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {decorIdeas.map((decor, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? staggerItemLeft : staggerItemRight}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href="#"
                className="group block overflow-hidden bg-white"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={decor.image}
                  alt={decor.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Tone Colors Badge */}
                <div
                  className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm"
                  style={{ borderRadius: "var(--radius-round)" }}
                >
                  <Palette className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
                  <div className="flex gap-1">
                    {decor.toneColors.map((color, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-white"
                        style={{ backgroundColor: color, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="font-display text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                  style={{ fontSize: "17px", fontWeight: 600 }}
                >
                  {decor.title}
                </h3>

                <p
                  className="font-body text-[var(--text-secondary)] mb-4 line-clamp-2"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {decor.subtitle}
                </p>

                {/* CTA */}
                <div
                  className="inline-flex items-center gap-2 text-[var(--primary)]"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                >
                  <span className="font-body">Xem ý tưởng</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// GIFT GUIDE SECTION - "Gợi Ý Quà Theo Người Nhận"
// ================================================================

function GiftGuideSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Chọn quà dễ dàng
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Gợi Ý Quà Tặng Theo Người Nhận
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Không biết chọn gì? Hãy để chúng tôi gợi ý mẫu phù hợp nhất.
          </motion.p>
        </motion.div>

        {/* Gift Guide Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {giftGuides.map((guide, index) => {
            const IconComponent = guide.icon
            return (
              <motion.div
                key={index}
                variants={staggerItemScale}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: premiumEase } }}
              >
                <Link
                  href={guide.href}
                  className="group block p-6 bg-[var(--background-muted)] hover:bg-white border border-transparent hover:border-[var(--primary)]/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(217,124,138,0.12)]"
                  style={{
                    borderRadius: "var(--radius-large)",
                  }}
                >
                  {/* Icon - Premium Pastel Circle */}
                  <motion.div
                    className="w-14 h-14 mb-4 flex items-center justify-center bg-[var(--secondary)] border border-[var(--border-soft)] rounded-full transition-all duration-300 group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/20"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2, ease: premiumEase }}
                  >
                    <IconComponent
                      className="w-6 h-6 text-[var(--primary-dark)]"
                      strokeWidth={1.75}
                    />
                  </motion.div>

                  {/* Title */}
                  <h4
                    className="font-display text-[var(--text-primary)] mb-2 transition-colors duration-300 group-hover:text-[var(--primary-dark)]"
                    style={{ fontSize: "17px", fontWeight: 600 }}
                  >
                    {guide.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="font-body text-[var(--text-secondary)] mb-4"
                    style={{ fontSize: "13px", lineHeight: 1.6 }}
                  >
                    {guide.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="inline-flex items-center gap-2 text-[var(--primary)]"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span className="font-body">Xem gợi ý</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// CATEGORIES SECTION - "Hoa Theo Dịp"
// ================================================================

function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Danh mục
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Hoa Theo Dịp
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Tìm mẫu hoa phù hợp cho từng khoảnh khắc quan trọng trong cuộc sống.
          </motion.p>
        </motion.div>

        {/* Categories Grid - Bento Style */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={cn(index === 0 && "lg:col-span-2 lg:row-span-2")}
              variants={staggerItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className={cn("relative overflow-hidden", index === 0 ? "aspect-square" : "aspect-[4/3]")}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="font-display text-white mb-1"
                      style={{ fontSize: index === 0 ? "24px" : "18px", fontWeight: 600 }}
                    >
                      {category.name}
                    </h3>
                    <p
                      className="font-body text-white/80"
                      style={{ fontSize: "13px" }}
                    >
                      {category.count}+ mẫu hoa
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// USP SECTION
// ================================================================

function UspSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainerFast}
        >
          {uspItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={scaleInUp}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mb-4 flex items-center justify-center"
                  style={{
                    borderRadius: "var(--radius-medium)",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                  }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.25, ease: premiumEase }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h4
                  className="font-display text-[var(--text-primary)] mb-2"
                  style={{ fontSize: "17px", fontWeight: 600 }}
                >
                  {item.title}
                </h4>

                {/* Description */}
                <p
                  className="font-body text-[var(--text-secondary)]"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// REVIEWS SECTION
// ================================================================

function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-alt)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Khách hàng nói gì
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Khách Hàng Nói Gì?
          </motion.h2>
          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Những phản hồi chân thật từ những khách hàng đã tin tưởng dịch vụ của chúng tôi.
          </motion.p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6"
              style={{
                borderRadius: "var(--radius-large)",
                boxShadow: "var(--shadow-card)",
              }}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: premiumEase } }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="relative w-12 h-12 overflow-hidden"
                  style={{ borderRadius: "var(--radius-round)" }}
                >
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4
                    className="font-display text-[var(--text-primary)]"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    {review.name}
                  </h4>
                  <p
                    className="font-body text-[var(--text-muted)]"
                    style={{ fontSize: "12px" }}
                  >
                    {review.date}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-sm">🌸</span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <p
                className="font-body text-[var(--text-secondary)] mb-4"
                style={{ fontSize: "14px", lineHeight: 1.7 }}
              >
                "{review.content}"
              </p>

              {/* Product Image */}
              <div
                className="relative aspect-video overflow-hidden"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                <Image
                  src={review.productImage}
                  alt="Sản phẩm"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// BLOG SECTION
// ================================================================

function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Kiến thức hoa
          </motion.span>
          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Blog & Tips Hữu Ích
          </motion.h2>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href={post.href}
                className="group block overflow-hidden bg-white"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-display text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-body font-medium hover:gap-3 transition-all duration-300"
            style={{ fontSize: "15px" }}
          >
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// QUICK ORDER SECTION
// ================================================================

function QuickOrderSection() {
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

// ================================================================
// FOOTER SECTION
// ================================================================

function FooterSection() {
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
                <span className="text-xl font-display font-semibold text-white">
                  Hoa Tươi
                </span>
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

// ================================================================
// STICKY CONTACT
// ================================================================

function StickyContact() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5 text-[var(--text-primary)] rotate-90" />
      </button>

      {/* Phone */}
      <a
        href={CONTACT.phoneLink}
        className="w-12 h-12 flex items-center justify-center bg-[var(--primary)] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <Phone className="w-5 h-5 text-white" strokeWidth={1.5} />
      </a>

      {/* Zalo */}
      <a
        href={CONTACT.zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-[#0068FF] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <span className="text-white font-bold text-sm">Z</span>
      </a>
    </div>
  )
}

// ================================================================
// PREMIUM BACKGROUND ANIMATIONS
// ================================================================

// Layer 1: Soft Gradient Motion - Cloud Drift Effect
function SoftGradientMotion() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Gradient Blob 1 */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #F6DCE8 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          left: "-10%",
          animation: "gradientDrift1 30s ease-in-out infinite",
        }}
      />
      {/* Gradient Blob 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #FDF1E8 0%, transparent 70%)",
          filter: "blur(70px)",
          top: "30%",
          right: "-15%",
          animation: "gradientDrift2 35s ease-in-out infinite",
        }}
      />
      {/* Gradient Blob 3 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #F7D88A 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "10%",
          left: "20%",
          animation: "gradientDrift3 40s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes gradientDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 30px) scale(1.05); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes gradientDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.1); }
        }
        @keyframes gradientDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          75% { transform: translate(-20px, 30px) scale(0.95); }
        }
      `}</style>
    </div>
  )
}

// Layer 2: Premium Floating Petals with Canvas
function PremiumFloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let isActive = true

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Petal colors - pastel palette
    const petalColors = [
      "rgba(231, 166, 177, 0.12)", // #E7A6B1
      "rgba(242, 193, 206, 0.10)", // #F2C1CE
      "rgba(247, 216, 138, 0.08)", // #F7D88A
      "rgba(217, 124, 138, 0.10)", // #D97C8A
    ]

    // Create petals
    interface Petal {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      rotation: number
      rotationSpeed: number
      color: string
      swayAmplitude: number
      swaySpeed: number
      phase: number
    }

    const petals: Petal[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 15 + Math.random() * 20,
      speedY: 0.3 + Math.random() * 0.5,
      speedX: 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayAmplitude: 30 + Math.random() * 40,
      swaySpeed: 0.01 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
    }))

    // Draw petal shape
    const drawPetal = (petal: Petal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.rotation)
      ctx.globalAlpha = 1

      // Petal shape - heart-like
      ctx.beginPath()
      ctx.moveTo(0, -petal.size / 2)
      ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 2,
        petal.size / 2, petal.size / 4,
        0, petal.size / 2
      )
      ctx.bezierCurveTo(
        -petal.size / 2, petal.size / 4,
        -petal.size / 2, -petal.size / 2,
        0, -petal.size / 2
      )
      ctx.closePath()

      ctx.fillStyle = petal.color
      ctx.fill()

      // Add soft blur effect
      ctx.shadowColor = petal.color
      ctx.shadowBlur = 8
      ctx.fill()

      ctx.restore()
    }

    // Animation loop
    let time = 0
    const animate = () => {
      if (!isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      petals.forEach((petal) => {
        // Sway movement
        petal.speedX = Math.sin(time * petal.swaySpeed + petal.phase) * petal.swayAmplitude * 0.01
        petal.x += petal.speedX
        petal.y += petal.speedY
        petal.rotation += petal.rotationSpeed

        // Reset when off screen
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size * 2
          petal.x = Math.random() * canvas.width
        }

        drawPetal(petal)
      })

      animationId = requestAnimationFrame(animate)
    }

    // Visibility change handler - pause when tab not active
    const handleVisibility = () => {
      isActive = !document.hidden
      if (isActive) animate()
    }
    document.addEventListener("visibilitychange", handleVisibility)

    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.8 }}
    />
  )
}

// Layer 3: Soft Light Leaks
function SoftLightLeaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {/* Light Leak 1 */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #F7D88A 0%, transparent 60%)",
          filter: "blur(40px)",
          top: "20%",
          right: "10%",
          animation: "lightLeak1 50s ease-in-out infinite",
        }}
      />
      {/* Light Leak 2 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #E8A4AF 0%, transparent 60%)",
          filter: "blur(50px)",
          bottom: "30%",
          left: "5%",
          animation: "lightLeak2 60s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes lightLeak1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.10; }
          50% { transform: translate(-20px, 30px); opacity: 0.12; }
        }
        @keyframes lightLeak2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.08; }
          50% { transform: translate(30px, -20px); opacity: 0.10; }
        }
      `}</style>
    </div>
  )
}

// Particle Glow Effect for Best Seller Section
function ParticleGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let isActive = true

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener("resize", resize)

    // Particles
    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      targetAlpha: number
    }

    const particles: Particle[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? "#FFFFFF" : "#F7D88A",
      alpha: 0.1 + Math.random() * 0.1,
      targetAlpha: 0.1 + Math.random() * 0.15,
    }))

    const animate = () => {
      if (!isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Twinkle effect
        p.alpha += (p.targetAlpha - p.alpha) * 0.02
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = 0.08 + Math.random() * 0.12
        }

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(animate)
    }

    const handleVisibility = () => {
      isActive = !document.hidden
      if (isActive) animate()
    }
    document.addEventListener("visibilitychange", handleVisibility)

    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// Soft Spotlight Motion for Story Section
function SoftSpotlight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.16]"
        style={{
          background: "radial-gradient(circle, #F6DCE8 0%, transparent 60%)",
          filter: "blur(60px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "spotlightPulse 8s ease-in-out infinite",
          mixBlendMode: "soft-light",
        }}
      />

      <style jsx>{`
        @keyframes spotlightPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.16; }
          50% { transform: translate(-45%, -55%) scale(1.1); opacity: 0.20; }
        }
      `}</style>
    </div>
  )
}

// Gradient Drift for Decor & Gift Sections
function GradientDrift({ variant = "decor" }: { variant?: "decor" | "gift" }) {
  const colors = variant === "decor"
    ? { c1: "#F6DCE8", c2: "#E8A4AF" }
    : { c1: "#FDF1E8", c2: "#F7D88A" }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-full h-full opacity-[0.12]"
        style={{
          background: `linear-gradient(135deg, ${colors.c1} 0%, transparent 50%, ${colors.c2} 100%)`,
          filter: "blur(80px)",
          animation: "driftGradient 80s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[60%] h-[60%] rounded-full opacity-[0.08]"
        style={{
          background: `radial-gradient(circle, ${colors.c2} 0%, transparent 70%)`,
          filter: "blur(60px)",
          bottom: "-10%",
          right: "-10%",
          animation: "driftGradient2 100s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes driftGradient {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -10px) rotate(2deg); }
        }
        @keyframes driftGradient2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

// Local Confetti Effect for Form Submit
function useConfetti() {
  const [isActive, setIsActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const triggerConfetti = () => {
    setIsActive(true)
    setTimeout(() => setIsActive(false), 1500)
  }

  const ConfettiCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      if (!isActive) return

      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Confetti colors - pastel palette
      const colors = ["#D97C8A", "#E8A4AF", "#F7D88A", "#F2C1CE", "#C56A79"]

      interface Confetti {
        x: number
        y: number
        size: number
        speedX: number
        speedY: number
        rotation: number
        rotationSpeed: number
        color: string
        gravity: number
      }

      const confettis: Confetti[] = Array.from({ length: 30 }, () => ({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2,
        size: 6 + Math.random() * 6,
        speedX: (Math.random() - 0.5) * 8,
        speedY: -6 - Math.random() * 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        gravity: 0.15,
      }))

      let animationId: number
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        if (elapsed > 1400) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          return
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const fadeOut = Math.max(0, 1 - elapsed / 1400)

        confettis.forEach((c) => {
          c.x += c.speedX
          c.y += c.speedY
          c.speedY += c.gravity
          c.speedX *= 0.99
          c.rotation += c.rotationSpeed

          ctx.save()
          ctx.translate(c.x, c.y)
          ctx.rotate(c.rotation)
          ctx.globalAlpha = fadeOut
          ctx.fillStyle = c.color
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size / 2)
          ctx.restore()
        })

        animationId = requestAnimationFrame(animate)
      }

      animate()

      return () => cancelAnimationFrame(animationId)
    }, [isActive])

    if (!isActive) return null

    return (
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
      />
    )
  }

  return { containerRef, triggerConfetti, ConfettiCanvas }
}
