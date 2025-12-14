"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CONTACT } from "@/lib/constants"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: premiumEase } },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: premiumEase } },
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function BlogPage() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Cách Chăm Sóc Hoa Tươi Để Giữ Được Lâu Nhất",
      excerpt: "Những bí quyết đơn giản giúp hoa tươi của bạn tươi đẹp và bền lâu hơn, tiết kiệm chi phí và mang lại niềm vui lâu dài.",
      image: "/blog/flower-care-tips.jpg",
      category: "Chăm sóc hoa",
      author: "Hoa Tươi Đà Nẵng",
      date: "15/12/2024",
      readTime: "5 phút đọc",
      slug: "cach-cham-soc-hoa-tuoi"
    },
    {
      id: 2,
      title: "Ý Nghĩa Của Các Loại Hoa Trong Văn Hóa Việt Nam",
      excerpt: "Tìm hiểu về ý nghĩa sâu sắc của từng loại hoa trong văn hóa truyền thống Việt Nam và cách chọn hoa phù hợp cho từng dịp.",
      image: "/blog/flower-meanings.jpg",
      category: "Văn hóa",
      author: "Hoa Tươi Đà Nẵng",
      date: "12/12/2024",
      readTime: "7 phút đọc",
      slug: "y-nghia-cac-loai-hoa"
    },
    {
      id: 3,
      title: "Xu Hướng Trang Trí Hoa Cưới 2025",
      excerpt: "Khám phá những xu hướng trang trí hoa cưới mới nhất năm 2025, từ màu sắc đến phong cách thiết kế độc đáo và lãng mạn.",
      image: "/blog/wedding-trends-2025.jpg",
      category: "Xu hướng",
      author: "Hoa Tươi Đà Nẵng",
      date: "10/12/2024",
      readTime: "6 phút đọc",
      slug: "xu-huong-hoa-cuoi-2025"
    },
    {
      id: 4,
      title: "Hoa Tết: Chọn Hoa Nào Để Đón Xuân An Khang?",
      excerpt: "Hướng dẫn chọn hoa Tết phù hợp theo phong thủy và truyền thống, mang lại may mắn và thịnh vượng cho gia đình.",
      image: "/blog/tet-flowers-guide.jpg",
      category: "Tết Nguyên Đán",
      author: "Hoa Tươi Đà Nẵng",
      date: "08/12/2024",
      readTime: "8 phút đọc",
      slug: "hoa-tet-don-xuan"
    },
    {
      id: 5,
      title: "Cắm Hoa Nghệ Thuật: Từ Cơ Bản Đến Nâng Cao",
      excerpt: "Học cách cắm hoa nghệ thuật từ những kỹ thuật cơ bản đến nâng cao, tạo ra những tác phẩm hoa đẹp mắt tại nhà.",
      image: "/blog/flower-arrangement-art.jpg",
      category: "Kỹ thuật",
      author: "Hoa Tươi Đà Nẵng",
      date: "05/12/2024",
      readTime: "10 phút đọc",
      slug: "cam-hoa-nghe-thuat"
    },
    {
      id: 6,
      title: "Hoa Sinh Nhật: Chọn Sao Cho Đúng Ý Nghĩa?",
      excerpt: "Gợi ý chọn hoa sinh nhật phù hợp với từng độ tuổi và giới tính, tạo nên món quà ý nghĩa và đáng nhớ.",
      image: "/blog/birthday-flowers-guide.jpg",
      category: "Sinh nhật",
      author: "Hoa Tươi Đà Nẵng",
      date: "03/12/2024",
      readTime: "4 phút đọc",
      slug: "hoa-sinh-nhat-y-nghia"
    }
  ]

  const categories = [
    "Tất cả",
    "Chăm sóc hoa",
    "Văn hóa", 
    "Xu hướng",
    "Tết Nguyên Đán",
    "Kỹ thuật",
    "Sinh nhật"
  ]

  const [selectedCategory, setSelectedCategory] = useState("Tất cả")

  const filteredPosts = selectedCategory === "Tất cả" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
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
                <BookOpen className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
              </div>
              <span className="font-body text-[var(--primary)] tracking-[0.25em] uppercase text-sm font-medium">
                Blog hoa tươi
              </span>
            </div>

            <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, lineHeight: 1.2 }}>
              Blog Hoa Tươi
              <br />
              <span className="text-[var(--primary)]">Kiến Thức & Chia Sẻ</span>
            </h1>

            <p className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.7 }}>
              Khám phá thế giới hoa tươi qua những bài viết hữu ích về cách chăm sóc, ý nghĩa và xu hướng trang trí hoa mới nhất.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: premiumEase }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-body font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-[var(--text-muted)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-[var(--text-primary)] font-semibold mb-3 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300" style={{ fontSize: "18px", lineHeight: 1.4 }}>
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="font-body text-[var(--text-secondary)] mb-4 line-clamp-3" style={{ fontSize: "14px", lineHeight: 1.6 }}>
                        {post.excerpt}
                      </p>

                      {/* Author & Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[var(--text-muted)]" />
                          <span className="text-xs text-[var(--text-muted)]">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[var(--primary)] font-medium text-sm group-hover:gap-2 transition-all duration-300">
                          <span>Đọc thêm</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "20px" }}>
                Không tìm thấy bài viết
              </h3>
              <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "16px" }}>
                Thử chọn danh mục khác hoặc quay lại sau để xem bài viết mới.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-[var(--primary)]" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Nhận Thông Tin Mới Nhất
            </h2>

            <p className="font-body text-[var(--text-secondary)] mb-8 max-w-lg mx-auto" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Đăng ký để nhận những bài viết mới nhất về hoa tươi, xu hướng trang trí và các mẹo chăm sóc hoa hữu ích.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 h-12 px-4 bg-[var(--background-muted)] border border-[var(--border-soft)] font-body text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors duration-300"
                style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
              />
              <button
                className="h-12 px-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "var(--radius-medium)", fontSize: "15px" }}
              >
                Đăng ký
              </button>
            </div>

            <p className="font-body text-[var(--text-muted)] text-sm mt-4">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Không spam!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  )
}