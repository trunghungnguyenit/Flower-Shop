"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Product } from "@/api/api.type"
import { FirebaseApi, formatPrice, formatImageUrl } from "@/api/firebase"
import { 
  normalizeVietnamese, 
  parsePriceFromQuery, 
  findMatchingOccasions, 
  findMatchingGiftGuides 
} from "@/lib/search-utils"
import Link from "next/link"
import Image from "next/image"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  product: Product
  score: number
  matchType: 'name' | 'occasion' | 'giftGuide' | 'price' | 'similar'
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch all products when dialog opens
  useEffect(() => {
    if (open && products.length === 0) {
      setLoading(true)
      FirebaseApi.getProduct()
        .then(response => {
          if (response.ok && Array.isArray(response.data)) {
            // Only include active products
            setProducts(response.data.filter(p => p.isActive))
          }
        })
        .catch(error => {
          console.error("Error fetching products:", error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [open, products.length])

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       // Ctrl/Cmd + K to open search
//       if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
//         e.preventDefault()
//         onOpenChange(true)
//       }
//       // Escape to close
//       if (e.key === 'Escape' && open) {
//         handleClose()
//       }
//     }

//     document.addEventListener('keydown', handleKeyDown)
//     return () => document.removeEventListener('keydown', handleKeyDown)
//   }, [open, onOpenChange])

  // Search logic with priority matching
  const searchResults = useMemo(() => {
    if (!query.trim() || products.length === 0) {
      return []
    }

    const normalizedQuery = normalizeVietnamese(query)
    const results: SearchResult[] = []

    // Parse search components
    const { maxPrice, hasPrice } = parsePriceFromQuery(query)
    const matchingOccasions = findMatchingOccasions(normalizedQuery)
    const matchingGiftGuides = findMatchingGiftGuides(normalizedQuery)

    products.forEach(product => {
      let score = 0
      let matchType: SearchResult['matchType'] = 'similar'

      // Priority 1: Match by name/slug
      const normalizedName = normalizeVietnamese(product.name)
      const normalizedSlug = normalizeVietnamese(product.slug)
      
      if (normalizedName.includes(normalizedQuery) || normalizedSlug.includes(normalizedQuery)) {
        score += 100
        matchType = 'name'
      }

      // Priority 2: Match by occasion
      if (matchingOccasions.length > 0) {
        const hasMatchingOccasion = product.occasionIds?.some(id => matchingOccasions.includes(id))
        if (hasMatchingOccasion) {
          score += 80
          if (matchType === 'similar') matchType = 'occasion'
        }
      }

      // Priority 3: Match by gift guide
      if (matchingGiftGuides.length > 0) {
        const hasMatchingGiftGuide = product.giftGuideIds?.some(id => matchingGiftGuides.includes(id))
        if (hasMatchingGiftGuide) {
          score += 60
          if (matchType === 'similar') matchType = 'giftGuide'
        }
      }

      // Priority 4: Match by price
      if (hasPrice && maxPrice) {
        if (product.price === 0) {
          // "Liên hệ" products match price queries
          score += 40
          if (matchType === 'similar') matchType = 'price'
        } else if (product.price <= maxPrice) {
          score += 40
          if (matchType === 'similar') matchType = 'price'
        }
      }

      // Priority 5: Similar products (same occasion or gift guide as other matches)
      if (score === 0) {
        // If no direct match, check if product shares occasion/gift guide with query context
        const hasRelatedOccasion = matchingOccasions.length > 0 && 
          product.occasionIds?.some(id => matchingOccasions.includes(id))
        const hasRelatedGiftGuide = matchingGiftGuides.length > 0 && 
          product.giftGuideIds?.some(id => matchingGiftGuides.includes(id))
        
        if (hasRelatedOccasion || hasRelatedGiftGuide) {
          score += 20
          matchType = 'similar'
        }
      }

      // Boost score based on product metrics
      if (score > 0) {
        if (product.rating) score += product.rating * 2
        if (product.sold) score += Math.min(product.sold / 10, 10) // Max 10 points from sales
      }

      if (score > 0) {
        results.push({ product, score, matchType })
      }
    })

    // Sort by score (highest first), then by rating, then by sold
    return results
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if ((b.product.rating || 0) !== (a.product.rating || 0)) {
          return (b.product.rating || 0) - (a.product.rating || 0)
        }
        return (b.product.sold || 0) - (a.product.sold || 0)
      })
      .slice(0, 20) // Tăng từ 12 lên 20 sản phẩm
  }, [query, products])

  // Get suggestion products when no exact matches
  const suggestionProducts = useMemo(() => {
    if (searchResults.length > 0 || !query.trim()) return []
    
    // Return top-rated and best-selling products as suggestions
    return products
      .filter(p => p.isActive)
      .sort((a, b) => {
        const aScore = (a.rating || 0) * 10 + (a.sold || 0) / 10
        const bScore = (b.rating || 0) * 10 + (b.sold || 0) / 10
        return bScore - aScore
      })
      .slice(0, 5)
  }, [searchResults.length, query, products])

  const handleClose = () => {
    setQuery("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[80vh] p-0 gap-0 sm:max-w-2xl w-[95vw] sm:w-full search-dialog-content data-[state=open]:slide-in-from-top-4 sm:data-[state=open]:slide-in-from-top-0 flex flex-col" showCloseButton={false}>
        {/* Visually Hidden Title for Accessibility */}
        <DialogTitle className="sr-only">Tìm kiếm sản phẩm</DialogTitle>
        
        {/* Search Header - Fixed */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white flex-shrink-0">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <Input
            placeholder="Tìm hoa theo tên, dịp, người tặng hoặc giá..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base flex-1 bg-transparent"
            autoFocus
          />
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Đóng tìm kiếm"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Results - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50/30 min-h-0 search-results-container">
          <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                <span>Đang tải sản phẩm...</span>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 font-medium flex items-center justify-between">
                <span>Tìm thấy {searchResults.length} sản phẩm</span>
                {searchResults.length > 5 && (
                  <span className="text-xs text-gray-400">Cuộn để xem thêm</span>
                )}
              </div>
              <div className="grid gap-2">
                {searchResults.map(({ product }) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="flex gap-3 p-3 hover:bg-white rounded-lg transition-colors group search-result-item border border-transparent hover:border-gray-200"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={formatImageUrl(product.images?.[0])}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate group-hover:text-[var(--primary)] transition-colors leading-5 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--primary)' }}>
                        {product.price === 0 ? 'Liên hệ báo giá' : formatPrice(product.price)}
                      </p>
                      {product.badge && (
                        <span className={`inline-block px-1.5 py-0.5 text-xs rounded-full mt-1 font-medium ${
                          product.badge === 'Hot' 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : product.badge === 'Best Seller'
                            ? 'bg-orange-50 text-orange-600 border border-orange-200'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : suggestionProducts.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-gray-600 font-medium">
                Không tìm thấy sản phẩm chính xác. Gợi ý một số mẫu hoa phù hợp:
              </div>
              <div className="grid gap-2">
                {suggestionProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={handleClose}
                    className="flex gap-3 p-3 hover:bg-white rounded-lg transition-colors group search-result-item border border-transparent hover:border-gray-200"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={formatImageUrl(product.images?.[0])}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate group-hover:text-[var(--primary)] transition-colors leading-5 text-sm">
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--primary)' }}>
                        {product.price === 0 ? 'Liên hệ báo giá' : formatPrice(product.price)}
                      </p>
                      {product.badge && (
                        <span className={`inline-block px-1.5 py-0.5 text-xs rounded-full mt-1 font-medium ${
                          product.badge === 'Hot' 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : product.badge === 'Best Seller'
                            ? 'bg-orange-50 text-orange-600 border border-orange-200'
                            : 'bg-blue-50 text-blue-600 border border-blue-200'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-medium mb-2">Không tìm thấy sản phẩm nào</p>
              <p className="text-sm text-gray-500 max-w-sm">
                Thử tìm kiếm với từ khóa khác hoặc liên hệ để được tư vấn
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-gray-600 font-medium mb-2">Tìm kiếm sản phẩm</p>
              <p className="text-sm text-gray-500 mb-6 max-w-sm">
                Nhập tên hoa, dịp lễ, người tặng hoặc mức giá để tìm kiếm
              </p>
            </div>
          )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}