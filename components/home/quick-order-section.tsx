"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Clock, MapPin, Check, Phone, MessageCircle, Send, Plus, Minus, Gift, X } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { Product } from "@/api/api.type"
import { formatImageUrl } from "@/api/firebase"
import { staggerContainer, staggerItemLeft, premiumEase } from "@/components/animations/framer-variants"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

// ================================================================
// QUICK ORDER SECTION
// ================================================================

interface QuickOrderSectionProps {
  products: Product[]
  loading: boolean
}

interface OrderFormData {
  name: string;
  phone: string;
  productId: string;
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

export function QuickOrderSection({ products, loading }: QuickOrderSectionProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    productId: '',
    quantity: 1,
    senderAddress: '',
    receiverAddress: '',
    deliveryTime: '',
    additionalServices: [],
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  // Lọc sản phẩm active
  const activeProducts = products.filter(p => p.isActive)

  // Tìm sản phẩm được chọn
  const selectedProduct = activeProducts.find(p => p.id === formData.productId)

  // Tính tổng tiền
  const calculateTotal = () => {
    if (!selectedProduct) return 0
    const productTotal = selectedProduct.price * formData.quantity
    const servicesTotal = formData.additionalServices.reduce((total, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId)
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

  const handleProductChange = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      productId,
      quantity: 1, // Reset quantity when product changes
      additionalServices: [], // Reset services when product changes
    }));
  };

  const handleClearProduct = () => {
    setFormData(prev => ({
      ...prev,
      productId: '',
      quantity: 1,
      additionalServices: [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.productId || !formData.receiverAddress) {
      setErrorMessage('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    if (!selectedProduct) {
      setErrorMessage('Vui lòng chọn sản phẩm');
      return;
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const orderData = {
        name: formData.name,
        phone: formData.phone,
        note: formData.note,
        productName: selectedProduct.name,
        productPrice: selectedProduct.price,
        quantity: formData.quantity,
        senderAddress: formData.senderAddress,
        receiverAddress: formData.receiverAddress,
        deliveryTime: formData.deliveryTime,
        additionalServices: formData.additionalServices.map(id => {
          const service = additionalServices.find(s => s.id === id)
          return service ? `${service.name} (+${service.price.toLocaleString('vi-VN')}đ)` : id
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
        setIsSuccess(true)
        // Reset form
        setFormData({
          name: '',
          phone: '',
          productId: '',
          quantity: 1,
          senderAddress: '',
          receiverAddress: '',
          deliveryTime: '',
          additionalServices: [],
          note: '',
        });
        setTimeout(() => setIsSuccess(false), 5000)
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
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            <motion.span
              variants={staggerItemLeft}
              className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Đặt hoa nhanh
            </motion.span>

            <motion.h2
              variants={staggerItemLeft}
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              Gửi Yêu Thương
              <br />
              <span className="text-gradient-primary">Chỉ 3 Bước Đơn Giản</span>
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
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
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
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-[var(--border-soft)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors duration-300"
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
                      className="w-20 h-20 mb-6 flex items-center justify-center bg-[var(--success)]/10 rounded-full"
                    >
                      <Check className="w-10 h-10 text-[var(--success)]" strokeWidth={1.5} />
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Chọn sản phẩm */}
                <div>
                  <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                    Chọn sản phẩm <span className="text-[var(--danger)]">*</span>
                  </label>
                  {loading ? (
                    <div className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] rounded-md flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-[var(--primary)]/30 border-t-[var(--primary)] rounded-full animate-spin" />
                    </div>
                  ) : (
                    <select
                      name="productId"
                      value={formData.productId}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 appearance-none"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                      required
                    >
                      <option value="">Chọn sản phẩm...</option>
                      {activeProducts.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {product.price.toLocaleString('vi-VN')}đ
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Thông tin sản phẩm đã chọn */}
                <AnimatePresence>
                  {selectedProduct && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[var(--background-muted)] p-4 rounded-lg border border-[var(--border-soft)] overflow-hidden"
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
                            <h4 className="font-body text-[var(--text-primary)] font-medium" style={{ fontSize: "15px" }}>
                              {selectedProduct.name}
                            </h4>
                            <button
                              type="button"
                              onClick={handleClearProduct}
                              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="font-body text-[var(--primary)] font-semibold" style={{ fontSize: "16px" }}>
                            {selectedProduct.price.toLocaleString('vi-VN')}đ
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Thông tin khách hàng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Họ tên <span className="text-[var(--danger)]">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                      Số điện thoại <span className="text-[var(--danger)]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0905 xxx xxx"
                      className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                      style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                      required
                    />
                  </div>
                </div>

                {/* Số lượng */}
                {selectedProduct && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                        Số lượng
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={formData.quantity <= 1}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 border border-[var(--border-soft)] rounded-md min-w-[60px] text-center font-body text-[var(--text-primary)]">
                          {formData.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(1)}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Địa chỉ */}
                {selectedProduct && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 gap-5"
                    >
                      <div>
                        <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Địa chỉ nhận <span className="text-[var(--danger)]">*</span>
                        </label>
                        <input
                          type="text"
                          name="receiverAddress"
                          value={formData.receiverAddress}
                          onChange={handleInputChange}
                          placeholder="Địa chỉ giao hoa"
                          className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                          style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                          required={!!selectedProduct}
                        />
                      </div>
                      <div>
                        <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                          Thời gian giao hàng
                        </label>
                        <select
                          name="deliveryTime"
                          value={formData.deliveryTime}
                          onChange={handleInputChange}
                          className="w-full h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 appearance-none"
                          style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                        >
                          <option value="">Chọn thời gian...</option>
                          {deliveryTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Dịch vụ thêm */}
                {selectedProduct && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
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
                            <label htmlFor={service.id} className="text-sm font-body text-[var(--text-primary)] cursor-pointer">
                              {service.name} (+{service.price.toLocaleString('vi-VN')}đ)
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Tổng tiền */}
                {selectedProduct && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[var(--background-muted)] p-4 rounded-lg border border-[var(--border-soft)]"
                    >
                      <div className="flex justify-between items-center font-body" style={{ fontSize: "16px", fontWeight: 600 }}>
                        <span className="text-[var(--text-primary)]">Tổng tiền:</span>
                        <span className="text-[var(--primary)]">
                          {calculateTotal().toLocaleString('vi-VN')}đ
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Ghi chú */}
                <div>
                  <label className="block font-body text-[var(--text-primary)] mb-2" style={{ fontSize: "14px", fontWeight: 500 }}>
                    Ghi chú thêm
                  </label>
                  <textarea
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Ghi chú về màu sắc, thời gian giao hàng, yêu cầu đặc biệt..."
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300 resize-none"
                    style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-colors duration-300 disabled:opacity-70"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(var(--primary-rgb), 0.3)", transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      🌺 Đặt Hoa Ngay
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p
                  className="font-body text-[var(--text-muted)] text-center"
                  style={{ fontSize: "12px" }}
                >
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