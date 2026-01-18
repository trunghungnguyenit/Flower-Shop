"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface ShareMenuProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function ShareMenu({ isOpen, onClose, productName }: ShareMenuProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  const handleShare = (platform: string) => {
    const url = window.location.href

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          setCopySuccess(true)
          setTimeout(() => setCopySuccess(false), 2000)
        })
        break
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-[var(--border-soft)] p-2 z-10">
      <button
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
      >
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        Facebook
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors whitespace-nowrap"
      >
        {copySuccess ? (
          <>
            <Check className="w-4 h-4 text-green-600" />
            Đã sao chép!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Sao chép link
          </>
        )}
      </button>
    </div>
  )
}