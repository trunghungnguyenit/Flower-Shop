"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import {
  Heart,
  Star,
  ShoppingCart,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Phone,
  MessageCircle,
  Menu,
  X,
  Search,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { useCart } from "@/lib/cart-context"
import { convertApiProductToLibProduct } from "@/lib/product-adapter"
import { FooterSection } from "@/components/footer"
import { HeaderSection } from "@/components/header"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"
import { useEffect } from "react"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

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
// PRODUCT CARD COMPONENT
// ================================================================

function ProductCard({
  product,
  index,
  onConfetti,
}: {
  product: Product
  index: number
  onConfetti: (e: React.MouseEvent) => void
}) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)

    // Convert API product to lib product format for cart
    const cartProduct = convertApiProductToLibProduct(product)
    addToCart(cartProduct, 1, [], "")

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
              src={product.images?.[0] || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-body font-medium rounded-full"
              >
                {product.badge || "Hoa tươi"}
              </span>
            </div>
            {/* Wishlist */}
            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[var(--primary)] hover:text-white"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <Heart className="w-4 h-4" strokeWidth={1.5} />
            </button>
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
                  className={cn("w-3.5 h-3.5", i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                />
              ))}
              <span className="text-xs text-[var(--text-muted)] ml-1">({product.rating || 4.8})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              <span
                className="font-display text-[var(--primary)] font-semibold"
                style={{ fontSize: "17px" }}
              >
                {product.price.toLocaleString("vi-VN")}đ
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
// MAIN PAGE COMPONENT
// ================================================================

export default function CollectionPage() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })

  // API state
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getProduct()
        console.log("API TEST: ", res.data)
        
        if (res.ok && Array.isArray(res.data)) {
          // Filter only active products
          const activeProducts = res.data.filter((product: Product) => product.isActive)
          setProducts(activeProducts)
        } else {
          console.error("API error:", res)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.categoryIds?.includes(selectedCategory))

  const categories = [
    { id: "all", name: "Tất cả", count: products.length },
    { id: "bo-hoa", name: "Bó hoa", count: products.filter(p => p.categoryIds?.includes("bo-hoa")).length },
    { id: "lang-hoa", name: "Lẵng hoa", count: products.filter(p => p.categoryIds?.includes("lang-hoa")).length },
    { id: "hoa-cuoi", name: "Hoa cưới", count: products.filter(p => p.categoryIds?.includes("hoa-cuoi")).length },
    { id: "hoa-tet", name: "Hoa Tết", count: products.filter(p => p.categoryIds?.includes("hoa-tet")).length },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)] font-medium">Bộ sưu tập</span>
          </nav>

          {/* Hero Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <span className="font-body text-[var(--primary)] tracking-[0.25em] uppercase text-sm font-medium">
                Bộ sưu tập hoa tươi
              </span>
            </div>

            <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
              Bộ Sưu Tập
              <br />
              <span className="text-[var(--primary)]">Hoa Tươi Đẹp Nhất</span>
            </h1>

            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
              Khám phá bộ sưu tập hoa tươi đa dạng với nhiều mẫu mã đẹp mắt, phù hợp cho mọi dịp và không gian.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Products Section */}
      <section ref={ref} className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-full font-body font-medium transition-all duration-300",
                    selectedCategory === category.id
                      ? "bg-[var(--primary)] text-white"
                      : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                  )}
                  style={{ fontSize: "14px" }}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* View Mode & Search */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-300",
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  )}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-all duration-300",
                    viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="grid gap-6 lg:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-[var(--border-soft)]">
                  <div className="aspect-square bg-gray-200 animate-pulse" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
                      <div className="w-9 h-9 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className={cn(
                "grid gap-6 lg:gap-8",
                viewMode === "grid" 
                  ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                  : "grid-cols-1 md:grid-cols-2"
              )}>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                    onConfetti={handleConfetti} 
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "20px" }}>
                    Không tìm thấy sản phẩm
                  </h3>
                  <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "16px" }}>
                    Thử chọn danh mục khác hoặc liên hệ với chúng tôi để được tư vấn.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-all duration-300 hover:scale-105"
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

      {/* Confetti */}
      <Confetti active={confettiState.active} position={confettiState.position} />
    
    {/* Footer */}
          <FooterSection />
    </main>
  )
}