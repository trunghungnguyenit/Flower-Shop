"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    image: "/elegant-pink-rose-bouquet-studio-photography.jpg",
    title: "Hoa Tươi Mỗi Ngày",
    subtitle: "Giao nhanh Đà Nẵng & Quảng Nam",
    description: "Freeship khu vực gần - Cam kết hoa tươi 100%",
  },
  {
    id: 2,
    image: "/beautiful-white-and-pink-flower-arrangement-studio.jpg",
    title: "Bộ Sưu Tập Tết 2024",
    subtitle: "Hoa Tết Sang Trọng",
    description: "Đặt trước để nhận ưu đãi đặc biệt",
  },
  {
    id: 3,
    image: "/romantic-red-roses-bouquet-luxury-gift.jpg",
    title: "Hoa Tình Yêu",
    subtitle: "Lãng Mạn & Tinh Tế",
    description: "Gửi yêu thương đến người thân yêu",
  },
  {
    id: 4,
    image: "/pastel-flower-basket-arrangement-soft-colors.jpg",
    title: "Hoa Sinh Nhật",
    subtitle: "Tươi Sáng & Rực Rỡ",
    description: "Làm nổi bật ngày đặc biệt của bạn",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
              <div className="max-w-xl">
                <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3 animate-fade-in-up">
                  {slide.subtitle}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 text-balance animate-fade-in-up animation-delay-100">
                  {slide.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-300">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                    <Link href="/bo-suu-tap">Xem Bộ Sưu Tập</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-foreground/20 hover:bg-foreground/5 bg-transparent"
                    asChild
                  >
                    <Link href="/#lien-he">Đặt Hàng Ngay</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 hover:bg-background/80 text-foreground transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 hover:bg-background/80 text-foreground transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-primary w-8" : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
