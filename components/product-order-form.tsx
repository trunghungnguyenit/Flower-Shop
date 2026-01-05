'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Send, MapPin, Clock, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { Product } from '@/api/api.type';

interface ProductOrderFormProps {
  product: Product;
  onClose?: () => void;
}

interface OrderFormData {
  name: string;
  phone: string;
  quantity: number;
  senderAddress: string;
  receiverAddress: string;
  deliveryTime: string;
  additionalServices: string[];
  note: string;
}

// Dịch vụ thêm
const additionalServices = [
  { id: "gift-wrap", name: "Gói quà cao cấp", price: 50000 },
  { id: "card", name: "Thiệp chúc mừng", price: 20000 },
  { id: "delivery-express", name: "Giao hàng nhanh (2h)", price: 100000 },
  { id: "setup", name: "Trang trí tại chỗ", price: 200000 },
];

// Thời gian giao hàng
const deliveryTimes = [
  "Sáng (8:00 - 12:00)",
  "Chiều (13:00 - 17:00)",
  "Tối (18:00 - 21:00)",
  "Cả ngày (8:00 - 21:00)",
  "Theo yêu cầu"
];

export default function ProductOrderForm({ product, onClose }: ProductOrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    quantity: 1,
    senderAddress: '',
    receiverAddress: '',
    deliveryTime: '',
    additionalServices: [],
    note: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Tính tổng tiền
  const calculateTotal = () => {
    const productTotal = product.price * formData.quantity;
    const servicesTotal = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
    return productTotal + servicesTotal;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleQuantityChange = (delta: number) => {
    setFormData(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + delta)
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceId)
        ? prev.additionalServices.filter(id => id !== serviceId)
        : [...prev.additionalServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.receiverAddress) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        note: formData.note,
        productName: product.name,
        productPrice: product.price,
        quantity: formData.quantity,
        senderAddress: formData.senderAddress,
        receiverAddress: formData.receiverAddress,
        deliveryTime: formData.deliveryTime,
        additionalServices: formData.additionalServices.map(id => {
          const service = additionalServices.find(s => s.id === id);
          return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id;
        }),
        totalAmount: calculateTotal(),
      };

      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose?.();
        }, 3000);
      } else {
        setErrorMessage(result.message || 'Có lỗi xảy ra khi gửi đơn hàng');
      }
    } catch (error) {
      setErrorMessage('Không thể gửi đơn đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mb-6 flex items-center justify-center bg-green-100 rounded-full"
            >
              <Check className="w-10 h-10 text-green-600" strokeWidth={1.5} />
            </motion.div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
              Đặt hoa thành công!
            </h3>
            <p className="text-gray-600 text-center">
              Chúng tôi sẽ liên hệ bạn sớm nhất để xác nhận đơn hàng
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🌸 Đặt Hoa: {product.name}
        </h2>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>Giá: {product.price.toLocaleString('vi-VN')}đ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin khách hàng */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên khách hàng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập tên của bạn"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="090xxxxxxx"
              required
            />
          </div>
        </div>

        {/* Số lượng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số lượng
          </label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={formData.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 border border-gray-300 rounded-md min-w-[60px] text-center">
              {formData.quantity}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Địa chỉ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Địa chỉ nhận <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Địa chỉ giao hoa"
              required
            />
          </div>
        </div>

        {/* Dịch vụ thêm */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Gift className="w-4 h-4 inline mr-1" />
            Dịch vụ thêm
          </label>
          <div className="space-y-2">
            {additionalServices.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={formData.additionalServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <label htmlFor={service.id} className="text-sm text-gray-700 cursor-pointer">
                  {service.name} (+{service.price.toLocaleString('vi-VN')}đ)
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Ghi chú */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ghi chú thêm
          </label>
          <Textarea
            name="note"
            value={formData.note}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Ghi chú về màu sắc, yêu cầu đặc biệt..."
          />
        </div>

        {/* Tổng tiền */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Tổng tiền:</span>
            <span className="text-pink-600">
              {calculateTotal().toLocaleString('vi-VN')}đ
            </span>
          </div>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 text-lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Đang gửi...
            </>
          ) : (
            <>
              🌺 Đặt Hoa Ngay
              <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}