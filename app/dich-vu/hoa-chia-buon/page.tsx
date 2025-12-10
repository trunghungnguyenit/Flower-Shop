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
  title: "Hoa Chia Buồn | Hoa Tươi Đà Nẵng",
  description: "Hoa chia buồn, vòng hoa tang lễ tại Đà Nẵng. Chia sẻ nỗi đau, đồng hành trong mất mát.",
}

const orderSteps = [
  "Chọn mẫu hoa chia buồn yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default async function HoaChiaBuonPage() {
  const res = await FirebaseApi.getSanPham()
  const allProducts: SanPham[] = res.ok ? res.data : []
  
  const sympathyProducts = allProducts.filter((product) => 
    product.loai_hoa === 'hoa-chia-buon' || 
    (product.su_kiens && product.su_kiens.includes('chia-buon'))
  )
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-slate-100">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner - White & Gray theme */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/sympathy-white-flowers-arrangement.jpg"
            alt="Hoa Chia Buồn"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-slate-300/30">
                  <p className="text-slate-200 text-sm tracking-[0.3em] uppercase">🕊️ Chia Sẻ</p>
                </div>
                <h1 className="text-4xl lg:text-6xl font-serif font-light text-white mb-4 drop-shadow-2xl">
                  Hoa Chia Buồn
                </h1>
                <p className="text-slate-100 text-lg mb-8 leading-relaxed">
                  Chia sẻ nỗi đau, đồng hành trong mất mát với những vòng hoa trang nghiêm
                </p>
                <Button
                  size="lg"
                  className="bg-slate-700 hover:bg-slate-800 text-white shadow-xl"
                  asChild
                >
                  <a href="#san-pham">Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-5xl opacity-70">🕊️</div>
          <div className="absolute bottom-20 right-20 text-4xl opacity-60">🤍</div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-white border-y border-slate-200">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <div className="inline-block mb-4">
              <span className="text-5xl">🌼</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-serif font-light text-slate-800 mb-6">
              Hoa Chia Buồn - Sự Đồng Cảm Sâu Sắc
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Trong những lúc khó khăn nhất, một vòng hoa hay lẵng hoa chia buồn là cách thể hiện sự đồng cảm và chia
              sẻ. Chúng tôi cung cấp các mẫu hoa chia buồn trang nghiêm, phù hợp với văn hóa Việt Nam.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Từ vòng hoa tang lễ, lẵng hoa chia buồn đến hoa cúc trắng, ly trắng - tất cả đều được chuẩn bị chu đáo
              và giao hàng tận nơi nhanh chóng.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-serif font-light text-center mb-8 text-slate-800">
              Bộ Sưu Tập Hoa Chia Buồn
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {sympathyProducts.map((product) => (
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
            {sympathyProducts.length === 0 && (
              <p className="text-center text-muted-foreground py-8">Đang cập nhật sản phẩm...</p>
            )}
          </div>
        </section>

        {/* How to Order */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-serif font-light text-center mb-8 text-slate-800">
              Hướng Dẫn Đặt Hàng
            </h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-slate-50 p-6 rounded-lg border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 pt-2">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-slate-100">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <div className="text-5xl mb-4">🕊️</div>
            <h2 className="text-2xl lg:text-3xl font-serif font-light text-slate-800 mb-4">
              Đặt Hoa Chia Buồn Ngay
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Liên hệ ngay để được tư vấn và hỗ trợ nhanh chóng
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-slate-700 hover:bg-slate-800 text-white shadow-lg"
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
                className="border-2 border-slate-600 text-slate-700 hover:bg-slate-50 bg-white"
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
