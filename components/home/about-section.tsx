"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, USPStats } from "@/components/ui/premium"

// ================================================
// About Section Data
// ================================================

const features = [
  "Hoa tươi 100% - nhập hàng ngày từ Đà Lạt",
  "Đội ngũ nghệ nhân cắm hoa kinh nghiệm 10+ năm",
  "Giao hàng nhanh 2 giờ nội thành Đà Nẵng",
  "Dịch vụ tư vấn miễn phí, tận tâm 24/7",
]

const masonryImages = [
  {
    src: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    alt: "Shop hoa tươi Đà Nẵng",
    size: "large",
  },
  {
    src: "/red-roses-luxury-basket-arrangement.jpg",
    alt: "Nghệ nhân cắm hoa",
    size: "small",
  },
  {
    src: "/tang-nguoi-yeu/nguoi-iu-11.jpg",
    alt: "Hoa cưới cao cấp",
    size: "small",
  },
  {
    src: "/tang-me/me-8.jpg",
    alt: "Giao hoa tận nơi",
    size: "medium",
  },
]

// ================================================
// About Section Component
// ================================================

export function AboutSection() {
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-alt)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      {/* Background Decorations */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-rose) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Masonry Image Gallery */}
          <div
            className={cn(
              "relative transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}
          >
            {/* Masonry Grid */}
            <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[500px] lg:h-[600px]">
              {/* Large Image - Left side */}
              <div
                className="col-span-7 row-span-6 relative overflow-hidden group"
                style={{ borderRadius: "var(--radius-large)" }}
              >
                <Image
                  src={masonryImages[0].src}
                  alt={masonryImages[0].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Top Right - Small */}
              <div
                className="col-span-5 row-span-2 relative overflow-hidden group"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                <Image
                  src={masonryImages[1].src}
                  alt={masonryImages[1].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Middle Right - Small */}
              <div
                className="col-span-5 row-span-2 relative overflow-hidden group"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                <Image
                  src={masonryImages[2].src}
                  alt={masonryImages[2].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Bottom Right - Medium with badge */}
              <div
                className="col-span-5 row-span-2 relative overflow-hidden group"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                <Image
                  src={masonryImages[3].src}
                  alt={masonryImages[3].alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Experience Badge */}
                <div
                  className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3"
                  style={{
                    borderRadius: "var(--radius-round)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[var(--primary)]/10 rounded-full">
                    <span className="text-xl">🌸</span>
                  </div>
                  <div>
                    <p className="font-display text-[var(--text-primary)] font-semibold" style={{ fontSize: "16px" }}>
                      10+ Năm
                    </p>
                    <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "12px" }}>
                      Kinh nghiệm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Play Button (Video Preview) */}
            <button
              className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-white rounded-full shadow-xl hover:scale-110 transition-all duration-300 group z-10"
              aria-label="Xem video"
            >
              <Play
                className="w-6 h-6 lg:w-7 lg:h-7 text-[var(--primary)] ml-1 group-hover:scale-110 transition-transform"
                fill="currentColor"
              />
              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
            </button>
          </div>

          {/* Content */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Label */}
            <span
              className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Về chúng tôi
            </span>

            {/* Title */}
            <h2
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              Mang Thiên Nhiên
              <br />
              <span className="text-gradient-primary">Vào Cuộc Sống</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 mb-8">
              <p
                className="font-body text-[var(--text-secondary)]"
                style={{ fontSize: "16px", lineHeight: 1.8 }}
              >
                <strong className="text-[var(--text-primary)]">Hoa Tươi Đà Nẵng</strong> tự hào là địa chỉ tin cậy
                của hàng ngàn khách hàng suốt hơn một thập kỷ qua. Chúng tôi tin rằng mỗi bông hoa đều
                mang trong mình một câu chuyện, một thông điệp yêu thương.
              </p>
              <p
                className="font-body text-[var(--text-secondary)]"
                style={{ fontSize: "16px", lineHeight: 1.8 }}
              >
                Với đội ngũ nghệ nhân giàu kinh nghiệm và tình yêu nghề, mỗi sản phẩm của chúng tôi
                đều được chăm chút tỉ mỉ từ khâu chọn hoa đến cắm và giao hàng.
              </p>
            </div>

            {/* Features Checklist */}
            <ul className="space-y-3 mb-10">
              {features.map((feature, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start gap-3 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <span
                    className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      borderRadius: "var(--radius-soft)",
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                    }}
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </span>
                  <span
                    className="font-body text-[var(--text-primary)]"
                    style={{ fontSize: "15px", lineHeight: 1.6 }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link href="/gioi-thieu">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Tìm hiểu thêm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
