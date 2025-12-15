import type { Product as ApiProduct } from "@/api/api.type"
import type { Product as LibProduct } from "./products"

/**
 * Convert API Product to Lib Product format for cart compatibility
 */
export function convertApiProductToLibProduct(apiProduct: ApiProduct): LibProduct {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    price: `${apiProduct.price.toLocaleString("vi-VN")}đ`,
    image: apiProduct.images[0] || "/placeholder.svg",
    slug: apiProduct.slug,
    category: apiProduct.categoryIds[0] || "bo-hoa", // Use first category
    occasion: apiProduct.occasionIds || [],
    description: apiProduct.description,
    images: apiProduct.images,
  }
}

/**
 * Check if product is from API (has numeric price)
 */
export function isApiProduct(product: any): product is ApiProduct {
  return typeof product.price === 'number'
}

/**
 * Check if product is from lib (has string price)
 */
export function isLibProduct(product: any): product is LibProduct {
  return typeof product.price === 'string'
}