<<<<<<< HEAD
// Constants for the flower shop application

export const CONTACT_INFO = {
  phone: "090 123 4567",
  phoneHref: "tel:0901234567",
  zaloNumber: "0901234567",
  email: "info@hoatuoidanang.com",
  address: "123 Đường ABC, Quận XYZ, Đà Nẵng",
} as const

export const BUSINESS_INFO = {
  name: "Hoa Tươi Đà Nẵng",
  shortName: "Hoa Tươi DN",
  description: "Cửa hàng hoa tươi cao cấp tại Đà Nẵng & Quảng Nam",
  slogan: "Giao Hoa Nhanh - Tươi Mỗi Ngày",
} as const

export const DELIVERY_INFO = {
  freeShipArea: "Đà Nẵng & Quảng Nam",
  deliveryTime: "Giao nhanh trong ngày",
  workingHours: "8:00 - 22:00 hàng ngày",
} as const

export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/hoatuoidanang",
  zalo: `https://zalo.me/${CONTACT_INFO.zaloNumber}`,
  messenger: "https://m.me/hoatuoidanang",
} as const
=======
// ================================================================
// CONTACT CONSTANTS - Thông tin liên hệ cửa hàng
// Sử dụng cho toàn bộ app để đồng bộ
// ================================================================

export const CONTACT = {
  // Số điện thoại
  phone: "0901333434",
  phoneDisplay: "0901 333 434",
  phoneLink: "tel:0901333434",

  // Zalo
  zalo: "0901333434",
  zaloLink: "https://zalo.me/0901333434",

  // Email
  email: "hoatuoidanang@gmail.com",
  emailLink: "mailto:hoatuoidanang@gmail.com",

  // Địa chỉ
  address: "123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
  addressShort: "Hải Châu, Đà Nẵng",

  // Social Media
  facebook: "https://facebook.com/hoatuoidanang",
  instagram: "https://instagram.com/hoatuoidanang",

  // Giờ làm việc
  workingHours: "7:00 - 21:00",
  workingDays: "Thứ 2 - Chủ nhật",
} as const

// ================================================================
// SHOP INFO - Thông tin cửa hàng
// ================================================================

export const SHOP_INFO = {
  name: "Hoa Tươi Đà Nẵng",
  shortName: "HTĐN",
  tagline: "Gửi yêu thương qua từng cánh hoa",
  description: "Shop hoa tươi uy tín tại Đà Nẵng - Giao hoa nhanh 2 giờ - Freeship 5km",
} as const

// Type exports for TypeScript
export type ContactType = typeof CONTACT
export type ShopInfoType = typeof SHOP_INFO
>>>>>>> 8f928fefbe4710ada5a72f07b7fe669fed0cef51
