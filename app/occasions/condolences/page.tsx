"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Heart,
  Flower,
  Users,
  Clock,
  ChevronRight,
  Phone,
  MessageCircle,
  Check,
  ArrowRight,
  Shield,
  ShoppingCart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"
import { useCart } from "@/lib/cart-context"
import { convertApiProductToLibProduct } from "@/lib/product-adapter"

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
// MAIN PAGE COMPONENT
// ================================================================

export default function CondolenceFlowersPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()
  const [addingStates, setAddingStates] = useState<Record<string, boolean>>({})

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

  useEffect(() => {
    const occasionCondolences = async () => {
      try {
        const res = await FirebaseApi.getProduct()

        if (res.ok && Array.isArray(res.data)) {
          const filteredProducts = res.data.filter(
            (item: Product) =>
              Array.isArray(item.occasionIds) &&
              item.occasionIds.includes("chia-buon")
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

    occasionCondolences()
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
            <span className="text-[var(--text-primary)] font-medium">Chia buồn</span>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </div>
                <span className="font-body text-gray-600 tracking-[0.25em] uppercase text-sm font-medium">
                  Chia buồn chân thành
                </span>
              </div>

              <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
                Hoa Chia Buồn
                <br />
                <span className="text-gray-600">Tưởng Nhớ Yêu Thương</span>
              </h1>

              <p className="font-body text-[var(--text-secondary)] mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
                Gửi lời chia buồn chân thành và tưởng nhớ người đã khuất với những vòng hoa và lẵng hoa trang nghiêm, ý nghĩa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#hoa-chia-buon"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                >
                  Xem hoa chia buồn
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white font-body font-medium transition-all duration-300"
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
                  src="condolence-hero.jpg"
                  alt="Hoa chia buồn"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                🕊️
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl shadow-lg">
                🤍
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hoa-chia-buon" className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-gray-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Dịch vụ hoa chia buồn
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Các Loại Hoa Chia Buồn
            </h2>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Chúng tôi cung cấp đầy đủ các loại hoa chia buồn phù hợp với từng hoàn cảnh và truyền thống.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Flower,
                title: "Vòng Hoa Chia Buồn",
                description: "Vòng hoa trang nghiêm cho lễ tang",
                color: "gray"
              },
              {
                icon: Heart,
                title: "Lẵng Hoa Chia Buồn",
                description: "Lẵng hoa thể hiện lòng thương tiếc",
                color: "slate"
              },
              {
                icon: Users,
                title: "Hoa Để Bàn Thờ",
                description: "Hoa tươi trang trí bàn thờ gia tiên",
                color: "zinc"
              },
              {
                icon: Shield,
                title: "Hoa Tưởng Niệm",
                description: "Hoa dành cho lễ tưởng niệm, cúng giỗ",
                color: "neutral"
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
                  service.color === "gray" && "bg-gray-100",
                  service.color === "slate" && "bg-slate-100",
                  service.color === "zinc" && "bg-zinc-100",
                  service.color === "neutral" && "bg-neutral-100"
                )}>
                  <service.icon className={cn(
                    "w-6 h-6",
                    service.color === "gray" && "text-gray-600",
                    service.color === "slate" && "text-slate-600",
                    service.color === "zinc" && "text-zinc-600",
                    service.color === "neutral" && "text-neutral-600"
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
            <span className="inline-block font-body text-gray-600 tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Hoa chia buồn phổ biến
            </span>
            <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
              Loại Hoa Chia Buồn Được Yêu Thích
            </h2>
          </motion.div>

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
          )}

          {/* Empty */}
          {!loading && products.length === 0 && (
            <p className="text-center text-gray-500">
              Chưa có sản phẩm cho dịp chia buồn
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
                </Link>

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
                    <span className="font-semibold text-gray-600">
                      {product.price.toLocaleString("vi-VN")}đ
                    </span>

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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes Section */}
      <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
                Lưu Ý Quan Trọng
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-4" style={{ fontSize: "20px" }}>
                  Thời Gian Giao Hàng
                </h3>
                <ul className="space-y-3 font-body text-[var(--text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Giao hàng 24/7 trong trường hợp khẩn cấp
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Cam kết giao đúng giờ theo yêu cầu
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Hỗ trợ giao hàng tận nơi trong khu vực
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-4" style={{ fontSize: "20px" }}>
                  Dịch Vụ Hỗ Trợ
                </h3>
                <ul className="space-y-3 font-body text-[var(--text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Tư vấn miễn phí về loại hoa phù hợp
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Thiết kế theo yêu cầu riêng
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    Hỗ trợ viết băng rôn, thiệp chia buồn
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-700 to-gray-800">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Liên Hệ Đặt Hoa Chia Buồn
            </h2>

            <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Chúng tôi hiểu được sự khó khăn trong những lúc này. Liên hệ ngay để được hỗ trợ tận tình và chu đáo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-body font-medium transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white font-body font-medium transition-all duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Zalo
              </a>
            </div>

            <p className="font-body text-[var(--text-muted)] text-sm mt-6">
              🤍 Chúng tôi luôn sẵn sàng hỗ trợ bạn trong những lúc khó khăn
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  )
}