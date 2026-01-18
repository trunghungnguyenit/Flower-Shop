"use client"

import { Store, TrendingUp, Star, Gift, Trophy } from "lucide-react"
import { OccasionLayout } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function OpeningFlowersPage() {
  return (
    <OccasionLayout
      occasionId="khai-truong"
      breadcrumb={{
        current: "Khai trương"
      }}
      hero={{
        icon: Store,
        iconBgColor: "bg-orange-100",
        iconColor: "text-orange-600",
        buttonBgColor: "bg-orange-600",
        buttonHoverBgColor: "hover:bg-orange-700",
        buttonBorderColor: "border-orange-600",
        floatingBgColor: "bg-orange-200",
        tagline: "Khai trương thành công",
        title: "Hoa Khai Trương",
        subtitle: "Thịnh Vượng Phát Đạt",
        description: "Chúc mừng khai trương với những lẵng hoa tươi đẹp, mang ý nghĩa may mắn và thành công trong kinh doanh.",
        ctaText: "Xem hoa khai trương",
        ctaHref: "#hoa-khai-truong",
        image: "/khai-truong/logo-hoa-khai-truong.jpg",
        imageAlt: "Hoa khai trương",
        floatingElements: {
          primary: "🎊",
          secondary: "🏪"
        }
      }}
      features={{
        sectionId: "hoa-khai-truong",
        tagline: "Ý nghĩa hoa khai trương",
        taglineColor: "text-orange-600",
        title: "Tại Sao Chọn Hoa Khai Trương?",
        description: "Hoa khai trương không chỉ trang trí mà còn mang ý nghĩa phong thủy, thu hút khách hàng và đem lại may mắn.",
        features: [
          {
            icon: TrendingUp,
            title: "Thu Hút Khách Hàng",
            description: "Tạo ấn tượng tốt và thu hút khách hàng ghé thăm",
            color: "orange"
          },
          {
            icon: Star,
            title: "Ý Nghĩa May Mắn",
            description: "Mang lại vận may và thành công trong kinh doanh",
            color: "yellow"
          },
          {
            icon: Gift,
            title: "Thể Hiện Lòng Chúc Mừng",
            description: "Gửi lời chúc mừng chân thành đến chủ cửa hàng",
            color: "green"
          },
          {
            icon: Trophy,
            title: "Tạo Không Khí Lễ Hội",
            description: "Làm cho ngày khai trương thêm trang trọng",
            color: "red"
          }
        ]
      }}
      products={{
        tagline: "Hoa khai trương phổ biến",
        taglineColor: "text-orange-600",
        title: "Loại Hoa Khai Trương Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp khai trương"
      }}
      cta={{
        icon: Store,
        iconBgColor: "bg-orange-100",
        iconColor: "text-orange-600",
        buttonBgColor: "bg-orange-600",
        buttonHoverBgColor: "hover:bg-orange-700",
        buttonBorderColor: "border-orange-600",
        bgGradient: "bg-gradient-to-br from-orange-600 to-orange-700",
        title: "Đặt Hoa Khai Trương Ngay",
        description: "Liên hệ ngay để đặt những lẵng hoa khai trương đẹp nhất, giao hàng đúng giờ trong khu vực Đà Nẵng - Quảng Nam.",
        note: "🎉 Miễn phí thiết kế banner chúc mừng khi đặt lẵng hoa từ 500k"
      }}
      confettiColors={["#FFD700", "#FF6347", "#32CD32", "#FF69B4", "#00CED1", "#FF8C00"]}
    />
  )
}