import { Home, UtensilsCrossed, Palette, Flower2, Sofa, Sun, Sparkles, Heart } from "lucide-react"

export interface DecorIdea {
  slug: string
  title: string
  subtitle: string
  heroImage: string
  metaTitle: string
  metaDescription: string
  whySection: {
    title: string
    points: string[]
  }
  positionSection: {
    title: string
    points: string[]
  }
  colorSection: {
    title: string
    points: string[]
  }
  flowerSection: {
    title: string
    points: string[]
  }
  suggestedProductIds: string[]
  ctaTitle: string
  ctaSubtitle: string
}

export const decorIdeas: DecorIdea[] = [
  {
    slug: "hoa-cho-phong-khach",
    title: "Hoa Cho Phòng Khách",
    subtitle: "Tạo điểm nhấn tinh tế, thu hút ánh nhìn ngay khi bước vào nhà.",
    heroImage: "/decor/living-room-flowers.jpg",
    metaTitle: "Hoa Cho Phòng Khách | Ý Tưởng Trang Trí - Hoa Tươi Đà Nẵng",
    metaDescription: "Khám phá các ý tưởng trang trí phòng khách với hoa tươi. Tạo điểm nhấn sang trọng, thu hút ánh nhìn ngay khi bước vào nhà.",
    whySection: {
      title: "Vì sao nên đặt hoa ở phòng khách?",
      points: [
        "Tạo điểm nhấn thị giác ấn tượng cho không gian đón tiếp khách",
        "Mang lại nguồn năng lượng tươi mới, tích cực cho cả gia đình",
        "Khử mùi tự nhiên, làm không khí trong lành và dễ chịu hơn",
        "Thể hiện gu thẩm mỹ và phong cách sống của gia chủ",
      ],
    },
    positionSection: {
      title: "Vị trí đặt hoa gợi ý",
      points: [
        "Bàn trà trung tâm – nơi tập trung ánh nhìn khi bước vào",
        "Kệ TV hoặc console – tạo sự cân đối cho không gian giải trí",
        "Góc sofa – điểm nhấn mềm mại, ấm áp cho khu vực nghỉ ngơi",
        "Cửa sổ – tận dụng ánh sáng tự nhiên, hoa tươi lâu hơn",
        "Kệ trang trí – kết hợp cùng đồ decor tạo bố cục hài hòa",
      ],
    },
    colorSection: {
      title: "Tông màu phù hợp",
      points: [
        "Trắng – xanh lá: Sang trọng, thanh lịch, phù hợp nội thất hiện đại",
        "Pastel nhẹ nhàng: Hồng, tím nhạt, vàng kem – tạo cảm giác dịu dàng",
        "Cam – vàng ấm: Mang lại năng lượng tích cực, phù hợp phong cách Bohemian",
        "Đỏ – burgundy: Sang trọng, quyền quý, phù hợp nội thất cổ điển",
      ],
    },
    flowerSection: {
      title: "Loại hoa gợi ý",
      points: [
        "Hoa hồng: Cổ điển, thanh lịch, nhiều màu sắc lựa chọn",
        "Hoa cẩm tú cầu: Bông to, tròn đầy, tạo điểm nhấn mạnh",
        "Hoa lily: Hương thơm dịu, sang trọng, phù hợp phòng rộng",
        "Hoa lan hồ điệp: Quý phái, bền lâu, phù hợp nội thất cao cấp",
        "Hoa lá phụ: Eucalyptus, baby, limonium tạo độ phong phú",
      ],
    },
    suggestedProductIds: ["1", "2", "5", "6", "7", "8"],
    ctaTitle: "Nhờ chúng tôi tư vấn decor riêng cho phòng khách của bạn",
    ctaSubtitle: "Gửi hình không gian + ngân sách, chúng tôi sẽ đề xuất mẫu hoa phù hợp nhất.",
  },
  {
    slug: "hoa-ban-an",
    title: "Hoa Bàn Ăn",
    subtitle: "Mang lại sự ấm cúng và gắn kết trong từng bữa ăn gia đình.",
    heroImage: "/decor/dining-table-flowers.jpg",
    metaTitle: "Hoa Bàn Ăn | Ý Tưởng Trang Trí - Hoa Tươi Đà Nẵng",
    metaDescription: "Khám phá các ý tưởng trang trí bàn ăn với hoa tươi. Mang lại sự ấm cúng và gắn kết trong từng bữa ăn gia đình.",
    whySection: {
      title: "Vì sao nên đặt hoa ở bàn ăn?",
      points: [
        "Tạo không khí ấm cúng, thân mật cho bữa ăn gia đình",
        "Kích thích vị giác và tạo cảm giác ngon miệng hơn",
        "Biến bữa ăn thường ngày thành khoảnh khắc đặc biệt",
        "Thể hiện sự chăm chút, yêu thương dành cho người thân",
      ],
    },
    positionSection: {
      title: "Vị trí đặt hoa gợi ý",
      points: [
        "Giữa bàn ăn – vị trí trung tâm, cân đối với các ghế ngồi",
        "Kết hợp nến thơm – tạo không khí lãng mạn cho bữa tối",
        "Đặt trên khăn runner – tạo bố cục đẹp mắt, chuyên nghiệp",
        "Lọ hoa thấp – không che tầm nhìn khi trò chuyện",
        "Nhiều lọ nhỏ phân bố – phù hợp bàn dài, tiệc họp mặt",
      ],
    },
    colorSection: {
      title: "Tông màu phù hợp",
      points: [
        "Trắng – xanh lá nhạt: Tươi mát, sạch sẽ, phù hợp mọi bữa ăn",
        "Vàng – cam nhẹ: Ấm áp, kích thích vị giác, tạo cảm giác ngon miệng",
        "Pastel mix: Nhẹ nhàng, tinh tế, không làm phân tán sự chú ý",
        "Theo mùa: Đỏ cho Tết, cam cho Thu, xanh mát cho Hè",
      ],
    },
    flowerSection: {
      title: "Loại hoa gợi ý",
      points: [
        "Hoa cúc mini: Xinh xắn, bền lâu, không hương mạnh",
        "Hoa hồng nhỏ: Thanh lịch, nhiều màu, phù hợp lọ nhỏ",
        "Hoa baby: Nhẹ nhàng, bay bổng, kết hợp với các loại khác",
        "Hoa cẩm chướng: Màu sắc đa dạng, bền, giá hợp lý",
        "Lưu ý: Tránh hoa có hương quá mạnh ảnh hưởng bữa ăn",
      ],
    },
    suggestedProductIds: ["1", "5", "9", "10", "11", "12"],
    ctaTitle: "Nhờ chúng tôi tư vấn decor riêng cho bàn ăn của bạn",
    ctaSubtitle: "Gửi hình không gian + ngân sách, chúng tôi sẽ đề xuất mẫu hoa phù hợp nhất.",
  },
  {
    slug: "hoa-tone-pastel",
    title: "Hoa Tone Pastel",
    subtitle: "Mang vẻ đẹp dịu dàng, hiện đại cho căn hộ của bạn.",
    heroImage: "/decor/pastel-flowers-modern.jpg",
    metaTitle: "Hoa Tone Pastel | Ý Tưởng Trang Trí - Hoa Tươi Đà Nẵng",
    metaDescription: "Khám phá các ý tưởng trang trí với hoa tone pastel. Mang vẻ đẹp dịu dàng, hiện đại cho căn hộ của bạn.",
    whySection: {
      title: "Vì sao chọn hoa tone pastel?",
      points: [
        "Tạo cảm giác thư giãn, giảm căng thẳng sau ngày dài",
        "Phù hợp hoàn hảo với phong cách nội thất hiện đại, tối giản",
        "Màu sắc nhẹ nhàng, không làm không gian bị quá tải",
        "Dễ kết hợp với nhiều phong cách decor khác nhau",
      ],
    },
    positionSection: {
      title: "Vị trí đặt hoa gợi ý",
      points: [
        "Phòng ngủ – tạo không gian yên bình, thư giãn",
        "Góc làm việc – mang lại cảm hứng sáng tạo",
        "Phòng tắm – spa tại gia, thư giãn mỗi ngày",
        "Lối vào căn hộ – chào đón với sự nhẹ nhàng",
        "Kệ sách – điểm nhấn tinh tế giữa các cuốn sách",
      ],
    },
    colorSection: {
      title: "Tông màu phù hợp",
      points: [
        "Hồng phấn (Blush Pink): Nữ tính, lãng mạn, ấm áp",
        "Xanh mint nhạt: Tươi mát, hiện đại, tạo cảm giác sạch sẽ",
        "Tím lavender: Thư giãn, bình yên, phù hợp phòng ngủ",
        "Vàng kem (Butter Yellow): Nhẹ nhàng, ấm áp, tạo sự ấm cúng",
        "Mix pastel: Kết hợp 2-3 tone tạo sự phong phú nhưng vẫn hài hòa",
      ],
    },
    flowerSection: {
      title: "Loại hoa gợi ý",
      points: [
        "Hồng pastel: David Austin, Juliet, Quicksand – tone màu đẹp tự nhiên",
        "Cẩm tú cầu pastel: Xanh nhạt, hồng nhạt, tím lavender",
        "Hoa mao lương (Ranunculus): Nhiều lớp cánh, màu pastel đa dạng",
        "Hoa tulip pastel: Sang trọng, hiện đại, phù hợp lọ dài",
        "Hoa cát tường (Lisianthus): Mềm mại, nhiều màu pastel đẹp",
      ],
    },
    suggestedProductIds: ["1", "5", "7", "8", "9", "10"],
    ctaTitle: "Nhờ chúng tôi tư vấn decor pastel cho căn hộ của bạn",
    ctaSubtitle: "Gửi hình không gian + ngân sách, chúng tôi sẽ đề xuất mẫu hoa phù hợp nhất.",
  },
  {
    slug: "hoa-ban-cong",
    title: "Hoa Ban Công",
    subtitle: "Biến ban công thành góc xanh thư giãn giữa lòng thành phố.",
    heroImage: "/decor/balcony-flowers.jpg",
    metaTitle: "Hoa Ban Công | Ý Tưởng Trang Trí - Hoa Tươi Đà Nẵng",
    metaDescription: "Khám phá các ý tưởng trang trí ban công với hoa tươi. Biến ban công thành góc xanh thư giãn giữa lòng thành phố.",
    whySection: {
      title: "Vì sao nên đặt hoa ở ban công?",
      points: [
        "Tạo góc thư giãn riêng tư giữa nhịp sống đô thị",
        "Tận dụng ánh sáng tự nhiên, hoa phát triển khỏe mạnh",
        "Cải thiện chất lượng không khí, tạo oxy tươi mát",
        "Biến không gian nhỏ thành vườn mini đáng yêu",
      ],
    },
    positionSection: {
      title: "Vị trí đặt hoa gợi ý",
      points: [
        "Lan can – treo hoặc đặt chậu dọc theo rào chắn",
        "Góc ban công – tạo điểm nhấn với chậu lớn",
        "Kệ nhiều tầng – tối ưu không gian, tạo chiều sâu",
        "Treo tường – tiết kiệm diện tích, tạo tường xanh",
        "Bàn nhỏ – kết hợp ghế ngồi thư giãn uống trà",
      ],
    },
    colorSection: {
      title: "Tông màu phù hợp",
      points: [
        "Xanh lá đậm + hoa trắng: Tươi mát, thanh lịch, dễ chăm sóc",
        "Hồng – tím hoa cà: Lãng mạn, nữ tính, phù hợp ban công nhỏ",
        "Cam – vàng rực rỡ: Năng động, vui tươi, phù hợp hướng Đông",
        "Mix nhiều màu: Sôi động, vui mắt, phong cách tropical",
      ],
    },
    flowerSection: {
      title: "Loại hoa gợi ý",
      points: [
        "Hoa phong lan (dạ yến thảo): Dễ chăm, ra hoa quanh năm",
        "Hoa hồng mini: Nhiều màu, thích hợp chậu nhỏ",
        "Hoa cúc: Bền, nhiều màu, chịu nắng tốt",
        "Hoa giấy (Bougainvillea): Rực rỡ, chịu nắng, ít tưới",
        "Hoa sen đá: Dễ chăm, phù hợp ban công nắng gắt",
        "Lưu ý: Chọn hoa phù hợp với hướng ban công (nắng/râm)",
      ],
    },
    suggestedProductIds: ["5", "6", "7", "8", "11", "12"],
    ctaTitle: "Nhờ chúng tôi tư vấn decor riêng cho ban công của bạn",
    ctaSubtitle: "Gửi hình không gian + ngân sách, chúng tôi sẽ đề xuất mẫu hoa phù hợp nhất.",
  },
]

export function getDecorIdeaBySlug(slug: string): DecorIdea | undefined {
  return decorIdeas.find((idea) => idea.slug === slug)
}

export function getAllDecorSlugs(): string[] {
  return decorIdeas.map((idea) => idea.slug)
}

// Icon mapping for sections
export const sectionIcons = {
  why: Home,
  position: Sofa,
  color: Palette,
  flower: Flower2,
} as const
