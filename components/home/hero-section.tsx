"use client"

import { useState, useEffect, useCallback } from "react"
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/premium"
import { FloatingPetals } from "@/components/ui/premium/floating-petals"

// ================================================
// Hero Slides Data
// ================================================

const heroSlides = [
  {
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    title: "Hoa Tươi Mỗi Ngày",
    subtitle: "Sang Trọng & Tinh Tế",
    accent: "Đặt hoa online – Giao nhanh 2 giờ",
  },
  {
    image: "/red-roses-luxury-basket-arrangement.jpg",
    title: "Tình Yêu Trọn Vẹn",
    subtitle: "Hồng Đỏ Đam Mê",
    accent: "Bó hoa hồng đỏ từ 299.000đ",
  },
  {
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    title: "Hạnh Phúc Viên Mãn",
    subtitle: "Hoa Cưới Cao Cấp",
    accent: "Thiết kế riêng theo yêu cầu",
  },
  {
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    title: "Pastel Ngọt Ngào",
    subtitle: "Nhẹ Nhàng Tinh Khôi",
    accent: "BST mùa xuân 2025",
  },
]

// ================================================
// Hero Section Component
// ================================================

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  // Auto-play slider
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [nextSlide, isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-out",
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          {/* Background Image with Ken Burns Effect */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              transition: "transform 8s ease-out",
            }}
          />
        </div>
      ))}

      {/* Premium Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(
              to top,
              rgba(217, 124, 138, 0.45) 0%,
              rgba(217, 124, 138, 0.2) 30%,
              transparent 60%
            ),
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.35) 0%,
              transparent 40%
            ),
            linear-gradient(
              to right,
              rgba(0, 0, 0, 0.25) 0%,
              transparent 50%
            )
          `,
        }}
      />

      {/* Floating Petals Effect */}
      <FloatingPetals count={20} className="z-[2]" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-[1240px] w-full px-4 lg:px-8">
          <div className="max-w-2xl">
            {/* Badge / Accent Text */}
            <div className="overflow-hidden mb-4">
              <span
                key={`accent-${currentSlide}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm text-white/95 font-body animate-fade-up"
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  borderRadius: "var(--radius-round)",
                  animationDelay: "0ms",
                  animationDuration: "0.6s",
                }}
              >
                <span className="text-[var(--accent-gold)]">✨</span>
                {heroSlides[currentSlide].accent}
              </span>
            </div>

            {/* Main Title */}
            <div className="overflow-hidden mb-3">
              <h1
                key={`title-${currentSlide}`}
                className="font-display text-white animate-fade-up"
                style={{
                  fontSize: "clamp(48px, 8vw, 72px)",
                  fontWeight: 600,
                  lineHeight: 1.1,
                  textShadow: "0 4px 40px rgba(0,0,0,0.3)",
                  animationDelay: "100ms",
                  animationDuration: "0.6s",
                }}
              >
                {heroSlides[currentSlide].title}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden mb-8">
              <p
                key={`subtitle-${currentSlide}`}
                className="font-display text-white/90 animate-fade-up"
                style={{
                  fontSize: "clamp(28px, 4vw, 44px)",
                  fontWeight: 500,
                  lineHeight: 1.2,
                  textShadow: "0 2px 20px rgba(0,0,0,0.2)",
                  animationDelay: "200ms",
                  animationDuration: "0.6s",
                }}
              >
                {heroSlides[currentSlide].subtitle}
              </p>
            </div>

            {/* Description */}
            <p
              className="font-body text-white/85 mb-10 max-w-lg animate-fade-up"
              style={{
                fontSize: "18px",
                lineHeight: 1.75,
                textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                animationDelay: "300ms",
                animationDuration: "0.6s",
              }}
            >
              Giao nhanh Đà Nẵng & Quảng Nam – Cam kết 100% hoa tươi mới
              <br />
              <span className="text-[var(--accent-gold)] font-medium">
                🎁 Freeship nội thành 5km
              </span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-up"
              style={{ animationDelay: "400ms", animationDuration: "0.6s" }}
            >
              <Link href="/bo-suu-tap">
                <Button
                  variant="primary"
                  size="xl"
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                  className="shadow-[0_8px_32px_rgba(217,124,138,0.5)] hover:shadow-[0_12px_40px_rgba(217,124,138,0.6)]"
                >
                  Xem Bộ Sưu Tập
                </Button>
              </Link>

              <a href="https://zalo.me/0905123456" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="xl"
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white/20 hover:border-white/60"
                >
                  Tư vấn qua Zalo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Prev Button */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Progress Dots */}
        <div className="flex gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={cn(
                "relative h-2 rounded-full transition-all duration-500 overflow-hidden",
                index === currentSlide
                  ? "w-10 bg-white/30"
                  : "w-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : "false"}
            >
              {/* Progress Bar */}
              {index === currentSlide && (
                <span
                  className="absolute inset-0 bg-white origin-left"
                  style={{
                    animation: isPaused ? "none" : "progress 6s linear",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 hover:scale-110 disabled:opacity-50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 right-8 z-20 hidden lg:flex flex-col items-center gap-3">
        <span
          className="font-body text-white/60 text-xs tracking-[0.2em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          Cuộn xuống
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-white animate-scroll-indicator" />
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-12 left-8 z-20 hidden lg:flex items-baseline gap-1">
        <span
          className="font-display text-white"
          style={{ fontSize: "32px", fontWeight: 600 }}
        >
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span
          className="font-body text-white/50"
          style={{ fontSize: "14px" }}
        >
          / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress Animation Keyframes */}
      <style jsx>{`
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        @keyframes scroll-indicator {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
