"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Tag,
  ChevronRight,
  Phone,
  MessageCircle,
  Menu,
  X,
  Search,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Heart,
  MapPin,
  Mail,
  Facebook,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import { HeaderSection } from "@/components/header";
import { FooterSection } from "@/components/footer";
import { FirebaseApi } from "@/api/firebase";
import { Blog } from "@/api/api.type";

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: premiumEase },
  },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: premiumEase },
  },
};

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function BlogPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // State for blogs and loading
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Fetch blogs from Firebase
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await FirebaseApi.getBlog();
        if (res.ok && Array.isArray(res.data)) {
          setBlogs(res.data.filter((blog: Blog) => blog.isActive));
        } else {
          console.error("Blog API error:", res);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = [
    "Tất cả",
    ...Array.from(new Set(blogs.map((blog) => blog.category).filter(Boolean))),
  ];

  const filteredBlogs =
    selectedCategory === "Tất cả"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  // Format date helper
  const formatDate = (publishedAt: any) => {
    if (!publishedAt) return "Chưa có ngày";

    try {
      // Handle Firebase Timestamp
      if (publishedAt.toDate) {
        return publishedAt.toDate().toLocaleDateString("vi-VN");
      }
      // Handle regular Date
      if (publishedAt instanceof Date) {
        return publishedAt.toLocaleDateString("vi-VN");
      }
      // Handle string
      return new Date(publishedAt).toLocaleDateString("vi-VN");
    } catch (error) {
      return "Chưa có ngày";
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)] font-medium">Blog</span>
          </nav>

          {/* Hero Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                <BookOpen
                  className="w-6 h-6 text-[var(--primary)]"
                  strokeWidth={1.5}
                />
              </div>
              <span className="font-body text-[var(--primary)] tracking-[0.25em] uppercase text-sm font-medium">
                Blog hoa tươi
              </span>
            </div>

            <h1
              className="font-display text-[var(--text-primary)] mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Blog Hoa Tươi
              <br />
              <span className="text-[var(--primary)]">Kiến Thức & Chia Sẻ</span>
            </h1>

            <p
              className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto mb-8"
              style={{ fontSize: "18px", lineHeight: 1.7 }}
            >
              Khám phá thế giới hoa tươi qua những bài viết hữu ích về cách chăm
              sóc, ý nghĩa và xu hướng trang trí hoa mới nhất.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories & Blog Posts */}
      <section ref={ref} className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-full font-body font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-100 text-[var(--text-secondary)] hover:bg-gray-200"
                )}
                style={{ fontSize: "14px" }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            // Loading State
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="aspect-[16/10] bg-gray-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: premiumEase,
                  }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Link href={`/blog/${blog.slug}`} className="block h-full">
                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {blog.category && (
                          <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--primary)] text-white text-xs font-medium rounded-full">
                            {blog.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-3 text-xs text-[var(--text-muted)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(blog.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{blog.author || "Hoa Tươi Đà Nẵng"}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-base font-semibold text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                          {blog.excerpt || "Đọc bài viết để tìm hiểu thêm..."}
                        </p>

                        {/* CTA */}
                        <div className="mt-auto pt-4 flex justify-end">
                          <span className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2 transition-all">
                            Đọc thêm
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3
                className="font-display text-[var(--text-primary)] font-semibold mb-2"
                style={{ fontSize: "20px" }}
              >
                Không tìm thấy bài viết
              </h3>
              <p
                className="font-body text-[var(--text-secondary)]"
                style={{ fontSize: "16px" }}
              >
                {selectedCategory === "Tất cả"
                  ? "Chưa có bài viết nào. Hãy quay lại sau để xem bài viết mới."
                  : "Thử chọn danh mục khác hoặc quay lại sau để xem bài viết mới."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
