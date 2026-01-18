"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { premiumEase } from "@/components/animations/framer-variants"
import { Product } from "@/api/api.type"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: premiumEase }}
      className="space-y-6"
    >
      {/* Product Title & Rating */}
      <div>
        <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-3">
          {product.name}
        </h1>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={cn(
                  "w-5 h-5",
                  i < Math.floor(product.rating || 4) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300"
                )} 
                strokeWidth={1.5} 
              />
            ))}
            <span className="text-sm text-[var(--text-muted)] ml-2">
              ({product.rating || 4.9} • {product.sold || 127} đã bán)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {product.price > 0 ? (
            <>
              <span className="font-display text-3xl font-bold text-[var(--text-primary)]">
                {product.price.toLocaleString("vi-VN")}đ
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                {product.badge || "Còn hàng"}
              </span>
            </>
          ) : (
            <span className="font-display text-2xl font-bold text-[var(--text-secondary)]">
              Liên hệ để biết giá
            </span>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div className="prose prose-sm max-w-none">
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {product.description}
        </p>
      </div>
    </motion.div>
  )
}