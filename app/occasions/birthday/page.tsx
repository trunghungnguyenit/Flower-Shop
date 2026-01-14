"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  Gift,
  Heart,
  Cake,
  Star,
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT, SHOP_INFO } from "@/lib/constants"
import { useOrderRedirect } from "@/lib/order-utils"
import { convertApiProductToLibProduct } from "@/lib/product-adapter"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// CONFETTI COMPONENT
// ================================================================

function Confetti({ active, position }: { active: boolean; position: { x: number; y: number } }) {
  const colors = ["#FF69B4", "#FFD700", "#FF6347", "#98FB98", "#87CEEB", "#DDA0DD"]

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

export default function BirthdayFlowersPage() {
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })
  const { addToCart } = useOrderRedirect()
  const [addingStates, setAddingStates] = useState<Record<string, boolean>>({})

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    setAddingStates(prev => ({ ...prev, [product.id]: true }))

    // Convert API product to lib product format for cart
    const cartProduct = convertApiProductToLibProduct(product)
    addToCart(cartProduct, 1, [], "")

    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [product.id]: false }))
    }, 1000)
  }

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const occasionBirthday = async () => {
      try {
        const res = await FirebaseApi.getProduct()

        if (res.ok && Array.isArray(res.data)) {
          const filteredProducts = res.data.filter(
            (item: Product) =>
              Array.isArray(item.occasionIds) &&
              item.occasionIds.includes("sinh-nhat")
          )

          setProducts(filteredProducts)
        } else {
          console.error("API error:", res)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    occasionBirthday()
  }, [])

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
            <span className="text-[var(--text-primary)] font-medium">Sinh nhật</span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                  <Cake className="w-6 h-6 text-pink-600" strokeWidth={1.5} />
                </div>
                <span className="font-body text-pink-600 tracking-[0.25em] uppercase text-sm font-medium">
                  Sinh nhật đặc biệt
                </span>
              </div>

              <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
                Hoa Sinh Nhật
                <br />
                <span className="text-pink-600">Tặng Yêu Thương</span>
              </h1>

              <p className="font-body text-[var(--text-secondary)] mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
                Những bó hoa sinh nhật tươi đẹp, ý nghĩa để gửi gắm tình cảm và lời chúc tốt đẹp nhất đến người thân yêu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#hoa-sinh-nhat"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                >
                  Xem hoa sinh nhật
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-body font-medium transition-all duration-300"
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
                  src="/tang-sinh-nhat/logo-hoa-sinh-nhat.jpg"
                  alt="Hoa sinh nhật"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🎂
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-xl animate-pulse">
                🎈
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="hoa-sinh-nhat" className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-pink-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Ý nghĩa hoa sinh nhật
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Vì Sao Chọn Hoa Sinh Nhật?
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Hoa sinh nhật không chỉ là món quà mà còn là cách thể hiện tình cảm, sự quan tâm và những lời chúc tốt đẹp nhất.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: "Thể Hiện Tình Cảm",
                description: "Gửi gắm yêu thương và sự quan tâm đến người thân",
                color: "pink"
              },
              {
                icon: Gift,
                title: "Quà Tặng Ý Nghĩa",
                description: "Món quà tinh tế, phù hợp với mọi lứa tuổi",
                color: "purple"
              },
              {
                icon: Sparkles,
                title: "Tạo Kỷ Niệm Đẹp",
                description: "Làm cho ngày sinh nhật trở nên đặc biệt hơn",
                color: "yellow"
              },
              {
                icon: Star,
                title: "Chúc Phúc May Mắn",
                description: "Mang đến những điều tốt lành và hạnh phúc",
                color: "blue"
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
                  feature.color === "pink" && "bg-pink-100",
                  feature.color === "purple" && "bg-purple-100",
                  feature.color === "yellow" && "bg-yellow-100",
                  feature.color === "blue" && "bg-blue-100"
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6",
                    feature.color === "pink" && "text-pink-600",
                    feature.color === "purple" && "text-purple-600",
                    feature.color === "yellow" && "text-yellow-600",
                    feature.color === "blue" && "text-blue-600"
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
            <span className="inline-block font-body text-pink-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Hoa phổ biến
            </span>
            <h2
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}
            >
              Loại Hoa Sinh Nhật Được Yêu Thích
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
          )}

          {/* Empty */}
          {!loading && products.length === 0 && (
            <p className="text-center text-gray-500">
              Chưa có sản phẩm cho dịp sinh nhật
            </p>
          )}

          {/* Products */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                whileHover={{ y: -8 }}
              >
                <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>


                  <div className="p-6">
                    <h3
                      className="font-display text-[var(--text-primary)] font-semibold mb-2"
                      style={{ fontSize: "20px" }}
                    >
                      {product.name}
                    </h3>

                    <p
                      className="font-body text-[var(--text-secondary)] mb-4 line-clamp-2"
                      style={{ fontSize: "15px", lineHeight: 1.6 }}
                    >
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {product.price > 0 ? (
                        <span className="font-semibold text-[var(--text-primary)]">
                          {product.price.toLocaleString("vi-VN")}đ
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600"></span>
                      )}

                      {product.price > 0 ? (
                        <motion.button
                          onClick={(e) => handleAddToCart(e, product)}
                          className={cn(
                            "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300",
                            addingStates[product.id]
                              ? "bg-green-500 text-white"
                              : "bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
                          )}
                          whileTap={{ scale: 0.9 }}
                        >
                          {addingStates[product.id] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                          )}
                        </motion.button>
                      ) : (
                        <motion.button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.open(CONTACT.zaloLink, '_blank', 'noopener,noreferrer')
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--text-white)] text-xs font-medium rounded-full hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex-shrink-0"
                        >
                          Liên hệ
                        </motion.button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-pink-600 to-pink-700">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cake className="w-8 h-8 text-pink-600" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Đặt Hoa Sinh Nhật Ngay
            </h2>

            <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Liên hệ ngay để đặt những bó hoa sinh nhật đẹp nhất, giao hàng nhanh chóng trong khu vực Đà Nẵng - Quảng Nam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white font-body font-medium transition-all duration-300 hover:scale-105"
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-body font-medium transition-all duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Zalo
              </a>
            </div>
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