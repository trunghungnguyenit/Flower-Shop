import Image from "next/image"
import { Check } from "lucide-react"

const features = [
  "Hoa tươi 100% được chọn lọc kỹ lưỡng",
  "Thiết kế theo phong cách hiện đại, tinh tế",
  "Giao hàng nhanh trong ngày",
  "Freeship khu vực gần",
  "Tư vấn miễn phí 24/7",
]

export function AboutSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=500&width=400"
                  alt="Không gian tiệm hoa"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Hoa tươi mỗi ngày"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Giao hàng cẩn thận"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Về chúng tôi</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">Mang Thiên Nhiên Vào Cuộc Sống</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Với hơn 10 năm kinh nghiệm trong nghề, chúng tôi tự hào là địa chỉ tin cậy của hàng ngàn khách hàng tại Đà
              Nẵng và Quảng Nam. Mỗi bó hoa đều được chăm chút tỉ mỉ, từ việc chọn lọc hoa tươi đến khâu đóng gói và
              giao hàng.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Đội ngũ của chúng tôi gồm những nghệ nhân tài năng, luôn sáng tạo và cập nhật xu hướng mới nhất, mang đến
              cho khách hàng những sản phẩm độc đáo và đẳng cấp.
            </p>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-accent-foreground" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
