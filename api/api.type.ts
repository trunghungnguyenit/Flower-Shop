export interface Product {
  id: string                 // Document ID
  name: string
  slug: string

  price: number              // 450000
  images: string[]           // ảnh[0] là ảnh chính
  description: string

  categoryIds: string[]      // ["bo-hoa"]
  occasionIds: string[]      // ["sinh-nhat", "tinh-yeu"]
  giftGuideIds?: string[]    // ["nguoi-yeu", "me", "ban-than", "sep", "vo-chong"]

  rating?: number
  sold?: number
  badge?: string             // "Hot", "Sale"

  isActive: boolean
}

export interface Blog {
  id: string                 // Document ID
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  content: string
  publishedAt?: any          // Firebase timestamp
  isActive: boolean
}
