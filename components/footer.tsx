import Link from "next/link"
import { MapPin, Phone, Clock, MessageCircle } from "lucide-react"

const quickLinks = [
  { name: "Hoa sinh nhật", href: "/dich-vu/hoa-sinh-nhat" },
  { name: "Hoa cưới", href: "/dich-vu/hoa-cuoi" },
  { name: "Hoa khai trương", href: "/dich-vu/hoa-khai-truong" },
  { name: "Hoa chia buồn", href: "/dich-vu/hoa-chia-buon" },
  { name: "Hoa Tết", href: "/dich-vu/hoa-tet" },
]

const policies = [
  { name: "Chính sách giao hàng", href: "/chinh-sach/giao-hang" },
  { name: "Chính sách đổi trả", href: "/chinh-sach/doi-tra" },
  { name: "Freeship khu vực gần", href: "/chinh-sach/freeship" },
]

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-xl">🌸</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">Hoa Tươi</span>
                <span className="text-xs text-muted-foreground tracking-widest uppercase">Đà Nẵng</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Chuyên cung cấp hoa tươi cao cấp, giao hàng nhanh trong ngày tại Đà Nẵng và Quảng Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Danh mục</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Chính sách</h3>
            <ul className="space-y-2">
              {policies.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-muted-foreground">123 Nguyễn Văn Linh, Đà Nẵng</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:0901234567" className="text-sm text-muted-foreground hover:text-primary">
                  090 123 4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">7:00 - 21:00 hàng ngày</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-primary shrink-0" />
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">
                  Zalo / Messenger
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Hoa Tươi Đà Nẵng.
          </p>
        </div>
      </div>
    </footer>
  )
}
