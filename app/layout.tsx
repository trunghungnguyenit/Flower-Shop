import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
})

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
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
      <body className={`${cormorant.variable} ${inter.variable} font-sans antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
