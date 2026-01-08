"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FirebaseApi, getFirstImage, formatImageUrl, formatPrice } from "@/api/firebase"
import type { SanPham } from "@/api/api.type"

export function FeaturedProducts() {
  const [products, setProducts] = useState<SanPham[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(5)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getSanPham()
        if (res.ok && Array.isArray(res.data)) {
          setProducts(res.data)
        } else {
          console.error("API error:", res)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2)
      } else if (window.innerWidth < 768) {
        setItemsPerView(3)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(4)
      } else {
        setItemsPerView(5)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Nổi bật</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Bộ Sưu Tập Yêu Thích</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="border-0 shadow-none bg-card">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden bg-muted animate-pulse" />
                  <div className="p-4 text-center space-y-2">
                    <div className="h-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 bg-muted animate-pulse rounded w-2/3 mx-auto" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Nổi bật</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Bộ Sưu Tập Yêu Thích</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những mẫu hoa được khách hàng yêu thích nhất, được cắm bởi các nghệ nhân hàng đầu
          </p>
        </div>

        {/* Products Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          {products.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white hidden md:flex"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white hidden md:flex"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Products Grid with Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {products.map((product) => {
                const firstImage = formatImageUrl(getFirstImage(product.image))
                const price = formatPrice(product.Gia)

                const key = product.documentId ?? product.id ?? product.slug ?? Math.random().toString(36).slice(2)
                const href = product.slug ? `/san-pham/${product.slug}` : `/san-pham/${product.documentId ?? product.id}`

                return (
                  <div
                    key={key}
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <Link href={href}>
                      <Card className="group border-0 shadow-none hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-card">
                        <CardContent className="p-0">
                          <div className="relative aspect-square overflow-hidden bg-muted">
                            {firstImage ? (
                              <Image
                                src={firstImage}
                                alt={product.TenHoa || "product"}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                sizes="(max-width: 1024px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                                  <path d="M3 3h18v18H3V3z" stroke="currentColor" strokeWidth="1.5" opacity="0.12" />
                                  <path d="M21 15l-5-5-4 4-3-3-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="p-4 text-center">
                            <h3 className="font-medium text-foreground text-sm lg:text-base mb-1 line-clamp-2">
                              {product.TenHoa}
                            </h3>
                            <p className="text-primary font-semibold text-sm">{price}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          {products.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {[...Array(maxIndex + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-primary w-8" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            asChild
          >
            <Link href="/bo-suu-tap">Xem Tất Cả Sản Phẩm</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
