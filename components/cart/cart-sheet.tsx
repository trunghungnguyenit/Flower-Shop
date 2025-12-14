"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { getSafeImageSrc, getSafeAltText } from "@/lib/image-utils"
import { Checkbox } from "@/components/ui/checkbox"

interface CartSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { 
    items: cartItems, 
    updateQuantity, 
    removeFromCart, 
    toggleSelectItem,
    selectAllItems,
    getSelectedItems,
    getSelectedTotalPrice
  } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  
  // Calculate derived values using selected items
  const selectedItems = getSelectedItems()
  const subtotal = getSelectedTotalPrice()
  const shipping = subtotal > 500000 ? 0 : 30000 // Free shipping over 500k
  const total = subtotal + shipping
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length

  // Checkout handler
  const handleCheckout = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    // Redirect to checkout or show success
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Cart Sheet */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[60] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border-soft)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-[var(--primary)]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                    Giỏ hàng
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {cartItems.length} sản phẩm
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--background-muted)] transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <div className="w-20 h-20 bg-[var(--background-muted)] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-[var(--text-muted)]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[var(--text-primary)] mb-2">
                    Giỏ hàng trống
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    Thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-[var(--primary)] text-white font-medium rounded-full hover:bg-[var(--primary-dark)] transition-colors"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {/* Select All */}
                  <div className="flex items-center gap-3 p-3 bg-[var(--background-muted)] rounded-lg">
                    <Checkbox
                      id="select-all-cart-sheet"
                      checked={allSelected}
                      onCheckedChange={(checked) => selectAllItems(!!checked)}
                    />
                    <label 
                      htmlFor="select-all-cart-sheet" 
                      className="text-sm font-medium cursor-pointer flex-1"
                    >
                      Chọn tất cả ({cartItems.length})
                    </label>
                    {selectedItems.length > 0 && selectedItems.length < cartItems.length && (
                      <span className="text-xs text-[var(--text-muted)]">
                        {selectedItems.length} đã chọn
                      </span>
                    )}
                  </div>

                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product?.id || Math.random()}
                      layout
                      className={cn(
                        "flex gap-4 p-4 rounded-xl transition-colors",
                        item.selected 
                          ? "bg-[var(--primary)]/10 border border-[var(--primary)]" 
                          : "bg-[var(--background-muted)]"
                      )}
                    >
                      {/* Selection Checkbox */}
                      <div className="flex items-start pt-1">
                        <Checkbox
                          id={`cart-sheet-item-${item.product?.id}`}
                          checked={item.selected}
                          onCheckedChange={() => item.product?.id && toggleSelectItem(item.product.id)}
                        />
                      </div>

                      {/* Product Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={getSafeImageSrc(item.product?.image, "/placeholder.svg?height=64&width=64")}
                          alt={getSafeAltText(item.product?.name, "Sản phẩm")}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-[var(--text-primary)] text-sm line-clamp-2 mb-1">
                          {getSafeAltText(item.product?.name, "Sản phẩm")}
                        </h4>
                        {item.note && (
                          <p className="text-xs text-[var(--text-muted)] mb-2">
                            Ghi chú: {item.note}
                          </p>
                        )}
                        
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-semibold text-[var(--primary)] text-sm">
                            {item.product.price}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => item.product?.id && updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-white transition-colors"
                              disabled={!item.product?.id}
                            >
                              <Minus className="w-3 h-3" strokeWidth={2} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => item.product?.id && updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-[var(--border-soft)] hover:bg-white transition-colors"
                              disabled={!item.product?.id}
                            >
                              <Plus className="w-3 h-3" strokeWidth={2} />
                            </button>
                          </div>

                          <button
                            onClick={() => item.product?.id && removeFromCart(item.product.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
                            disabled={!item.product?.id}
                          >
                            <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Promo Code */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--primary-light)]/5 rounded-xl border border-[var(--primary)]/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-[var(--primary)]" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-[var(--primary)]">
                        Mã giảm giá
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2 text-sm border border-[var(--border-soft)] rounded-lg focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                      <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors">
                        Áp dụng
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Order Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="border-t border-[var(--border-soft)] p-6 space-y-4">
                {/* Order Summary */}
                <div className="space-y-3">
                  {/* Selected Products Details */}
                  {selectedItems.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm text-[var(--text-primary)] border-b border-[var(--border-soft)] pb-1">
                        Sản phẩm đã chọn ({selectedItems.length})
                      </h4>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
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
                            <div key={item.product?.id} className="flex justify-between items-start text-xs">
                              <div className="flex-1 min-w-0 pr-2">
                                <p className="font-medium text-[var(--text-primary)] line-clamp-1">
                                  {getSafeAltText(item.product?.name, "Sản phẩm")}
                                </p>
                                <p className="text-[var(--text-muted)]">
                                  {item.product?.price} × {item.quantity}
                                </p>
                                {item.additionalServices && item.additionalServices.length > 0 && (
                                  <p className="text-[var(--text-muted)] text-xs">
                                    + {item.additionalServices.join(", ")}
                                  </p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-[var(--primary)]">
                                  {itemTotal > 0 ? `${itemTotal.toLocaleString()}đ` : 'Liên hệ'}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <div className="border-t border-[var(--border-soft)] pt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--text-secondary)]">Tạm tính</span>
                      <span className="font-medium">{subtotal.toLocaleString()}đ</span>
                    </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Phí vận chuyển</span>
                    <span className={cn("font-medium", shipping === 0 && "text-green-600")}>
                      {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString()}đ`}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">
                      🎉 Bạn được miễn phí vận chuyển!
                    </p>
                  )}
                    <div className="border-t border-[var(--border-soft)] pt-2 flex justify-between font-semibold">
                      <span>Tổng cộng</span>
                      <span className="text-[var(--primary)]">{total.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={handleCheckout}
                  disabled={isLoading || selectedItems.length === 0}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-4 font-semibold rounded-xl transition-colors",
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
                      Thanh toán ({selectedItems.length} sản phẩm)
                      <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                    </>
                  )}
                </motion.button>

                {/* Continue Shopping */}
                <button
                  onClick={onClose}
                  className="w-full py-3 text-[var(--text-secondary)] font-medium hover:text-[var(--primary)] transition-colors"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}