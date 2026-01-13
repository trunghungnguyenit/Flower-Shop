# 🔥 Firebase Client Separation

## ✅ Đã tách Firebase Client thành công

### 🎯 **Mục tiêu:**
Tách Firebase client configuration ra khỏi `api/firebase.ts` thành file riêng `lib/firebase-client.ts` để:
- Tách biệt concerns rõ ràng
- Dễ dàng import Firebase client ở nhiều nơi
- Chuẩn bị cho việc mở rộng (Auth, Storage, etc.)
- Code organization tốt hơn

### 📁 **Cấu trúc mới:**

#### **lib/firebase-client.ts** (Firebase Client Configuration)
```typescript
"use client"

import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
```

#### **api/firebase.ts** (Business Logic & API)
```typescript
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase-client"  // ← Import từ file mới
import { Product, Blog } from "./api.type"

// Utility functions
export const getFirstImage = (image: Product): string | null => { ... }
export const formatImageUrl = (imageName: string | null): string => { ... }
export const formatPrice = (gia: number | string | null | undefined): string => { ... }

// Data mappers
export const mapProduct = (docId: string, p: AnyObject): Product => { ... }
export const mapBlog = (docId: string, b: AnyObject): Blog => { ... }

// API functions
export const FirebaseApi = create()
```

### 🔄 **Những gì đã thay đổi:**

#### **TRƯỚC** (Tất cả trong `api/firebase.ts`):
```typescript
// Firebase config + initialization
const firebaseConfig = { ... }
const ensureFirebase = () => { ... }

// Business logic
const fetchAll = async <T>(...) => { ... }
const create = () => { ... }
export const FirebaseApi = create()
```

#### **SAU** (Tách riêng):
```typescript
// lib/firebase-client.ts - CHỈ Firebase setup
const firebaseConfig = { ... }
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

// api/firebase.ts - CHỈ business logic
import { db } from "@/lib/firebase-client"
const fetchAll = async <T>(...) => { ... }
export const FirebaseApi = create()
```

### ✅ **Lợi ích:**

#### **1. Separation of Concerns**
- `lib/firebase-client.ts`: Firebase configuration & initialization
- `api/firebase.ts`: Business logic & data operations

#### **2. Reusability**
```typescript
// Có thể import Firebase client ở bất kỳ đâu
import { db } from "@/lib/firebase-client"

// Components có thể trực tiếp dùng Firebase
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase-client"
```

#### **3. Extensibility**
```typescript
// Dễ dàng thêm Auth, Storage, etc.
// lib/firebase-client.ts
export const auth = getAuth(app)
export const storage = getStorage(app)
```

#### **4. Clean Architecture**
- Firebase config tách biệt khỏi business logic
- Dễ test và maintain
- Chuẩn Next.js best practices

### 🧪 **Testing:**

#### **Import paths cũ vẫn hoạt động:**
```typescript
// Vẫn work như trước
import { FirebaseApi, formatImageUrl, mapProduct } from "@/api/firebase"
```

#### **Import paths mới:**
```typescript
// Firebase client riêng
import { db } from "@/lib/firebase-client"

// Business logic riêng
import { FirebaseApi } from "@/api/firebase"
```

### 📋 **Files đã sửa:**

1. **lib/firebase-client.ts** (NEW)
   - Firebase configuration
   - App initialization
   - Firestore instance export

2. **api/firebase.ts** (UPDATED)
   - Import `db` từ `@/lib/firebase-client`
   - Xóa Firebase config code
   - Giữ nguyên business logic

### 🚀 **Kết quả:**

✅ **Dev server chạy thành công** (`http://localhost:3000`)
✅ **Không có TypeScript errors**
✅ **Tất cả imports hoạt động bình thường**
✅ **Firebase operations vẫn work**
✅ **Code organization tốt hơn**

### 🔮 **Tương lai có thể mở rộng:**

```typescript
// lib/firebase-client.ts
export const auth = getAuth(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)

// hooks/useAuth.ts
import { auth } from "@/lib/firebase-client"

// lib/storage.ts  
import { storage } from "@/lib/firebase-client"
```

**Firebase client đã được tách thành công, code sạch hơn và dễ maintain!**