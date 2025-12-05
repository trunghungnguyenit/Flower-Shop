"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, MessageCircle, Mail } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    flowerType: "",
    note: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
    alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.")
  }

  return (
    <section id="lien-he" className="py-16 lg:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Liên hệ</p>
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">Đặt Hàng Nhanh</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Điền thông tin bên dưới hoặc liên hệ trực tiếp với chúng tôi qua các kênh sau để được tư vấn và đặt hoa
              nhanh nhất.
            </p>

            <div className="space-y-6">
              <a
                href="tel:0901234567"
                className="flex items-center gap-4 p-4 bg-card rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Gọi ngay</p>
                  <p className="text-primary text-lg font-semibold">090 123 4567</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 p-4 bg-card rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Chat Zalo</p>
                  <p className="text-muted-foreground">Tư vấn 24/7</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 p-4 bg-card rounded-lg hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Messenger</p>
                  <p className="text-muted-foreground">Trả lời nhanh</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-6 lg:p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6">Gửi yêu cầu đặt hoa</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Họ và tên *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập họ và tên"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">
                  Số điện thoại *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Nhập số điện thoại"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="address" className="text-foreground">
                  Địa chỉ giao hàng
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Nhập địa chỉ giao hàng"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="flowerType" className="text-foreground">
                  Loại hoa cần đặt
                </Label>
                <Input
                  id="flowerType"
                  value={formData.flowerType}
                  onChange={(e) => setFormData({ ...formData, flowerType: e.target.value })}
                  placeholder="VD: Hoa hồng, hoa sinh nhật, hoa Tết..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="note" className="text-foreground">
                  Ghi chú thêm
                </Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Mô tả chi tiết yêu cầu của bạn..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
                Gửi Yêu Cầu
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
