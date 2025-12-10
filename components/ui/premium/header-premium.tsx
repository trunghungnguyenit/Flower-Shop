"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone, ShoppingBag, Search, Heart, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, IconButton } from "./button"

// ================================================
// Header Premium
// ================================================

const navigation = [
  { name: "Trang chủ", href: "/" },
  {
    name: "Bộ sưu tập",
    href: "/bo-suu-tap",
    children: [
      { name: "Bó hoa tươi", href: "/bo-suu-tap?category=bo-hoa" },
      { name: "Lẵng hoa", href: "/bo-suu-tap?category=lang-hoa" },
      { name: "Hoa cưới", href: "/bo-suu-tap?category=hoa-cuoi" },
      { name: "Hoa khai trương", href: "/bo-suu-tap?category=hoa-khai-truong" },
      { name: "Hoa chia buồn", href: "/bo-suu-tap?category=hoa-chia-buon" },
    ],
  },
  { name: "Về chúng tôi", href: "/gioi-thieu" },
  { name: "Liên hệ", href: "/lien-he" },
]

export function HeaderPremium() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [cartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-[var(--shadow-header)]"
            : "bg-transparent"
        )}
        style={{
          height: isScrolled ? "var(--header-height-scrolled)" : "var(--header-height)",
        }}
      >
        <div className="mx-auto max-w-[1240px] h-full px-4 lg:px-8">
          <nav className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className={cn(
                  "flex items-center justify-center transition-all duration-300",
                  isScrolled ? "w-10 h-10" : "w-12 h-12"
                )}
                style={{
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                  boxShadow: "0 4px 16px rgba(217,124,138,0.3)",
                }}
              >
                <span className={cn("transition-all duration-300", isScrolled ? "text-xl" : "text-2xl")}>
                  🌸
                </span>
              </div>
              <div className="flex flex-col">
                <span
                  className={cn(
                    "font-display font-semibold transition-all duration-300",
                    isScrolled ? "text-[var(--text-primary)]" : "text-white"
                  )}
                  style={{ fontSize: isScrolled ? "18px" : "20px" }}
                >
                  Hoa Tươi
                </span>
                <span
                  className={cn(
                    "tracking-[0.15em] uppercase transition-colors duration-300 hidden sm:block",
                    isScrolled ? "text-[var(--text-secondary)]" : "text-white/80"
                  )}
                  style={{ fontSize: "9px" }}
                >
                  Đà Nẵng • Quảng Nam
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative flex items-center gap-1 py-2 font-body transition-colors duration-300",
                      isScrolled
                        ? "text-[var(--text-primary)] hover:text-[var(--primary)]"
                        : "text-white/90 hover:text-white"
                    )}
                    style={{ fontSize: "15px", fontWeight: 500 }}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          activeDropdown === item.name && "rotate-180"
                        )}
                      />
                    )}

                    {/* Underline effect */}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 transition-all duration-300 group-hover:w-full",
                        isScrolled ? "bg-[var(--primary)]" : "bg-white",
                        "w-0"
                      )}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 transition-all duration-300",
                        activeDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      <div
                        className="bg-white py-3 min-w-[200px]"
                        style={{
                          borderRadius: "var(--radius-medium)",
                          boxShadow: "var(--shadow-dropdown)",
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-5 py-2.5 font-body text-[var(--text-primary)] hover:bg-[var(--background-muted)] hover:text-[var(--primary)] transition-colors duration-200"
                            style={{ fontSize: "14px" }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <IconButton
                variant="ghost"
                size="md"
                className={cn(
                  "hidden sm:flex",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </IconButton>

              {/* Wishlist */}
              <IconButton
                variant="ghost"
                size="md"
                className={cn(
                  "hidden sm:flex",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" strokeWidth={1.5} />
              </IconButton>

              {/* Cart */}
              <IconButton
                variant="ghost"
                size="md"
                className={cn(
                  "relative",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-[var(--primary)] text-white text-xs font-semibold rounded-full"
                  >
                    {cartCount}
                  </span>
                )}
              </IconButton>

              {/* CTA Button */}
              <div className="hidden lg:block ml-2">
                <Button
                  variant={isScrolled ? "primary" : "outline"}
                  size="md"
                  icon={<Phone className="w-4 h-4" />}
                  className={cn(
                    !isScrolled && "border-white text-white hover:bg-white hover:text-[var(--primary)]"
                  )}
                >
                  <a href="tel:0905123456">Đặt hoa ngay</a>
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <IconButton
                variant="ghost"
                size="md"
                className={cn(
                  "lg:hidden",
                  isScrolled ? "text-[var(--text-primary)]" : "text-white"
                )}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" strokeWidth={1.5} />
              </IconButton>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 lg:hidden transition-transform duration-400 overflow-y-auto",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ boxShadow: "var(--shadow-modal)" }}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--border-soft)]">
          <span className="font-display text-[var(--text-primary)] font-semibold" style={{ fontSize: "18px" }}>
            Menu
          </span>
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </IconButton>
        </div>

        {/* Mobile Navigation */}
        <nav className="p-4">
          {navigation.map((item) => (
            <div key={item.name} className="mb-2">
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 font-body text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                {item.name}
              </Link>

              {/* Submenu */}
              {item.children && (
                <div className="pl-4 border-l-2 border-[var(--border-soft)] ml-2">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-2 font-body text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                      style={{ fontSize: "14px" }}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile CTA */}
        <div className="p-4 border-t border-[var(--border-soft)]">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            icon={<Phone className="w-5 h-5" />}
          >
            <a href="tel:0905123456">Gọi đặt hoa: 0905 123 456</a>
          </Button>
        </div>
      </div>
    </>
  )
}
