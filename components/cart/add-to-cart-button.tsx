"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, Check, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/products"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  showIcon?: boolean
  children?: React.ReactNode
}

export function AddToCartButton({ 
  product, 
  variant = "default", 
  size = "md",
  className,
  showIcon = true,
  children 
}: AddToCartButtonProps) {
  const { addToCart, items } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  
  // Check if item is already in cart
  const isInCart = items.some(item => item.product.id === product.id)

  const handleAddToCart = () => {
    addToCart(product, 1, [], "")
    setIsAdded(true)
    
    // Reset the success state after animation
    setTimeout(() => setIsAdded(false), 2000)
  }

  const variants = {
    default: "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white",
    outline: "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    ghost: "text-[var(--primary)] hover:bg-[var(--primary)]/10"
  }

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  }

  return (
    <motion.button
      onClick={handleAddToCart}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-lg overflow-hidden",
        variants[variant],
        sizes[size],
        isAdded && "bg-green-500 hover:bg-green-600",
        className
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isAdded}
    >
      {/* Success overlay */}
      <motion.div
        className="absolute inset-0 bg-green-500"
        initial={{ x: "-100%" }}
        animate={{ x: isAdded ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        {showIcon && (
          <motion.div
            animate={{ 
              rotate: isAdded ? 360 : 0,
              scale: isAdded ? [1, 1.2, 1] : 1
            }}
            transition={{ duration: 0.5 }}
          >
            {isAdded ? (
              <Check className="w-4 h-4" strokeWidth={2} />
            ) : isInCart ? (
              <Plus className="w-4 h-4" strokeWidth={2} />
            ) : (
              <ShoppingCart className="w-4 h-4" strokeWidth={1.5} />
            )}
          </motion.div>
        )}
        
        <span>
          {children || (
            isAdded ? "Đã thêm!" : 
            isInCart ? "Thêm nữa" : 
            "Thêm vào giỏ"
          )}
        </span>
      </div>
    </motion.button>
  )
}