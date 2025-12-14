import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: '%s - Hoa Tươi Đà Nẵng',
    default: 'Sản phẩm - Hoa Tươi Đà Nẵng',
  },
  description: 'Khám phá bộ sưu tập hoa tươi cao cấp tại Đà Nẵng và Quảng Nam. Giao hàng nhanh, hoa tươi 100%.',
  keywords: 'hoa tươi, đà nẵng, quảng nam, giao hoa, hoa sinh nhật, hoa cưới',
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}