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
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/wedding-flowers-bridal-bouquet-elegant.jpg"
            alt="Hoa Cưới"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-3">Ngày Trọng Đại</p>
                <h1 className="text-4xl lg:text-5xl font-semibold text-card mb-4">Hoa Cưới</h1>
                <p className="text-card/90 text-lg mb-8">
                  Trọn vẹn hạnh phúc ngày cưới với những bó hoa tinh tế và lãng mạn nhất
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                  <a href="#san-pham">Xem Bộ Sưu Tập</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">Hoa Cưới - Vẻ Đẹp Trọn Vẹn</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ngày cưới là ngày quan trọng nhất trong đời. Chúng tôi mang đến những bó hoa cưới, hoa cầm tay cô dâu,
              hoa trang trí tiệc cưới đẹp nhất, giúp ngày vui của bạn thêm phần lung linh.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Từ hoa cầm tay cô dâu, hoa cài áo chú rể đến cổng hoa và backdrop - tất cả đều được thiết kế tinh tế,
              phù hợp với concept đám cưới của bạn.
            </p>
          </div>
        </section>

        {/* Products Gallery */}
        <section id="san-pham" className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Bộ Sưu Tập Hoa Cưới</h2>
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
        <section className="py-12 lg:py-16 bg-secondary/30">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">Hướng Dẫn Đặt Hàng</h2>
            <div className="space-y-4">
              {orderSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-card p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-foreground pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary/10">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">Đặt Hoa Cưới Ngay</h2>
            <p className="text-muted-foreground mb-8">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho đám cưới của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href="tel:0901234567">
                  <Phone className="h-4 w-4 mr-2" />
                  Gọi: 090 123 4567
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 bg-transparent"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
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
