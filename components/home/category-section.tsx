"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { SectionTitle, CategoryCard } from "@/components/ui/premium"

// ================================================
// Category Data
// ================================================

const categories = [
  {
    id: "sinh-nhat",
    name: "Hoa Sinh Nhật",
    description: "Niềm vui trọn vẹn",
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    href: "/collection?occasion=sinh-nhat",
    productCount: 45,
  },
  {
    id: "tinh-yeu",
    name: "Hoa Tình Yêu",
    description: "Yêu thương nồng nàn",
    image: "/red-roses-luxury-basket-arrangement.jpg",
    href: "/collection?occasion=tinh-yeu",
    productCount: 38,
  },
  {
    id: "cuoi",
    name: "Hoa Cưới",
    description: "Hạnh phúc viên mãn",
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    href: "/collection?occasion=cuoi",
    productCount: 32,
  },
  {
    id: "tet",
    name: "Hoa Tết",
    description: "Rộn ràng xuân mới",
    image: "/vietnamese-new-year-flower-arrangement-yellow-peac.jpg",
    href: "/collection?occasion=tet",
    productCount: 28,
  },
  {
    id: "khai-truong",
    name: "Hoa Khai Trương",
    description: "Phát tài phát lộc",
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    href: "/collection?occasion=khai-truong",
    productCount: 24,
  },
  {
    id: "chia-buon",
    name: "Hoa Chia Buồn",
    description: "Chia sẻ & đồng cảm",
    image: "/placeholder.svg?height=400&width=400",
    href: "/collection?occasion=chia-buon",
    productCount: 18,
  },
]

// ================================================
// Category Section Component
// ================================================

export function CategorySection() {
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

  // Split categories for bento grid layout
  const featuredCategory = categories[0]
  const restCategories = categories.slice(1)

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--background-muted)]"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          label="Theo dịp đặc biệt"
          title="Hoa Cho Mọi Dịp"
          subtitle="Chọn loại hoa phù hợp với khoảnh khắc đặc biệt của bạn"
          align="center"
          accentColor="gold"
          animated={isVisible}
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Featured Category - Takes 2 columns */}
          <div className="col-span-2 row-span-2">
            <CategoryCard
              name={featuredCategory.name}
              description={featuredCategory.description}
              image={featuredCategory.image}
              href={featuredCategory.href}
              productCount={featuredCategory.productCount}
              variant="featured"
              animated={isVisible}
              animationDelay={0}
              className="h-full"
            />
          </div>

          {/* Rest Categories */}
          {restCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              image={category.image}
              href={category.href}
              productCount={category.productCount}
              variant="default"
              animated={isVisible}
              animationDelay={(index + 1) * 80}
            />
          ))}
        </div>

        {/* Additional Tags / Keywords */}
        <div
          className={cn(
            "flex flex-wrap justify-center gap-3 mt-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          {["Valentine", "8/3", "20/10", "20/11", "Giáng sinh", "Năm mới"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white text-[var(--text-secondary)] font-body text-sm rounded-full border border-[var(--border-soft)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
