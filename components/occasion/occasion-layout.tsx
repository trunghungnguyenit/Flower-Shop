"use client"

import { useState, useEffect } from "react"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { OccasionHero } from "./occasion-hero"
import { OccasionFeatures } from "./occasion-features"
import { OccasionProducts } from "./occasion-products"
import { OccasionCTA } from "./occasion-cta"
import { Confetti } from "./confetti"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"

// ================================================================
// OCCASION LAYOUT COMPONENT
// ================================================================

interface OccasionLayoutProps {
  occasionId: string
  breadcrumb: {
    current: string
  }
  hero: {
    icon: React.ComponentType<any>
    iconBgColor: string
    iconColor: string
    buttonBgColor: string
    buttonHoverBgColor: string
    buttonBorderColor: string
    floatingBgColor: string
    tagline: string
    title: string
    subtitle: string
    description: string
    ctaText: string
    ctaHref: string
    image: string
    imageAlt: string
    floatingElements: {
      primary: string
      secondary: string
    }
  }
  features: {
    sectionId: string
    tagline: string
    taglineColor: string
    title: string
    description: string
    features: Array<{
      icon: React.ComponentType<any>
      title: string
      description: string
      color: string
    }>
  }
  products: {
    tagline: string
    taglineColor: string
    title: string
    emptyMessage: string
  }
  cta: {
    icon: React.ComponentType<any>
    iconBgColor: string
    iconColor: string
    buttonBgColor: string
    buttonHoverBgColor: string
    buttonBorderColor: string
    bgGradient: string
    title: string
    description: string
    note?: string
  }
  confettiColors?: string[]
  additionalSections?: React.ReactNode
}

export function OccasionLayout({
  occasionId,
  breadcrumb,
  hero,
  features,
  products,
  cta,
  confettiColors,
  additionalSections
}: OccasionLayoutProps) {
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })
  const [productList, setProductList] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getProduct()

        if (res.ok && Array.isArray(res.data)) {
          const filteredProducts = res.data.filter(
            (item: Product) =>
              Array.isArray(item.occasionIds) &&
              item.occasionIds.includes(occasionId)
          )
          setProductList(filteredProducts)
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
  }, [occasionId])

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <OccasionHero breadcrumb={breadcrumb} hero={hero} />

      {/* Features Section */}
      <OccasionFeatures {...features} />

      {/* Products Section */}
      <OccasionProducts 
        {...products}
        products={productList}
        loading={loading}
      />

      {/* Additional Sections */}
      {additionalSections}

      {/* CTA Section */}
      <OccasionCTA {...cta} onPhoneClick={handleConfetti} />

      {/* Confetti */}
      <Confetti 
        active={confettiState.active} 
        position={confettiState.position}
        colors={confettiColors}
      />

      {/* Footer */}
      <FooterSection />
    </main>
  )
}