"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { uspItems, reviews } from "@/data/homepage-data";
import { Blog } from "@/api/api.type";
import {
  staggerContainer,
  staggerItem,
  staggerContainerFast,
  scaleInUp,
  premiumEase,
} from "@/components/animations/framer-variants";

// ================================================================
// USP SECTION
// ================================================================
export function UspSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Sample images for USP items
  const uspImages = [
    "/delivery-truck-flowers.jpg",
    "/fast-delivery-flowers.jpg", 
    "/flower-gift-combo.jpg",
    "/fresh-flowers-quality.jpg"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainerFast}
        >
          {uspItems.map((item, index) => {
            const Icon = item.icon;
            const image = uspImages[index] || uspImages[0];
            
            return (
              <motion.div
                key={index}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={scaleInUp}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Content */}
                <div className="p-6 text-center flex-1 flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mb-4 mx-auto flex items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)",
                    }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                  >
                    <Icon className="w-7 h-7 text-black" strokeWidth={1.5} />
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
                    className="font-body text-[var(--text-secondary)] flex-1"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ================================================================
// REVIEWS SECTION
// ================================================================
export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

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
            Những phản hồi chân thật từ những khách hàng đã tin tưởng dịch vụ
            của chúng tôi.
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
              className="bg-white rounded-2xl overflow-hidden border border-gray-100"
              style={{
                boxShadow: "var(--shadow-card)",
              }}
              variants={staggerItem}
              whileHover={{
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3, ease: premiumEase },
              }}
            >
              {/* Product Image */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={review.productImage}
                  alt="Sản phẩm"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-white shadow-md">
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
                      <span key={i} className="text-sm">
                        🌸
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Content */}
                <p
                  className="font-body text-[var(--text-secondary)]"
                  style={{ fontSize: "14px", lineHeight: 1.7 }}
                >
                  "{review.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ================================================================
// BLOG SECTION
// ================================================================
interface BlogSectionProps {
  blogs?: Blog[];
  loading?: boolean;
}

export function BlogSection({ blogs = [], loading = false }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Show only first 4 blogs for homepage
  const displayBlogs = blogs.slice(0, 4);

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

        {/* Loading State */}
        {loading && (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="overflow-hidden bg-white"
                style={{
                  borderRadius: "var(--radius-large)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                {/* Image Skeleton */}
                <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />

                {/* Content Skeleton */}
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Blog Grid */}
        {!loading && displayBlogs.length > 0 && (
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={staggerContainer}
          >
            {displayBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: premiumEase },
                }}
              >
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group block overflow-hidden bg-white rounded-2xl border border-gray-100"
                  style={{
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={
                        blog.image || "/placeholder.svg?height=300&width=400"
                      }
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Category Badge */}
                    {blog.category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[var(--primary)] font-body font-medium text-xs rounded-full border border-white/20">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="font-display text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300"
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p
                        className="font-body text-[var(--text-secondary)] line-clamp-2 mt-2"
                        style={{ fontSize: "13px", lineHeight: 1.5 }}
                      >
                        {blog.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && displayBlogs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p
              className="font-body text-[var(--text-secondary)]"
              style={{ fontSize: "16px" }}
            >
              Chưa có bài viết nào. Hãy quay lại sau nhé!
            </p>
          </motion.div>
        )}

        {/* View All */}
        {!loading && displayBlogs.length > 0 && (
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
        )}
      </div>
    </section>
  );
}