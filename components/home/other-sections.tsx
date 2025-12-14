"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { giftGuides, categories, uspItems, reviews, blogPosts } from "@/data/homepage-data"
import { 
  staggerContainer, 
  staggerItem, 
  staggerItemScale, 
  staggerContainerFast,
  scaleInUp,
  premiumEase 
} from "@/components/animations/framer-variants"
import { cn } from "@/lib/utils"

// ================================================================
// GIFT GUIDE SECTION - "Gợi Ý Quà Theo Người Nhận"
// ================================================================
export function GiftGuideSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Chọn quà dễ dàng
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Gợi Ý Quà Tặng Theo Người Nhận
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Không biết chọn gì? Hãy để chúng tôi gợi ý mẫu phù hợp nhất.
          </motion.p>
        </motion.div>

        {/* Gift Guide Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {giftGuides.map((guide, index) => {
            const IconComponent = guide.icon
            return (
              <motion.div
                key={index}
                variants={staggerItemScale}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: premiumEase } }}
              >
                <Link
                  href={guide.href}
                  className="group block p-6 bg-[var(--background-muted)] hover:bg-white border border-transparent hover:border-[var(--primary)]/20 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(217,124,138,0.12)]"
                  style={{
                    borderRadius: "var(--radius-large)",
                  }}
                >
                  {/* Icon - Premium Pastel Circle */}
                  <motion.div
                    className="w-14 h-14 mb-4 flex items-center justify-center bg-[var(--secondary)] border border-[var(--border-soft)] rounded-full transition-all duration-300 group-hover:bg-[var(--primary)]/10 group-hover:border-[var(--primary)]/20"
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.2, ease: premiumEase }}
                  >
                    <IconComponent
                      className="w-6 h-6 text-[var(--primary-dark)]"
                      strokeWidth={1.75}
                    />
                  </motion.div>

                  {/* Title */}
                  <h4
                    className="font-display text-[var(--text-primary)] mb-2 transition-colors duration-300 group-hover:text-[var(--primary-dark)]"
                    style={{ fontSize: "17px", fontWeight: 600 }}
                  >
                    {guide.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="font-body text-[var(--text-secondary)] mb-4"
                    style={{ fontSize: "13px", lineHeight: 1.6 }}
                  >
                    {guide.description}
                  </p>

                  {/* CTA */}
                  <div
                    className="inline-flex items-center gap-2 text-[var(--primary)]"
                    style={{ fontSize: "13px", fontWeight: 500 }}
                  >
                    <span className="font-body">Xem gợi ý</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// CATEGORIES SECTION - "Hoa Theo Dịp"
// ================================================================
export function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-muted)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Danh mục
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Hoa Theo Dịp
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Tìm mẫu hoa phù hợp cho từng khoảnh khắc quan trọng trong cuộc sống.
          </motion.p>
        </motion.div>

        {/* Categories Grid - Bento Style */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className={cn(index === 0 && "lg:col-span-2 lg:row-span-2")}
              variants={staggerItem}
              whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href={category.href}
                className="group relative block overflow-hidden"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div className={cn("relative overflow-hidden", index === 0 ? "aspect-square" : "aspect-[4/3]")}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className="font-display text-white mb-1"
                      style={{ fontSize: index === 0 ? "24px" : "18px", fontWeight: 600 }}
                    >
                      {category.name}
                    </h3>
                    <p
                      className="font-body text-white/80"
                      style={{ fontSize: "13px" }}
                    >
                      {category.count}+ mẫu hoa
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// USP SECTION
// ================================================================
export function UspSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainerFast}
        >
          {uspItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={scaleInUp}
              >
                {/* Icon */}
                <motion.div
                  className="w-16 h-16 mb-4 flex items-center justify-center"
                  style={{
                    borderRadius: "var(--radius-medium)",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                  }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.25, ease: premiumEase }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </motion.div>

                {/* Title */}
                <h4
                  className="font-display text-[var(--text-primary)] mb-2"
                  style={{ fontSize: "17px", fontWeight: 600 }}
                >
                  {item.title}
                </h4>

                {/* Description */}
                <p
                  className="font-body text-[var(--text-secondary)]"
                  style={{ fontSize: "14px", lineHeight: 1.6 }}
                >
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// REVIEWS SECTION
// ================================================================
export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--background-alt)] overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Khách hàng nói gì
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Khách Hàng Nói Gì?
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Những phản hồi chân thật từ những khách hàng đã tin tưởng dịch vụ của chúng tôi.
          </motion.p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white p-6"
              style={{
                borderRadius: "var(--radius-large)",
                boxShadow: "var(--shadow-card)",
              }}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.3, ease: premiumEase } }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div
                  className="relative w-12 h-12 overflow-hidden"
                  style={{ borderRadius: "var(--radius-round)" }}
                >
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4
                    className="font-display text-[var(--text-primary)]"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    {review.name}
                  </h4>
                  <p
                    className="font-body text-[var(--text-muted)]"
                    style={{ fontSize: "12px" }}
                  >
                    {review.date}
                  </p>
                </div>
                {/* Rating */}
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <span key={i} className="text-sm">🌸</span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <p
                className="font-body text-[var(--text-secondary)] mb-4"
                style={{ fontSize: "14px", lineHeight: 1.7 }}
              >
                "{review.content}"
              </p>

              {/* Product Image */}
              <div
                className="relative aspect-video overflow-hidden"
                style={{ borderRadius: "var(--radius-medium)" }}
              >
                <Image
                  src={review.productImage}
                  alt="Sản phẩm"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ================================================================
// BLOG SECTION
// ================================================================
export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Kiến thức hoa
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Blog & Tips Hữu Ích
          </motion.h2>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: premiumEase } }}
            >
              <Link
                href={post.href}
                className="group block overflow-hidden bg-white"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-display text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ fontSize: "15px", fontWeight: 600, lineHeight: 1.4 }}
                  >
                    {post.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--primary)] font-body font-medium hover:gap-3 transition-all duration-300"
            style={{ fontSize: "15px" }}
          >
            Xem tất cả bài viết
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}