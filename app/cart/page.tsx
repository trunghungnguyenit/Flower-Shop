"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Gift,
  Heart,
  Star,
  Truck,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { Checkbox } from "@/components/ui/checkbox"
import {
  staggerContainer,
  staggerItem,
  premiumEase
} from "@/components/animations/framer-variants"

export default function CartPage() {
  const {
    items: cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    toggleSelectItem,
    selectAllItems,
    getSelectedItems,
    getSelectedTotalPrice
  } = useCart()

  // Calculate derived values using selected items
  const selectedItems = getSelectedItems()
  const subtotal = getSelectedTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 30000 // Free shipping over 500k
  const total = subtotal + shipping
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length

  const [isLoading, setIsLoading] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [showProductDetails, setShowProductDetails] = useState(true)

  // Checkout handler
  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect to checkout or show success
  }

  // Apply promo code
  const handleApplyPromo = () => {
    // Handle promo code logic
    console.log("Applying promo code:", promoCode)
  }

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />

      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="flex items-center gap-2 mb-8"
          >
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              <span className="font-body text-sm">Tiếp tục mua sắm</span>
            </Link>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="font-body text-sm text-[var(--text-primary)]">Giỏ hàng</span>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-[var(--text-primary)]">
                Giỏ hàng của bạn
              </h1>
            </div>
            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto">
              {cartItems.length > 0
                ? `Bạn có ${cartItems.length} sản phẩm trong giỏ hàng${selectedItems.length > 0 ? ` (${selectedItems.length} đã chọn)` : ''}. Chọn sản phẩm và tiến hành thanh toán.`
                : "Giỏ hàng của bạn đang trống. Hãy khám phá bộ sưu tập hoa tươi của chúng tôi."
              }
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            // Empty Cart State
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: premiumEase }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-[var(--background-muted)] rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-16 h-16 text-[var(--text-muted)]" strokeWidth={1} />
              </div>

              <h2 className="font-display text-2xl font-semibold text-[var(--text-primary)] mb-4">
                Giỏ hàng trống
              </h2>

              <p className="font-body text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
                Khám phá bộ sưu tập hoa tươi đẹp của chúng tôi và tìm những món quà hoàn hảo.
              </p>

              <Link
                href="/bo-suu-tap"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-body font-medium rounded-full hover:bg-[var(--primary-dark)] transition-colors"
              >
                Khám phá bộ sưu tập
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </motion.div>
          ) : (
            // Cart Content
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {/* Select All */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: premiumEase }}
                  className="flex items-center gap-3 p-4 bg-[var(--background-muted)] rounded-xl mb-6"
                >
                  <Checkbox
                    id="select-all"
                    checked={allSelected}
                    onCheckedChange={(checked) => selectAllItems(!!checked)}
                  />
                  <label
                    htmlFor="select-all"
                    className="font-body text-sm text-[var(--text-primary)] cursor-pointer"
                  >
                    Chọn tất cả ({cartItems.length} sản phẩm)
                  </label>
                  {selectedItems.length > 0 && selectedItems.length < cartItems.length && (
                    <span className="text-xs text-[var(--text-secondary)]">
                      ({selectedItems.length} đã chọn)
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial="initial"
                  animate="animate"
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product?.id || Math.random()}
                      variants={staggerItem}
                      className={cn(
                        "flex gap-6 p-6 bg-white border rounded-xl hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300",
                        item.selected
                          ? "border-[var(--primary)] shadow-[0_0_0_1px_var(--primary)]"
                          : "border-[var(--border-soft)]"
                      )}
                    >
                      {/* Selection Checkbox */}
                      <div className="flex items-start pt-2">
                        <Checkbox
                          id={`item-${item.product?.id}`}
                          checked={item.selected}
                          onCheckedChange={() => item.product?.id && toggleSelectItem(item.product.id)}
                        />
                      </div>

                      {/* Product Image */}
                      <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={getSafeImageSrc(item.product?.image, "/placeholder.svg?height=128&width=128")}
                          alt={getSafeAltText(item.product?.name, "Sản phẩm")}
                          fill
                          className="object-cover"
                        />

                        {/* Wishlist Button */}
                        <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <Heart className="w-4 h-4 text-[var(--text-secondary)]" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-1">
                              {getSafeAltText(item.product?.name, "Sản phẩm")}
                            </h3>
                            {item.product.category && (
                              <p className="text-xs text-[var(--text-muted)] mt-1">
                                Danh mục: {item.product.category}
                              </p>
                            )}
                            {item.note && (
                              <p className="text-sm text-[var(--text-muted)]">
                                Ghi chú: {item.note}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => item.product?.id && removeFromCart(item.product.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                            disabled={!item.product?.id}
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-[var(--text-muted)] ml-1">(4.9)</span>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-xl font-semibold text-[var(--primary)]">
                              {item.product.price}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => item.product?.id && updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-[var(--background-muted)] transition-colors"
                              disabled={!item.product?.id}
                            >
                              <Minus className="w-4 h-4" strokeWidth={2} />
                            </button>
                            <span className="w-12 text-center font-medium text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => item.product?.id && updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-[var(--background-muted)] transition-colors"
                              disabled={!item.product?.id}
                            >
                              <Plus className="w-4 h-4" strokeWidth={2} />
                            </button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="mt-3 pt-3 border-t border-[var(--border-soft)]">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[var(--text-secondary)]">Thành tiền:</span>
                            <span className="font-display text-lg font-semibold text-[var(--primary)]">
                              {(() => {
                                if (!item.product?.price || typeof item.product.price !== 'string') {
                                  return '0đ'
                                }
                                const priceMatch = item.product.price.match(/[\d.]+/)
                                if (!priceMatch) {
                                  return 'Liên hệ'
                                }
                                const price = parseFloat(priceMatch[0].replace(/\./g, '')) || 0
                                return (price * item.quantity).toLocaleString() + 'đ'
                              })()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Promo Code */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: premiumEase }}
                  className="mt-8 p-6 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-light)]/5 rounded-xl border border-[var(--primary)]/10"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Gift className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-semibold text-[var(--primary)]">
                      Mã giảm giá
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Nhập mã giảm giá của bạn"
                      className="flex-1 px-4 py-3 border border-[var(--border-soft)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-6 py-3 bg-[var(--primary)] text-white font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
                    >
                      Áp dụng
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
                  className="sticky top-24"
                >
                  {/* Summary Card */}
                  <div className="bg-white border border-[var(--border-soft)] rounded-xl p-6 mb-6">
                    <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] mb-6">
                      Tóm tắt đơn hàng
                    </h3>

                    <div className="space-y-4 mb-6">
                      {/* Selected Products Details */}
                      {selectedItems.length > 0 && (
                        <div className="space-y-3">
                          <button
                            onClick={() => setShowProductDetails(!showProductDetails)}
                            className="w-full flex items-center justify-between font-medium text-[var(--text-primary)] text-sm border-b border-[var(--border-soft)] pb-2 hover:text-[var(--primary)] transition-colors"
                          >
                            <span>
                              Sản phẩm đã chọn ({selectedItems.length})
                              {!showProductDetails && (
                                <span className="text-[var(--text-muted)] font-normal ml-2">
                                  - {subtotal.toLocaleString()}đ
                                </span>
                              )}
                            </span>
                            {showProductDetails ? (
                              <ChevronUp className="w-4 h-4" strokeWidth={1.5} />
                            ) : (
                              <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                            )}
                          </button>
                          {showProductDetails && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: premiumEase }}
                              className="space-y-2 max-h-48 overflow-y-auto"
                            >
                              {selectedItems.map((item) => {
                                const itemPrice = (() => {
                                  if (!item.product?.price || typeof item.product.price !== 'string') {
                                    return 0
                                  }
                                  const priceMatch = item.product.price.match(/[\d.]+/)
                                  if (!priceMatch) return 0
                                  return parseFloat(priceMatch[0].replace(/\./g, '')) || 0
                                })()
                                const itemTotal = itemPrice * item.quantity

                                return (
                                  <div key={item.product?.id} className="flex justify-between items-start text-sm p-3 bg-[var(--background-muted)] rounded-lg">
                                    <div className="flex-1 min-w-0 pr-3">
                                      <p className="font-medium text-[var(--text-primary)] line-clamp-1 mb-1">
                                        {getSafeAltText(item.product?.name, "Sản phẩm")}
                                      </p>
                                      <div className="space-y-1">
                                        <p className="text-[var(--text-muted)] text-xs">
                                          Đơn giá: {item.product?.price} × {item.quantity}
                                        </p>
                                        {item.additionalServices && item.additionalServices.length > 0 && (
                                          <p className="text-[var(--text-muted)] text-xs">
                                            Dịch vụ: {item.additionalServices.join(", ")}
                                          </p>
                                        )}
                                        {item.note && (
                                          <p className="text-[var(--text-muted)] text-xs italic">
                                            Ghi chú: {item.note}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold text-[var(--primary)] text-base">
                                        {itemTotal > 0 ? `${itemTotal.toLocaleString()}đ` : 'Liên hệ'}
                                      </p>
                                      <p className="text-[var(--text-muted)] text-xs">
                                        SL: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                )
                              })}
                            </motion.div>
                          )}
                        </div>
                      )}

                      <div className="border-t border-[var(--border-soft)] pt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-[var(--text-secondary)]">Phí vận chuyển</span>
                          <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
                            {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}
                          </span>
                        </div>

                        {shipping === 0 && (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <Truck className="w-4 h-4" strokeWidth={1.5} />
                            <span>Bạn được miễn phí vận chuyển!</span>
                          </div>
                        )}

                        <div className="border-t border-[var(--border-soft)] pt-3">
                          <div className="flex justify-between items-center">
                            <span className="font-display text-lg font-semibold">Tổng cộng</span>
                            <span className="font-display text-2xl font-bold text-[var(--primary)]">
                              {total.toLocaleString()}đ
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      onClick={handleCheckout}
                      disabled={isLoading || selectedItems.length === 0}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-4 font-semibold rounded-xl transition-colors mb-4",
                        selectedItems.length === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] disabled:opacity-70"
                      )}
                      whileHover={{ scale: selectedItems.length > 0 ? 1.02 : 1 }}
                      whileTap={{ scale: selectedItems.length > 0 ? 0.98 : 1 }}
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Đang xử lý...
                        </>
                      ) : selectedItems.length === 0 ? (
                        <>
                          Chọn sản phẩm để thanh toán
                        </>
                      ) : (
                        <>
                          Tiến hành thanh toán ({selectedItems.length} sản phẩm)
                          <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                        </>
                      )}
                    </motion.button>

                    {/* Continue Shopping */}
                    <Link
                      href="/bo-suu-tap"
                      className="w-full block text-center py-3 text-[var(--text-secondary)] font-medium hover:text-[var(--primary)] transition-colors"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </div>

                  {/* Trust Badges */}
                  <div className="bg-[var(--background-muted)] rounded-xl p-6">
                    <h4 className="font-display font-semibold text-[var(--text-primary)] mb-4">
                      Cam kết của chúng tôi
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: Shield, text: "Hoa tươi 100%" },
                        { icon: Truck, text: "Giao hàng nhanh chóng" },
                        { icon: Clock, text: "Hỗ trợ 24/7" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                            <item.icon className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                          </div>
                          <span className="text-sm text-[var(--text-secondary)]">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterSection />
    </div>
  )
}