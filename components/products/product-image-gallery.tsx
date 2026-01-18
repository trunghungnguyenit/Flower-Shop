"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Share2 } from "lucide-react"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { cn } from "@/lib/utils"
import { premiumEase } from "@/components/animations/framer-variants"
import { ShareMenu } from "./share-menu"


interface ProductImageGalleryProps {
  images?: string[]
  productName: string
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!images || images.length <= 1) return
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, images])

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuOpen && !(event.target as Element).closest('.share-menu-container')) {
        setShareMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [shareMenuOpen])

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: premiumEase }}
      className="space-y-4 group"
    >
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[var(--background-muted)]">
        <Image
          src={getSafeImageSrc(images?.[selectedImage], "/placeholder.svg?height=600&width=600")}
          alt={getSafeAltText(productName, "Sản phẩm")}
          fill
          className="object-cover"
          priority
        />
        
        {/* Navigation Arrows - only show if more than 1 image */}
        {images && images.length > 1 && (
          <>
            {/* Previous Image */}
            <button
              onClick={() => setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next Image */}
            <button
              onClick={() => setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1)}
              className="absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all duration-300 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {images && images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
            {selectedImage + 1} / {images.length}
          </div>
        )}

        {/* Share Button */}
        <div className="absolute top-16 right-4 share-menu-container">
          <button
            onClick={() => setShareMenuOpen(!shareMenuOpen)}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            <Share2 className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <ShareMenu 
            isOpen={shareMenuOpen}
            onClose={() => setShareMenuOpen(false)}
            productName={productName}
          />
        </div>
      </div>

      {/* Thumbnail Images */}
      {images && images.length > 1 && (
        <div className={cn(
          "grid gap-3",
          images.length <= 4 
            ? "grid-cols-4" 
            : images.length <= 6 
            ? "grid-cols-3" 
            : "grid-cols-2"
        )}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-300",
                selectedImage === index 
                  ? "border-[var(--primary)] shadow-lg" 
                  : "border-[var(--border-soft)] hover:border-[var(--primary)]/50"
              )}
            >
              <Image
                src={getSafeImageSrc(image, "/placeholder.svg?height=150&width=150")}
                alt={`${productName} - Ảnh ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}