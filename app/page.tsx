"use client"

import { HeaderSection } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { BestSellerSection } from "@/components/home/best-seller-section"
import { RealCasesSection } from "@/components/home/real-cases-section"
import { ScenariosSection } from "@/components/home/scenarios-section"
import { DecorSection } from "@/components/home/decor-section"
import { 
  GiftGuideSection, 
  CategoriesSection, 
  UspSection, 
  ReviewsSection, 
  BlogSection 
} from "@/components/home/other-sections"
import { QuickOrderSection } from "@/components/home/quick-order-section"
import { FooterSection } from "@/components/footer"
import { StickyContact } from "@/components/home/sticky-contact"
import { useEffect, useState } from "react"
import { FirebaseApi } from "@/api/firebase"
import { Product, Blog } from "@/api/api.type"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function HomePage() {

const [products, setProducts] = useState<Product[]>([])
const [blogs, setBlogs] = useState<Blog[]>([])
const [loading, setLoading] = useState(true)
const [blogLoading, setBlogLoading] = useState(true)

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getProduct()
        // console.log("API TEST: ", res.data)
        if (res.ok && Array.isArray(res.data)) {
          setProducts(res.data)
        } else {
          console.error("API error:", res)
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // API Blog
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await FirebaseApi.getBlog()
        console.log("Blog API TEST: ", res.data)
        if (res.ok && Array.isArray(res.data)) {
          setBlogs(res.data.filter((blog: Blog) => blog.isActive))
        } else {
          console.error("Blog API error:", res)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setBlogLoading(false)
      }
    }

    fetchBlogs()
  }, [])


  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero */}
      <HeroSection />

      {/* Best Seller - Sản phẩm nổi bật */}
      <BestSellerSection products={products} loading={loading} />

      {/* Real Cases - Khoảnh Khắc Thật */}
      {/* <RealCasesSection /> */}

      {/* Scenarios - Bạn Đang Ở Hoàn Cảnh Nào? */}
      <ScenariosSection />

      {/* Decor Ideas - Trang Trí Ngôi Nhà */}
      {/* <DecorSection /> */}

      {/* Gift Guide - Gợi Ý Quà Theo Người Nhận */}
      <GiftGuideSection />

      {/* Categories - Hoa Theo Dịp */}
      <CategoriesSection />

      {/* USP */}
      <UspSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* Blog */}
      <BlogSection blogs={blogs} loading={blogLoading} />

      {/* Quick Order Form */}
      <QuickOrderSection products={products} loading={loading} />

      {/* Footer */}
      <FooterSection />

      {/* Sticky Contact */}
      <StickyContact />
    </main>
  )
}