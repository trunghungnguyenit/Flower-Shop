"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionTitle, USPStats } from "@/components/ui/premium"

// ================================================
// Reviews Data
// ================================================

const reviews = [
  {
    id: 1,
    name: "Nguyễn Thị Hương",
    location: "Quận Hải Châu, Đà Nẵng",
    date: "15/11/2024",
    rating: 5,
    text: "Hoa rất đẹp, tươi lâu hơn mong đợi. Shipper giao đúng giờ, thái độ niềm nở. Chắc chắn sẽ ủng hộ tiếp!",
    avatar: "/placeholder.svg?height=80&width=80",
    productImage: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    productName: "Bó hồng pastel",
  },
  {
    id: 2,
    name: "Trần Văn Minh",
    location: "Quận Thanh Khê, Đà Nẵng",
    date: "12/11/2024",
    rating: 5,
    text: "Đặt hoa sinh nhật cho vợ, cô ấy rất thích! Màu sắc đúng như hình, gói rất đẹp và sang trọng. Cảm ơn shop!",
    avatar: "/placeholder.svg?height=80&width=80",
    productImage: "/red-roses-luxury-basket-arrangement.jpg",
    productName: "Giỏ hồng đỏ luxury",
  },
  {
    id: 3,
    name: "Lê Thị Mai",
    location: "TP. Hội An, Quảng Nam",
    date: "08/11/2024",
    rating: 5,
    text: "Lần đầu đặt hoa từ Đà Nẵng giao về Hội An, không nghĩ nhanh và đẹp như vậy. Chất lượng tuyệt vời!",
    avatar: "/placeholder.svg?height=80&width=80",
    productImage: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    productName: "Bó hoa pastel mix",
  },
  {
    id: 4,
    name: "Phạm Đức Anh",
    location: "Quận Sơn Trà, Đà Nẵng",
    date: "05/11/2024",
    rating: 5,
    text: "Đặt lẵng hoa khai trương cho công ty, rất ấn tượng! Thiết kế sang trọng, giao đúng hẹn. Highly recommend!",
    avatar: "/placeholder.svg?height=80&width=80",
    productImage: "/white-wedding-bouquet-elegant-roses.jpg",
    productName: "Lẵng hoa khai trương",
  },
]

const stats = [
  { number: "5000+", label: "Khách hàng tin tưởng" },
  { number: "4.9/5", label: "Đánh giá trung bình" },
  { number: "98%", label: "Khách hàng hài lòng" },
]

// ================================================
// Reviews Section Component
// ================================================

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState<"left" | "right">("right")
  const sectionRef = useRef<HTMLElement>(null)

  const nextSlide = useCallback(() => {
    setDirection("right")
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection("left")
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }, [])

  // Intersection observer
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

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "text-[var(--accent-gold)] fill-[var(--accent-gold)]" : "text-gray-300"
          )}
        />
      ))}
    </div>
  )

  // Flower rating component (alternative)
  const FlowerRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={cn("text-lg", i < rating ? "opacity-100" : "opacity-30")}
        >
          🌸
        </span>
      ))}
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="bg-white"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <SectionTitle
          label="Đánh giá từ khách hàng"
          title="Khách Hàng Nói Gì?"
          subtitle="Niềm tin của khách hàng là động lực để chúng tôi không ngừng hoàn thiện"
          align="center"
          accentColor="primary"
          animated={isVisible}
        />

        {/* Reviews Carousel */}
        <div
          className={cn(
            "relative mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "200ms" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <div
                    className="bg-[var(--background-muted)] p-6 lg:p-10 flex flex-col lg:flex-row gap-8 items-center"
                    style={{
                      borderRadius: "var(--radius-large)",
                      boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
                    }}
                  >
                    {/* Review Image */}
                    <div
                      className="w-full lg:w-2/5 aspect-[4/3] lg:aspect-square relative overflow-hidden flex-shrink-0"
                      style={{ borderRadius: "var(--radius-medium)" }}
                    >
                      <Image
                        src={review.productImage}
                        alt={review.productName}
                        fill
                        className="object-cover"
                      />
                      {/* Product name badge */}
                      <div
                        className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2"
                        style={{ borderRadius: "var(--radius-soft)" }}
                      >
                        <p className="font-body text-[var(--text-primary)] text-sm font-medium truncate">
                          {review.productName}
                        </p>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      {/* Quote Icon */}
                      <Quote
                        className="w-12 h-12 text-[var(--primary)]/20 mb-4"
                        strokeWidth={1}
                      />

                      {/* Rating */}
                      <div className="mb-4">
                        <FlowerRating rating={review.rating} />
                      </div>

                      {/* Text */}
                      <p
                        className="font-body text-[var(--text-primary)] mb-8 italic"
                        style={{ fontSize: "18px", lineHeight: 1.8 }}
                      >
                        "{review.text}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 relative rounded-full overflow-hidden"
                          style={{
                            border: "3px solid var(--primary)",
                            padding: "2px",
                          }}
                        >
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <p
                            className="font-display text-[var(--text-primary)]"
                            style={{ fontSize: "17px", fontWeight: 600 }}
                          >
                            {review.name}
                          </p>
                          <p
                            className="font-body text-[var(--text-secondary)]"
                            style={{ fontSize: "13px" }}
                          >
                            {review.location} • {review.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 lg:-translate-x-6 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-[var(--border-soft)]"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={1.5} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 lg:translate-x-6 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-10 border border-[var(--border-soft)]"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={1.5} />
          </button>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-10 bg-[var(--primary)]"
                    : "w-2 bg-[var(--primary)]/30 hover:bg-[var(--primary)]/50"
                )}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className={cn(
            "grid grid-cols-3 gap-8 pt-12 border-t border-[var(--border-soft)] transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          {stats.map((stat, index) => (
            <USPStats
              key={index}
              number={stat.number}
              label={stat.label}
              animated={isVisible}
              animationDelay={500 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
