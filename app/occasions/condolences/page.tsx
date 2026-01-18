"use client"

import { Heart, Flower, Users, Shield, Clock } from "lucide-react"
import { OccasionLayout, OccasionInfoSection } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function CondolenceFlowersPage() {
  const additionalSections = (
    <OccasionInfoSection
      icon={Clock}
      iconBgColor="bg-blue-100"
      iconColor="text-blue-600"
      title="Lưu Ý Quan Trọng"
      infoItems={[
        {
          title: "Thời Gian Giao Hàng",
          items: [
            "Giao hàng 24/7 trong trường hợp khẩn cấp",
            "Cam kết giao đúng giờ theo yêu cầu",
            "Hỗ trợ giao hàng tận nơi trong khu vực"
          ]
        },
        {
          title: "Dịch Vụ Hỗ Trợ",
          items: [
            "Tư vấn miễn phí về loại hoa phù hợp",
            "Thiết kế theo yêu cầu riêng",
            "Hỗ trợ viết băng rôn, thiệp chia buồn"
          ]
        }
      ]}
    />
  )

  return (
    <OccasionLayout
      occasionId="chia-buon"
      breadcrumb={{
        current: "Chia buồn"
      }}
      hero={{
        icon: Heart,
        iconBgColor: "bg-gray-100",
        iconColor: "text-black",
        buttonBgColor: "bg-gray-600",
        buttonHoverBgColor: "hover:bg-gray-700",
        buttonBorderColor: "border-gray-600",
        floatingBgColor: "bg-gray-200",
        tagline: "Chia buồn chân thành",
        title: "Hoa Chia Buồn",
        subtitle: "Tưởng Nhớ Yêu Thương",
        description: "Gửi lời chia buồn chân thành và tưởng nhớ người đã khuất với những vòng hoa và lẵng hoa trang nghiêm, ý nghĩa.",
        ctaText: "Xem hoa chia buồn",
        ctaHref: "#hoa-chia-buon",
        image: "/chia-buon/logo-hoa-chia-buon.jpg",
        imageAlt: "Hoa chia buồn",
        floatingElements: {
          primary: "🕊️",
          secondary: "🤍"
        }
      }}
      features={{
        sectionId: "hoa-chia-buon",
        tagline: "Dịch vụ hoa chia buồn",
        taglineColor: "text-gray-600",
        title: "Các Loại Hoa Chia Buồn",
        description: "Chúng tôi cung cấp đầy đủ các loại hoa chia buồn phù hợp với từng hoàn cảnh và truyền thống.",
        features: [
          {
            icon: Flower,
            title: "Vòng Hoa Chia Buồn",
            description: "Vòng hoa trang nghiêm cho lễ tang",
            color: "gray"
          },
          {
            icon: Heart,
            title: "Lẵng Hoa Chia Buồn",
            description: "Lẵng hoa thể hiện lòng thương tiếc",
            color: "slate"
          },
          {
            icon: Users,
            title: "Hoa Để Bàn Thờ",
            description: "Hoa tươi trang trí bàn thờ gia tiên",
            color: "zinc"
          },
          {
            icon: Shield,
            title: "Hoa Tưởng Niệm",
            description: "Hoa dành cho lễ tưởng niệm, cúng giỗ",
            color: "neutral"
          }
        ]
      }}
      products={{
        tagline: "Hoa chia buồn phổ biến",
        taglineColor: "text-gray-600",
        title: "Loại Hoa Chia Buồn Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp chia buồn"
      }}
      cta={{
        icon: Heart,
        iconBgColor: "bg-gray-100",
        iconColor: "text-gray-600",
        buttonBgColor: "bg-gray-600",
        buttonHoverBgColor: "hover:bg-gray-700",
        buttonBorderColor: "border-gray-600",
        bgGradient: "bg-gradient-to-br from-gray-700 to-gray-800",
        title: "Liên Hệ Đặt Hoa Chia Buồn",
        description: "Chúng tôi hiểu được sự khó khăn trong những lúc này. Liên hệ ngay để được hỗ trợ tận tình và chu đáo.",
        note: "🤍 Chúng tôi luôn sẵn sàng hỗ trợ bạn trong những lúc khó khăn"
      }}
      additionalSections={additionalSections}
    />
  )
}