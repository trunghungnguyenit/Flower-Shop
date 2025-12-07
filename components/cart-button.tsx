"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"
import { CartSheet } from "@/components/cart-sheet"

export function CartButton() {
  const { getTotalItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(true)}
        aria-label={`Giỏ hàng (${totalItems} sản phẩm)`}
      >
        <ShoppingCart className="h-4 w-4" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-md border-2 border-background z-10">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </Button>
      {isOpen && <CartSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  )
}
