"use client"

import { Home, Sparkles, Calendar, Gift } from "lucide-react"
import { OccasionLayout } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function NewYearFlowersPage() {
  return (
    <OccasionLayout
      occasionId="tet"
      breadcrumb={{
        current: "Tết Nguyên Đán"
      }}
      hero={{
        icon: Sparkles,
        iconBgColor: "bg-red-100",
        iconColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        buttonHoverBgColor: "hover:bg-red-700",
        buttonBorderColor: "border-red-600",
        floatingBgColor: "bg-red-200",
        tagline: "Tết Nguyên Đán 2025",
        title: "Hoa Tết Đón Xuân",
        subtitle: "Phú Quý An Khang",
        description: "Chọn những mẫu hoa tươi đẹp nhất để trang trí nhà cửa, đón Tết Nguyên Đán 2025 thật ý nghĩa và may mắn.",
        ctaText: "Xem hoa Tết",
        ctaHref: "#hoa-tet",
        image: "/tet/tet-3.jpg",
        imageAlt: "Hoa Tết Nguyên Đán",
        floatingElements: {
          primary: "🧧",
          secondary: "🏮"
        }
      }}
      features={{
        sectionId: "hoa-tet",
        tagline: "Ý nghĩa hoa Tết",
        taglineColor: "text-red-600",
        title: "Tại Sao Nên Chọn Hoa Tết?",
        description: "Hoa tươi không chỉ làm đẹp không gian mà còn mang ý nghĩa phong thủy, đem lại may mắn và thịnh vượng cho gia đình.",
        features: [
          {
            icon: Home,
            title: "Trang Trí Nhà Cửa",
            description: "Làm đẹp không gian sống, tạo không khí Tết ấm cúng",
            color: "red"
          },
          {
            icon: Gift,
            title: "Quà Tặng Ý Nghĩa",
            description: "Thể hiện lòng thành kính với người thân, bạn bè",
            color: "yellow"
          },
          {
            icon: Sparkles,
            title: "May Mắn Thịnh Vượng",
            description: "Mang lại tài lộc, sức khỏe cho năm mới",
            color: "green"
          },
          {
            icon: Calendar,
            title: "Truyền Thống Văn Hóa",
            description: "Giữ gìn nét đẹp văn hóa Việt Nam ngàn đời",
            color: "purple"
          }
        ]
      }}
      products={{
        tagline: "Hoa Tết phổ biến",
        taglineColor: "text-red-600",
        title: "Loại Hoa Tết Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp Tết"
      }}
      cta={{
        icon: Sparkles,
        iconBgColor: "bg-red-100",
        iconColor: "text-red-600",
        buttonBgColor: "bg-red-600",
        buttonHoverBgColor: "hover:bg-red-700",
        buttonBorderColor: "border-red-600",
        bgGradient: "bg-gradient-to-br from-red-600 to-red-700",
        title: "Đặt Hoa Tết Ngay Hôm Nay",
        description: "Liên hệ ngay để được tư vấn và đặt những mẫu hoa Tết đẹp nhất, giao hàng tận nơi trong khu vực Đà Nẵng - Quảng Nam."
      }}
      confettiColors={["#FF6B6B", "#FFD93D", "#6BCF7F", "#4D96FF", "#9B59B6", "#FF8C42"]}
    />
  )
}