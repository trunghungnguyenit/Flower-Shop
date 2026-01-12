"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Phone } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { cn } from "@/lib/utils"

// ================================================================
// STICKY CONTACT
// ================================================================
export function StickyContact() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg transition-all duration-300",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <ChevronLeft className="w-5 h-5 text-[var(--text-primary)] rotate-90" />
      </button>

      {/* Phone */}
      <a
        href={CONTACT.phoneLink}
        className="w-12 h-12 flex items-center justify-center bg-[var(--primary)] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <Phone className="w-5 h-5 text-black" strokeWidth={1.5} />
      </a>

      {/* Zalo */}
      <a
        href={CONTACT.zaloLink}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center bg-[#0068FF] rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <span className="text-black font-bold text-sm">Z</span>
      </a>
    </div>
  )
}