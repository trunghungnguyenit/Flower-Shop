import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoa Trang Trí | Hoa Tươi Đà Nẵng",
  description: "Hoa trang trí văn phòng, sự kiện, nhà hàng tại Đà Nẵng. Không gian đẹp với hoa tươi mỗi ngày.",
}

const decorProducts = products.filter((p) => p.occasion.includes("trang-tri"))

const orderSteps = [
  "Chọn mẫu hoa trang trí yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default function HoaTrangTriPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - Green & Teal theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/decorative-flowers-interior-design.jpg"
            alt="Hoa Trang Trí"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-teal-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-emerald-500/20 backdrop-blur-sm rounded-full border border-emerald-300/30">
                  <p className="text-emerald-100 text-sm tracking-[0.3em] uppercase">🌿 Không Gian Đẹp</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-emerald-100 mb-4 drop-shadow-2xl">
                  Hoa Trang Trí
                </h1>
                <p className="text-emerald-50 text-lg mb-8 leading-relaxed">
                  Làm đẹp không gian sống và làm việc với hoa tươi mỗi ngày
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/50"
                  asChild
                >
                  <a href="#san-pham">🌱 Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl animate-bounce">🪴</div>
          <div className="absolute bottom-20 right-20 text-5xl animate-pulse">🌿</div>
          <div className="absolute top-1/3 left-1/4 text-4xl">🍃</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-emerald-100/70 to-teal-100/70">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-6xl">🏡</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-6">
              Hoa Trang Trí - Không Gian Sống Động
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hoa trang trí giúp không gian sống và làm việc thêm sinh động, tươi mới. Chúng tôi cung cấp dịch vụ hoa
              trang trí văn phòng, nhà hàng, sự kiện với đa dạng phong cách từ hiện đại đến cổ điển.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Từ hoa trang trí văn phòng, hoa sự kiện, hoa bàn ăn đến dịch vụ hoa định kỳ - tất cả đều được thiết kế
              chuyên nghiệp và thay mới thường xuyên.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Bộ Sưu Tập Hoa Trang Trí
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {decorProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  slug={product.slug}
                />
              ))}
            </div>
            {decorProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white p-6 rounded-xl border border-emerald-200 hover:shadow-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-emerald-100 to-teal-100">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-6xl mb-4">🌺</div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mb-4">
              Đặt Hoa Trang Trí Ngay
            </h2>
            <div className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-lg mb-6">
              🎁 Ưu đãi dịch vụ hoa định kỳ
            </div>
            <p className="text-gray-700 mb-8 text-lg">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho dịch vụ hoa định kỳ
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/50"
                asChild
              >
                <a href="tel:0901234567">
                  <Phone className="h-5 w-5 mr-2" />
                  Gọi: 090 123 4567
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-white"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Chat Zalo
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
