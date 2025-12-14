export interface Product {
  id: string                 // Document ID
  name: string
  slug: string

  price: number              // 450000
  images: string[]           // ảnh[0] là ảnh chính
  description: string

  categoryIds: string[]      // ["bo-hoa"]
  occasionIds: string[]      // ["sinh-nhat", "tinh-yeu"]

  rating?: number
  sold?: number
  badge?: string             // "Hot", "Sale"

  isActive: boolean
}
