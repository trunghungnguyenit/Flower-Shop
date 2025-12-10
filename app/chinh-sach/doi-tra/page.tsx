import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RefreshCw, Camera, Clock, Phone, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Chính Sách Đổi Trả</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho khách hàng
          </p>
        </div>

        {/* Commitment */}
        <section className="mb-16 bg-green-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center text-green-800">Cam Kết Của Chúng Tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Hoa Tươi 100%</h3>
              <p className="text-green-700 text-sm">Hoa được cắt trong ngày, đảm bảo độ tươi tối đa</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Đúng Mẫu</h3>
              <p className="text-green-700 text-sm">Sản phẩm giao đúng mẫu hoặc tương đương chất lượng</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">Đổi Miễn Phí</h3>
              <p className="text-green-700 text-sm">Đổi mới nếu hoa không đạt yêu cầu</p>
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="mb-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Accepted */}
            <Card className="border-green-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Được Đổi/Hoàn Tiền
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    Hoa héo, dập nát khi nhận hàng
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    Sản phẩm giao không đúng mẫu đã đặt
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    Thiếu sản phẩm/phụ kiện đi kèm
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    Giao sai địa chỉ do lỗi của shop
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    Giao trễ hơn 2 giờ so với thời gian hẹn
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Not Accepted */}
            <Card className="border-red-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center gap-2">
                  <XCircle className="w-6 h-6" />
                  Không Áp Dụng
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    Khách đổi ý sau khi đã giao hàng
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    Hoa héo do bảo quản không đúng cách
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    Phản hồi sau 24 giờ kể từ khi nhận hoa
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    Không có ảnh/video chứng minh lỗi
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground">
                    <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    Sản phẩm đã qua sử dụng, thay đổi
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Process */}
        <section className="mb-16 bg-secondary/30 rounded-2xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-8 text-center">Quy Trình Đổi/Trả</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Liên hệ</h3>
              <p className="text-muted-foreground text-sm">Gọi hotline hoặc nhắn Zalo trong vòng 2 giờ</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Gửi ảnh</h3>
              <p className="text-muted-foreground text-sm">Chụp ảnh/video sản phẩm làm bằng chứng</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Xác nhận</h3>
              <p className="text-muted-foreground text-sm">Shop xác nhận và thông báo phương án xử lý</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Giải quyết</h3>
              <p className="text-muted-foreground text-sm">Đổi mới hoặc hoàn tiền trong 24 giờ</p>
            </div>
          </div>
        </section>

        {/* Time Limit */}
        <section className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-serif font-bold">Thời Hạn Khiếu Nại</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Vui lòng liên hệ trong vòng <strong className="text-foreground">2 giờ</strong> kể từ khi nhận hoa để được hỗ
            trợ nhanh nhất. Sau 24 giờ, chúng tôi sẽ không tiếp nhận khiếu nại.
          </p>
          <Button size="lg" className="gap-2">
            <Phone className="w-5 h-5" />
            Hotline: 090 123 4567
          </Button>
        </section>
      </div>
      <Footer />
    </main>
  )
}
