"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Send } from "lucide-react"

interface ReviewDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ReviewDialog({ isOpen, onClose }: ReviewDialogProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    comment: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Vui lòng chọn số bông hoa đánh giá!")
      return
    }

    if (!formData.name || !formData.comment) {
      alert("Vui lòng điền đầy đủ thông tin!")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Create message for Zalo
      const message = `🌸 ĐÁNH GIÁ MỚI\n\n`
        + `👤 Tên: ${formData.name}\n`
        + `📍 Địa điểm: ${formData.location || "Không có"}\n`
        + `⭐ Đánh giá: ${"🌸".repeat(rating)} (${rating}/5)\n\n`
        + `💬 Nội dung:\n${formData.comment}`

      // Open Zalo
      const phoneNumber = "0901234567"
      const zaloUrl = `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      window.open(zaloUrl, "_blank")

      // Reset form
      setRating(0)
      setFormData({ name: "", location: "", comment: "" })
      setIsSubmitting(false)
      onClose()

      alert("Cảm ơn bạn đã đánh giá! Chúng tôi sẽ liên hệ lại sớm.")
    }, 1000)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] transition-opacity backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[101] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">Đánh Giá Của Bạn</h2>
                <p className="text-pink-100 text-sm">Chia sẻ trải nghiệm của bạn với chúng tôi</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Rating */}
            <div className="text-center">
              <Label className="text-lg font-semibold text-gray-800 mb-3 block">
                Bạn đánh giá dịch vụ của chúng tôi như thế nào?
              </Label>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 hover:scale-125 focus:outline-none"
                  >
                    <span
                      className={`text-5xl transition-all ${
                        star <= (hoveredRating || rating)
                          ? "text-pink-500 scale-110 drop-shadow-lg"
                          : "text-gray-300"
                      }`}
                    >
                      🌸
                    </span>
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-pink-600 font-medium animate-fade-in">
                  {rating === 5 && "Tuyệt vời! 🎉"}
                  {rating === 4 && "Rất tốt! 👍"}
                  {rating === 3 && "Tốt! 😊"}
                  {rating === 2 && "Cần cải thiện 🤔"}
                  {rating === 1 && "Chưa hài lòng 😔"}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Họ và tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="VD: Anh Minh, Chị Hương..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location" className="text-gray-700 font-medium">
                Địa điểm
              </Label>
              <Input
                id="location"
                placeholder="VD: Đà Nẵng, Quảng Nam..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="mt-2"
              />
            </div>

            {/* Comment */}
            <div>
              <Label htmlFor="comment" className="text-gray-700 font-medium">
                Nội dung đánh giá <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="comment"
                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm và dịch vụ..."
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                required
                rows={4}
                className="mt-2 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tối thiểu 20 ký tự ({formData.comment.length}/20)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
                disabled={isSubmitting || formData.comment.length < 20}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Gửi đánh giá
                  </>
                )}
              </Button>
            </div>

            {/* Note */}
            <p className="text-xs text-center text-gray-500 pt-2">
              💡 Đánh giá của bạn sẽ được gửi qua Zalo để chúng tôi xác nhận
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
