"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { Product } from "@/api/api.type"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// OCCASION PRODUCTS COMPONENT
// ================================================================

interface OccasionProductsProps {
  tagline: string
  taglineColor: string
  title: string
  products: Product[]
  loading: boolean
  emptyMessage: string
}

export function OccasionProducts({ 
  tagline, 
  taglineColor, 
  title, 
  products, 
  loading, 
  emptyMessage 
}: OccasionProductsProps) {
  const [addingStates, setAddingStates] = useState<Record<string, boolean>>({})

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    setAddingStates(prev => ({ ...prev, [product.id]: true }))

    // Navigate to product page after a short delay
    setTimeout(() => {
      window.location.href = `/product/${product.slug}`
    }, 500)

    setTimeout(() => {
      setAddingStates(prev => ({ ...prev, [product.id]: false }))
    }, 1000)
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: premiumEase }}
        >
          <span className={`inline-block font-body ${taglineColor} tracking-[0.25em] uppercase mb-4 text-sm font-medium`}>
            {tagline}
          </span>
          <h2 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}>
            {title}
          </h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            {emptyMessage}
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
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-red)] text-[var(--text-white)] text-xs font-medium rounded-full hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex-shrink-0"
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
  )
}