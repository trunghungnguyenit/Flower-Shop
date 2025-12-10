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