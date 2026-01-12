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

// Interface chung cho form đặt hàng
export interface OrderFormData {
  // 2.1. Thông tin người đặt
  senderName: string;
  senderPhone: string;
  
  // 2.2. Thông tin đơn hoa
  productId?: string;        // Chỉ có trong quick-order-section
  product?: string;          // Chỉ có trong API
  quantity: number;
  productPrice?: number;     // Chỉ có trong API
  extraServices: string[];
  deliveryDateTime: string;  // Gộp ngày và giờ thành một trường
  deliveryDate?: string;     // Tách từ deliveryDateTime cho API
  deliveryTimeSlot?: string; // Tách từ deliveryDateTime cho API
  deliveryArea: string;
  totalAmount?: number;      // Chỉ có trong API
  
  // 2.3. Thông tin người nhận
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  cardMessage: string;
  
  // 2.4. Ghi chú
  note: string;
  
  // 2.5. Thanh toán
  paymentMethod: string;
  
  // 2.6. Thời gian đặt (auto-generated)
  orderTime?: string;
}

