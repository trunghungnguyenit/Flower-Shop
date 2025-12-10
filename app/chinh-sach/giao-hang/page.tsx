import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Truck, Clock, MapPin, Phone, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen py-16">
      <Header />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Chính Sách Giao Hàng</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết giao hoa tươi, đúng giờ và nguyên vẹn đến tay người nhận
          </p>
        </div>

        {/* Delivery Areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Khu Vực Giao Hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-lg">Quảng Nam</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    TP. Tam Kỳ - Miễn phí giao hàng
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Hội An - Phí ship 30.000đ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Điện Bàn - Phí ship 25.000đ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Các huyện khác - Liên hệ
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold text-lg">Đà Nẵng</h3>
                </div>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Quận Hải Châu - Phí ship 35.000đ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Quận Thanh Khê - Phí ship 35.000đ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Quận Ngũ Hành Sơn - Phí ship 40.000đ
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Các quận khác - Liên hệ
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Delivery Time */}
        <section className="mb-16 bg-secondary/30 rounded-2xl p-8">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Thời Gian Giao Hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Giao Tiêu Chuẩn</h3>
              <p className="text-muted-foreground text-sm">Trong vòng 2-4 giờ sau khi đặt hàng</p>
            </div>
            <div className="text-center">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Giao Nhanh</h3>
              <p className="text-muted-foreground text-sm">Trong vòng 1-2 giờ (phụ thu 30.000đ)</p>
            </div>
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Giao Hẹn Giờ</h3>
              <p className="text-muted-foreground text-sm">Đúng giờ bạn yêu cầu (đặt trước 4 giờ)</p>
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Lưu Ý Quan Trọng</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Hoa được giao trong hộp/giấy bảo vệ chuyên dụng, đảm bảo nguyên vẹn
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">
                Shipper sẽ liên hệ người nhận trước 15-30 phút để xác nhận địa chỉ
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">Với đơn hàng giao bất ngờ, shipper sẽ không tiết lộ người gửi</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">Freeship cho đơn hàng từ 500.000đ trong khu vực TP. Tam Kỳ</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Có thắc mắc về giao hàng?</p>
          <Button size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Liên hệ: 090 123 4567
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
