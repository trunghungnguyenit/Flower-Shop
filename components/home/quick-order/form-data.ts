import { OrderFormData } from "@/api/api.type";

// Initial form data structure
export const initialFormData: OrderFormData = {
  // Thông tin người đặt
  senderName: '',
  senderPhone: '',
  
  // Thông tin đơn hoa
  productId: '',
  quantity: 1,
  extraServices: [],
  deliveryDateTime: '',
  deliveryArea: '',
  
  // Thông tin người nhận
  receiverName: '',
  receiverPhone: '',
  receiverAddress: '',
  cardMessage: '',
  
  // Ghi chú
  note: '',
  
  // Thanh toán
  paymentMethod: '',
};

// Form data utilities
export const resetFormData = (): OrderFormData => ({ ...initialFormData });

export const resetProductSelection = (currentData: OrderFormData): OrderFormData => ({
  ...currentData,
  productId: '',
  quantity: 1,
  extraServices: [],
});

export const updateQuantity = (currentData: OrderFormData, delta: number): OrderFormData => ({
  ...currentData,
  quantity: Math.max(1, currentData.quantity + delta)
});

export const toggleExtraService = (currentData: OrderFormData, serviceId: string): OrderFormData => ({
  ...currentData,
  extraServices: currentData.extraServices.includes(serviceId)
    ? currentData.extraServices.filter(id => id !== serviceId)
    : [...currentData.extraServices, serviceId]
});

export const updateProductSelection = (currentData: OrderFormData, productId: string): OrderFormData => ({
  ...currentData,
  productId,
  quantity: 1, // Reset quantity when product changes
  extraServices: [], // Reset services when product changes
});