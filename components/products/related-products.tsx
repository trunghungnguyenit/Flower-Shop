"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/products/product-card"
import { 
  staggerContainer, 
  staggerItem 
} from "@/components/animations/framer-variants"
import { Product } from "@/api/api.type"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [itemWidth, setItemWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  
  // Create extended array for infinite loop (triple the products for seamless scrolling)
  const extendedProducts = [...products, ...products, ...products]
  const startIndex = products.length // Start from middle set
  
  // Calculate item width based on container and responsive design
  const calculateItemWidth = useCallback(() => {
    if (!sliderRef.current) return 0
    const containerWidth = sliderRef.current.clientWidth
    const gap = 24 // 6 * 4px (gap-6)
    const itemsVisible = typeof window !== 'undefined' 
      ? (window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4)
      : 4
    return (containerWidth - (gap * (itemsVisible - 1))) / itemsVisible
  }, [])

  // Initialize slider position
  useEffect(() => {
    if (sliderRef.current && products.length > 0) {
      const width = calculateItemWidth()
      setItemWidth(width)
      const initialPosition = startIndex * (width + 24) // width + gap
      sliderRef.current.scrollLeft = initialPosition
      setCurrentIndex(startIndex)
    }
  }, [products.length, startIndex, calculateItemWidth])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && products.length > 0) {
        const width = calculateItemWidth()
        setItemWidth(width)
        const position = currentIndex * (width + 24)
        sliderRef.current.scrollLeft = position
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex, products.length, calculateItemWidth])

  const slideToIndex = useCallback((index: number, smooth = true) => {
    if (!sliderRef.current || isTransitioning || products.length === 0) return
    
    setIsTransitioning(true)
    const position = index * (itemWidth + 24) // itemWidth + gap
    
    sliderRef.current.scrollTo({
      left: position,
      behavior: smooth ? 'smooth' : 'auto'
    })
    
    setCurrentIndex(index)
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    // Handle infinite loop reset after animation
    timeoutRef.current = setTimeout(() => {
      if (!sliderRef.current) return
      
      let newIndex = index
      let shouldJump = false
      
      // If we're at the beginning of first set, jump to beginning of middle set
      if (index < products.length) {
        newIndex = index + products.length
        shouldJump = true
      }
      // If we're at the end of last set, jump to end of middle set  
      else if (index >= products.length * 2) {
        newIndex = index - products.length
        shouldJump = true
      }
      
      if (shouldJump) {
        const newPosition = newIndex * (itemWidth + 24)
        sliderRef.current.scrollTo({
          left: newPosition,
          behavior: 'auto'
        })
        setCurrentIndex(newIndex)
      }
      
      setIsTransitioning(false)
    }, smooth ? 350 : 0)
  }, [isTransitioning, products.length, itemWidth])

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return
    slideToIndex(currentIndex - 1)
  }, [currentIndex, isTransitioning, slideToIndex])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    slideToIndex(currentIndex + 1)
  }, [currentIndex, isTransitioning, slideToIndex])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      <motion.div variants={staggerItem} className="text-center">
        <h2 className="font-display text-2xl lg:text-3xl font-semibold text-[var(--text-primary)] mb-4">
          Sản phẩm tương tự
        </h2>
        <p className="text-[var(--text-primary)] max-w-2xl mx-auto">
          Khám phá thêm những sản phẩm phù hợp cho cùng dịp lễ
        </p>
      </motion.div>

      <motion.div variants={staggerItem} className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          disabled={isTransitioning}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 backdrop-blur-sm"
          aria-label="Sản phẩm trước"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 backdrop-blur-sm"
          aria-label="Sản phẩm tiếp theo"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Slider Container */}
        <div className="mx-10"> {/* Add margin for arrow space */}
          <div 
            ref={sliderRef}
            className="infinite-slider overflow-hidden"
          >
            <div 
              className="flex gap-6 transition-none"
              style={{ 
                width: `${extendedProducts.length * (itemWidth + 24)}px`,
              }}
            >
              {extendedProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={`${product.price.toLocaleString("vi-VN")}đ`}
                    image={product.images?.[0] || "/placeholder.svg?height=400&width=400"}
                    slug={product.slug}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {products.map((_, index) => {
            const isActive = (currentIndex % products.length) === index
            return (
              <button
                key={index}
                onClick={() => slideToIndex(startIndex + index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'bg-[var(--primary)] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Đi đến sản phẩm ${index + 1}`}
              />
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}