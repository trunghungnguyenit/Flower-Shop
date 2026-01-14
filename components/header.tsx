"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";

// ================================================================
// NAVIGATION DATA
// ================================================================
const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/occasions" },
  { name: "Bộ sưu tập", href: "/collection" },
  { name: "Blog", href: "/blog" },
  { name: "Liên hệ", href: "/#lien-he" },
];

// ================================================================
// HEADER SECTION
// ================================================================
export function HeaderSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] py-3"
          : "bg-white/60 backdrop-blur-md backdrop-blur-sm py-2"
      )}
    >
      <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
              isScrolled
                ? "bg-[var(--primary)]/15"
                : "bg-white/20 backdrop-blur-sm"
            )}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              🌸
            </span>
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "text-xl font-display font-semibold tracking-wide transition-colors duration-300",
                isScrolled ? "text-black" : "text-black"
              )}
            >
              Hoa Tươi
            </span>
            <span
              className={cn(
                "text-[10px] tracking-[0.25em] uppercase font-body transition-colors duration-300",
                isScrolled ? "text-black" : "text-black"
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
                  ? "text-black hover:text-[var(--text-primary)]"
                  : "text-black/90 hover:text-black"
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-full transition-all duration-300",
                  isScrolled ? "bg-[var(--text-primary)]" : "bg-white"
                )}
              />
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={CONTACT.phoneLink}
            className={cn(
              "flex items-center gap-2 text-sm font-body font-medium transition-colors duration-300",
              isScrolled
                ? "text-black hover:text-[var(--primary-success)]"
                : "text-black/90 hover:text-black"
            )}
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
            <span>{CONTACT.phoneDisplay}</span>
          </a>

          <a
            href={CONTACT.zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 font-body font-medium text-sm transition-all duration-300 hover:scale-105",
              isScrolled
                ? "bg-[var(--primary)] hover:bg-[var(--primary-success)] text-black"
                : "bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black border border-white/30"
            )}
            style={{ borderRadius: "var(--radius-round)" }}
          >
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
            Zalo
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            className={cn(
              "p-2 transition-colors duration-300",
              isScrolled ? "text-black" : "text-black"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden transition-all duration-300 bg-white/98 backdrop-blur-xl",
          mobileMenuOpen
            ? "max-h-[70vh] border-t border-[var(--border-soft)] overflow-y-auto"
            : "max-h-0 overflow-hidden"
        )}
      >
        <div className="px-4 py-6 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-3 text-base font-body font-medium text-black hover:text-[var(--primary)] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-6 mt-4 border-t border-[var(--border-soft)] flex flex-col gap-3">
            <a
              href={CONTACT.phoneLink}
              className="flex items-center gap-3 py-2 text-black"
            >
              <Phone
                className="h-5 w-5 text-[var(--primary)]"
                strokeWidth={1.5}
              />
              <span className="font-body font-medium">
                {CONTACT.phoneDisplay}
              </span>
            </a>

            <a
              href={CONTACT.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 bg-[var(--primary)] text-black font-body font-medium rounded-[var(--radius-medium)]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Chat Zalo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
