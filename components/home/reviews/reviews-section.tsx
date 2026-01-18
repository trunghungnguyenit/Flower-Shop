"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { reviews } from "@/data/homepage-data";
import {
  staggerContainer,
  staggerItem,
  premiumEase,
} from "@/components/animations/framer-variants";

export function ReviewsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
       className="relative bg-white overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
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
              <div className="relative aspect-[4/3] lg:aspect-[1/1]">
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