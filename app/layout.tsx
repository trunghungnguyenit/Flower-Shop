import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
})

export const metadata: Metadata = {
  title: "Hoa Tươi Đà Nẵng - Quảng Nam | Giao Hoa Nhanh",
  description:
    "Cửa hàng hoa tươi cao cấp tại Đà Nẵng & Quảng Nam. Freeship khu vực gần, giao nhanh trong ngày. Hoa sinh nhật, hoa cưới, hoa khai trương, hoa chia buồn.",
  keywords: "hoa tươi, đà nẵng, quảng nam, giao hoa, hoa sinh nhật, hoa cưới",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${cormorant.variable} ${beVietnamPro.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
