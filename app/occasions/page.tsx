"use client";

import {
  Sparkles,
  Cake,
  Heart,
  Store,
  Flower,
  Calendar,
  Brush,
} from "lucide-react";
import { OccasionsMainLayout } from "@/components/occasion";

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function OccasionsPage() {
  // Occasions data
  const occasions = [
    {
      id: "new-year",
      title: "Tết Nguyên Đán",
      description:
        "Hoa tươi đón xuân, mang lại may mắn và thịnh vượng cho năm mới",
      image: "/tet/tet-9.jpg",
      href: "/occasions/new-year",
      icon: Sparkles,
      color: "red",
      emoji: "🧧",
    },
    {
      id: "birthday",
      title: "Sinh Nhật",
      description:
        "Những bó hoa sinh nhật tươi đẹp, gửi gắm yêu thương và lời chúc",
      image: "/tang-sinh-nhat/sinh-nhat-9.jpg",
      href: "/occasions/birthday",
      icon: Cake,
      color: "pink",
      emoji: "🎂",
    },
    {
      id: "wedding",
      title: "Đám Cưới",
      description: "Hoa cưới lãng mạn cho ngày trọng đại, tình yêu vĩnh cửu",
      image: "/cuoi/cuoi-9.jpg",
      href: "/occasions/wedding",
      icon: Heart,
      color: "rose",
      emoji: "💒",
    },
    {
      id: "opening",
      title: "Khai Trương",
      description: "Lẵng hoa khai trương mang ý nghĩa thành công và phát đạt",
      image: "/khai-truong/khai-truong.jpg",
      href: "/occasions/opening",
      icon: Store,
      color: "orange",
      emoji: "🎊",
    },
    {
      id: "condolences",
      title: "Chia Buồn",
      description: "Hoa chia buồn trang nghiêm, thể hiện lòng thương tiếc",
      image: "/chia-buon/chia-buon-1.jpg",
      href: "/occasions/condolences",
      icon: Flower,
      color: "gray",
      emoji: "🕊️",
    },
    {
      id: "event-flowers",
      title: "Hoa Sự Kiện",
      description: "Trang trí hoa cho các sự kiện, hội nghị và tiệc tùng",
      image: "/su-kien/hoa-su-kien-1.jpg",
      href: "/occasions/event-flowers",
      icon: Calendar,
      color: "purple",
      emoji: "🎪",
    },
    {
      id: "floral-decoration",
      title: "Trang Trí Hoa",
      description: "Dịch vụ trang trí hoa chuyên nghiệp cho mọi không gian",
      image: "/trang-tri/trang-tri-9.jpg",
      href: "/occasions/floral-decoration",
      icon: Brush,
      color: "emerald",
      emoji: "🎨",
    },
  ];

  return <OccasionsMainLayout occasions={occasions} />;
}