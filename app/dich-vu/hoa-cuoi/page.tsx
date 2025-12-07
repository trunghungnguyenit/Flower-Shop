import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoa Cưới | Hoa Tươi Đà Nẵng",
  description: "Hoa cưới đẹp, hoa cầm tay cô dâu, trang trí tiệc cưới tại Đà Nẵng. Trọn vẹn hạnh phúc ngày trọng đại.",
}

const weddingProducts = products.filter((p) => p.occasion.includes("cuoi"))

const orderSteps = [
  "Chọn mẫu hoa cưới yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default function HoaCuoiPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - White & Rose Gold theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/wedding-flowers-bridal-bouquet-elegant.jpg"
            alt="Hoa Cưới"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 via-pink-900/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-rose-200/30">
                  <p className="text-rose-100 text-sm tracking-[0.3em] uppercase">💍 Ngày Trọng Đại</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-2xl font-serif">
                  Hoa Cưới
                </h1>
                <p className="text-rose-50 text-lg mb-8 leading-relaxed">
                  Trọn vẹn hạnh phúc ngày cưới với những bó hoa tinh tế và lãng mạn nhất
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-xl shadow-rose-500/50"
                  asChild
                >
                  <a href="#san-pham">💐 Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl animate-pulse">💕</div>
          <div className="absolute bottom-20 right-20 text-5xl animate-bounce">🤍</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-rose-50/80 to-pink-50/80">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-6xl">🌹</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-6 font-serif">
              Hoa Cưới - Vẻ Đẹp Trọn Vẹn
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ngày cưới là ngày quan trọng nhất trong đời. Chúng tôi mang đến những bó hoa cưới, hoa cầm tay cô dâu,
              hoa trang trí tiệc cưới đẹp nhất, giúp ngày vui của bạn thêm phần lung linh.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Từ hoa cầm tay cô dâu, hoa cài áo chú rể đến cổng hoa và backdrop - tất cả đều được thiết kế tinh tế,
              phù hợp với concept đám cưới của bạn.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              Bộ Sưu Tập Hoa Cưới
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {weddingProducts.map((product) => (
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
            {weddingProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-rose-200 hover:shadow-xl transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-rose-100 to-pink-100">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-6xl mb-4">💒</div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 mb-4 font-serif">
              Đặt Hoa Cưới Ngay
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho đám cưới của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-400 to-pink-400 hover:from-rose-500 hover:to-pink-500 text-white shadow-xl shadow-rose-500/50"
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
                className="border-2 border-rose-400 text-rose-600 hover:bg-rose-50 bg-white"
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
