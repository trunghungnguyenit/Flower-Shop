"use client"

import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Hoa Tết",
    image: "/vietnamese-tet-new-year-flowers-peach-blossom-apri.jpg",
    href: "/dich-vu/hoa-tet",
    description: "Mai, Đào & Hoa Tết",
  },
  {
    id: 2,
    name: "Sinh Nhật",
    image: "/birthday-flowers-bouquet-colorful-celebration.jpg",
    href: "/dich-vu/hoa-sinh-nhat",
    description: "Rực rỡ & Vui tươi",
  },
  {
    id: 3,
    name: "Tình Yêu",
    image: "/romantic-love-roses-red-pink-heart.jpg",
    href: "/dich-vu/hoa-tinh-yeu",
    description: "Lãng mạn & Ngọt ngào",
  },
  {
    id: 4,
    name: "Cưới & Khai Trương",
    image: "/wedding-flowers-white-elegant-ceremony.jpg",
    href: "/dich-vu/hoa-cuoi",
    description: "Sang trọng & Tinh tế",
  },
  {
    id: 5,
    name: "Chia Buồn",
    image: "/sympathy-funeral-flowers-white-lily.jpg",
    href: "/dich-vu/hoa-chia-buon",
    description: "Trang nghiêm & Tôn kính",
  },
  {
    id: 6,
    name: "Trang Trí",
    image: "/decorative-flowers-home-interior-design.jpg",
    href: "/dich-vu/hoa-trang-tri",
    description: "Không gian sống đẹp",
  },
]

export function OccasionCategories() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Theo dịp</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Hoa Cho Mọi Dịp</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chọn loại hoa phù hợp với từng dịp đặc biệt trong cuộc sống
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link href={category.href} key={category.id} className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-card">
                  <h3 className="font-semibold text-lg lg:text-xl mb-1">{category.name}</h3>
                  <p className="text-sm text-card/80">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
