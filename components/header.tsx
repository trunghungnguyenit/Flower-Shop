"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartButton } from "@/components/cart-button"

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/dich-vu" },
  { name: "Bộ sưu tập", href: "/bo-suu-tap" },
  { name: "Liên hệ", href: "/#lien-he" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-xl">🌸</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-semibold tracking-wide text-foreground">Hoa Tươi</span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Đà Nẵng</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:0901234567" className="flex items-center gap-2 text-sm text-foreground/80 hover:text-primary">
            <Phone className="h-4 w-4" />
            <span>090 123 4567</span>
          </a>
          <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <MessageCircle className="h-4 w-4 mr-2" />
            Zalo
          </Button>
          <CartButton />
        </div>

        {/* Mobile menu button & cart */}
        <div className="lg:hidden flex items-center gap-2">
          <CartButton />
          <button
            type="button"
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-base font-medium text-foreground/80 hover:text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <a href="tel:0901234567" className="flex items-center gap-2 text-foreground/80">
                <Phone className="h-4 w-4" />
                <span>090 123 4567</span>
              </a>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat Zalo
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
