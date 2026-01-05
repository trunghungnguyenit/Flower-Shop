"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Phone, MessageCircle, Truck, ChevronLeft, ShoppingCart, Check } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { useOrderRedirect } from "@/lib/order-utils"
import type { Product } from "@/lib/products"

const additionalServices = [
  { id: "card", name: "Thiệp chúc mừng", price: "20.000đ" },
  { id: "premium-wrap", name: "Giấy gói cao cấp", price: "50.000đ" },
  { id: "express", name: "Giao hàng siêu tốc (1h)", price: "30.000đ" },
]

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useOrderRedirect()

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId],
    )
  }

  const handleAddToCart = () => {
    const serviceNames = selectedServices.map(
      (id) => additionalServices.find((s) => s.id === id)?.name || ""
    )
    addToCart(product, quantity, serviceNames, note)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="pt-[73px]">
      {/* Breadcrumb */}
      <div className="bg-secondary/30 py-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link
            href="/collection"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Quay lại bộ sưu tập
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg ${
                      selectedImage === index ? "ring-2 ring-primary" : "ring-1 ring-border"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">{product.name}</h1>
              <p className="text-2xl font-bold text-primary mb-6">{product.price}</p>
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

              {/* Quantity */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 block">
                  Số lượng
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-lg font-medium text-foreground">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Additional Services */}
              <div className="mb-8">
                <Label className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 block">
                  Dịch vụ thêm
                </Label>
                <div className="space-y-3">
                  {additionalServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <Label htmlFor={service.id} className="text-foreground cursor-pointer">
                          {service.name}
                        </Label>
                      </div>
                      <span className="text-muted-foreground text-sm">+ {service.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="mb-6">
                <Label className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3 block">
                  Ghi chú đặc biệt
                </Label>
                <Textarea
                  placeholder="VD: Giao trước 10h sáng, viết thiệp 'Chúc mừng sinh nhật'..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Freeship Info */}
              <div className="bg-accent/20 rounded-lg p-4 mb-8">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-accent-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Freeship khu vực gần</p>
                    <p className="text-sm text-muted-foreground">Giao nhanh trong ngày tại Đà Nẵng & Quảng Nam</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Đã thêm vào giỏ hàng
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Thêm vào giỏ hàng
                    </>
                  )}
                </Button>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href="tel:0901234567">
                      <Phone className="h-4 w-4 mr-2" />
                      Gọi: 090 123 4567
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1 border-primary text-primary hover:bg-primary/10"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat Zalo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Sản phẩm tương tự</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image} slug={p.slug} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
