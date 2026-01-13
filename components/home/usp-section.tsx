"use client"

import { useRef, useEffect, useState } from "react"
import { Truck, Clock, Gift, MapPin, Shield, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { USPItem, USPStats } from "@/components/ui/premium"

// ================================================
// USP Data
// ================================================

const uspItems = [
  {
    icon: Truck,
    title: "Freeship 5km",
    description: "Miễn phí vận chuyển nội thành Đà Nẵng",
  },
  {
    icon: Clock,
    title: "Giao Nhanh 2 Giờ",
    description: "Cam kết giao hàng nhanh chóng, đúng giờ",
  },
  {
    icon: Gift,
    title: "Combo Ưu Đãi",
    description: "Nhiều combo tiết kiệm, quà tặng hấp dẫn",
  },
  {
    icon: MapPin,
    title: "Phủ Sóng Rộng",
    description: "Giao hoa toàn Đà Nẵng & Quảng Nam",
  },
  {
    icon: Shield,
    title: "Cam Kết Chất Lượng",
    description: "100% hoa tươi, hoàn tiền nếu không hài lòng",
  },
  {
    icon: Sparkles,
    title: "Thiết Kế Riêng",
    description: "Tùy chỉnh theo yêu cầu, phong cách độc đáo",
  },
]

const stats = [
  { number: "5000+", label: "Khách hàng" },
  { number: "10K+", label: "Đơn hàng" },
  { number: "4.9/5", label: "Đánh giá" },
  { number: "24/7", label: "Hỗ trợ" },
]

// ================================================
// USP Section Component
// ================================================

export function UspSection() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      {/* Background Decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-14 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            Tại sao chọn chúng tôi
          </span>
          <h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 600 }}
          >
            Cam Kết Chất Lượng
          </h2>
          <p
            className="font-body text-[var(--text-secondary)] max-w-xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
          >
            Mỗi bó hoa là một tác phẩm nghệ thuật, được tạo nên từ tình yêu và sự tận tâm
          </p>
        </div>

        {/* USP Grid - 3 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {uspItems.map((item, index) => (
            <USPItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              variant="card"
              animated={isVisible}
              animationDelay={index * 80}
            />
          ))}
        </div>

        {/* Stats Row */}
        <div
          className={cn(
            "grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-t border-[var(--border-soft)] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "600ms" }}
        >
          {stats.map((stat, index) => (
            <USPStats
              key={index}
              number={stat.number}
              label={stat.label}
              animated={isVisible}
              animationDelay={700 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}