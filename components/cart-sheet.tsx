"use client"

import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatImageUrl, getFirstImage } from "@/api/firebase"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !mounted) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const content = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background z-50 shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Giỏ Hàng</h2>
            <span className="text-sm text-muted-foreground">({items.length})</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">Giỏ hàng trống</p>
              <p className="text-sm text-muted-foreground mb-4">
                Thêm sản phẩm vào giỏ hàng để tiếp tục
              </p>
              <Button onClick={onClose} variant="outline">
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const price = typeof item.product.Gia === 'number' ? item.product.Gia : 0
                const itemTotal = price * item.quantity

                return (
                  <div key={item.product.id} className="bg-card rounded-lg p-3 border">
                    <div className="flex gap-3">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={formatImageUrl(getFirstImage(item.product.image))}
                          alt={item.product.TenHoa}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.product.TenHoa}
                        </h3>
                        <p className="text-primary font-semibold text-sm mb-2">
                          {formatPrice(itemTotal)}
                        </p>

                        {/* Additional Services */}
                        {item.additionalServices.length > 0 && (
                          <div className="text-xs text-muted-foreground mb-2">
                            + {item.additionalServices.join(", ")}
                          </div>
                        )}

                        {/* Note */}
                        {item.note && (
                          <div className="text-xs text-muted-foreground italic mb-2">
                            Ghi chú: {item.note}
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-7 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Clear Cart */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:text-destructive"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Tổng cộng:</span>
              <span className="text-primary">{formatPrice(getTotalPrice())}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90" size="lg" asChild>
                <Link href="/gio-hang">
                  Xem giỏ hàng & Đặt hàng
                </Link>
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )

  return createPortal(content, document.body)
}
