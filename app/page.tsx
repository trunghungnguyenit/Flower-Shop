"use client"

import { HeaderSection } from "@/components/header"
import { HeroSection } from "@/components/home/hero-section"
import { BestSellerSection } from "@/components/home/best-seller/best-seller-section"
import { ScenariosSection } from "@/components/home/scenarios/scenarios-section"
import { GiftGuideSection } from "@/components/home/gift-guide/gift-guide-section"
import { CategoriesSection } from "@/components/home/categories/categories-section"
import { QuickOrderSection } from "@/components/home/quick-order/quick-order-section"
import { FooterSection } from "@/components/footer"
import { StickyContact } from "@/components/home/sticky/sticky-contact"
import { useEffect, useState } from "react"
import { FirebaseApi } from "@/api/firebase"
import { Product, Blog } from "@/api/api.type"
import { ReviewsSection } from "@/components/home/reviews/reviews-section"
import { BlogSection } from "@/components/home/blog/blog-section"
import { UspSection } from "@/components/home/usp/usp-section"

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
        //console.log("Blog API TEST: ", res.data)
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

      {/* Scenarios - Bạn Đang Ở Hoàn Cảnh Nào? */}
      <ScenariosSection />

      {/* Gift Guide - Gợi Ý Quà Theo Người Nhận */}
      <GiftGuideSection products={products} loading={loading} />

      {/* Categories - Hoa Theo Dịp */}
      <CategoriesSection products={products} loading={loading} />

      {/* USP */}
      <UspSection />

      {/* Reviews */}
      <ReviewsSection />

      {/* Blog */}
      <BlogSection blogs={blogs} loading={blogLoading} />

      {/* Quick Order Form - đặt hàng nhanh */}
      <QuickOrderSection products={products} loading={loading} />

      {/* Footer */}
      <FooterSection />

      {/* Sticky Contact */}
      <StickyContact />
    </main>
  )
}