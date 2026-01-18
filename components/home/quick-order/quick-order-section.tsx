"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Clock, MapPin, Check, Phone, MessageCircle, Send, Plus, Minus, Gift, X } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { Product, OrderFormData } from "@/api/api.type"
import { formatImageUrl } from "@/api/firebase"
import { staggerContainer, staggerItemLeft, premiumEase } from "@/components/animations/framer-variants"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { extraServices, deliveryAreas, paymentMethods } from "@/lib/order-constants"
import { 
  initialFormData, 
  updateQuantity, 
  toggleExtraService, 
  updateProductSelection, 
  resetProductSelection 
} from "./form-data"
import { validateOrderForm, clearFieldError } from "./form-validation"

// ================================================================
// QUICK ORDER SECTION
// ================================================================

interface QuickOrderSectionProps {
  products: Product[]
  loading: boolean
}

export function QuickOrderSection({ products, loading }: QuickOrderSectionProps) {
  const [formData, setFormData] = useState<OrderFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  // Lọc sản phẩm active và có giá > 0 (không hiển thị sản phẩm liên hệ trong quick order)
  const activeProducts = products.filter(p => p.isActive && p.price > 0)

  // Tìm sản phẩm được chọn
  const selectedProduct = activeProducts.find(p => p.id === formData.productId)

  // Tính tổng tiền
  const calculateTotal = () => {
    if (!selectedProduct) return 0
    const productTotal = selectedProduct.price * formData.quantity
    const servicesTotal = formData.extraServices.reduce((total, serviceId) => {
      const service = extraServices.find(s => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
    return productTotal + servicesTotal
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage(''); // Clear error when user types
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => clearFieldError(prev, name));
    }
  };

  const handleQuantityChange = (delta: number) => {
    setFormData(prev => updateQuantity(prev, delta));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => toggleExtraService(prev, serviceId));
  };

  const handleProductChange = (productId: string) => {
    setFormData(prev => updateProductSelection(prev, productId));
    // Clear product selection error
    if (fieldErrors.productId) {
      setFieldErrors(prev => clearFieldError(prev, 'productId'));
    }
  };

  const handleClearProduct = () => {
    setFormData(prev => resetProductSelection(prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)
    setErrorMessage('')
    setFieldErrors({})

    try {
      // Validate form data with extracted validation logic
      const validationResult = await validateOrderForm(formData, true);
      
      if (!validationResult.isValid) {
        setFieldErrors(validationResult.fieldErrors);
        if (validationResult.generalError) {
          setErrorMessage(validationResult.generalError);
        }
        return;
      }

      const selectedProduct = activeProducts.find(p => p.id === formData.productId);
      if (!selectedProduct) {
        setErrorMessage('Sản phẩm không tồn tại');
        return;
      }

      const orderData = {
        // 2.1. Thông tin người đặt
        senderName: formData.senderName,
        senderPhone: formData.senderPhone,
        
        // 2.2. Thông tin đơn hoa
        product: selectedProduct.name,
        quantity: formData.quantity,
        productPrice: selectedProduct.price,
        extraServices: formData.extraServices.map(id => {
          const service = extraServices.find(s => s.id === id)
          return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id
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
          product: selectedProduct.name,
          quantity: formData.quantity,
          productPrice: selectedProduct.price,
          extraServices: formData.extraServices.map(id => {
            const service = extraServices.find(s => s.id === id)
            return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id
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
      setErrorMessage('Không thể gửi đơn đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="lien-he"
       className="relative bg-white overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.h2
              variants={staggerItemLeft}
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              Gửi Yêu Thương
              <br />
              <span className="text-[var(--text-primary)]">Chỉ 3 Bước Đơn Giản</span>
            </motion.h2>

            <motion.p
              variants={staggerItemLeft}
              className="font-body text-[var(--text-secondary)] mb-8 max-w-lg"
              style={{ fontSize: "16px", lineHeight: 1.8 }}
            >
              Điền thông tin bên dưới, đội ngũ tư vấn sẽ liên hệ bạn ngay trong vòng 15 phút để hỗ trợ
              chọn mẫu hoa phù hợp nhất.
            </motion.p>

            {/* Benefits */}
            <motion.div variants={staggerItemLeft} className="space-y-4 mb-10">
              {[
                { icon: Clock, text: "Phản hồi trong 15 phút" },
                { icon: MapPin, text: "Giao hàng nhanh 2 giờ" },
                { icon: Check, text: "Tư vấn miễn phí" },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1, ease: premiumEase }}
                >
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    style={{
                      borderRadius: "var(--radius-medium)",
                      background: "var(--primary)",
                    }}
                  >
                    <benefit.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <span
                    className="font-body text-[var(--text-primary)]"
                    style={{ fontSize: "15px", fontWeight: 500 }}
                  >
                    {benefit.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Alternative Contact */}
            <motion.div
              variants={staggerItemLeft}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href={CONTACT.phoneLink}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-[var(--border-soft)] text-[var(--text-primary)] hover:border-[var(--primary-success)] hover:text-[var(--primary-success)] transition-colors duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                {CONTACT.phoneDisplay}
              </motion.a>

              <motion.a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0068FF] rounded-full text-white hover:bg-[#0058DD] transition-colors duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Chat Zalo
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.97 }}
            transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
          >
            <motion.div
              className="bg-white p-6 lg:p-10 relative"
              style={{
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
              }}
              whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)", transition: { duration: 0.3 } }}
            >
              {/* Success Overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: premiumEase }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                    style={{ borderRadius: "var(--radius-xl)" }}
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

              {/* Form Header */}
              <div className="text-center mb-8">
                <h3
                  className="font-display text-[var(--text-primary)] mb-2"
                  style={{ fontSize: "22px", fontWeight: 600 }}
                >
                  Đặt Hoa Ngay
                </h3>
                <p
                  className="font-body text-[var(--text-secondary)]"
                  style={{ fontSize: "14px" }}
                >
                  Điền form để nhận tư vấn miễn phí
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Chọn sản phẩm */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chọn sản phẩm <span className="text-red-500">*</span>
                  </label>
                  {loading ? (
                    <div className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-md flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-pink-300 border-t-pink-500 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <>
                      <select
                        name="productId"
                        value={formData.productId}
                        onChange={(e) => handleProductChange(e.target.value)}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          fieldErrors.productId 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-pink-500'
                        }`}
                      >
                        <option value="">Chọn sản phẩm...</option>
                        {activeProducts.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name} - {product.price.toLocaleString('vi-VN')}đ
                          </option>
                        ))}
                      </select>
                      {fieldErrors.productId && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.productId}</p>
                      )}
                    </>
                  )}
                </div>

                {/* Thông tin sản phẩm đã chọn */}
                <AnimatePresence>
                  {selectedProduct && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="flex items-start gap-4">
                        {selectedProduct.images && selectedProduct.images[0] && (
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={formatImageUrl(selectedProduct.images[0])}
                              alt={selectedProduct.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-gray-800 font-medium text-sm">
                              {selectedProduct.name}
                            </h4>
                            <button
                              type="button"
                              onClick={handleClearProduct}
                              className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-pink-600 font-semibold">
                            {selectedProduct.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Thông tin người đặt */}
                {selectedProduct && (
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
                          placeholder="Nguyễn Văn A"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            fieldErrors.senderName 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-pink-500'
                          }`}
                        />
                        {fieldErrors.senderName && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.senderName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="senderPhone"
                          value={formData.senderPhone}
                          onChange={handleInputChange}
                          placeholder="0905123456"
                          maxLength={10}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            fieldErrors.senderPhone 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-pink-500'
                          }`}
                        />
                        {fieldErrors.senderPhone && (
                          <p className="text-red-500 text-sm mt-1">{fieldErrors.senderPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Thông tin đơn hoa */}
                {selectedProduct && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Thông tin đơn hoa
                    </h3>
                    
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
                )}

                {/* Thông tin người nhận */}
                {selectedProduct && (
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
                          placeholder="Tên người nhận hoa"
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            fieldErrors.receiverName 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-pink-500'
                          }`}
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
                          placeholder="0905123456"
                          maxLength={10}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            fieldErrors.receiverPhone 
                              ? 'border-red-500 focus:ring-red-500' 
                              : 'border-gray-300 focus:ring-pink-500'
                          }`}
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
                        placeholder="Địa chỉ giao hoa"
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          fieldErrors.receiverAddress 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-pink-500'
                        }`}
                      />
                      {fieldErrors.receiverAddress && (
                        <p className="text-red-500 text-sm mt-1">{fieldErrors.receiverAddress}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lời nhắn trên thiệp / banner
                      </label>
                      <textarea
                        name="cardMessage"
                        value={formData.cardMessage}
                        onChange={handleInputChange}
                        placeholder="Lời nhắn gửi đến người nhận..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Ghi chú */}
                {selectedProduct && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Ghi chú
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ghi chú thêm về đơn hàng (optional)
                      </label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        placeholder="Ghi chú về màu sắc, yêu cầu đặc biệt..."
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Thanh toán */}
                {selectedProduct && (
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
                )}

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

                <p className="text-xs text-gray-500 text-center">
                  Thông tin sẽ được gửi trực tiếp đến đội ngũ tư vấn
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}