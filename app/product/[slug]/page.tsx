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
import ProductOrderForm from "@/components/product-order-form"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { 
  staggerContainer, 
  staggerItem, 
  fadeInUp, 
  premiumEase 
} from "@/components/animations/framer-variants"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"

// Additional services options (moved to ProductOrderForm component)

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = React.use(params)
  
  // API state
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)

  // Fetch product data from API
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch main product
        const productRes = await FirebaseApi.getProductBySlug(slug)
        
        if (productRes.ok && productRes.data) {
          setProduct(productRes.data)
          
          // Fetch all products for related products
          const allProductsRes = await FirebaseApi.getProduct()
          if (allProductsRes.ok && Array.isArray(allProductsRes.data)) {
            // Filter related products (same category, excluding current product, only active)
            const related = allProductsRes.data
              .filter((p: Product) => 
                p.isActive && 
                p.id !== productRes.data.id &&
                p.categoryIds?.some(catId => productRes.data.categoryIds?.includes(catId))
              )
              .slice(0, 4)
            setRelatedProducts(related)
          }
        } else {
          // Product not found
          notFound()
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [slug])

  // Set document title
  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} - Hoa Tươi Đà Nẵng`
    }
  }, [product?.name])

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product?.images || product.images.length <= 1) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, product?.images])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderSection />
        <main className="pt-24 pb-16">
          <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    notFound()
  }

  // Calculate total price including services
  const basePrice = product.price || 0

  // Handle service selection - removed (moved to ProductOrderForm)

  
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
              className="space-y-4 group"
            >
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--background-muted)]">
                <Image
                  src={getSafeImageSrc(product.images?.[selectedImage], "/placeholder.svg?height=600&width=600")}
                  alt={getSafeAltText(product.name, "Sản phẩm")}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Navigation Arrows - only show if more than 1 image */}
                {product.images && product.images.length > 1 && (
                  <>
                    {/* Previous Image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === 0 ? product.images!.length - 1 : selectedImage - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Next Image */}
                    <button
                      onClick={() => setSelectedImage(selectedImage === product.images!.length - 1 ? 0 : selectedImage + 1)}
                      className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                {product.images && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                    {selectedImage + 1} / {product.images.length}
                  </div>
                )}
                
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
                <button className="absolute top-16 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
                  <Share2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className={cn(
                  "grid gap-3",
                  product.images.length <= 4 
                    ? "grid-cols-4" 
                    : product.images.length <= 6 
                    ? "grid-cols-3" 
                    : "grid-cols-2"
                )}>
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
              )}
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
                  <span className="font-display text-3xl font-bold text-[var(--primary)]">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {product.badge || "Còn hàng"}
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {product.description}
                </p>
              </div>

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
                  <Button
                    onClick={() => setShowOrderForm(true)}
                    className="w-full h-14 text-lg font-semibold bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                    size="lg"
                  >
                    🌺 Đặt Hoa Ngay
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
              )}

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
                    price={`${relatedProduct.price.toLocaleString("vi-VN")}đ`}
                    image={relatedProduct.images?.[0] || "/placeholder.svg?height=400&width=400"}
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