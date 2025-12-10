"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, ArrowRight, Heart, Send } from "lucide-react"
import { useState } from "react"
import { Button, FormInput } from "@/components/ui/premium"

// ================================================
// Footer Data
// ================================================

const footerLinks = {
  services: [
    { name: "Bó hoa tươi", href: "/bo-suu-tap?category=bo-hoa" },
    { name: "Lẵng hoa", href: "/bo-suu-tap?category=lang-hoa" },
    { name: "Hoa cưới", href: "/bo-suu-tap?category=hoa-cuoi" },
    { name: "Hoa khai trương", href: "/bo-suu-tap?category=hoa-khai-truong" },
    { name: "Hoa chia buồn", href: "/bo-suu-tap?category=hoa-chia-buon" },
  ],
  occasions: [
    { name: "Sinh nhật", href: "/bo-suu-tap?occasion=sinh-nhat" },
    { name: "Tình yêu", href: "/bo-suu-tap?occasion=tinh-yeu" },
    { name: "Cưới hỏi", href: "/bo-suu-tap?occasion=cuoi" },
    { name: "Tết", href: "/bo-suu-tap?occasion=tet" },
    { name: "Khai trương", href: "/bo-suu-tap?occasion=khai-truong" },
  ],
  policies: [
    { name: "Chính sách giao hàng", href: "/chinh-sach/giao-hang" },
    { name: "Chính sách đổi trả", href: "/chinh-sach/doi-tra" },
    { name: "Chính sách bảo mật", href: "/chinh-sach/bao-mat" },
    { name: "Hướng dẫn đặt hàng", href: "/chinh-sach/huong-dan-dat-hang" },
  ],
  quickLinks: [
    { name: "Về chúng tôi", href: "/gioi-thieu" },
    { name: "Bộ sưu tập", href: "/bo-suu-tap" },
    { name: "Liên hệ", href: "#lien-he" },
    { name: "Blog", href: "/blog" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/hoatuoidanang", color: "#1877F2" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/hoatuoidanang", color: "#E4405F" },
  { name: "Zalo", icon: null, href: "https://zalo.me/0905123456", color: "#0068FF" },
]

// ================================================
// Premium Footer Component
// ================================================

export function PremiumFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[var(--text-primary)] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Newsletter Text */}
            <div>
              <h3
                className="font-display text-white mb-3"
                style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}
              >
                Đăng ký nhận ưu đãi
              </h3>
              <p
                className="font-body text-white/70"
                style={{ fontSize: "15px", lineHeight: 1.6 }}
              >
                Nhận thông tin khuyến mãi & mẫu hoa mới mỗi tuần. Giảm ngay 10% cho đơn hàng đầu tiên!
              </p>
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 px-5 bg-white/10 border border-white/20 text-white placeholder:text-white/50 font-body focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                icon={isSubscribed ? <Heart className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                className="flex-shrink-0"
              >
                {isSubscribed ? "Đã đăng ký!" : "Đăng ký"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                }}
              >
                <span className="text-2xl">🌸</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-semibold text-white">
                  Hoa Tươi
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-body">
                  Đà Nẵng • Quảng Nam
                </span>
              </div>
            </Link>

            <p
              className="font-body text-white/70 mb-6"
              style={{ fontSize: "14px", lineHeight: 1.7 }}
            >
              Mang vẻ đẹp của thiên nhiên vào cuộc sống. Hoa tươi mỗi ngày, giao hàng nhanh chóng.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: `${social.color}20` }}
                  aria-label={social.name}
                >
                  {social.icon ? (
                    <social.icon className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <span className="text-sm font-bold">Z</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-display text-white mb-5"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Liên kết
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-white/70 hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontSize: "14px" }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="font-display text-white mb-5"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Dịch vụ
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-white/70 hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontSize: "14px" }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Occasions */}
          <div>
            <h4
              className="font-display text-white mb-5"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Theo dịp
            </h4>
            <ul className="space-y-3">
              {footerLinks.occasions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-body text-white/70 hover:text-[var(--primary)] transition-colors duration-300 flex items-center gap-2 group"
                    style={{ fontSize: "14px" }}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4
              className="font-display text-white mb-5"
              style={{ fontSize: "16px", fontWeight: 600 }}
            >
              Liên hệ
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-white/70" style={{ fontSize: "14px" }}>
                  123 Nguyễn Văn Linh, Q. Hải Châu, TP. Đà Nẵng
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                <a
                  href="tel:0905123456"
                  className="font-body text-white/70 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  0905 123 456
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                <a
                  href="mailto:hello@hoatuoidanang.vn"
                  className="font-body text-white/70 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "14px" }}
                >
                  hello@hoatuoidanang.vn
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[var(--primary)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="font-body text-white/70" style={{ fontSize: "14px" }}>
                  7:00 - 21:00 (Thứ 2 - CN)
                  <br />
                  <span className="text-[var(--primary)]">Nhận đặt 24/7</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              className="font-body text-white/50 text-center md:text-left"
              style={{ fontSize: "13px" }}
            >
              © 2025 Hoa Tươi Đà Nẵng. Thiết kế với{" "}
              <span className="text-[var(--primary)]">♥</span> bởi đội ngũ yêu hoa.
            </p>

            <div className="flex items-center gap-6">
              {footerLinks.policies.slice(0, 3).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-body text-white/50 hover:text-[var(--primary)] transition-colors"
                  style={{ fontSize: "13px" }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
