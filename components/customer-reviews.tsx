"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Review {
  id: number
  name: string
  location: string
  rating: number
  comment: string
  date: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Anh Minh",
    location: "Đà Nẵng",
    rating: 5,
    comment:
      "Hoa rất tươi và đẹp, giao đúng giờ. Vợ mình rất thích món quà này. Sẽ ủng hộ shop lâu dài!",
    date: "15/11/2024",
  },
  {
    id: 2,
    name: "Chị Hương",
    location: "Quảng Nam",
    rating: 5,
    comment:
      "Đặt hoa sinh nhật cho mẹ, shop tư vấn nhiệt tình, hoa đẹp hơn mong đợi. Cảm ơn shop nhiều!",
    date: "10/11/2024",
  },
  {
    id: 3,
    name: "Anh Tuấn",
    location: "Hội An",
    rating: 5,
    comment:
      "Lần đầu đặt hoa online, lo lắng lắm nhưng nhận được hoa thì rất hài lòng. Chất lượng tốt, giá hợp lý.",
    date: "05/11/2024",
  },
  {
    id: 4,
    name: "Chị Lan",
    location: "Đà Nẵng",
    rating: 5,
    comment:
      "Hoa cưới của shop cắm rất đẹp và tinh tế. Đám cưới của em được nhiều người khen ngợi. Cảm ơn shop!",
    date: "28/10/2024",
  },
  {
    id: 5,
    name: "Anh Khoa",
    location: "Tam Kỳ",
    rating: 5,
    comment:
      "Đặt hoa khai trương, shop giao đúng giờ và hoa rất tươi. Sẽ giới thiệu bạn bè đến shop.",
    date: "20/10/2024",
  },
  {
    id: 6,
    name: "Chị Mai",
    location: "Đà Nẵng",
    rating: 5,
    comment:
      "Hoa Tết năm nay đặt ở shop, cả nhà đều khen đẹp. Mai vàng tươi lâu, rất đáng tiền!",
    date: "15/10/2024",
  },
]

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, reviews.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const renderFlowers = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-xl transition-all ${
              index < rating ? "text-pink-500 scale-110" : "text-gray-300"
            }`}
          >
            🌸
          </span>
        ))}
      </div>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-5xl">💐</span>
          </div>
          <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Đánh giá</p>
          <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-4">
            Khách Hàng Nói Gì Về Chúng Tôi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hàng nghìn khách hàng đã tin tưởng và hài lòng với dịch vụ của chúng tôi
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          {reviews.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white hidden md:flex"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white shadow-lg hover:bg-primary hover:text-white hidden md:flex"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          {/* Reviews Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <Card className="h-full bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      {/* Rating */}
                      <div className="mb-4">{renderFlowers(review.rating)}</div>

                      {/* Comment */}
                      <p className="text-gray-700 leading-relaxed mb-6 min-h-[80px] italic">
                        "{review.comment}"
                      </p>

                      {/* Customer Info */}
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg">
                          {review.name.charAt(review.name.indexOf(" ") + 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{review.name}</p>
                          <p className="text-sm text-muted-foreground">{review.location}</p>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-xs text-muted-foreground mt-3">{review.date}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">5000+</div>
            <p className="text-sm text-muted-foreground">Khách hàng</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-sm text-muted-foreground">Đánh giá</p>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Hài lòng</p>
          </div>
        </div>
      </div>
    </section>
  )
}
