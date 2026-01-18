"use client"

import { motion } from "framer-motion"
import { ProductCard } from "@/components/products/product-card"
import { 
  staggerContainer, 
  staggerItem 
} from "@/components/animations/framer-variants"
import { Product } from "@/api/api.type"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      <motion.div variants={staggerItem} className="text-center">
        <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[var(--text-primary)] mb-4">
          Sản phẩm liên quan
        </h2>
        <p className="text-[var(--text-primary)] max-w-2xl mx-auto">
          Khám phá thêm những sản phẩm tương tự trong cùng danh mục
        </p>
      </motion.div>

      <motion.div 
        variants={staggerItem}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={`${product.price.toLocaleString("vi-VN")}đ`}
            image={product.images?.[0] || "/placeholder.svg?height=400&width=400"}
            slug={product.slug}
          />
        ))}
      </motion.div>
    </motion.section>
  )
}