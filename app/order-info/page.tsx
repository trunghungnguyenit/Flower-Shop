"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Copy, 
  Check,
  MapPin,
  Phone,
  User,
  Package,
  CreditCard,
  MessageCircle,
  FileText
} from "lucide-react"

import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { Button } from "@/components/ui/button"

import { 
  staggerContainer, 
  staggerItem, 
  premiumEase 
} from "@/components/animations/framer-variants"

// Interface for order data
interface OrderInfo {
  // 1.1. Thông tin người đặt
  senderName: string;
  senderPhone: string;
  
  // 1.2. Thông tin đơn hoa
  product: string;
  quantity: number;
  productPrice: number;
  extraServices: string[];
  deliveryDate: string;
  deliveryTimeSlot?: string;
  deliveryArea: string;
  totalAmount: number;
  
  // 1.3. Thông tin người nhận
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  cardMessage: string;
  
  // 1.4. Thông tin khác
  note?: string;
  paymentMethod: string;
}

// QR Payment Info
interface QRPaymentInfo {
  storeName: string;
  bankName: string;
  accountHolder: string;
  qrCodeUrl: string;
}

// Mock QR payment data (replace with actual data)
const qrPaymentInfo: QRPaymentInfo = {
  storeName: "Hoa Tươi Đà Nẵng",
  bankName: "Vietcombank",
  accountHolder: "NGUYEN VAN A",
  qrCodeUrl: "/qr-code-sample.png",
};

// Component that uses useSearchParams
function OrderInfoContent() {
  const searchParams = useSearchParams()
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  // Get order data from URL params or localStorage
  useEffect(() => {
    // Try to get order data from URL params first
    const orderData = searchParams.get('data')
    
    if (orderData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(orderData))
        setOrderInfo(parsedData)
      } catch (error) {
        console.error('Error parsing order data:', error)
      }
    } else {
      // Fallback to localStorage or show error
      const savedOrder = localStorage.getItem('currentOrder')
      if (savedOrder) {
        try {
          const parsedData = JSON.parse(savedOrder)
          setOrderInfo(parsedData)
        } catch (error) {
          console.error('Error parsing saved order:', error)
        }
      }
    }
    
    setLoading(false)
  }, [searchParams])

  // Handle copy transfer content
  const handleCopyTransferContent = () => {
    if (orderInfo) {
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
  }

  // Format delivery area
  const formatDeliveryArea = (area: string) => {
    return area === 'da-nang' ? 'Đà Nẵng' : 'Quảng Nam'
  }

  // Format payment method
  const formatPaymentMethod = (method: string) => {
    return method === 'qr-code' ? 'Quét mã QR' : 'Trả tiền mặt khi nhận hàng'
  }

  if (loading) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[800px] px-4 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!orderInfo) {
    return (
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[800px] px-4 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy thông tin đơn hàng
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng thử đặt hàng lại hoặc liên hệ với chúng tôi để được hỗ trợ.
          </p>
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-4 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="flex items-center gap-2 mb-8"
        >
          <Link 
            href="/" 
            className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            Trang chủ
          </Link>
          <span className="text-[var(--text-muted)]">/</span>
          <span className="text-[var(--text-primary)]">Thông tin đặt</span>
        </motion.div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[var(--text-primary)] mb-4">
            Thông tin đặt hàng
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Cảm ơn bạn đã đặt hàng! Vui lòng kiểm tra thông tin bên dưới và thực hiện thanh toán nếu cần.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* 1.1. Thông tin người đặt */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                1.1. Thông tin người đặt
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Tên người đặt
                </label>
                <p className="text-[var(--text-primary)] font-medium">{orderInfo.senderName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Số điện thoại người đặt
                </label>
                <p className="text-[var(--text-primary)] font-medium">{orderInfo.senderPhone}</p>
              </div>
            </div>
          </motion.div>

          {/* 1.2. Thông tin đơn hoa */}
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
                  <p className="text-[var(--text-primary)] font-medium">{orderInfo.product}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Số lượng
                  </label>
                  <p className="text-[var(--text-primary)] font-medium">{orderInfo.quantity}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Đơn giá (giá tham khảo)
                  </label>
                  <p className="text-[var(--text-primary)] font-medium">
                    {orderInfo.productPrice.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Thời gian giao hàng
                  </label>
                  <p className="text-[var(--text-primary)] font-medium">
                    {orderInfo.deliveryTimeSlot && orderInfo.deliveryDate 
                      ? `${orderInfo.deliveryTimeSlot} ${orderInfo.deliveryDate.split('-').reverse().join('/')}`
                      : orderInfo.deliveryDate}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Dịch vụ thêm đã chọn
                </label>
                {orderInfo.extraServices.length > 0 ? (
                  <ul className="space-y-1">
                    {orderInfo.extraServices.map((service, index) => (
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
                  {formatDeliveryArea(orderInfo.deliveryArea)}
                </p>
              </div>

              <div className="bg-[var(--background-muted)] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[var(--text-primary)]">
                    Tổng tiền tạm tính:
                  </span>
                  <span className="text-xl font-bold text-[var(--primary)]">
                    {orderInfo.totalAmount.toLocaleString('vi-VN')}đ
                  </span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mt-2">
                  <strong>Lưu ý:</strong> Tổng tiền trên chỉ mang tính tham khảo. 
                  Đơn hàng sẽ được xác nhận lại khi nhân viên liên hệ.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 1.3. Thông tin người nhận */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                1.3. Thông tin người nhận
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Tên người nhận
                  </label>
                  <p className="text-[var(--text-primary)] font-medium">{orderInfo.receiverName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Số điện thoại người nhận
                  </label>
                  <p className="text-[var(--text-primary)] font-medium">{orderInfo.receiverPhone}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Địa chỉ giao hàng cụ thể
                </label>
                <p className="text-[var(--text-primary)] font-medium">{orderInfo.receiverAddress}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Lời nhắn trên thiệp / banner
                </label>
                <p className="text-[var(--text-primary)] font-medium">
                  {orderInfo.cardMessage || 'Không có lời nhắn'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 1.4. Thông tin khác */}
          <motion.div
            variants={staggerItem}
            className="bg-white rounded-xl border border-[var(--border-soft)] p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                1.4. Thông tin khác
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Ghi chú thêm của khách
                </label>
                <p className="text-[var(--text-primary)] font-medium">
                  {orderInfo.note || 'Không có ghi chú thêm'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                  Phương thức thanh toán đã chọn
                </label>
                <p className="text-[var(--text-primary)] font-medium">
                  {formatPaymentMethod(orderInfo.paymentMethod)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2. Logic hiển thị QR */}
          {orderInfo.paymentMethod === 'qr-code' ? (
            // 2.1. QR Payment Section
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
          ) : (
            // 2.2. Cash on Delivery Message
            <motion.div
              variants={staggerItem}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h2 className="text-xl font-semibold text-green-800">
                  Thanh toán tiền mặt
                </h2>
              </div>
              <p className="text-green-700">
                Bạn đã chọn thanh toán tiền mặt khi nhận hàng. 
                Nhân viên sẽ liên hệ để xác nhận đơn.
              </p>
            </motion.div>
          )}

          {/* Contact Section */}
          <motion.div
            variants={staggerItem}
            className="bg-[var(--background-muted)] rounded-xl p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              Cần hỗ trợ?
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Nhân viên sẽ liên hệ với bạn trong vòng 15 phút. 
              Nếu cần hỗ trợ ngay, vui lòng liên hệ:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" asChild>
                <a href="tel:0901333434">
                  <Phone className="w-4 h-4 mr-2" />
                  0901 333 434
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Zalo
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

// Loading component for Suspense fallback
function OrderInfoLoading() {
  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-4 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function OrderInfoPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <Suspense fallback={<OrderInfoLoading />}>
        <OrderInfoContent />
      </Suspense>

      <FooterSection />
    </div>
  )
}