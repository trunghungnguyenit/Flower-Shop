"use client"

import { Gift, Heart, Cake, Star, Sparkles } from "lucide-react"
import { OccasionLayout } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function BirthdayFlowersPage() {
  return (
    <OccasionLayout
      occasionId="sinh-nhat"
      breadcrumb={{
        current: "Sinh nhật"
      }}
      hero={{
        icon: Cake,
        iconBgColor: "bg-pink-100",
        iconColor: "text-pink-600",
        buttonBgColor: "bg-pink-600",
        buttonHoverBgColor: "hover:bg-pink-700",
        buttonBorderColor: "border-pink-600",
        floatingBgColor: "bg-pink-200",
        tagline: "Sinh nhật đặc biệt",
        title: "Hoa Sinh Nhật",
        subtitle: "Tặng Yêu Thương",
        description: "Những bó hoa sinh nhật tươi đẹp, ý nghĩa để gửi gắm tình cảm và lời chúc tốt đẹp nhất đến người thân yêu.",
        ctaText: "Xem hoa sinh nhật",
        ctaHref: "#hoa-sinh-nhat",
        image: "/tang-sinh-nhat/logo-hoa-sinh-nhat.jpg",
        imageAlt: "Hoa sinh nhật",
        floatingElements: {
          primary: "🎂",
          secondary: "🎈"
        }
      }}
      features={{
        sectionId: "hoa-sinh-nhat",
        tagline: "Ý nghĩa hoa sinh nhật",
        taglineColor: "text-pink-600",
        title: "Vì Sao Chọn Hoa Sinh Nhật?",
        description: "Hoa sinh nhật không chỉ là món quà mà còn là cách thể hiện tình cảm, sự quan tâm và những lời chúc tốt đẹp nhất.",
        features: [
          {
            icon: Heart,
            title: "Thể Hiện Tình Cảm",
            description: "Gửi gắm yêu thương và sự quan tâm đến người thân",
            color: "pink"
          },
          {
            icon: Gift,
            title: "Quà Tặng Ý Nghĩa",
            description: "Món quà tinh tế, phù hợp với mọi lứa tuổi",
            color: "purple"
          },
          {
            icon: Sparkles,
            title: "Tạo Kỷ Niệm Đẹp",
            description: "Làm cho ngày sinh nhật trở nên đặc biệt hơn",
            color: "yellow"
          },
          {
            icon: Star,
            title: "Chúc Phúc May Mắn",
            description: "Mang đến những điều tốt lành và hạnh phúc",
            color: "blue"
          }
        ]
      }}
      products={{
        tagline: "Hoa phổ biến",
        taglineColor: "text-pink-600",
        title: "Loại Hoa Sinh Nhật Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp sinh nhật"
      }}
      cta={{
        icon: Cake,
        iconBgColor: "bg-pink-100",
        iconColor: "text-pink-600",
        buttonBgColor: "bg-pink-600",
        buttonHoverBgColor: "hover:bg-pink-700",
        buttonBorderColor: "border-pink-600",
        bgGradient: "bg-gradient-to-br from-pink-600 to-pink-700",
        title: "Đặt Hoa Sinh Nhật Ngay",
        description: "Liên hệ ngay để đặt những bó hoa sinh nhật đẹp nhất, giao hàng nhanh chóng trong khu vực Đà Nẵng - Quảng Nam."
      }}
      confettiColors={["#FF69B4", "#FFD700", "#FF6347", "#98FB98", "#87CEEB", "#DDA0DD"]}
    />
  )
}