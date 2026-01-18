"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"

import { filterProducts, getProductCountByOccasion, getProductCountByGiftGuide, scenarioToOccasionMap, giftGuideToIdMap } from "@/lib/product-filters"
import { FooterSection } from "@/components/footer"
import { HeaderSection } from "@/components/header"
import { Product } from "@/api/api.type"
import { FirebaseApi } from "@/api/firebase"
import { CollectionHero } from "@/components/collections/collection-hero"
import { CollectionFilters } from "@/components/collections/collection-filters"
import { CollectionLoading } from "@/components/collections/collection-loading"
import { CollectionProductsGrid } from "@/components/collections/collection-products-grid"
import { CollectionCTA } from "@/components/collections/collection-cta"
import { Confetti } from "@/components/collections/confetti"

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

function CollectionPageContent() {
  const ref = useRef<HTMLElement>(null)
  const searchParams = useSearchParams()
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedOccasion, setSelectedOccasion] = useState<string>("all")
  const [selectedGiftGuide, setSelectedGiftGuide] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [confettiState, setConfettiState] = useState<{ active: boolean; position: { x: number; y: number } }>({
    active: false,
    position: { x: 0, y: 0 },
  })

  // API state
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Get initial filters from URL params
  useEffect(() => {
    const scenario = searchParams.get('scenario')
    const category = searchParams.get('category')
    const giftGuide = searchParams.get('giftGuide')
    
    if (scenario && scenarioToOccasionMap[scenario]) {
      setSelectedOccasion(scenarioToOccasionMap[scenario])
    }
    
    if (category) {
      setSelectedCategory(category)
    }

    if (giftGuide && giftGuideToIdMap[giftGuide]) {
      setSelectedGiftGuide(giftGuideToIdMap[giftGuide])
    }
  }, [searchParams])

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getProduct()
        
        if (res.ok && Array.isArray(res.data)) {
          // Filter only active products
          const activeProducts = res.data.filter((product: Product) => product.isActive)
          setProducts(activeProducts)
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

  const handleConfetti = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setConfettiState({
      active: true,
      position: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
    })
    setTimeout(() => setConfettiState({ ...confettiState, active: false }), 1000)
  }

  // Filter products based on selected category, occasion, and gift guide
  const filteredProducts = filterProducts(products, selectedCategory, selectedOccasion, selectedGiftGuide)
  
  // Occasions for filtering
  const occasions = [
    { id: "all", name: "Tất cả dịp", count: products.length },
    { id: "sinh-nhat", name: "Sinh nhật", count: getProductCountByOccasion(products, "sinh-nhat") },
    { id: "tinh-yeu", name: "Tình yêu", count: getProductCountByOccasion(products, "tinh-yeu") },
    { id: "cuoi", name: "Cưới hỏi", count: getProductCountByOccasion(products, "cuoi") },
    { id: "khai-truong", name: "Khai trương", count: getProductCountByOccasion(products, "khai-truong") },
    { id: "trang-tri", name: "Trang trí", count: getProductCountByOccasion(products, "trang-tri") },
    { id: "chia-buon", name: "Chia buồn", count: getProductCountByOccasion(products, "chia-buon") },
    { id: "tet", name: "Hoa Tết", count: getProductCountByOccasion(products, "tet") },
    { id: "su-kien", name: "Hoa sự kiện", count: getProductCountByOccasion(products, "su-kien") },
  ]

  // Gift guides for filtering
  const giftGuides = [
    { id: "all", name: "Tất cả", count: products.length },
    { id: "nguoi-yeu", name: "Cho người yêu", count: getProductCountByGiftGuide(products, "nguoi-yeu") },
    { id: "me", name: "Cho mẹ", count: getProductCountByGiftGuide(products, "me") },
    { id: "ban-than", name: "Cho bạn thân", count: getProductCountByGiftGuide(products, "ban-than") },
    { id: "sep", name: "Cho sếp", count: getProductCountByGiftGuide(products, "sep") },
    { id: "vo-chong", name: "Cho vợ/chồng", count: getProductCountByGiftGuide(products, "vo-chong") },
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <CollectionHero />

      {/* Filter & Products Section */}
      <section ref={ref} className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Filter Bar */}
          <CollectionFilters
            occasions={occasions}
            giftGuides={giftGuides}
            selectedOccasion={selectedOccasion}
            selectedGiftGuide={selectedGiftGuide}
            viewMode={viewMode}
            filteredProductsCount={filteredProducts.length}
            onOccasionChange={setSelectedOccasion}
            onGiftGuideChange={setSelectedGiftGuide}
            onViewModeChange={setViewMode}
          />

          {/* Loading State */}
          {loading ? (
            <CollectionLoading />
          ) : (
            <CollectionProductsGrid
              products={filteredProducts}
              viewMode={viewMode}
              onConfetti={handleConfetti}
            />
          )}
        </div>
      </section>

      {/* CTA Section */}
      <CollectionCTA />

      {/* Confetti */}
      <Confetti active={confettiState.active} position={confettiState.position} />
    
      {/* Footer */}
      <FooterSection />
    </main>
  )
}

export default function CollectionPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white">
        <HeaderSection />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)]">Đang tải...</p>
          </div>
        </div>
      </main>
    }>
      <CollectionPageContent />
    </Suspense>
  )
}