import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  id: string
  name: string
  price: string
  image: string
  slug: string
}

export function ProductCard({ name, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/san-pham/${slug}`}>
      <Card className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-card">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-foreground text-base mb-2 line-clamp-2 min-h-[3rem]">{name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-primary font-semibold">{price}</p>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
