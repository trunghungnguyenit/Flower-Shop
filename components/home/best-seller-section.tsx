"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { SectionTitle, SectionWrapper, Button, ProductCard } from "@/components/ui/premium"

// ================================================
// Best Seller Section
// ================================================

export function BestSellerSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Get first 8 products as best sellers (4 columns x 2 rows)
  const bestSellers = products.slice(0, 8)

  // Parse price string to number
  const parsePrice = (priceStr: string): number => {
    return parseInt(priceStr.replace(/[^\d]/g, ""), 10)
  }

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          label="Được yêu thích nhất"
          title="Bộ Sưu Tập Yêu Thích"
          subtitle="Những mẫu hoa bán chạy nhất – được cắm bởi các nghệ nhân hàng đầu"
          align="center"
          accentColor="primary"
          animated={isVisible}
        />

        {/* Products Grid - 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 mb-14">
          {bestSellers.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={parsePrice(product.price)}
              image={product.image || "/placeholder.svg?height=400&width=320"}
              href={`/san-pham/${product.slug}`}
              badge={index < 3 ? "bestseller" : undefined}
              rating={4.8}
              soldCount={Math.floor(Math.random() * 200) + 50}
              animated={true}
              animationDelay={index * 80}
              onAddToCart={() => {
                console.log(`Added ${product.name} to cart`)
              }}
              onAddToWishlist={() => {
                console.log(`Added ${product.name} to wishlist`)
              }}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={cn(
            "text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          <Link href="/bo-suu-tap">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Xem tất cả sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
