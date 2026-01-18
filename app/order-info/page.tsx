"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"

import { staggerContainer } from "@/components/animations/framer-variants"
import { OrderInfoLoading } from "@/components/order-infos/order-info-loading"
import { OrderInfoError } from "@/components/order-infos/order-info-error"
import { OrderInfoHeader } from "@/components/order-infos/order-info-header"
import { SenderInfoSection } from "@/components/order-infos/sender-info-section"
import { OrderDetailsSection } from "@/components/order-infos/order-details-section"
import { ReceiverInfoSection } from "@/components/order-infos/receiver-info-section"
import { AdditionalInfoSection } from "@/components/order-infos/additional-info-section"
import { QRPaymentSection } from "@/components/order-infos/qr-payment-section"
import { CashPaymentSection } from "@/components/order-infos/cash-payment-section"
import { ContactSupportSection } from "@/components/order-infos/contact-support-section"

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

  if (loading) {
    return <OrderInfoLoading />
  }

  if (!orderInfo) {
    return <OrderInfoError />
  }

  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-4 lg:px-8">
        <OrderInfoHeader />

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="space-y-6"
        >
          {/* 1.1. Thông tin người đặt */}
          <SenderInfoSection 
            senderName={orderInfo.senderName}
            senderPhone={orderInfo.senderPhone}
          />

          {/* 1.2. Thông tin đơn hoa */}
          <OrderDetailsSection 
            product={orderInfo.product}
            quantity={orderInfo.quantity}
            productPrice={orderInfo.productPrice}
            extraServices={orderInfo.extraServices}
            deliveryDate={orderInfo.deliveryDate}
            deliveryTimeSlot={orderInfo.deliveryTimeSlot}
            deliveryArea={orderInfo.deliveryArea}
            totalAmount={orderInfo.totalAmount}
          />

          {/* 1.3. Thông tin người nhận */}
          <ReceiverInfoSection 
            receiverName={orderInfo.receiverName}
            receiverPhone={orderInfo.receiverPhone}
            receiverAddress={orderInfo.receiverAddress}
            cardMessage={orderInfo.cardMessage}
          />

          {/* 1.4. Thông tin khác */}
          <AdditionalInfoSection 
            note={orderInfo.note}
            paymentMethod={orderInfo.paymentMethod}
          />

          {/* 2. Logic hiển thị QR */}
          {orderInfo.paymentMethod === 'qr-code' ? (
            // 2.1. QR Payment Section
            <QRPaymentSection 
              orderInfo={orderInfo}
              qrPaymentInfo={qrPaymentInfo}
            />
          ) : (
            // 2.2. Cash on Delivery Message
            <CashPaymentSection />
          )}

          {/* Contact Section */}
          <ContactSupportSection />
        </motion.div>
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