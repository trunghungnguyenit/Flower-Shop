"use client"

import { useCartSheet } from "@/contexts/cart-sheet-context"
import { CartSheet } from "@/components/cart/cart-sheet"

export function GlobalCartSheet() {
  const { isOpen, closeCart } = useCartSheet()
  
  return <CartSheet isOpen={isOpen} onClose={closeCart} />
}