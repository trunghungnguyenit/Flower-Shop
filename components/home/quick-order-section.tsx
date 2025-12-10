"use client"

import { useRef, useEffect, useState } from "react"
import { Phone, MessageCircle, Send, CheckCircle, MapPin, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button, FormInput, FormSelect, FormTextarea } from "@/components/ui/premium"
import { ConfettiEffect } from "@/components/ui/premium/confetti-effect"

// ================================================
// Quick Order Form Data
// ================================================

const occasionOptions = [
  { value: "sinh-nhat", label: "Sinh nhật" },
  { value: "tinh-yeu", label: "Tình yêu / Valentine" },
  { value: "cuoi", label: "Cưới hỏi" },
  { value: "khai-truong", label: "Khai trương" },
  { value: "chia-buon", label: "Chia buồn" },
  { value: "khac", label: "Dịp khác" },
]

const budgetOptions = [
  { value: "200-500", label: "200.000đ - 500.000đ" },
  { value: "500-1000", label: "500.000đ - 1.000.000đ" },
  { value: "1000-2000", label: "1.000.000đ - 2.000.000đ" },
  { value: "2000+", label: "Trên 2.000.000đ" },
]

const benefits = [
  { icon: Clock, text: "Phản hồi trong 15 phút" },
  { icon: MapPin, text: "Giao hàng nhanh 2 giờ" },
  { icon: CheckCircle, text: "Tư vấn miễn phí" },
]

// ================================================
// Quick Order Section Component
// ================================================

export function QuickOrderSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    occasion: "",
    budget: "",
    message: "",
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSuccess(true)
    setShowConfetti(true)

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        name: "",
        phone: "",
        occasion: "",
        budget: "",
        message: "",
      })
    }, 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section
      ref={sectionRef}
      id="lien-he"
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      {/* Confetti Effect */}
      <ConfettiEffect
        active={showConfetti}
        duration={3000}
        pieceCount={60}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Background Decorations */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--primary-light) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px] px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Content */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}
          >
            {/* Label */}
            <span
              className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Đặt hoa nhanh
            </span>

            {/* Title */}
            <h2
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600, lineHeight: 1.2 }}
            >
              Gửi Yêu Thương
              <br />
              <span className="text-gradient-primary">Chỉ 3 Bước Đơn Giản</span>
            </h2>

            {/* Description */}
            <p
              className="font-body text-[var(--text-secondary)] mb-8 max-w-lg"
              style={{ fontSize: "16px", lineHeight: 1.8 }}
            >
              Điền thông tin bên dưới, đội ngũ tư vấn sẽ liên hệ bạn ngay trong vòng 15 phút để hỗ trợ
              chọn mẫu hoa phù hợp nhất.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-4 transition-all duration-500",
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{ transitionDelay: `${300 + index * 100}ms` }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderRadius: "var(--radius-medium)",
                        background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <span
                      className="font-body text-[var(--text-primary)]"
                      style={{ fontSize: "15px", fontWeight: 500 }}
                    >
                      {benefit.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Alternative Contact */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:0905123456"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-[var(--border-soft)] text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                0905 123 456
              </a>
              <a
                href="https://zalo.me/0905123456"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#0068FF] rounded-full text-white hover:bg-[#0058DD] transition-all duration-300"
                style={{ fontSize: "14px", fontWeight: 500 }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Chat Zalo
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div
              className="bg-white p-6 lg:p-10 relative"
              style={{
                borderRadius: "var(--radius-xl)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
              }}
            >
              {/* Success Overlay */}
              {isSuccess && (
                <div
                  className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center z-20 animate-fade-up"
                  style={{ borderRadius: "var(--radius-xl)" }}
                >
                  <div className="w-20 h-20 mb-6 flex items-center justify-center bg-[var(--success)]/10 rounded-full">
                    <CheckCircle className="w-10 h-10 text-[var(--success)]" strokeWidth={1.5} />
                  </div>
                  <h3
                    className="font-display text-[var(--text-primary)] mb-2 text-center"
                    style={{ fontSize: "24px", fontWeight: 600 }}
                  >
                    Gửi thành công!
                  </h3>
                  <p
                    className="font-body text-[var(--text-secondary)] text-center"
                    style={{ fontSize: "15px" }}
                  >
                    Chúng tôi sẽ liên hệ bạn trong 15 phút
                  </p>
                </div>
              )}

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput
                    name="name"
                    label="Họ tên"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FormInput
                    name="phone"
                    type="tel"
                    label="Số điện thoại"
                    placeholder="0905 xxx xxx"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormSelect
                    name="occasion"
                    label="Dịp đặt hoa"
                    options={occasionOptions}
                    placeholder="Chọn dịp..."
                    value={formData.occasion}
                    onChange={handleChange}
                  />
                  <FormSelect
                    name="budget"
                    label="Ngân sách"
                    options={budgetOptions}
                    placeholder="Chọn ngân sách..."
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>

                <FormTextarea
                  name="message"
                  label="Ghi chú (tùy chọn)"
                  placeholder="Mô tả yêu cầu của bạn: màu sắc, loại hoa, thời gian giao..."
                  value={formData.message}
                  onChange={handleChange}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                  iconPosition="right"
                  className="w-full"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </Button>

                <p
                  className="font-body text-[var(--text-muted)] text-center"
                  style={{ fontSize: "12px" }}
                >
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
