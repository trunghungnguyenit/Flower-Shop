export interface Product {
  id: string
  name: string
  price: string
  image: string
  slug: string
  category: string
  occasion: string[]
  description: string
  images: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Hồng Pastel Ngọt Ngào",
    price: "450.000đ",
    image: "/pastel-pink-roses-bouquet-soft-elegant.jpg",
    slug: "hong-pastel-ngot-ngao",
    category: "bo-hoa",
    occasion: ["sinh-nhat", "tinh-yeu"],
    description: "Bó hoa hồng pastel nhẹ nhàng, thích hợp làm quà tặng sinh nhật hoặc bày tỏ tình cảm.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "2",
    name: "Lẵng Hoa Hồng Đỏ",
    price: "650.000đ",
    image: "/red-roses-luxury-basket-arrangement.jpg",
    slug: "lang-hoa-hong-do",
    category: "lang-hoa",
    occasion: ["tinh-yeu", "ky-niem"],
    description: "Lẵng hoa hồng đỏ thắm, biểu tượng của tình yêu nồng cháy và sự lãng mạn.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "3",
    name: "Hoa Cưới Trắng Tinh Khôi",
    price: "Liên hệ báo giá",
    image: "/white-wedding-bouquet-elegant-roses.jpg",
    slug: "hoa-cuoi-trang",
    category: "hoa-cuoi",
    occasion: ["cuoi"],
    description: "Bó hoa cưới trắng tinh khôi, mang vẻ đẹp thuần khiết cho ngày trọng đại.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "4",
    name: "Hoa Tết Phú Quý",
    price: "850.000đ",
    image: "/vietnamese-new-year-flower-arrangement-yellow-peac.jpg",
    slug: "hoa-tet-phu-quy",
    category: "hoa-tet",
    occasion: ["tet"],
    description: "Lẵng hoa Tết với sắc vàng rực rỡ, mang ý nghĩa tài lộc và may mắn cho năm mới.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "5",
    name: "Bó Hoa Mix Pastel",
    price: "380.000đ",
    image: "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    slug: "bo-hoa-mix-pastel",
    category: "bo-hoa",
    occasion: ["sinh-nhat", "cam-on"],
    description: "Bó hoa mix nhiều loại hoa pastel, mang đến cảm giác tươi mới và nhẹ nhàng.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "6",
    name: "Hoa Hướng Dương Rạng Ngời",
    price: "420.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "hoa-huong-duong",
    category: "bo-hoa",
    occasion: ["sinh-nhat", "khai-truong"],
    description: "Bó hoa hướng dương tươi sáng, biểu tượng của niềm vui và sự lạc quan.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "7",
    name: "Hoa Cúc Trắng Chia Buồn",
    price: "500.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "hoa-cuc-chia-buon",
    category: "hoa-chia-buon",
    occasion: ["chia-buon"],
    description: "Vòng hoa chia buồn trang nghiêm, thể hiện sự tôn kính và chia sẻ mất mát.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "8",
    name: "Lẵng Hoa Khai Trương",
    price: "1.200.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "lang-hoa-khai-truong",
    category: "hoa-khai-truong",
    occasion: ["khai-truong"],
    description: "Lẵng hoa khai trương hoành tráng, chúc mừng thành công và phát đạt.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "9",
    name: "Hoa Ly Trắng Thanh Cao",
    price: "550.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "hoa-ly-trang",
    category: "bo-hoa",
    occasion: ["sinh-nhat", "cam-on"],
    description: "Bó hoa ly trắng tinh khôi, tượng trưng cho sự thanh cao và thuần khiết.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "10",
    name: "Hoa Tulip Hà Lan",
    price: "680.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "hoa-tulip",
    category: "bo-hoa",
    occasion: ["sinh-nhat", "tinh-yeu"],
    description: "Bó hoa tulip nhập khẩu từ Hà Lan, mang vẻ đẹp sang trọng châu Âu.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "11",
    name: "Giỏ Hoa Trang Trí Văn Phòng",
    price: "350.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "gio-hoa-van-phong",
    category: "hoa-trang-tri",
    occasion: ["trang-tri"],
    description: "Giỏ hoa nhỏ xinh thích hợp trang trí bàn làm việc, mang thiên nhiên vào văn phòng.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
  {
    id: "12",
    name: "Mai Vàng Tết",
    price: "2.500.000đ",
    image: "/placeholder.svg?height=400&width=400",
    slug: "mai-vang-tet",
    category: "hoa-tet",
    occasion: ["tet"],
    description: "Cành mai vàng rực rỡ, biểu tượng của mùa xuân và sự thịnh vượng.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
  },
]

export const categories = [
  { id: "all", name: "Tất cả" },
  { id: "bo-hoa", name: "Bó hoa" },
  { id: "lang-hoa", name: "Lẵng hoa" },
  { id: "hoa-cuoi", name: "Hoa cưới" },
  { id: "hoa-tet", name: "Hoa Tết" },
  { id: "hoa-chia-buon", name: "Hoa chia buồn" },
  { id: "hoa-khai-truong", name: "Hoa khai trương" },
  { id: "hoa-trang-tri", name: "Hoa trang trí" },
]

export const occasions = [
  { id: "all", name: "Tất cả" },
  { id: "sinh-nhat", name: "Sinh nhật" },
  { id: "tinh-yeu", name: "Tình yêu" },
  { id: "cuoi", name: "Cưới" },
  { id: "tet", name: "Tết" },
  { id: "chia-buon", name: "Chia buồn" },
  { id: "khai-truong", name: "Khai trương" },
  { id: "cam-on", name: "Cảm ơn" },
  { id: "trang-tri", name: "Trang trí" },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products
  return products.filter((p) => p.category === category)
}

export function getProductsByOccasion(occasion: string): Product[] {
  if (occasion === "all") return products
  return products.filter((p) => p.occasion.includes(occasion))
}
