"use client"

import { useState, useEffect } from "react"
import { MessageCircle, Phone, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function StickyContact() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {/* Contact buttons - Desktop right side */}
      <div className="fixed right-4 bottom-24 z-40 hidden lg:flex flex-col gap-3">
        {/* Zalo */}
        <a
          href="https://zalo.me/yourphone"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 bg-[#0068FF] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          style={{ borderRadius: "var(--radius-round)" }}
          aria-label="Chat qua Zalo"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
          <span className="font-body font-medium text-sm whitespace-nowrap">
            Chat Zalo
          </span>
        </a>

        {/* Phone */}
        <a
          href="tel:0905123456"
          className="group flex items-center gap-2 px-4 py-3 bg-[var(--primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-[var(--primary-dark)]"
          style={{ borderRadius: "var(--radius-round)" }}
          aria-label="Gọi ngay"
        >
          <Phone className="w-5 h-5 animate-pulse-soft" strokeWidth={1.5} />
          <span className="font-body font-medium text-sm whitespace-nowrap">
            0905 123 456
          </span>
        </a>
      </div>

      {/* Mobile floating buttons */}
      <div className="fixed left-4 bottom-6 z-40 lg:hidden flex flex-col gap-2">
        {/* Zalo */}
        <a
          href="https://zalo.me/yourphone"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center bg-[#0068FF] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ borderRadius: "50%" }}
          aria-label="Chat qua Zalo"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
        </a>

        {/* Phone */}
        <a
          href="tel:0905123456"
          className="w-12 h-12 flex items-center justify-center bg-[var(--primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ borderRadius: "50%" }}
          aria-label="Gọi ngay"
        >
          <Phone className="w-5 h-5" strokeWidth={1.5} />
        </a>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed right-4 bottom-6 z-40 w-11 h-11 flex items-center justify-center bg-white border border-[var(--border-soft)] text-[var(--text-secondary)] shadow-md transition-all duration-300",
          "hover:text-[var(--primary)] hover:border-[var(--primary)] hover:scale-105",
          showScrollTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ borderRadius: "50%" }}
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp className="w-5 h-5" strokeWidth={1.5} />
      </button>
    </>
  )
}
