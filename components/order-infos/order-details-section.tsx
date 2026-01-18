"use client"

import { motion } from "framer-motion"
import { Package } from "lucide-react"
import { staggerItem } from "@/components/animations/framer-variants"

interface OrderDetailsSectionProps {
  product: string
  quantity: number
  productPrice: number
  extraServices: string[]
  deliveryDate: string
  deliveryTimeSlot?: string
  deliveryArea: string
  totalAmount: number
}

export function OrderDetailsSection({
  product,
  quantity,
  productPrice,
  extraServices,
  deliveryDate,
  deliveryTimeSlot,
  deliveryArea,
  totalAmount,
}: OrderDetailsSectionProps) {
  // Format delivery area
  const formatDeliveryArea = (area: string) => {
    return area === 'da-nang' ? 'Đà Nẵng' : 'Quảng Nam'
  }

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
          <Package className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          1.2. Thông tin đơn hoa
        </h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Tên sản phẩm / mẫu hoa
            </label>
            <p className="text-[var(--text-primary)] font-medium">{product}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Số lượng
            </label>
            <p className="text-[var(--text-primary)] font-medium">{quantity}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Đơn giá (giá tham khảo)
            </label>
            <p className="text-[var(--text-primary)] font-medium">
              {productPrice.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Thời gian giao hàng
            </label>
            <p className="text-[var(--text-primary)] font-medium">
              {deliveryTimeSlot && deliveryDate 
                ? `${deliveryTimeSlot} ${deliveryDate.split('-').reverse().join('/')}`
                : deliveryDate}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Dịch vụ thêm đã chọn
          </label>
          {extraServices.length > 0 ? (
            <ul className="space-y-1">
              {extraServices.map((service, index) => (
                <li key={index} className="text-[var(--text-primary)] font-medium">
                  • {service}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[var(--text-muted)]">Không có dịch vụ thêm</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
            Khu vực giao hàng
          </label>
          <p className="text-[var(--text-primary)] font-medium">
            {formatDeliveryArea(deliveryArea)}
          </p>
        </div>

        <div className="bg-[var(--background-muted)] p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-[var(--text-primary)]">
              Tổng tiền tạm tính:
            </span>
            <span className="text-xl font-bold text-[var(--primary)]">
              {totalAmount.toLocaleString('vi-VN')}đ
            </span>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            <strong>Lưu ý:</strong> Tổng tiền trên chỉ mang tính tham khảo. 
            Đơn hàng sẽ được xác nhận lại khi nhân viên liên hệ.
          </p>
        </div>
      </div>
    </motion.div>
  )
}