import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { FirebaseApi, formatImageUrl, getFirstImage, formatPrice } from "@/api/firebase"
import type { SanPham } from "@/api/api.type"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoa Tết | Hoa Tươi Đà Nẵng",
  description: "Hoa Tết đẹp, mai vàng, đào Tết tại Đà Nẵng. Đón xuân sang với hoa Tết rực rỡ, mang may mắn và tài lộc.",
}

const orderSteps = [
  "Chọn mẫu hoa Tết yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default async function HoaTetPage() {
  // Gọi API để lấy sản phẩm hoa Tết
  const res = await FirebaseApi.getSanPham()
  const allProducts: SanPham[] = res.ok ? res.data : []
  
  // Lọc sản phẩm hoa Tết
  const tetProducts = allProducts.filter((product) => 
    product.loai_hoa === 'hoa-tet' || 
    (product.su_kiens && product.su_kiens.includes('tet'))
  )
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 via-yellow-50 to-orange-50">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - Red & Gold theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/vietnamese-new-year-flower-arrangement-yellow-peac.jpg"
            alt="Hoa Tết"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/80 via-yellow-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-red-600/30 backdrop-blur-sm rounded-full border-2 border-yellow-400/50">
                  <p className="text-yellow-200 text-sm tracking-[0.3em] uppercase font-bold">🧧 Xuân 2025</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-yellow-300 mb-4 drop-shadow-2xl [text-shadow:_2px_2px_0_rgb(220_38_38)]">
                  Hoa Tết Rực Rỡ
                </h1>
                <p className="text-yellow-50 text-lg mb-8 leading-relaxed font-medium">
                  Đón xuân sang với những lẵng hoa Tết đẹp nhất, mang may mắn và tài lộc đến cho gia đình bạn
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold shadow-xl shadow-red-500/50 border-2 border-yellow-400"
                  asChild
                >
                  <a href="#san-pham">🎊 Xem Bộ Sưu Tập Tết</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl animate-bounce">🏮</div>
          <div className="absolute bottom-20 left-20 text-5xl animate-pulse">🧧</div>
          <div className="absolute top-1/2 right-1/4 text-4xl animate-spin-slow">✨</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-red-100/70 to-yellow-100/70 border-y-4 border-red-600">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-6xl">🌺</span>
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-600 to-orange-600 mb-6">
              Hoa Tết - Sắc Xuân Rực Rỡ
            </h2>
            <p className="text-gray-800 leading-relaxed mb-4 font-medium">
              Hoa Tết là biểu tượng không thể thiếu trong ngày Tết cổ truyền Việt Nam. Từ những cành mai vàng rực rỡ,
              đào hồng tinh khôi đến các lẵng hoa trang trí sang trọng - tất cả đều mang ý nghĩa chúc phúc, tài lộc và
              may mắn cho năm mới.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Chúng tôi cung cấp đa dạng các loại hoa Tết với thiết kế độc đáo, phù hợp trang trí nhà cửa, văn phòng
              hoặc làm quà biếu trong dịp Tết.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Bộ Sưu Tập Hoa Tết</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {tetProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.TenHoa}
                  price={formatPrice(product.Gia)}
                  image={formatImageUrl(getFirstImage(product.image))}
                  slug={product.slug || ''}
                />
              ))}
            </div>
            {tetProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gradient-to-r from-red-50 to-yellow-50 p-6 rounded-xl border-2 border-red-300 hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-yellow-500 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                    {index + 1}
                  </div>
                  <p className="text-gray-800 pt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-red-100 via-yellow-100 to-orange-100 border-t-4 border-red-600">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-6xl mb-4 animate-bounce">🎆</div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600 mb-4">
              Đặt Hoa Tết Ngay Hôm Nay
            </h2>
            <div className="inline-block bg-red-600 text-yellow-300 px-6 py-2 rounded-full font-bold text-lg mb-6 animate-pulse">
              🎁 Giảm 10% - Đặt trước 20 Tháng Chạp
            </div>
            <p className="text-gray-800 mb-8 text-lg font-medium">
              Đặt sớm để nhận ưu đãi đặc biệt và đảm bảo có hoa đẹp nhất cho Tết
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold shadow-xl shadow-red-500/50 border-2 border-yellow-400"
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
                className="border-2 border-red-600 text-red-600 hover:bg-red-50 bg-white font-bold"
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
