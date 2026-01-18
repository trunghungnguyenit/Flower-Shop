"use client"

import { Calendar, Users, Camera, Mic, Award } from "lucide-react"
import { OccasionLayout, OccasionProcessSection } from "@/components/occasion"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function EventFlowersPage() {
  const additionalSections = (
    <OccasionProcessSection
      tagline="Quy trình làm việc"
      taglineColor="text-purple-600"
      title="4 Bước Đơn Giản Để Có Sự Kiện Hoàn Hảo"
      stepBgColor="bg-purple-600"
      steps={[
        {
          step: "01",
          title: "Tư Vấn & Khảo Sát",
          description: "Tìm hiểu yêu cầu và khảo sát địa điểm tổ chức"
        },
        {
          step: "02",
          title: "Thiết Kế & Báo Giá",
          description: "Thiết kế concept và gửi báo giá chi tiết"
        },
        {
          step: "03",
          title: "Chuẩn Bị Hoa",
          description: "Chuẩn bị và gia công hoa theo thiết kế"
        },
        {
          step: "04",
          title: "Thi Công & Bàn Giao",
          description: "Thi công tại địa điểm và bàn giao hoàn thiện"
        }
      ]}
    />
  )

  return (
    <OccasionLayout
      occasionId="su-kien"
      breadcrumb={{
        current: "Hoa sự kiện"
      }}
      hero={{
        icon: Calendar,
        iconBgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        buttonBgColor: "bg-purple-600",
        buttonHoverBgColor: "hover:bg-purple-700",
        buttonBorderColor: "border-purple-600",
        floatingBgColor: "bg-purple-200",
        tagline: "Sự kiện đặc biệt",
        title: "Hoa Trang Trí Sự Kiện",
        subtitle: "Ấn Tượng Khó Quên",
        description: "Tạo nên những sự kiện đáng nhớ với dịch vụ trang trí hoa chuyên nghiệp cho hội nghị, tiệc, lễ kỷ niệm và các sự kiện đặc biệt.",
        ctaText: "Xem dịch vụ",
        ctaHref: "#hoa-su-kien",
        image: "/su-kien/logo-hoa-su-kien.jpg",
        imageAlt: "Hoa trang trí sự kiện",
        floatingElements: {
          primary: "🎪",
          secondary: "🎭"
        }
      }}
      features={{
        sectionId: "hoa-su-kien",
        tagline: "Dịch vụ hoa sự kiện",
        taglineColor: "text-purple-600",
        title: "Các Loại Sự Kiện Chúng Tôi Phục Vụ",
        description: "Từ hội nghị doanh nghiệp đến tiệc sinh nhật, chúng tôi cung cấp dịch vụ trang trí hoa toàn diện.",
        features: [
          {
            icon: Users,
            title: "Hội Nghị & Seminar",
            description: "Trang trí chuyên nghiệp cho sự kiện doanh nghiệp",
            color: "purple"
          },
          {
            icon: Camera,
            title: "Tiệc & Lễ Kỷ Niệm",
            description: "Tạo không gian lãng mạn cho các buổi tiệc",
            color: "pink"
          },
          {
            icon: Mic,
            title: "Sự Kiện Ra Mắt",
            description: "Trang trí ấn tượng cho lễ ra mắt sản phẩm",
            color: "blue"
          },
          {
            icon: Award,
            title: "Lễ Trao Giải",
            description: "Không gian trang trọng cho lễ trao giải",
            color: "green"
          }
        ]
      }}
      products={{
        tagline: "Hoa sự kiện phổ biến",
        taglineColor: "text-purple-600",
        title: "Loại Hoa Sự Kiện Được Yêu Thích",
        emptyMessage: "Chưa có sản phẩm cho dịp sự kiện"
      }}
      cta={{
        icon: Calendar,
        iconBgColor: "bg-purple-100",
        iconColor: "text-purple-600",
        buttonBgColor: "bg-purple-600",
        buttonHoverBgColor: "hover:bg-purple-700",
        buttonBorderColor: "border-purple-600",
        bgGradient: "bg-gradient-to-br from-purple-600 to-purple-700",
        title: "Đặt Dịch Vụ Trang Trí Sự Kiện",
        description: "Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất cho sự kiện của bạn.",
        note: "🎉 Miễn phí tư vấn thiết kế - Giảm 10% cho khách hàng đặt sớm"
      }}
      confettiColors={["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]}
      additionalSections={additionalSections}
    />
  )
}