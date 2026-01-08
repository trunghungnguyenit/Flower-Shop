"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function CollectionHeroBanner() {
  const scrollToProducts = () => {
    document.getElementById("product-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[600px] overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pastel-pink-roses-bouquet-soft-elegant.jpg')",
          filter: "blur(2px)",
          transform: "scale(1.05)",
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(224, 178, 184, 0.35) 0%, rgba(244, 237, 238, 0.2) 50%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <p
          className="text-[var(--text-secondary)] text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up font-body"
          style={{ animationDelay: "0ms" }}
        >
          Khám phá
        </p>

        <h1
          className="font-display text-[var(--text-primary)] mb-4 animate-fade-in-up"
          style={{
            fontSize: "clamp(32px, 6vw, 46px)",
            fontWeight: 600,
            lineHeight: 1.2,
            animationDelay: "100ms",
            textShadow: "0 2px 20px rgba(255,255,255,0.5)",
          }}
        >
          Bộ Sưu Tập Hoa Tươi
        </h1>

        <p
          className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 animate-fade-in-up font-body"
          style={{
            fontSize: "16px",
            lineHeight: 1.55,
            animationDelay: "200ms",
          }}
        >
          Khám phá hàng trăm mẫu hoa sang trọng cho mọi dịp đặc biệt trong cuộc sống
        </p>

        <div
          className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
          style={{ animationDelay: "300ms" }}
        >
          <Button
            onClick={scrollToProducts}
            className="px-8 py-3 bg-[var(--primary)] text-[var(--text-light)] hover:bg-[var(--primary-dark)] transition-smooth font-body font-medium"
            style={{ borderRadius: "var(--radius-round)" }}
          >
            Xem Nhiều Nhất
          </Button>
          <Button
            variant="outline"
            className="px-8 py-3 border-[var(--primary)] text-[var(--primary)] bg-white/80 hover:bg-[var(--primary)] hover:text-[var(--text-light)] transition-smooth font-body font-medium backdrop-blur-sm"
            style={{ borderRadius: "var(--radius-round)" }}
          >
            Liên hệ tư vấn
          </Button>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToProducts}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float cursor-pointer"
          aria-label="Cuộn xuống xem sản phẩm"
        >
          <ChevronDown
            className="w-8 h-8 text-[var(--primary)]"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </section>
  )
}
