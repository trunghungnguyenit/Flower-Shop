import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { CONTACT } from "@/lib/constants"

interface ProductCardProps {
  id: string
  name: string
  price: string
  image: string
  slug: string
}

export function ProductCard({ name, price, image, slug }: ProductCardProps) {
  // Check if price is 0 or empty (handle both "0đ" and "0" formats)
  const numericPrice = parseInt(price.replace(/[^\d]/g, '')) || 0
  const isZeroPrice = numericPrice === 0
  
  return (
    <Link href={`/product/${slug}`}>
      <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={getSafeImageSrc(image, "/placeholder.svg")}
              alt={getSafeAltText(name, "Sản phẩm")}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-black text-base mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>
            <div className="flex items-center justify-between">
              {isZeroPrice ? (
                <p className="text-black font-medium text-sm"></p>
              ) : (
                <p className="text-[var(--text-primary)] font-semibold">{price}</p>
              )}
              {isZeroPrice ? (
                <Button
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--text-white)] text-xs font-medium rounded-full hover:bg-[var(--primary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex-shrink-0"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(CONTACT.zaloLink, '_blank', 'noopener,noreferrer')
                  }}
                >
                  Liên hệ
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs border-primary text-[var(--text-primary)] hover:bg-primary hover:text-black bg-transparent"
                >
                  Xem chi tiết
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
