"use client"

import { ShoppingCart } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useCartSheet } from "@/contexts/cart-sheet-context"

interface CartButtonProps {
  className?: string
  variant?: "header" | "floating"
}

export function CartButton({ className, variant = "header" }: CartButtonProps) {
  const { getTotalItems } = useCart()
  const { openCart } = useCartSheet()
  const totalItems = getTotalItems()

  const buttonVariants = {
    header: "relative p-2.5 transition-colors duration-300",
    floating: "w-12 h-12 flex items-center justify-center bg-[var(--primary)] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
  }

  const iconVariants = {
    header: "h-5 w-5",
    floating: "w-5 h-5 text-white"
  }

  const badgeVariants = {
    header: "absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs rounded-full flex items-center justify-center",
    floating: "absolute -top-1 -right-1 w-5 h-5 bg-white text-[var(--primary)] text-xs rounded-full flex items-center justify-center font-medium"
  }

  return (
    <motion.button
      className={cn(buttonVariants[variant], className)}
      onClick={openCart}
      whileHover={{ scale: variant === "header" ? 1.05 : 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingCart className={iconVariants[variant]} strokeWidth={1.5} />
      {totalItems > 0 && (
        <motion.span
          className={badgeVariants[variant]}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {totalItems}
        </motion.span>
      )}
    </motion.button>
  )
}