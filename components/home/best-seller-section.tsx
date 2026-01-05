"use client"

"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Heart, ShoppingCart } from "lucide-react"
import { Product } from "@/api/api.type"
import { formatImageUrl } from "@/api/firebase"
import { staggerContainer, staggerItem, staggerItemScale, premiumEase } from "@/components/animations/framer-variants"
import { ParticleGlow } from "@/components/animations/background-effects"
import { BestSellerSkeleton } from "./best-seller-skeleton"
import { cn } from "@/lib/utils"

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

  // Process products: filter active, sort by sold, limit to 5
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
                className="group"
                variants={staggerItemScale}
                whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
              >
                <Link href={`/product/${product.slug}`} className="block">
                  {/* Image */}
                  <div
                    className="relative aspect-[3/4] overflow-hidden mb-4"
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
                    onClick={(e: React.MouseEvent) => e.preventDefault()}
                  >
                    <Heart className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
                  </button>

                  {/* Quick Order Button */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => handleQuickOrder(e, product.slug)}
                      className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
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
                        {product.rating || 4.8} ({product.sold || 0} đã bán)
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