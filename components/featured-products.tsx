"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Hồng Pastel Ngọt Ngào",
    price: "450.000đ",
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    slug: "hong-pastel-ngot-ngao",
  },
  {
    id: 2,
    name: "Lẵng Hoa Hồng Đỏ",
    price: "650.000đ",
    image: "/red-roses-luxury-basket-arrangement.jpg",
    slug: "lang-hoa-hong-do",
  },
  {
    id: 3,
    name: "Hoa Cưới Trắng Tinh Khôi",
    price: "Liên hệ báo giá",
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    slug: "hoa-cuoi-trang",
  },
  {
    id: 4,
    name: "Hoa Tết Phú Quý",
    price: "850.000đ",
    image: "/vietnamese-new-year-flower-arrangement-yellow-peac.jpg",
    slug: "hoa-tet-phu-quy",
  },
  {
    id: 5,
    name: "Bó Hoa Mix Pastel",
    price: "380.000đ",
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    slug: "bo-hoa-mix-pastel",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Nổi bật</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">Bộ Sưu Tập Yêu Thích</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Những mẫu hoa được khách hàng yêu thích nhất, được cắm bởi các nghệ nhân hàng đầu
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <Link href={`/san-pham/${product.slug}`} key={product.id}>
              <Card className="group border-0 shadow-none hover:shadow-lg transition-shadow duration-300 overflow-hidden bg-card">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-foreground text-sm lg:text-base mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-primary font-semibold text-sm">{product.price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            asChild
          >
            <Link href="/bo-suu-tap">Xem Tất Cả Sản Phẩm</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
