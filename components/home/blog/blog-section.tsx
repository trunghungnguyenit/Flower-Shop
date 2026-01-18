"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Blog } from "@/api/api.type";
import {
  staggerContainer,
  staggerItem,
  premiumEase,
} from "@/components/animations/framer-variants";

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
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[var(--text-primary)] font-body font-medium text-xs rounded-full border border-white/20">
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3
                      className="font-display text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--text-primary)] transition-colors duration-300"
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
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[var(--text-primary)] rounded-full text-[var(--text-primary)] font-body font-medium hover:bg-[var(--text-primary)] hover:text-white transition-all duration-300"
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