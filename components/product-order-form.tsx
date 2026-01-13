'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Send, MapPin, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { premiumEase } from '@/components/animations/framer-variants';
import type { Product, OrderFormData } from '@/api/api.type';
import { extraServices, deliveryAreas, paymentMethods, orderFormValidationSchema } from '@/lib/order-constants';

interface ProductOrderFormProps {
  product: Product;
  onClose?: () => void;
}

export default function ProductOrderForm({ product, onClose }: ProductOrderFormProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    // Thông tin người đặt
    senderName: '',
    senderPhone: '',
    
    // Thông tin đơn hoa
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
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Tính tổng tiền
  const calculateTotal = () => {
    const productTotal = product.price * formData.quantity;
    const servicesTotal = formData.extraServices.reduce((total, serviceId) => {
      const service = extraServices.find(s => s.id === serviceId);
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
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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
      extraServices: prev.extraServices.includes(serviceId)
        ? prev.extraServices.filter(id => id !== serviceId)
        : [...prev.extraServices, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setErrorMessage('');
    setFieldErrors({});

    try {
      // Validate form data with Yup
      await orderFormValidationSchema.validate(formData, { 
        abortEarly: false,
        context: { isQuickOrder: false }
      });
      
      const orderData = {
        // 2.1. Thông tin người đặt
        senderName: formData.senderName,
        senderPhone: formData.senderPhone,
        
        // 2.2. Thông tin đơn hoa
        product: product.name,
        quantity: formData.quantity,
        productPrice: product.price,
        extraServices: formData.extraServices.map(id => {
          const service = extraServices.find(s => s.id === id);
          return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id;
        }),
        deliveryDate: formData.deliveryDateTime.split('T')[0], // Tách ngày từ datetime
        deliveryTimeSlot: formData.deliveryDateTime.split('T')[1] || '', // Tách giờ từ datetime
        deliveryArea: formData.deliveryArea,
        totalAmount: calculateTotal(),
        
        // 2.3. Thông tin người nhận
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone,
        receiverAddress: formData.receiverAddress,
        cardMessage: formData.cardMessage,
        
        // 2.4. Ghi chú
        note: formData.note,
        
        // 2.5. Thanh toán
        paymentMethod: formData.paymentMethod,
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
        // Save order data to localStorage for the order info page
        const orderInfoData = {
          // 1.1. Thông tin người đặt
          senderName: formData.senderName,
          senderPhone: formData.senderPhone,
          
          // 1.2. Thông tin đơn hoa
          product: product.name,
          quantity: formData.quantity,
          productPrice: product.price,
          extraServices: formData.extraServices.map(id => {
            const service = extraServices.find(s => s.id === id);
            return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id;
          }),
          deliveryDate: formData.deliveryDateTime.split('T')[0], // Tách ngày từ datetime
          deliveryTimeSlot: formData.deliveryDateTime.split('T')[1] || '', // Tách giờ từ datetime
          deliveryArea: formData.deliveryArea,
          totalAmount: calculateTotal(),
          
          // 1.3. Thông tin người nhận
          receiverName: formData.receiverName,
          receiverPhone: formData.receiverPhone,
          receiverAddress: formData.receiverAddress,
          cardMessage: formData.cardMessage,
          
          // 1.4. Thông tin khác
          note: formData.note,
          paymentMethod: formData.paymentMethod,
        };

        // Save to localStorage
        localStorage.setItem('currentOrder', JSON.stringify(orderInfoData));
        
        // Redirect to order info page
        window.location.href = '/order-info';
      } else {
        setErrorMessage(result.message || 'Có lỗi xảy ra khi gửi đơn hàng');
      }
    } catch (error) {
      if (error instanceof Error && 'inner' in error) {
        // Handle validation errors
        const validationError = error as any;
        const errors: Record<string, string> = {};
        validationError.inner.forEach((err: any) => {
          if (err.path) {
            errors[err.path] = err.message;
          }
        });
        setFieldErrors(errors);
        setErrorMessage('Vui lòng kiểm tra lại thông tin đã nhập');
      } else {
        setErrorMessage('Không thể gửi đơn đặt hàng. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto relative">
      {/* Success Overlay */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-lg"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mb-6 flex items-center justify-center bg-[var(--primary-success)]/10 rounded-full"
            >
              <Check className="w-10 h-10 text-[var(--primary-success)]" strokeWidth={1.5} />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-display text-[var(--text-primary)] mb-2 text-center"
              style={{ fontSize: "24px", fontWeight: 600 }}
            >
              Gửi thành công!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="font-body text-[var(--text-secondary)] text-center"
              style={{ fontSize: "15px" }}
            >
              Chúng tôi sẽ liên hệ bạn trong 15 phút
            </motion.p>
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
        {/* 2.1. Thông tin người đặt */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Thông tin người đặt
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên người gửi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.senderName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-pink-500'
                }`}
                placeholder="Nhập tên người gửi"
              />
              {fieldErrors.senderName && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.senderName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại người gửi <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="senderPhone"
                value={formData.senderPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.senderPhone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-pink-500'
                }`}
                placeholder="0905123456"
                maxLength={10}
              />
              {fieldErrors.senderPhone && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.senderPhone}</p>
              )}
            </div>
          </div>
        </div>

        {/* 2.2. Thông tin đơn hoa */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Thông tin đơn hoa
          </h3>
          
          {/* Sản phẩm / mẫu hoa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sản phẩm / mẫu hoa
            </label>
            <div className="p-3 bg-gray-50 rounded-md border">
              <div className="font-medium text-gray-800">{product.name}</div>
              <div className="text-sm text-gray-600">Đơn giá: {product.price.toLocaleString('vi-VN')}đ</div>
            </div>
          </div>

          {/* Số lượng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số lượng <span className="text-red-500">*</span>
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
              <span className={`px-4 py-2 border rounded-md min-w-[60px] text-center ${
                fieldErrors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}>
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
            {fieldErrors.quantity && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.quantity}</p>
            )}
          </div>

          {/* Dịch vụ thêm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Gift className="w-4 h-4 inline mr-1" />
              Dịch vụ thêm
            </label>
            <div className="space-y-2">
              {extraServices.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.extraServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <label htmlFor={service.id} className="text-sm text-gray-700 cursor-pointer">
                    {service.name} (+{service.price.toLocaleString('vi-VN')}đ)
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Thời gian giao hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thời gian giao hàng <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="deliveryDateTime"
              value={formData.deliveryDateTime}
              onChange={handleInputChange}
              min={new Date().toISOString().slice(0, 16)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.deliveryDateTime 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-pink-500'
              }`}
            />
            {fieldErrors.deliveryDateTime && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.deliveryDateTime}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Ví dụ: 22:20 07/01/2026
            </p>
          </div>

          {/* Khu vực giao hàng */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khu vực giao hàng <span className="text-red-500">*</span>
            </label>
            <select
              name="deliveryArea"
              value={formData.deliveryArea}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.deliveryArea 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-pink-500'
              }`}
            >
              <option value="">Chọn khu vực giao hàng</option>
              {deliveryAreas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Chỉ nhận giao hàng khu vực Đà Nẵng & Quảng Nam
            </p>
            {fieldErrors.deliveryArea && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.deliveryArea}</p>
            )}
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
        </div>

        {/* 2.3. Thông tin người nhận */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Thông tin người nhận
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên người nhận <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.receiverName 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-pink-500'
                }`}
                placeholder="Nhập tên người nhận"
              />
              {fieldErrors.receiverName && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.receiverName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại người nhận <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  fieldErrors.receiverPhone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-pink-500'
                }`}
                placeholder="0905123456"
                maxLength={10}
              />
              {fieldErrors.receiverPhone && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.receiverPhone}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Địa chỉ cụ thể <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                fieldErrors.receiverAddress 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-pink-500'
              }`}
              placeholder="Địa chỉ giao hoa"
            />
            {fieldErrors.receiverAddress && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.receiverAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lời nhắn trên thiệp / banner
            </label>
            <Textarea
              name="cardMessage"
              value={formData.cardMessage}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Lời nhắn gửi đến người nhận..."
            />
          </div>
        </div>

        {/* 2.4. Ghi chú */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Ghi chú
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ghi chú thêm về đơn hàng (optional)
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
        </div>

        {/* 2.5. Thanh toán */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Thanh toán
          </h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Phương thức thanh toán <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={method.id}
                    name="paymentMethod"
                    value={method.id}
                    checked={formData.paymentMethod === method.id}
                    onChange={handleInputChange}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  <label htmlFor={method.id} className="text-sm text-gray-700 cursor-pointer">
                    {method.name}
                  </label>
                </div>
              ))}
            </div>
            {fieldErrors.paymentMethod && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.paymentMethod}</p>
            )}
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