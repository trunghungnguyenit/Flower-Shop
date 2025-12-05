import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Truck, Gift, MapPin, ShoppingBag, CheckCircle, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FreeshipPolicyPage() {
  return (
    <main className="min-h-screen py-16">
      <Header />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Chính Sách Freeship</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Miễn phí giao hàng - Yêu thương không khoảng cách</p>
        </div>

        {/* Main Offer */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto border-primary/30 bg-gradient-to-br from-primary/5 to-secondary/30">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">Ưu đãi đặc biệt</span>
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  FREESHIP đơn từ 500.000đ
                </h2>
                <p className="text-lg text-muted-foreground mb-6">Áp dụng cho khu vực TP. Tam Kỳ, Quảng Nam</p>
                <Link href="/bo-suu-tap">
                  <Button size="lg" className="gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Mua sắm ngay
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Conditions */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Điều Kiện Áp Dụng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Giá Trị Đơn Hàng</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Đơn từ 500.000đ: Freeship nội thành Tam Kỳ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Đơn từ 800.000đ: Freeship toàn Quảng Nam
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Đơn từ 1.200.000đ: Freeship Đà Nẵng
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Khu Vực Áp Dụng</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    TP. Tam Kỳ và các xã lân cận
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Hội An, Điện Bàn, Núi Thành
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Các quận nội thành Đà Nẵng
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Combo Deals */}
        <section className="mb-16 bg-secondary/30 rounded-2xl p-8">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Combo Ưu Đãi Freeship</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Combo Yêu Thương</h3>
                <p className="text-2xl font-bold text-primary mb-2">550.000đ</p>
                <p className="text-muted-foreground text-sm mb-4">Hoa + Socola + Thiệp</p>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Freeship Tam Kỳ
                </span>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Combo Sang Trọng</h3>
                <p className="text-2xl font-bold text-primary mb-2">850.000đ</p>
                <p className="text-muted-foreground text-sm mb-4">Hoa cao cấp + Gấu bông + Thiệp</p>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Freeship Quảng Nam
                </span>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Combo VIP</h3>
                <p className="text-2xl font-bold text-primary mb-2">1.250.000đ</p>
                <p className="text-muted-foreground text-sm mb-4">Hoa Premium + Quà tặng + Thiệp cao cấp</p>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Freeship Đà Nẵng
                </span>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Notes */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Lưu Ý</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">Freeship không áp dụng cùng các chương trình khuyến mãi khác</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">
                Các ngày lễ lớn (Valentine, 8/3, 20/10...) có thể áp dụng điều kiện khác
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800">Giao hàng sau 21h hoặc trước 7h sáng có thể phát sinh phụ phí</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/bo-suu-tap">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="w-5 h-5" />
              Xem Bộ Sưu Tập Hoa
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
