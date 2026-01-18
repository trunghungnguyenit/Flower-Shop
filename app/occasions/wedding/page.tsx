"use client"

import { Heart, Crown, Flower2, Users, Camera } from "lucide-react"
import { OccasionLayout } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function WeddingFlowersPage() {
  return (
    <OccasionLayout
      occasionId="cuoi"
      breadcrumb={{
        current: "Đám cưới"
      }}
      hero={{
        icon: Heart,
        iconBgColor: "bg-rose-100",
        iconColor: "text-rose-600",
        buttonBgColor: "bg-rose-600",
        buttonHoverBgColor: "hover:bg-rose-700",
        buttonBorderColor: "border-rose-600",
        floatingBgColor: "bg-rose-200",
        tagline: "Đám cưới hoàn hảo",
        title: "Hoa Cưới Lãng Mạn",
        subtitle: "Tình Yêu Vĩnh Cửu",
        description: "Tạo nên những khoảnh khắc đáng nhớ nhất trong ngày trọng đại với những mẫu hoa cưới tinh tế và lãng mạn.",
        ctaText: "Xem hoa cưới",
        ctaHref: "#hoa-cuoi",
        image: "/cuoi/logo-hoa-cuoi.jpg",
        imageAlt: "Hoa cưới",
        floatingElements: {
          primary: "💒",
          secondary: "💍"
        }
      }}
      features={{
        sectionId: "hoa-cuoi",
        tagline: "Dịch vụ hoa cưới",
        taglineColor: "text-rose-600",
        title: "Dịch Vụ Hoa Cưới Trọn Gói",
        description: "Chúng tôi cung cấp đầy đủ các dịch vụ hoa cưới từ trang trí tiệc cưới đến hoa cầm tay cô dâu.",
        features: [
          {
            icon: Crown,
            title: "Hoa Cầm Tay Cô Dâu",
            description: "Thiết kế riêng theo phong cách và sở thích",
            color: "rose"
          },
          {
            icon: Flower2,
            title: "Trang Trí Tiệc Cưới",
            description: "Trang trí toàn bộ không gian tiệc cưới",
            color: "pink"
          },
          {
            icon: Users,
            title: "Hoa Cài Áo",
            description: "Hoa cài áo cho chú rể và khách mời",
            color: "purple"
          },
          {
            icon: Camera,
            title: "Backdrop Chụp Ảnh",
            description: "Tạo backdrop hoa đẹp cho buổi chụp ảnh",
            color: "indigo"
          }
        ]
      }}
      products={{
        tagline: "Hoa cưới phổ biến",
        taglineColor: "text-rose-600",
        title: "Loại Hoa Cưới Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp đám cưới"
      }}
      cta={{
        icon: Heart,
        iconBgColor: "bg-rose-100",
        iconColor: "text-rose-600",
        buttonBgColor: "bg-rose-600",
        buttonHoverBgColor: "hover:bg-rose-700",
        buttonBorderColor: "border-rose-600",
        bgGradient: "bg-gradient-to-br from-rose-600 to-rose-700",
        title: "Tư Vấn Hoa Cưới Miễn Phí",
        description: "Liên hệ ngay để được tư vấn miễn phí về dịch vụ hoa cưới. Chúng tôi sẽ giúp bạn tạo nên đám cưới hoàn hảo.",
        note: "💝 Ưu đãi đặc biệt cho đặt hàng sớm - Giảm 15% cho đơn hàng trên 5 triệu"
      }}
      confettiColors={["#FFB6C1", "#FFF0F5", "#F0E68C", "#E6E6FA", "#F5F5DC", "#FFE4E1"]}
    />
  )
}