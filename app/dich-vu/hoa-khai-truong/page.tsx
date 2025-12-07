import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoa Khai Trương | Hoa Tươi Đà Nẵng",
  description: "Hoa khai trương, kệ hoa chúc mừng tại Đà Nẵng. Chúc mừng thành công, phát tài phát lộc.",
}

const openingProducts = products.filter((p) => p.occasion.includes("khai-truong"))

const orderSteps = [
  "Chọn mẫu hoa khai trương yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default function HoaKhaiTruongPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-red-50">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - Gold & Red theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/grand-opening-flower-stand.jpg"
            alt="Hoa Khai Trương"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-orange-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-amber-500/30 backdrop-blur-sm rounded-full border-2 border-amber-300/50">
                  <p className="text-amber-100 text-sm tracking-[0.3em] uppercase font-bold">🎊 Thành Công</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-amber-300 mb-4 drop-shadow-2xl [text-shadow:_3px_3px_0_rgb(185_28_28)]">
                  Hoa Khai Trương
                </h1>
                <p className="text-amber-50 text-lg mb-8 leading-relaxed font-medium">
                  Chúc mừng thành công, phát tài phát lộc với những kệ hoa khai trương hoành tráng
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold shadow-2xl shadow-amber-500/50 border-2 border-amber-300"
                  asChild
                >
                  <a href="#san-pham">🎉 Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-7xl animate-bounce">🎊</div>
          <div className="absolute bottom-20 left-20 text-6xl animate-pulse">💰</div>
          <div className="absolute top-1/3 right-1/4 text-5xl">🌟</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-amber-100/80 to-orange-100/80 border-y-4 border-amber-500">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-6xl">🏆</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-6">
              Hoa Khai Trương - May Mắn Thịnh Vượng
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4 font-medium">
              Khai trương là bước khởi đầu quan trọng cho mọi doanh nghiệp. Hoa khai trương của chúng tôi mang ý nghĩa
              may mắn, thịnh vượng, giúp bạn gửi gắm lời chúc tốt đẹp nhất đến đối tác.
            </p>
            <p className="text-gray-800 leading-relaxed font-medium">
              Từ kệ hoa chúc mừng hoành tráng, lẵng hoa sang trọng đến chậu cây phát tài - tất cả đều được thiết kế
              chuyên nghiệp và giao đúng giờ khai trương.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">
              Bộ Sưu Tập Hoa Khai Trương
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {openingProducts.map((product) => (
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
            {openingProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white p-6 rounded-xl border-2 border-amber-300 hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 pt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-amber-100 via-orange-100 to-red-100 border-t-4 border-amber-500">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-7xl mb-4 animate-bounce">🎯</div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 mb-4">
              Đặt Hoa Khai Trương Ngay
            </h2>
            <p className="text-gray-800 mb-8 text-lg font-medium">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho lễ khai trương
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-bold shadow-2xl shadow-amber-500/50 border-2 border-amber-300"
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
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 bg-white font-bold"
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
