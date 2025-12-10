import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Dịch Vụ Hoa Tươi | Hoa Tươi Đà Nẵng",
  description: "Dịch vụ hoa tươi đa dạng cho mọi dịp: hoa sinh nhật, hoa Tết, hoa cưới, hoa khai trương, hoa chia buồn, hoa trang trí. Giao nhanh tại Đà Nẵng & Quảng Nam.",
}

const services = [
  {
    id: 1,
    name: "Hoa Sinh Nhật",
    description: "Gửi tặng yêu thương đến người thân yêu trong ngày sinh nhật với những bó hoa tươi thắm.",
    image: "/hoa-sinh-nhat.jpg?height=400&width=600",
    href: "/dich-vu/hoa-sinh-nhat",
  },
  {
    id: 2,
    name: "Hoa Tết",
    description: "Chào đón năm mới với những lẵng hoa Tết rực rỡ, mang may mắn và tài lộc.",
    image: "/vietnamese-tet-new-year-flowers-peach-blossom-apri.jpg?height=400&width=600",
    href: "/dich-vu/hoa-tet",
  },
  {
    id: 3,
    name: "Hoa Cưới",
    description: "Trang trí ngày trọng đại của bạn với những bó hoa cưới tinh tế và lãng mạn.",
    image: "white-bridal-bouquet.jpg?height=400&width=600",
    href: "/dich-vu/hoa-cuoi",
  },
  {
    id: 4,
    name: "Hoa Khai Trương",
    description: "Chúc mừng khai trương với lẵng hoa hoành tráng, mang đến thành công và phát đạt.",
    image: "/vip-opening-flower.jpg?height=400&width=600",
    href: "/dich-vu/hoa-khai-truong",
  },
  {
    id: 5,
    name: "Hoa Chia Buồn",
    description: "Gửi lời chia buồn sâu sắc với vòng hoa tang lễ trang nghiêm và tôn kính.",
    image: "/wedding-flowers-white-elegant-ceremony.jpg?height=400&width=600",
    href: "/dich-vu/hoa-chia-buon",
  },
  {
    id: 6,
    name: "Hoa Trang Trí",
    description: "Làm đẹp không gian sống với những bình hoa trang trí tinh tế và nghệ thuật.",
    image: "/decorative-flowers-home-interior-design.jpg?height=400&width=600",
    href: "/dich-vu/hoa-trang-tri",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Page Header */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Dịch vụ</p>
            <h1 className="text-3xl lg:text-5xl font-semibold text-foreground mb-4">Dịch Vụ Hoa Tươi</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cung cấp đa dạng dịch vụ hoa cho mọi dịp trong cuộc sống
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <Link href={service.href} key={service.id} className="group">
                  <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{service.name}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
                      <span className="inline-flex items-center text-primary font-medium text-sm group-hover:underline">
                        Xem chi tiết
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">Bạn cần tư vấn?</h2>
            <p className="text-muted-foreground mb-8">
              Liên hệ ngay với chúng tôi để được tư vấn miễn phí và nhận báo giá tốt nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="tel:0901234567">Gọi: 090 123 4567</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
                asChild
              >
                <Link href="/#lien-he">Gửi yêu cầu</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
