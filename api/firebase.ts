import {
  collection,
  getDocs,
  query,
  where,
  limit,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase-client"
import { Product, Blog } from "./api.type"

type AnyObject = Record<string, any>

export const getFirstImage = (image: Product): string | null => {
  if (!image || !Array.isArray(image) || image.length === 0) return null

  const firstItem = image[0]
  if (typeof firstItem === "string") return firstItem
  if (typeof firstItem === "object" && firstItem?.url) return firstItem.url

  return null
}

export const formatImageUrl = (imageName: string | null): string => {
  if (!imageName) return "/placeholder.svg?height=400&width=400"
  if (imageName.startsWith("http://") || imageName.startsWith("https://")) return imageName
  if (imageName.startsWith("/")) return imageName
  return `/${imageName}`
}

export const formatPrice = (gia: number | string | null | undefined): string => {
  if (typeof gia === "number" && gia > 0) return `${gia.toLocaleString("vi-VN")}đ`

  if (typeof gia === "string") {
    const numPrice = Number(gia.replace(/[^\d.-]/g, ""))
    if (!isNaN(numPrice) && numPrice > 0) {
      return `${numPrice.toLocaleString("vi-VN")}đ`
    }
  }

  return "Liên hệ báo giá"
}

//Response helpers

const okResponse = (data: any, status = 200) => ({
  ok: true,
  status,
  data,
})

const errorResponse = (message: string, status = 500) => ({
  ok: false,
  status,
  data: { error: { message } },
})

//Normalizers

const normalizeStringArray = (v: any): string[] => {
  if (!v) return []
  if (Array.isArray(v)) return v.filter((i) => typeof i === "string")
  if (typeof v === "string") return [v]
  return []
}

const normalizeNumber = (v: any): number | undefined => {
  if (typeof v === "number") return v
  if (typeof v === "string") {
    const n = Number(v)
    return isNaN(n) ? undefined : n
  }
  return undefined
}

//Mappers

export const mapProduct = (docId: string, p: AnyObject): Product => ({
  id: docId,
  name: String(p.name ?? ""),
  slug: String(p.slug ?? ""),
  price: Number(p.price ?? 0),
  images: normalizeStringArray(p.images),
  description: String(p.description ?? ""),
  categoryIds: normalizeStringArray(p.categoryIds),
  occasionIds: normalizeStringArray(p.occasionIds),
  giftGuideIds: normalizeStringArray(p.giftGuideIds),
  rating: normalizeNumber(p.rating),
  sold: normalizeNumber(p.sold),
  badge: p.badge ?? undefined,
  isActive: p.isActive ?? true,
})

export const mapBlog = (docId: string, b: AnyObject): Blog => ({
  id: docId,
  slug: String(b.slug ?? ""),
  title: String(b.title ?? ""),
  excerpt: String(b.excerpt ?? ""),
  image: String(b.image ?? ""),
  category: String(b.category ?? ""),
  author: String(b.author ?? ""),
  content: String(b.content ?? ""),
  publishedAt: b.publishedAt ?? null,
  isActive: b.isActive ?? true,
})

//Firestore fetchers

const fetchAll = async <T>(
  colName: string,
  mapper: (id: string, data: AnyObject) => T
): Promise<T[]> => {
  const snap = await getDocs(collection(db, colName))
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) =>
    mapper(d.id, d.data())
  )
}

const fetchBySlug = async <T>(
  colName: string,
  slug: string,
  mapper: (id: string, data: AnyObject) => T
): Promise<T | null> => {
  const q = query(collection(db, colName), where("slug", "==", slug), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const d = snap.docs[0]
  return mapper(d.id, d.data())
}

//  Public API
const create = () => {
  const getProduct = async () => {
    try {
      return okResponse(await fetchAll("Product", mapProduct))
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load products")
    }
  }

  const getProductBySlug = async (slug: string) => {
    try {
      return okResponse(await fetchBySlug("Product", slug, mapProduct))
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load product detail")
    }
  }

  const getBlog = async () => {
    try {
      return okResponse(await fetchAll("Blog", mapBlog))
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load blogs")
    }
  }

  const getBlogBySlug = async (slug: string) => {
    try {
      return okResponse(await fetchBySlug("Blog", slug, mapBlog))
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load blog detail")
    }
  }

  return {
    getProduct,
    getProductBySlug,
    getBlog,
    getBlogBySlug,
  }
}


export const FirebaseApi = create()
