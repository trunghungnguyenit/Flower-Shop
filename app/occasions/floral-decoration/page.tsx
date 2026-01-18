"use client"

import { Home, Palette, Flower2, Lightbulb, Brush } from "lucide-react"
import { OccasionLayout, OccasionBenefitsSection } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function FloralDecorationPage() {
  const additionalSections = (
    <OccasionBenefitsSection
      tagline="Lợi ích vượt trội"
      taglineColor="text-emerald-600"
      title="Tại Sao Chọn Dịch Vụ Trang Trí Hoa?"
      benefits={[
        {
          title: "Cải Thiện Không Khí",
          description: "Hoa tươi giúp thanh lọc không khí và tạo cảm giác thoải mái",
          icon: "🌿"
        },
        {
          title: "Tăng Năng Lượng Tích Cực",
          description: "Màu sắc và hương thơm của hoa mang lại năng lượng tích cực",
          icon: "✨"
        },
        {
          title: "Tạo Ấn Tượng Đẹp",
          description: "Không gian được trang trí hoa luôn để lại ấn tượng tốt",
          icon: "💫"
        },
        {
          title: "Giảm Stress",
          description: "Tiếp xúc với hoa tươi giúp giảm căng thẳng và stress",
          icon: "🧘"
        },
        {
          title: "Tăng Giá Trị Thẩm Mỹ",
          description: "Nâng cao giá trị thẩm mỹ và đẳng cấp của không gian",
          icon: "🎨"
        },
        {
          title: "Phù Hợp Phong Thủy",
          description: "Trang trí theo nguyên tắc phong thủy mang lại may mắn",
          icon: "🍀"
        }
      ]}
    />
  )

  return (
    <OccasionLayout
      occasionId="trang-tri"
      breadcrumb={{
        current: "Trang trí hoa"
      }}
      hero={{
        icon: Brush,
        iconBgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
        buttonBgColor: "bg-emerald-600",
        buttonHoverBgColor: "hover:bg-emerald-700",
        buttonBorderColor: "border-emerald-600",
        floatingBgColor: "bg-emerald-200",
        tagline: "Trang trí chuyên nghiệp",
        title: "Trang Trí Hoa",
        subtitle: "Nghệ Thuật Sống",
        description: "Biến không gian của bạn thành tác phẩm nghệ thuật với dịch vụ trang trí hoa chuyên nghiệp, sáng tạo và tinh tế.",
        ctaText: "Xem dịch vụ",
        ctaHref: "#trang-tri-hoa",
        image: "/trang-tri/logo-hoa-trang-tri.jpg",
        imageAlt: "Trang trí hoa",
        floatingElements: {
          primary: "🎨",
          secondary: "🌺"
        }
      }}
      features={{
        sectionId: "trang-tri-hoa",
        tagline: "Dịch vụ trang trí",
        taglineColor: "text-emerald-600",
        title: "Các Loại Trang Trí Hoa Chúng Tôi Cung Cấp",
        description: "Từ trang trí nội thất đến không gian sự kiện, chúng tôi mang đến giải pháp trang trí hoa toàn diện.",
        features: [
          {
            icon: Home,
            title: "Trang Trí Nội Thất",
            description: "Trang trí hoa cho nhà ở, văn phòng, showroom",
            color: "emerald"
          },
          {
            icon: Palette,
            title: "Thiết Kế Theo Chủ Đề",
            description: "Trang trí theo concept và màu sắc yêu cầu",
            color: "purple"
          },
          {
            icon: Flower2,
            title: "Cắm Hoa Nghệ Thuật",
            description: "Tác phẩm cắm hoa độc đáo và sáng tạo",
            color: "pink"
          },
          {
            icon: Lightbulb,
            title: "Tư Vấn Phong Thủy",
            description: "Trang trí hoa theo nguyên tắc phong thủy",
            color: "amber"
          }
        ]
      }}
      products={{
        tagline: "Hoa trang trí phổ biến",
        taglineColor: "text-emerald-600",
        title: "Loại Hoa Trang Trí Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp trang trí"
      }}
      cta={{
        icon: Brush,
        iconBgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
        buttonBgColor: "bg-emerald-600",
        buttonHoverBgColor: "hover:bg-emerald-700",
        buttonBorderColor: "border-emerald-600",
        bgGradient: "bg-gradient-to-br from-emerald-600 to-emerald-700",
        title: "Tư Vấn Trang Trí Hoa Miễn Phí",
        description: "Liên hệ ngay để được tư vấn miễn phí về dịch vụ trang trí hoa phù hợp với không gian của bạn.",
        note: "🎨 Miễn phí khảo sát và thiết kế concept - Ưu đãi 15% cho khách hàng mới"
      }}
      confettiColors={["#F5B5C8", "#D4A5E8", "#A8D5BA", "#F9E79F", "#AED6F1", "#F5CBA7"]}
      additionalSections={additionalSections}
    />
  )
}