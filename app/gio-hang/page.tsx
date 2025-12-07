"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, Trash2, ShoppingBag, Phone, MessageCircle, ArrowLeft } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    toggleSelectItem,
    selectAllItems,
    getSelectedItems,
    getSelectedTotalPrice,
    clearCart,
  } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  })

  const selectedItems = getSelectedItems()
  const allSelected = items.length > 0 && items.every((item) => item.selected)
  const someSelected = items.some((item) => item.selected)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleSubmitOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert("Vui lòng điền đầy đủ thông tin!")
      return
    }

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng!")
      return
    }

    // Create order message
    let message = `🌸 ĐƠN HÀNG MỚI\n\n`
    message += `👤 Khách hàng: ${customerInfo.name}\n`
    message += `📱 SĐT: ${customerInfo.phone}\n`
    message += `📍 Địa chỉ: ${customerInfo.address || "Chưa có"}\n\n`
    message += `🛒 SẢN PHẨM:\n`

    selectedItems.forEach((item, index) => {
      const price = parseFloat(item.product.price.replace(/[^\d]/g, "")) || 0
      message += `${index + 1}. ${item.product.name}\n`
      message += `   - Số lượng: ${item.quantity}\n`
      message += `   - Giá: ${formatPrice(price * item.quantity)}\n`
      if (item.additionalServices.length > 0) {
        message += `   - Dịch vụ thêm: ${item.additionalServices.join(", ")}\n`
      }
      if (item.note) {
        message += `   - Ghi chú: ${item.note}\n`
      }
      message += `\n`
    })

    message += `💰 TỔNG CỘNG: ${formatPrice(getSelectedTotalPrice())}\n\n`
    if (customerInfo.note) {
      message += `📝 Ghi chú: ${customerInfo.note}\n`
    }

    // Open Zalo or phone
    const phoneNumber = "0901234567"
    const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(zaloUrl, "_blank")
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-[73px] py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground/50 mb-6" />
              <h1 className="text-2xl font-semibold text-foreground mb-2">Giỏ hàng trống</h1>
              <p className="text-muted-foreground mb-8">Thêm sản phẩm vào giỏ hàng để tiếp tục</p>
              <Button asChild size="lg">
                <Link href="/bo-suu-tap">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Tiếp tục mua sắm
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      <div className="pt-[73px] py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/bo-suu-tap"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tiếp tục mua sắm
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Giỏ Hàng Của Bạn</h1>
                <p className="text-muted-foreground mt-2">
                  Bạn có {items.length} sản phẩm trong giỏ hàng
                  {someSelected && ` (${selectedItems.length} đã chọn)`}
                </p>
              </div>
              {items.length > 0 && (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="select-all"
                    checked={allSelected}
                    onCheckedChange={(checked) => selectAllItems(checked as boolean)}
                  />
                  <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                    Chọn tất cả
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const price = parseFloat(item.product.price.replace(/[^\d]/g, "")) || 0
                const itemTotal = price * item.quantity

                return (
                  <div
                    key={item.product.id}
                    className={`bg-card rounded-xl p-6 shadow-sm border transition-all ${
                      item.selected ? "border-primary ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Checkbox */}
                      <div className="flex items-start pt-1">
                        <Checkbox
                          id={`select-${item.product.id}`}
                          checked={item.selected}
                          onCheckedChange={() => toggleSelectItem(item.product.id)}
                        />
                      </div>

                      {/* Image */}
                      <Link
                        href={`/san-pham/${item.product.slug}`}
                        className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/san-pham/${item.product.slug}`}>
                          <h3 className="font-semibold text-foreground hover:text-primary mb-2">
                            {item.product.name}
                          </h3>
                        </Link>

                        <p className="text-primary font-bold text-lg mb-3">{formatPrice(itemTotal)}</p>

                        {/* Additional Services */}
                        {item.additionalServices.length > 0 && (
                          <div className="bg-secondary/50 rounded-md px-3 py-2 mb-3">
                            <p className="text-xs font-semibold text-foreground mb-1">Dịch vụ thêm:</p>
                            <p className="text-sm text-muted-foreground">
                              {item.additionalServices.join(", ")}
                            </p>
                          </div>
                        )}

                        {/* Note */}
                        {item.note && (
                          <div className="bg-accent/20 rounded-md px-3 py-2 mb-3">
                            <p className="text-xs font-semibold text-foreground mb-1">Ghi chú:</p>
                            <p className="text-sm text-muted-foreground italic">{item.note}</p>
                          </div>
                        )}

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* Clear Cart */}
              <Button
                variant="outline"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={clearCart}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả sản phẩm
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-sm border sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Thông Tin Đặt Hàng</h2>

                {/* Customer Info Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      placeholder="Nhập họ và tên"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Địa chỉ giao hàng</Label>
                    <Input
                      id="address"
                      placeholder="Nhập địa chỉ giao hàng"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="note">Ghi chú thêm</Label>
                    <Textarea
                      id="note"
                      placeholder="Ghi chú về đơn hàng..."
                      value={customerInfo.note}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, note: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4 mb-6">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Sản phẩm đã chọn:</span>
                      <span>{selectedItems.length} sản phẩm</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-primary text-2xl">{formatPrice(getSelectedTotalPrice())}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    * Giá cuối cùng sẽ được xác nhận qua điện thoại
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="space-y-3">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleSubmitOrder}
                    disabled={selectedItems.length === 0}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Đặt hàng qua Zalo ({selectedItems.length})
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href="tel:0901234567">
                      <Phone className="h-5 w-5 mr-2" />
                      Gọi: 090 123 4567
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
