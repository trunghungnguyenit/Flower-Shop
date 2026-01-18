"use client"

import { useState } from "react"
import { MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductOrderForm from "@/components/products/product-order-form"
import { CONTACT } from "@/lib/constants"
import { Product } from "@/api/api.type"

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [showOrderForm, setShowOrderForm] = useState(false)

  return (
    <div className="space-y-6">
      {/* Order Form or Order Button */}
      {showOrderForm ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Đặt hoa ngay
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowOrderForm(false)}
            >
              Đóng
            </Button>
          </div>
          <ProductOrderForm 
            product={product} 
            onClose={() => setShowOrderForm(false)}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {/* Action Buttons */}
          {product.price > 0 ? (
            <Button
              onClick={() => setShowOrderForm(true)}
              className="w-full h-14 text-lg font-semibold bg-[var(--primary)] hover:bg-[var(--primary)] text-white"
              size="lg"
            >
              🌺 Đặt Hoa Ngay
            </Button>
          ) : (
            <Button
              asChild
              className="w-full h-14 text-lg font-semibold bg-[var(--primary)] hover:bg-[var(--primary)] text-white"
              size="lg"
            >
              <a href={CONTACT.zaloLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
                Liên Hệ
              </a>
            </Button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="lg" asChild>
              <a href={CONTACT.zaloLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
                Chat Zalo
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href={CONTACT.phoneLink}>
                <Phone className="w-5 h-5 mr-2" strokeWidth={1.5} />
                Gọi ngay: 0901 333 434
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}