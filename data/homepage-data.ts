import { 
  HeartHandshake, 
  Cake, 
  Flower2, 
  Store, 
  Gem, 
  Home, 
  Heart, 
  Sparkles, 
  Gift,
  Truck,
  Clock,
  Shield,
  type LucideIcon 
} from "lucide-react"

// ================================================================
// DATA & CONSTANTS
// ================================================================

export const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Dịch vụ", href: "/occasions" },
  { name: "Bộ sưu tập", href: "/collection" },
  { name: "Blog", href: "/blog" },
  { name: "Liên hệ", href: "/#lien-he" },
]

export const heroSlides = [
  {
    image: "/anh-nen/hoa-nen.jpg",
    title: "Trao Yêu Thương",
    subtitle: "Gửi Trọn Cảm Xúc Bằng Hoa Tươi",
    description: "Hoa tươi 100% mỗi ngày • Thiết kế tinh tế • Giao nhanh trong 2 giờ tại Đà Nẵng – Quảng Nam",
  },
  {
    image: "/anh-nen/hoa-nen-2.jpg",
    title: "Lãng Mạn Từng Cánh Hoa",
    subtitle: "Dành Tặng Người Thương",
    description: "Hàng ngàn mẫu hoa đẹp • Thiết kế riêng theo yêu cầu",
  },
  {
    image: "/anh-nen/hoa-nen-4.jpg",
    title: "Ngày Trọng Đại",
    subtitle: "Hoàn Hảo Với Hoa Tươi",
    description: "Chuyên hoa cưới • Trang trí sự kiện cao cấp",
  },
]

export const scenarios: {
  icon: LucideIcon
  title: string
  tagline: string
  href: string
  count: number
  occasionId: string  // Thêm field này để mapping
}[] = [
  { icon: HeartHandshake, title: "Tặng người yêu", tagline: "Nói những điều khó nói bằng sắc hoa lãng mạn.", href: "/collection?scenario=tinh-yeu", count: 86, occasionId: "tinh-yeu" },
  { icon: Cake, title: "Sinh nhật", tagline: "Gửi lời chúc trọn vẹn và đầy bất ngờ.", href: "/collection?scenario=sinh-nhat", count: 72, occasionId: "sinh-nhat" },
  { icon: Flower2, title: "Tặng mẹ", tagline: "Tri ân dịu dàng dành cho người phụ nữ tuyệt vời nhất.", href: "/collection?scenario=tang-me", count: 54, occasionId: "tang-me" },
  { icon: Store, title: "Khai trương", tagline: "Tượng trưng cho may mắn và khởi đầu thuận lợi.", href: "/collection?scenario=khai-truong", count: 48, occasionId: "khai-truong" },
  { icon: Gem, title: "Cưới hỏi", tagline: "Thanh lịch – trang trọng – hoàn hảo cho ngày trọng đại.", href: "/collection?scenario=cuoi", count: 65, occasionId: "cuoi" },
  { icon: Home, title: "Trang trí nhà", tagline: "Làm bừng sáng không gian sống mỗi ngày.", href: "/collection?scenario=trang-tri", count: 42, occasionId: "trang-tri" },
]

export const giftGuides: {
  icon: LucideIcon
  title: string
  description: string
  href: string
  giftGuideId: string
}[] = [
  { icon: Heart, title: "Cho người yêu", description: "Hoa hồng – hoa lan: đại diện cho tình yêu sâu đậm và chân thành.", href: "/collection?giftGuide=nguoi-yeu", giftGuideId: "nguoi-yeu" },
  { icon: Flower2, title: "Cho mẹ", description: "Hoa ly – cẩm chướng: gửi lời tri ân đến đấng sinh thành.", href: "/collection?giftGuide=me", giftGuideId: "me" },
  { icon: Sparkles, title: "Cho bạn thân", description: "Hoa hướng dương – hoa mix: mang đến sự vui tươi và năng lượng tích cực.", href: "/collection?giftGuide=ban-than", giftGuideId: "ban-than" },
  { icon: Gift, title: "Cho sếp", description: "Lẵng hoa sang trọng – tinh tế, thể hiện sự trân trọng và chuyên nghiệp.", href: "/collection?giftGuide=sep", giftGuideId: "sep" },
  { icon: Gem, title: "Cho vợ/chồng", description: "Thiết kế cao cấp – giúp giữ trọn ngọn lửa yêu thương.", href: "/collection?giftGuide=vo-chong", giftGuideId: "vo-chong" },
]

export const categories = [
  { name: "Sinh nhật", image: "/tang-sinh-nhat/sinh-nhat-5.jpg", href: "/collection?scenario=sinh-nhat", count: 45, occasionId: "sinh-nhat" },
  { name: "Tình yêu", image: "/tang-nguoi-yeu/nguoi-iu-13.jpg", href: "/collection?scenario=tinh-yeu", count: 62, occasionId: "tinh-yeu" },
  { name: "Cưới hỏi", image: "/cuoi/cuoi-9.jpg", href: "/collection?scenario=cuoi", count: 38, occasionId: "cuoi" },
  { name: "Khai trương", image: "/khai-truong/khai-truong.jpg", href: "/collection?scenario=khai-truong", count: 28, occasionId: "khai-truong" },
  { name: "Chia buồn", image: "/chia-buon/chia-buon-1.jpg", href: "/collection?scenario=chia-buon", count: 22, occasionId: "chia-buon" },
  { name: "Trang trí", image: "/trang-tri/trang-tri-4.jpg", href: "/collection?scenario=trang-tri", count: 35, occasionId: "trang-tri" },
  { name: "Hoa Tết", image: "/tet/tet-9.jpg", href: "/collection?scenario=tet", count: 40, occasionId: "tet" },
  // { name: "Chúc mừng", image: "/khai-truong/khai-truong-6.jpg", href: "/collection?scenario=chuc-mung", count: 32, occasionId: "chuc-mung" },
  { name: "Sự kiện", image: "/su-kien/hoa-su-kien-1.jpg", href: "/collection?scenario=su-kien", count: 25, occasionId: "su-kien" },
]

export const uspItems = [
  { icon: Truck, title: "Freeship 5km", description: "Giao nhanh – an toàn – đúng mẫu" },
  { icon: Clock, title: "Giao Nhanh 2 Giờ", description: "Ưu tiên những đơn gấp, chuẩn thời gian" },
  { icon: Gift, title: "Combo Ưu Đãi", description: "Tiết kiệm hơn – giá trị nhiều hơn" },
  { icon: Shield, title: "Hoa Tươi 100%", description: "Hoàn tiền nếu hoa không đạt chất lượng" },
]

export const reviews = [
  {
    name: "Nguyễn Thị Hương",
    avatar: "/tang-nguoi-yeu/nguoi-iu-8.jpg",
    rating: 5,
    content: "Hoa tươi lâu, thiết kế đẹp hơn cả mong đợi. Giao nhanh và rất chuyên nghiệp.",
    productImage: "/tang-nguoi-yeu/nguoi-iu-8.jpg",
    date: "2 ngày trước",
  },
  {
    name: "Trần Văn Minh",
    avatar: "/tang-me/me-6.jpg",
    rating: 5,
    content: "Vợ mình rất xúc động khi nhận hoa. Shop làm chỉn chu từng chi tiết.",
    productImage: "/tang-me/me-6.jpg",
    date: "1 tuần trước",
  },
  {
    name: "Lê Thị Mai",
    avatar: "/tang-nguoi-yeu/nguoi-iu-11.jpg",
    rating: 5,
    content: "Hoa cưới đẹp xuất sắc. Đội ngũ tư vấn nhiệt tình và dễ thương.",
    productImage: "/tang-nguoi-yeu/nguoi-iu-11.jpg",
    date: "2 tuần trước",
  },
]