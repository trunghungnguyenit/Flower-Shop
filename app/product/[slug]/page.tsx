"use client"

import React, { useState, useEffect } from "react"
import { notFound } from "next/navigation"

import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"
import { ProductLoadingSkeleton } from "@/components/products/product-loading-skeleton"
import { ProductBreadcrumb } from "@/components/products/product-breadcrumb"
import { ProductImageGallery } from "@/components/products/product-image-gallery"
import { ProductInfo } from "@/components/products/product-info"
import { ProductActions } from "@/components/products/product-actions"
import { TrustBadges } from "@/components/products/trust-badges"
import { RelatedProducts } from "@/components/products/related-products"

interface ProductDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = React.use(params)
  
  // API state
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch product data from API
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch main product
        const productRes = await FirebaseApi.getProductBySlug(slug)
        
        if (productRes.ok && productRes.data) {
          setProduct(productRes.data)
          
          // Fetch all products for related products
          const allProductsRes = await FirebaseApi.getProduct()
          if (allProductsRes.ok && Array.isArray(allProductsRes.data)) {
            // Filter related products (same occasion, excluding current product, only active)
            const related = allProductsRes.data
              .filter((p: Product) => 
                p.isActive && 
                p.id !== productRes.data.id &&
                p.occasionIds?.some(occasionId => productRes.data.occasionIds?.includes(occasionId))
              )
              .slice(0, 4)
            setRelatedProducts(related)
          }
        } else {
          // Product not found
          notFound()
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [slug])

  // Set document title
  useEffect(() => {
    if (product?.name) {
      document.title = `${product.name} - Hoa Tươi Đà Nẵng`
    }
  }, [product?.name])

  // Show loading state
  if (loading) {
    return <ProductLoadingSkeleton />
  }

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <ProductBreadcrumb productName={product.name} />

          {/* Product Detail */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Product Images */}
            <ProductImageGallery 
              images={product.images}
              productName={product.name}
            />

            {/* Product Info & Actions */}
            <div className="space-y-6">
              <ProductInfo product={product} />
              <ProductActions product={product} />
              <TrustBadges />
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>

      <FooterSection />
    </div>
  )
}