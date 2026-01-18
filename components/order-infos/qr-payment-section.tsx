"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CreditCard, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { staggerItem } from "@/components/animations/framer-variants"

interface QRPaymentInfo {
  storeName: string
  bankName: string
  accountHolder: string
  qrCodeUrl: string
}

interface QRPaymentSectionProps {
  orderInfo: {
    totalAmount: number
    deliveryTimeSlot?: string
    deliveryDate: string
    senderName: string
  }
  qrPaymentInfo: QRPaymentInfo
}

export function QRPaymentSection({ orderInfo, qrPaymentInfo }: QRPaymentSectionProps) {
  const [copySuccess, setCopySuccess] = useState(false)

  // Handle copy transfer content
  const handleCopyTransferContent = () => {
    // Format: DH + Thời gian giao hàng + Tên người đặt
    const deliveryTime = orderInfo.deliveryTimeSlot && orderInfo.deliveryDate 
      ? `${orderInfo.deliveryTimeSlot.replace(':', '')}${orderInfo.deliveryDate.replace(/-/g, '')}`
      : orderInfo.deliveryDate.replace(/-/g, '')
    const content = `DH${deliveryTime} ${orderInfo.senderName}`
    
    navigator.clipboard.writeText(content).then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    })
  }

  return (
    <motion.div
      variants={staggerItem}
      className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary)]/10 rounded-xl border border-[var(--primary)]/20 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-white" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Thanh toán QR
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Tên cửa hàng
            </label>
            <p className="text-[var(--text-primary)] font-medium">{qrPaymentInfo.storeName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Ngân hàng / Ví
            </label>
            <p className="text-[var(--text-primary)] font-medium">{qrPaymentInfo.bankName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Chủ tài khoản
            </label>
            <p className="text-[var(--text-primary)] font-medium">{qrPaymentInfo.accountHolder}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
              Số tiền tạm tính
            </label>
            <p className="text-2xl font-bold text-[var(--primary)]">
              {orderInfo.totalAmount.toLocaleString('vi-VN')}đ
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Nội dung chuyển khoản
            </label>
            <div className="flex items-center gap-2 p-3 bg-white rounded-lg border">
              <code className="flex-1 text-[var(--text-primary)] font-mono text-sm">
                DH{orderInfo.deliveryTimeSlot && orderInfo.deliveryDate 
                  ? `${orderInfo.deliveryTimeSlot.replace(':', '')}${orderInfo.deliveryDate.replace(/-/g, '')}`
                  : orderInfo.deliveryDate.replace(/-/g, '')} {orderInfo.senderName}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyTransferContent}
                className="flex-shrink-0"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-600" />
                    Đã sao chép
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Sao chép
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* QR Code */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="w-48 h-48 rounded-lg overflow-hidden">
              <Image
                src={qrPaymentInfo.qrCodeUrl}
                alt="QR Code thanh toán"
                width={192}
                height={192}
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        <div class="text-center text-gray-500">
                          <div class="text-4xl mb-2">📱</div>
                          <p class="text-sm">QR Code không khả dụng</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>
          <p className="text-sm text-[var(--text-muted)] text-center mt-3">
            Quét mã QR để thanh toán
          </p>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Lưu ý:</strong> Thanh toán QR giúp giữ đơn. 
          Đơn hàng chỉ được xác nhận sau khi nhân viên liên hệ.
        </p>
      </div>
    </motion.div>
  )
}