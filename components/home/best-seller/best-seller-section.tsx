"use client"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ShoppingCart, MessageCircle } from "lucide-react"
import { Product } from "@/api/api.type"
import { formatImageUrl } from "@/api/firebase"
import { CONTACT } from "@/lib/constants"
import { staggerContainer, staggerItem, staggerItemScale, premiumEase } from "@/components/animations/framer-variants"
import { ParticleGlow } from "@/components/animations/background-effects"
import { BestSellerSkeleton } from "./best-seller-skeleton"

// ================================================================
// BEST SELLER SECTION
// ================================================================


interface BestSellerSectionProps {
  products: Product[]
  loading: boolean
}

export function BestSellerSection({ products, loading }: BestSellerSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const router = useRouter()

  const bestSellerProducts = products
    .filter(product => product.isActive)
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5)

  const handleQuickOrder = (e: React.MouseEvent, productSlug: string) => {
    e.preventDefault()
    e.stopPropagation()
    router.push(`/product/${productSlug}`)
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-16 lg:py-20"
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
            className="inline-block font-body text-[var(--text-primary)] tracking-[0.25em] uppercase mb-4"
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
        {loading ? (
          <BestSellerSkeleton />
        ) : (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {bestSellerProducts.map((product) => (
              <motion.div
                key={product.id}
                className="group h-full product-card-equal"
                variants={staggerItemScale}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
              >
                <Link href={`/product/${product.slug}`} className="block h-full product-card-equal">
                  {/* Image - Fixed aspect ratio */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden mb-4 flex-shrink-0"
                    style={{ borderRadius: "var(--radius-medium)" }}
                  >
                    <Image
                      src={formatImageUrl(product.images[0])}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badge */}
                    {product.badge && (
                      <span
                        className="absolute top-3 left-3 px-3 py-1 text-xs font-body font-medium bg-transparent text-white rounded-full"
                      >
                        {product.badge}
                      </span>
                    )}

                    {/* Quick Order Button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={(e) => handleQuickOrder(e, product.slug)}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--text-primary)]/10 text-[var(--text-primary)] hover:bg-[var(--text-white)] hover:text-black transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Info - Flexible content area */}
                  <div className="product-info">
                    {/* Product Name - Fixed height with line clamp */}
                    <h3
                      className="font-display text-[var(--text-primary)] mb-1 line-clamp-2 group-hover:text-[var(--text-primary)] transition-colors duration-300 product-title"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {product.name}
                    </h3>

                    {/* Rating - Fixed height */}
                    <div className="flex items-center gap-1 mb-2 product-rating">
                      <span className="text-sm">🌸</span>
                      <span className="font-body text-[var(--text-secondary)]" style={{ fontSize: "13px" }}>
                        {product.rating || 4.8} ({product.sold || 0} đã bán)
                      </span>
                    </div>

                    {/* Price & Action - Push to bottom */}
                    <div className="product-price">
                      {product.price > 0 ? (
                        <span
                          className="font-display text-[var(--text-primary)]"
                          style={{ fontSize: "16px", fontWeight: 600 }}
                        >
                          {product.price.toLocaleString()}đ
                        </span>
                      ) : (
                        <span
                          className="font-body text-[var(--text-secondary)]"
                          style={{ fontSize: "14px", fontWeight: 500 }}
                        >
                        </span>
                      )}

                      {/* Contact button for zero price products */}
                      {product.price === 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.open(CONTACT.zaloLink, '_blank', 'noopener,noreferrer')
                          }}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-red)] text-[var(--text-white)] text-xs font-medium rounded-full hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex-shrink-0"
                        >
                          <MessageCircle className="w-3 h-3" strokeWidth={1.5} />
                          Liên hệ
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View All Button */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
        >
          <Link
            href="/collection"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--text-primary)] text-[var(--text-primary)] font-body font-medium hover:bg-[var(--text-primary)] hover:text-white transition-all duration-300"
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