import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Hoa Sinh Nhật | Hoa Tươi Đà Nẵng",
  description: "Tặng hoa sinh nhật đẹp, giao nhanh tại Đà Nẵng & Quảng Nam. Đa dạng mẫu hoa từ nhẹ nhàng đến sang trọng.",
}

const birthdayProducts = products.filter((p) => p.occasion.includes("sinh-nhat"))

const orderSteps = [
  "Chọn mẫu hoa sinh nhật yêu thích hoặc mô tả ý tưởng của bạn",
  "Liên hệ qua điện thoại hoặc Zalo để được tư vấn chi tiết",
  "Xác nhận đơn hàng và thanh toán",
  "Nhận hoa đúng thời gian và địa điểm mong muốn",
]

export default function HoaSinhNhatPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Hero Banner */}
        <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
          <Image
            src="/birthday-flower-bouquet-celebration.jpg"
            alt="Hoa Sinh Nhật"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 to-foreground/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="max-w-xl">
                <p className="text-primary-foreground/80 text-sm tracking-[0.3em] uppercase mb-3">
                  Ngày Đặc Biệt
                </p>
                <h1 className="text-4xl lg:text-5xl font-semibold text-card mb-4">Hoa Sinh Nhật</h1>
                <p className="text-card/90 text-lg mb-8">
                  Gửi gắm yêu thương trong ngày đặc biệt với những bó hoa tươi thắm nhất
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-6">
              Hoa Sinh Nhật - Món Quà Ý Nghĩa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
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
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  slug={product.slug}
                />
              ))}
            </div>
            {birthdayProducts.length === 0 && (
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
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-4">Đặt Hoa Sinh Nhật Ngay</h2>
            <p className="text-muted-foreground mb-8">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt cho đơn hàng sinh nhật
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
