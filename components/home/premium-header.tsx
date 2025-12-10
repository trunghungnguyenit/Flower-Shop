"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart-button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/dich-vu" },
  { name: "Bộ sưu tập", href: "/bo-suu-tap" },
  { name: "Liên hệ", href: "/#lien-he" },
]

export function PremiumHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-3"
          : "bg-transparent backdrop-blur-sm py-5"
      )}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
              isScrolled ? "bg-[var(--primary)]/15" : "bg-white/20 backdrop-blur-sm"
            )}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🌸</span>
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xl font-display font-semibold tracking-wide transition-colors duration-300",
                isScrolled ? "text-[var(--text-primary)]" : "text-white"
              )}
            >
              Hoa Tươi
            </span>
            <span
              className={cn(
                "text-[10px] tracking-[0.25em] uppercase font-body transition-colors duration-300",
                isScrolled ? "text-[var(--text-secondary)]" : "text-white/80"
              )}
            >
              Đà Nẵng • Quảng Nam
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative text-sm font-body font-medium transition-colors duration-300 py-2 group",
                isScrolled
                  ? "text-[var(--text-primary)] hover:text-[var(--primary)]"
                  : "text-white/90 hover:text-white"
              )}
            >
              {item.name}
              {/* Animated underline - expands from center */}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300",
                  isScrolled ? "bg-[var(--primary)]" : "bg-white"
                )}
              />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:0905123456"
            className={cn(
              "flex items-center gap-2 text-sm font-body font-medium transition-colors duration-300",
              isScrolled
                ? "text-[var(--text-primary)] hover:text-[var(--primary)]"
                : "text-white/90 hover:text-white"
            )}
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <span>0905 123 456</span>
          </a>

          <Button
            size="sm"
            className={cn(
              "font-body font-medium transition-all duration-300 hover:scale-105",
              isScrolled
                ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
            )}
            style={{ borderRadius: "var(--radius-round)" }}
          >
            <MessageCircle className="h-4 w-4 mr-2" strokeWidth={1.5} />
            Zalo
          </Button>

          <CartButton />
        </div>

        {/* Mobile menu button & cart */}
        <div className="lg:hidden flex items-center gap-2">
          <CartButton />
          <button
            type="button"
            className={cn(
              "p-2 transition-colors duration-300",
              isScrolled ? "text-[var(--text-primary)]" : "text-white"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white/98 backdrop-blur-xl",
          mobileMenuOpen ? "max-h-[400px] border-t border-[var(--border-soft)]" : "max-h-0"
        )}
      >
        <div className="px-4 py-6 space-y-1">
          {navigation.map((item, index) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-base font-body font-medium text-[var(--text-primary)] hover:text-[var(--primary)] py-3 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-6 mt-4 border-t border-[var(--border-soft)] flex flex-col gap-3">
            <a
              href="tel:0905123456"
              className="flex items-center gap-3 text-[var(--text-primary)] py-2"
            >
              <Phone className="h-5 w-5 text-[var(--primary)]" strokeWidth={1.5} />
              <span className="font-body font-medium">0905 123 456</span>
            </a>
            <Button
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium"
              style={{ borderRadius: "var(--radius-medium)" }}
            >
              <MessageCircle className="h-5 w-5 mr-2" strokeWidth={1.5} />
              Chat Zalo
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
