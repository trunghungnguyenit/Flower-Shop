"use client"

import React, { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Plus, 
  Minus,
  ShoppingCart,
  Truck,
  Shield,
  Clock,
  Gift,
  MessageCircle,
  Phone
} from "lucide-react"

import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/lib/cart-context"
import { useCartSheet } from "@/contexts/cart-sheet-context"
import { products, getProductBySlug } from "@/lib/products"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { 
  staggerContainer, 
  staggerItem, 
  fadeInUp, 
  premiumEase 
} from "@/components/animations/framer-variants"

// Additional services options
const additionalServices = [
  { id: "gift-wrap", name: "Gói quà cao cấp", price: 50000 },
  { id: "card", name: "Thiệp chúc mừng", price: 20000 },
  { id: "delivery-express", name: "Giao hàng nhanh (2h)", price: 100000 },
  { id: "setup", name: "Trang trí tại chỗ", price: 200000 },
]

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = React.use(params)
  const product = getProductBySlug(slug)
  
  if (!product) {
    notFound()
  }

  const { addToCart } = useCart()
  const { openCart } = useCartSheet()
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  // Calculate total price including services
  const basePrice = (() => {
    if (!product.price || typeof product.price !== 'string') return 0
    const priceMatch = product.price.match(/[\d.]+/)
    if (!priceMatch) return 0
    return parseFloat(priceMatch[0].replace(/\./g, '')) || 0
  })()

  const servicesTotal = selectedServices.reduce((total, serviceId) => {
    const service = additionalServices.find(s => s.id === serviceId)
    return total + (service?.price || 0)
  }, 0)

  const totalPrice = (basePrice + servicesTotal) * quantity

  // Handle add to cart
  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      addToCart(product, quantity, selectedServices, note)
      
      // Show success feedback
      setShowSuccessMessage(true)
      setTimeout(() => {
        setIsAddingToCart(false)
        setShowSuccessMessage(false)
        openCart()
      }, 1000)
    } catch (error) {
      console.error('Error adding to cart:', error)
      setIsAddingToCart(false)
    }
  }

  // Handle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  // Set document title
  useEffect(() => {
    document.title = `${product.name} - Hoa Tươi Đà Nẵng`
  }, [product.name])

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="flex items-center gap-2 mb-8"
          >
            <Link 
              href="/" 
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              Trang chủ
            </Link>
            <span className="text-[var(--text-muted)]">/</span>
            <Link 
              href="/collection" 
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              Bộ sưu tập
            </Link>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-[var(--text-primary)]">{product.name}</span>
          </motion.div>

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--background-muted)]">
                <Image
                  src={getSafeImageSrc(product.images[selectedImage], "/placeholder.svg?height=600&width=600")}
                  alt={getSafeAltText(product.name, "Sản phẩm")}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn(
                    "absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    isWishlisted 
                      ? "bg-red-500 text-white" 
                      : "bg-white/90 backdrop-blur-sm text-[var(--text-secondary)] hover:text-red-500"
                  )}
                >
                  <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} strokeWidth={1.5} />
                </button>

                {/* Share Button */}
                <button className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300",
                      selectedImage === index 
                        ? "border-[var(--primary)] shadow-lg" 
                        : "border-[var(--border-soft)] hover:border-[var(--primary)]/50"
                    )}
                  >
                    <Image
                      src={getSafeImageSrc(image, "/placeholder.svg?height=150&width=150")}
                      alt={`${product.name} - Ảnh ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
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
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" strokeWidth={1.5} />
                    ))}
                    <span className="text-sm text-[var(--text-muted)] ml-2">(4.9 • 127 đánh giá)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-bold text-[var(--primary)]">
                    {product.price}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    Còn hàng
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-3">
                <label className="font-medium text-[var(--text-primary)]">Số lượng:</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-[var(--background-muted)] transition-colors"
                  >
                    <Minus className="w-5 h-5" strokeWidth={2} />
                  </button>
                  <span className="w-16 text-center font-semibold text-xl">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-[var(--background-muted)] transition-colors"
                  >
                    <Plus className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Additional Services */}
              <div className="space-y-4">
                <label className="font-medium text-[var(--text-primary)]">Dịch vụ thêm:</label>
                <div className="space-y-3">
                  {additionalServices.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-3 border border-[var(--border-soft)] rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <label htmlFor={service.id} className="font-medium cursor-pointer">
                          {service.name}
                        </label>
                      </div>
                      <span className="font-semibold text-[var(--primary)]">
                        +{service.price.toLocaleString()}đ
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Note */}
              <div className="space-y-3">
                <label htmlFor="note" className="font-medium text-[var(--text-primary)]">
                  Ghi chú đặc biệt:
                </label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao trước 10h sáng, thiệp ghi 'Chúc mừng sinh nhật'..."
                  className="min-h-[100px]"
                />
              </div>

              {/* Total Price */}
              {(servicesTotal > 0 || quantity > 1) && (
                <div className="p-4 bg-[var(--background-muted)] rounded-xl">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sản phẩm ({quantity}x)</span>
                      <span>{(basePrice * quantity).toLocaleString()}đ</span>
                    </div>
                    {servicesTotal > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Dịch vụ thêm</span>
                        <span>{servicesTotal.toLocaleString()}đ</span>
                      </div>
                    )}
                    <div className="border-t border-[var(--border-soft)] pt-2 flex justify-between font-semibold">
                      <span>Tổng cộng:</span>
                      <span className="text-[var(--primary)] text-lg">
                        {totalPrice.toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || basePrice === 0}
                  className={cn(
                    "w-full h-14 text-lg font-semibold transition-all duration-300",
                    showSuccessMessage && "bg-green-500 hover:bg-green-600"
                  )}
                  size="lg"
                >
                  {showSuccessMessage ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Đã thêm vào giỏ hàng!
                    </>
                  ) : isAddingToCart ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" strokeWidth={1.5} />
                      Thêm vào giỏ hàng
                    </>
                  )}
                </Button>

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
                      Gọi ngay
                    </a>
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-soft)]">
                {[
                  { icon: Truck, text: "Giao hàng nhanh" },
                  { icon: Shield, text: "Hoa tươi 100%" },
                  { icon: Clock, text: "Hỗ trợ 24/7" }
                ].map((badge, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-2">
                      <badge.icon className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
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
                <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                  Khám phá thêm những sản phẩm tương tự trong cùng danh mục
                </p>
              </motion.div>

              <motion.div 
                variants={staggerItem}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    price={relatedProduct.price}
                    image={relatedProduct.image}
                    slug={relatedProduct.slug}
                  />
                ))}
              </motion.div>
            </motion.section>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}