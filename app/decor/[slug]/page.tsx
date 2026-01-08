"use client"

import { useRef, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Home,
  Sofa,
  Palette,
  Flower2,
  ChevronRight,
  ShoppingCart,
  Heart,
  Star,
  Send,
  Phone,
  MessageCircle,
  Check,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Clock,
  MapPin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getDecorIdeaBySlug, getAllDecorSlugs, sectionIcons } from "@/lib/decor-ideas"
import { products } from "@/lib/products"
import { CONTACT, SHOP_INFO } from "@/lib/constants"
import { useOrderRedirect } from "@/lib/order-utils"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: premiumEase } },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: premiumEase } },
}

const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: premiumEase } },
}

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: premiumEase } },
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
  const colors = ["#F5B5C8", "#D4A5E8", "#A8D5BA", "#F9E79F", "#AED6F1", "#F5CBA7"]

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
// HEADER SECTION (Simplified for subpage)
// ================================================================

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/occasions" },
  { name: "Bộ sưu tập", href: "/collection" },
  { name: "Liên hệ", href: "/#lien-he" },
]

function HeaderSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-3">
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--primary)]/15">
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌸</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-semibold tracking-wide text-[var(--text-primary)]">
              Hoa Tươi
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase font-body text-[var(--text-secondary)]">
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
              className="relative text-sm font-body font-medium transition-colors duration-300 py-2 group text-[var(--text-primary)] hover:text-[var(--primary)]"
            >
              {item.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-[var(--primary)]" />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={CONTACT.phoneLink}
            className="flex items-center gap-2 text-sm font-body font-medium transition-colors duration-300 text-[var(--text-primary)] hover:text-[var(--primary)]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <span>{CONTACT.phoneDisplay}</span>
          </a>

          <a
            href={CONTACT.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all duration-300 hover:scale-105 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
            style={{ borderRadius: "var(--radius-round)" }}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Zalo
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            className="p-2 transition-colors duration-300 text-[var(--text-primary)]"
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
// BREADCRUMB SECTION
// ================================================================

function BreadcrumbSection({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.div
      ref={ref}
      className="pt-24 pb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: premiumEase }}
    >
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <nav className="flex items-center gap-2 text-sm font-body">
          <Link
            href="/"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          <Link
            href="/#trang-tri"
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            Trang trí nhà
          </Link>
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
          <span className="text-[var(--text-primary)] font-medium">{title}</span>
        </nav>
      </div>
    </motion.div>
  )
}

// ================================================================
// HERO SECTION
// ================================================================

function HeroSection({ title, subtitle, heroImage }: { title: string; subtitle: string; heroImage: string }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        {/* Hero Image */}
        <motion.div
          className="relative aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.98 }}
          transition={{ duration: 0.8, ease: premiumEase }}
        >
          <Image
            src={heroImage || "/placeholder.svg?height=600&width=1200"}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Content overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <motion.div
              initial="initial"
              animate={isInView ? "animate" : "initial"}
              variants={staggerContainer}
            >
              <motion.span
                variants={staggerItem}
                className="inline-block font-body text-white/80 tracking-[0.25em] uppercase mb-3"
                style={{ fontSize: "12px", fontWeight: 500 }}
              >
                Ý tưởng trang trí
              </motion.span>
              <motion.h1
                variants={staggerItem}
                className="font-display text-white mb-4"
                style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}
              >
                {title}
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="font-body text-white/90 max-w-xl"
                style={{ fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.6 }}
              >
                {subtitle}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// CONTENT BLOCK SECTION
// ================================================================

function ContentBlockSection({
  icon: Icon,
  title,
  points,
  imageUrl,
  imageAlt,
  reverse = false,
  index,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  points: string[]
  imageUrl: string
  imageAlt: string
  reverse?: boolean
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "grid lg:grid-cols-2 gap-8 lg:gap-16 items-center py-12 lg:py-16",
        index > 0 && "border-t border-[var(--border-soft)]"
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: 0.1, ease: premiumEase }}
    >
      {/* Text Content */}
      <motion.div
        className={cn(reverse && "lg:order-2")}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={reverse ? slideInRight : slideInLeft}
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
          </motion.div>
          <h2
            className="font-display text-[var(--text-primary)]"
            style={{ fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 600 }}
          >
            {title}
          </h2>
        </div>

        <ul className="space-y-4">
          {points.map((point, idx) => (
            <motion.li
              key={idx}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: reverse ? 20 : -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 20 : -20 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: premiumEase }}
            >
              <div className="w-6 h-6 rounded-full bg-[var(--primary)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[var(--primary)]" strokeWidth={2} />
              </div>
              <span
                className="font-body text-[var(--text-secondary)]"
                style={{ fontSize: "15px", lineHeight: 1.7 }}
              >
                {point}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image */}
      <motion.div
        className={cn("relative aspect-[4/3] rounded-2xl overflow-hidden", reverse && "lg:order-1")}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
      >
        <Image
          src={imageUrl || "/placeholder.svg?height=400&width=500"}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  )
}

// ================================================================
// PRODUCT CARD
// ================================================================

function ProductCard({
  product,
  index,
  onConfetti,
}: {
  product: (typeof products)[0]
  index: number
  onConfetti: (e: React.MouseEvent) => void
}) {
  const { addToCart } = useOrderRedirect()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)

    // Add to cart
    addToCart(product, 1, [], "")

    // Trigger confetti
    onConfetti(e)

    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: premiumEase }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group"
    >
      <Link href={`/product/${product.slug}`}>
        <div
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          style={{ border: "1px solid var(--border-soft)" }}
        >
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-body font-medium rounded-full"
              >
                Phù hợp
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3
              className="font-body text-[var(--text-primary)] font-medium mb-2 line-clamp-2 min-h-[2.5rem]"
              style={{ fontSize: "15px" }}
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn("w-3.5 h-3.5", i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                />
              ))}
              <span className="text-xs text-[var(--text-muted)] ml-1">(4.8)</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <span
                className="font-display text-[var(--primary)] font-semibold"
                style={{ fontSize: "17px" }}
              >
                {product.price}
              </span>
              <motion.button
                onClick={handleAddToCart}
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                  isAdding
                    ? "bg-green-500 text-white"
                    : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                )}
                whileTap={{ scale: 0.9 }}
              >
                {isAdding ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ================================================================
// PRODUCT SUGGESTIONS SECTION
// ================================================================

function ProductSuggestionsSection({ productIds }: { productIds: string[] }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })

  const suggestedProducts = products.filter((p) => productIds.includes(p.id)).slice(0, 6)

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  return (
    <section
      ref={ref}
      className="bg-[var(--background-muted)]"
      style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            variants={staggerItem}
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            Gợi ý cho bạn
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 600 }}
          >
            Mẫu Hoa Phù Hợp Cho Không Gian Này
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="font-body text-[var(--text-secondary)] max-w-xl mx-auto"
            style={{ fontSize: "16px", lineHeight: 1.7 }}
          >
            Những mẫu hoa được lựa chọn kỹ lưỡng, phù hợp nhất với phong cách và không gian của bạn.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-7">
          {suggestedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} onConfetti={handleConfetti} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5, ease: premiumEase }}
        >
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 font-body text-[var(--primary)] font-medium hover:gap-3 transition-all duration-300"
            style={{ fontSize: "15px" }}
          >
            Xem tất cả bộ sưu tập
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Confetti */}
      <Confetti active={confettiState.active} position={confettiState.position} />
    </section>
  )
}

// ================================================================
// CTA SECTION
// ================================================================

function CTASection({ title, subtitle }: { title: string; subtitle: string }) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)

    // Trigger confetti
    const form = e.target as HTMLFormElement
    const rect = form.getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })

    setTimeout(() => {
      setConfettiState({ ...confettiState, active: false })
    }, 1000)

    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: "clamp(60px, 8vw, 100px) 0",
        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white blur-3xl" />
      </div>

      <div className="mx-auto max-w-[900px] px-4 lg:px-8 relative">
        <motion.div
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
              }}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Sparkles className="w-8 h-8 text-white" strokeWidth={1.5} />
            </motion.div>

            <motion.h2
              className="font-display text-[var(--text-primary)] mb-4"
              style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 600 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3, ease: premiumEase }}
            >
              {title}
            </motion.h2>

            <motion.p
              className="font-body text-[var(--text-secondary)] max-w-lg mx-auto"
              style={{ fontSize: "15px", lineHeight: 1.7 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4, ease: premiumEase }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5, ease: premiumEase }}
          >
            {/* Success Overlay */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-xl"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 mb-4 flex items-center justify-center bg-green-100 rounded-full"
                  >
                    <Check className="w-8 h-8 text-green-500" strokeWidth={2} />
                  </motion.div>
                  <h3 className="font-display text-[var(--text-primary)] text-xl font-semibold mb-2">
                    Gửi thành công!
                  </h3>
                  <p className="font-body text-[var(--text-secondary)] text-sm">
                    Chúng tôi sẽ liên hệ bạn trong 15 phút
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Họ tên *"
                  className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Số điện thoại *"
                  className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                  required
                />
              </div>
            </div>

            <textarea
              placeholder="Mô tả không gian của bạn (kích thước, phong cách nội thất, ngân sách...)"
              rows={3}
              className="w-full px-4 py-3 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 resize-none"
              style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-colors duration-300 disabled:opacity-70"
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang gửi...
                </>
              ) : (
                <>
                  Gửi yêu cầu tư vấn decor
                  <Send className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="font-body text-[var(--text-muted)] text-center text-xs">
              Hoặc gửi hình qua{" "}
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                Zalo
              </a>{" "}
              để được tư vấn nhanh hơn
            </p>
          </motion.form>
        </motion.div>
      </div>

      {/* Confetti */}
      <Confetti active={confettiState.active} position={confettiState.position} />
    </section>
  )
}

// ================================================================
// FOOTER SECTION
// ================================================================

function FooterSection() {
  return (
    <footer className="bg-[var(--text-primary)] text-white">
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
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

            <p className="font-body text-white/70 mb-6" style={{ fontSize: "14px", lineHeight: 1.7 }}>
              Mang vẻ đẹp của thiên nhiên vào cuộc sống. Hoa tươi mỗi ngày, giao hàng nhanh chóng.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href={CONTACT.facebook}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT.instagram}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT.zaloLink}
                className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <span className="text-sm font-bold">Z</span>
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Liên kết",
              links: [
                { name: "Về chúng tôi", href: "#" },
                { name: "Bộ sưu tập", href: "/collection" },
                { name: "Liên hệ", href: "/#lien-he" },
                { name: "Blog", href: "#" },
              ],
            },
            {
              title: "Dịch vụ",
              links: [
                { name: "Bó hoa tươi", href: "#" },
                { name: "Lẵng hoa", href: "#" },
                { name: "Hoa cưới", href: "/occasions/hoa-cuoi" },
                { name: "Hoa khai trương", href: "/occasions/hoa-khai-truong" },
              ],
            },
            {
              title: "Trang trí",
              links: [
                { name: "Hoa phòng khách", href: "/decor/hoa-cho-phong-khach" },
                { name: "Hoa bàn ăn", href: "/decor/hoa-ban-an" },
                { name: "Hoa tone pastel", href: "/decor/hoa-tone-pastel" },
                { name: "Hoa ban công", href: "/decor/hoa-ban-cong" },
              ],
            },
          ].map((column, index) => (
            <div key={index}>
              <h4 className="font-display text-white mb-5" style={{ fontSize: "16px", fontWeight: 600 }}>
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="font-body text-white/70 hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                      style={{ fontSize: "14px" }}
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display text-white mb-5" style={{ fontSize: "16px", fontWeight: 600 }}>
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-white/50 text-center md:text-left" style={{ fontSize: "13px" }}>
              © 2025 Hoa Tươi Đà Nẵng. Thiết kế với{" "}
              <span className="text-[var(--primary)]">♥</span> bởi đội ngũ yêu hoa.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function DecorIdeaPage() {
  const params = useParams()
  const slug = params.slug as string

  const decorIdea = getDecorIdeaBySlug(slug)

  if (!decorIdea) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-4">
            Không tìm thấy trang
          </h1>
          <Link href="/" className="text-[var(--primary)] hover:underline">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  const contentBlocks = [
    {
      icon: Home,
      title: decorIdea.whySection.title,
      points: decorIdea.whySection.points,
      imageUrl: "/decor/why-flowers.jpg",
      imageAlt: "Vì sao nên đặt hoa",
    },
    {
      icon: Sofa,
      title: decorIdea.positionSection.title,
      points: decorIdea.positionSection.points,
      imageUrl: "/decor/position-flowers.jpg",
      imageAlt: "Vị trí đặt hoa",
    },
    {
      icon: Palette,
      title: decorIdea.colorSection.title,
      points: decorIdea.colorSection.points,
      imageUrl: "/decor/color-flowers.jpg",
      imageAlt: "Tông màu hoa",
    },
    {
      icon: Flower2,
      title: decorIdea.flowerSection.title,
      points: decorIdea.flowerSection.points,
      imageUrl: "/decor/flower-types.jpg",
      imageAlt: "Loại hoa gợi ý",
    },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Breadcrumb */}
      <BreadcrumbSection title={decorIdea.title} />

      {/* Hero */}
      <HeroSection
        title={decorIdea.title}
        subtitle={decorIdea.subtitle}
        heroImage={decorIdea.heroImage}
      />

      {/* Content Blocks */}
      <section className="pb-8">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          {contentBlocks.map((block, index) => (
            <ContentBlockSection
              key={index}
              icon={block.icon}
              title={block.title}
              points={block.points}
              imageUrl={block.imageUrl}
              imageAlt={block.imageAlt}
              reverse={index % 2 === 1}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Product Suggestions */}
      <ProductSuggestionsSection productIds={decorIdea.suggestedProductIds} />

      {/* CTA */}
      <CTASection title={decorIdea.ctaTitle} subtitle={decorIdea.ctaSubtitle} />

      {/* Footer */}
      <FooterSection />
    </main>
  )
}

