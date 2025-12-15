
import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Product } from "./api.type";



export const getFirstImage = (image: Product): string | null => {
  if (!image || !Array.isArray(image) || image.length === 0) return null;
  
  const firstItem = image[0];
  if (typeof firstItem === 'string') return firstItem;
  if (typeof firstItem === 'object' && firstItem.url) return firstItem.url;
  
  return null;
};

// Helper function để format image URL
export const formatImageUrl = (imageName: string | null): string => {
  if (!imageName) return '/placeholder.svg?height=400&width=400'
  
  // Nếu đã là URL đầy đủ (có http/https), return as is
  if (imageName.startsWith('http://') || imageName.startsWith('https://')) {
    return imageName
  }
  
  // Nếu đã có slash đầu, return as is
  if (imageName.startsWith('/')) {
    return imageName
  }
  
  // Thêm slash đầu cho relative path
  return `/${imageName}`
};

// Helper function để format giá sản phẩm
export const formatPrice = (gia: number | string | null | undefined): string => {
  if (typeof gia === 'number' && gia > 0) {
    return `${gia.toLocaleString('vi-VN')}đ`
  }
  
  if (typeof gia === 'string') {
    const numPrice = Number(gia.replace(/[^\d.-]/g, ''))
    if (!isNaN(numPrice) && numPrice > 0) {
      return `${numPrice.toLocaleString('vi-VN')}đ`
    }
  }
  
  return 'Liên hệ báo giá'
};

type AnyObject = Record<string, any>;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const ensureFirebase = () => {
  if (!getApps().length) initializeApp(firebaseConfig as AnyObject);
  const db = getFirestore();
  return { db };
};

const okResponse = (data: any, status: number = 200) => ({ ok: true, status, data });
const errorResponse = (message: string, status: number = 500) => ({
  ok: false,
  status,
  data: { error: { message } },
});

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

const mapProduct = (docId: string, p: AnyObject): Product => {
  return {
    id: docId,

    name: String(p.name ?? ""),
    slug: String(p.slug ?? ""),

    price: Number(p.price ?? 0),
    images: normalizeStringArray(p.images),
    description: String(p.description ?? ""),

    categoryIds: normalizeStringArray(p.categoryIds),
    occasionIds: normalizeStringArray(p.occasionIds),

    rating: normalizeNumber(p.rating),
    sold: normalizeNumber(p.sold),
    badge: p.badge ?? undefined,

    isActive: p.isActive ?? true,
  }
}


const fetchAll = async (
  colName: string,
  mapper: (id: string, data: AnyObject) => Product
): Promise<Product[]> => {
  const { db } = ensureFirebase();
  const snap = await getDocs(collection(db, colName));
  return snap.docs.map((d: QueryDocumentSnapshot<DocumentData>) => mapper(d.id, d.data()));
};

const fetchBySlug = async (
  colName: string,
  slug: string,
  mapper: (id: string, data: AnyObject) => Product
): Promise<Product | null> => {
  const { db } = ensureFirebase();
  const q = query(collection(db, colName), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return mapper(d.id, d.data());
};

const create = () => {
  const getProduct = async () => {
    try {
      const items = await fetchAll("Product", mapProduct);
      return okResponse(items);
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load products");
    }
  };

  const getProductBySlug = async (slug: string) => {
    try {
      const item = await fetchBySlug("Product", slug, mapProduct);
      return okResponse(item);
    } catch (e: any) {
      return errorResponse(e?.message || "Failed to load product detail");
    }
  };

  return {
    getProduct,
    getProductBySlug,
  };
};

const FirebaseApi = create();

export { FirebaseApi, mapProduct };
