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
  title: "Hoa Sinh Nhật Đẹp | Giao Nhanh Đà Nẵng & Quảng Nam",
  description: "Tặng hoa sinh nhật đẹp, giao nhanh tại Đà Nẵng & Quảng Nam. Đa dạng mẫu hoa từ nhẹ nhàng đến sang trọng.",
}

const orderSteps = [
  "Chọn mẫu hoa sinh nhật yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default async function HoaSinhNhatPage() {
  // Gọi API để lấy sản phẩm hoa sinh nhật
  const res = await FirebaseApi.getSanPham()
  const allProducts: SanPham[] = res.ok ? res.data : []
  
  // Lọc sản phẩm hoa sinh nhật
  const birthdayProducts = allProducts.filter((product) => 
    product.su_kiens && product.su_kiens.includes('sinh-nhat')
  )
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - Pink & Purple theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/birthday-flower-bouquet-celebration.jpg"
            alt="Hoa Sinh Nhật"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/70 via-purple-900/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-pink-500/20 backdrop-blur-sm rounded-full border border-pink-300/30">
                  <p className="text-pink-100 text-sm tracking-[0.3em] uppercase">🎂 Ngày Đặc Biệt</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">Hoa Sinh Nhật</h1>
                <p className="text-pink-50 text-lg mb-8 leading-relaxed">
                  Gửi gắm yêu thương trong ngày đặc biệt với những bó hoa tươi thắm nhất
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/50"
                  asChild
                >
                  <a href="#san-pham">✨ Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl animate-bounce">🎈</div>
          <div className="absolute bottom-20 right-20 text-4xl animate-pulse">🎁</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-gradient-to-r from-pink-100/50 to-purple-100/50">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-5xl">🌸</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6">
              Hoa Sinh Nhật - Món Quà Ý Nghĩa
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tặng hoa sinh nhật là cách thể hiện tình cảm chân thành nhất. Chúng tôi có đa dạng mẫu hoa sinh nhật từ
              nhẹ nhàng đến sang trọng, phù hợp với mọi đối tượng và sở thích.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Mỗi bó hoa được cắm tỉ mỉ bởi nghệ nhân hoa, đi kèm thiệp chúc mừng miễn phí và giao đúng giờ sinh nhật.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Bộ Sưu Tập Hoa Sinh Nhật</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {birthdayProducts.map((product) => (
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
            {birthdayProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-200 hover:shadow-lg transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-2 font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-pink-100 to-purple-100">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              Đặt Hoa Sinh Nhật Ngay
            </h2>
            <p className="text-gray-700 mb-8 text-lg">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho đơn hàng sinh nhật
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg shadow-pink-500/50"
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
                className="border-2 border-pink-500 text-pink-600 hover:bg-pink-50 bg-white"
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
