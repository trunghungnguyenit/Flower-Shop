"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, ShoppingCart, MessageCircle, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { Product } from "@/api/api.type"

const premiumEase = [0.25, 0.1, 0.25, 1] as const

interface CollectionProductCardProps {
  product: Product
  index: number
  onConfetti: (e: React.MouseEvent) => void
}

export function CollectionProductCard({
  product,
  index,
  onConfetti,
}: CollectionProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)

    // Trigger confetti
    onConfetti(e)

    // Navigate to product page after a short delay
    setTimeout(() => {
      window.location.href = `/product/${product.slug}`
    }, 500)

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
                className="px-3 py-1 bg-[var(--text-white)] text-black text-xs font-body font-medium rounded-full"
              >
                {product.badge || "Hoa tươi"}
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
                  className={cn("w-3.5 h-3.5", i < Math.floor(product.rating || 4) ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                />
              ))}
              <span className="text-xs text-[var(--text-muted)] ml-1">({product.rating || 4.8})</span>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between">
              {product.price > 0 ? (
                <>
                  <span
                    className="font-display text-[var(--text-primary)] font-semibold"
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
                </>
              ) : (
                <>
                  <span
                    className="font-body text-[var(--text-secondary)] font-medium"
                    style={{ fontSize: "14px" }}
                  >
                  </span>
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(CONTACT.zaloLink, '_blank', 'noopener,noreferrer')
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary-red)] text-[var(--text-white)] text-xs font-medium rounded-full hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex-shrink-0"
                  >
                    <MessageCircle className="w-3 h-3" strokeWidth={1.5} />
                    Liên hệ
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}