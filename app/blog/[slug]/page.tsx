"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useParams } from "next/navigation"
import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  Phone,
  MessageCircle,
  Share2,
  ArrowRight,
  BookOpen,
  Copy,
  Facebook,
  Twitter,
} from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { FirebaseApi } from "@/api/firebase"
import { Blog } from "@/api/api.type"

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Fetch blog by slug from Firebase
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await FirebaseApi.getBlogBySlug(slug)
        if (res.ok && res.data) {
          setBlog(res.data)
        } else {
          setNotFound(true)
        }
      } catch (error) {
        console.error("Error fetching blog:", error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchBlog()
    }
  }, [slug])

  // Format date helper
  const formatDate = (publishedAt: any) => {
    if (!publishedAt) return "Chưa có ngày"
    
    try {
      // Handle Firebase Timestamp
      if (publishedAt.toDate) {
        return publishedAt.toDate().toLocaleDateString('vi-VN')
      }
      // Handle regular Date
      if (publishedAt instanceof Date) {
        return publishedAt.toLocaleDateString('vi-VN')
      }
      // Handle string
      return new Date(publishedAt).toLocaleDateString('vi-VN')
    } catch (error) {
      return "Chưa có ngày"
    }
  }

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <HeaderSection />
        <div className="pt-24 pb-16 lg:pb-24">
          <div className="mx-auto max-w-[800px] px-4 lg:px-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-8" />
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
              <div className="aspect-[16/9] bg-gray-200 rounded-2xl mb-12" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Not found state
  if (notFound || !blog) {
    return (
      <main className="min-h-screen bg-white">
        <HeaderSection />
        <div className="pt-24 pb-16 lg:pb-24">
          <div className="mx-auto max-w-[800px] px-4 lg:px-8 text-center">
            <h1 className="text-2xl font-display font-semibold text-[var(--text-primary)] mb-4">
              Không tìm thấy bài viết
            </h1>
            <p className="text-[var(--text-secondary)] mb-8">
              Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-body font-medium rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Quay về Blog
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blog?.title || "Blog Hoa Tươi"

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Đã sao chép link!')
        break
    }
    setShareMenuOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Article */}
      <article className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[800px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <Link href="/blog" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)] font-medium line-clamp-1">{blog.title}</span>
          </nav>

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            {/* Category */}
            {blog.category && (
              <div className="mb-4">
                <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-body font-medium rounded-full">
                  {blog.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, lineHeight: 1.3 }}>
              {blog.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author || "Hoa Tươi Đà Nẵng"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-muted)]">Chia sẻ:</span>
              <div className="relative">
                <button
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[var(--text-primary)] rounded-lg transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">Chia sẻ</span>
                </button>

                {shareMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-[var(--border-soft)] p-2 z-10">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-blue-400" />
                      Twitter
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      Sao chép link
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: premiumEase }}
          >
            <Image
              src={blog.image || '/placeholder.svg?height=400&width=800'}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Article Content */}
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: premiumEase }}
            style={{
              fontSize: "17px",
              lineHeight: 1.8,
              color: "var(--text-primary)"
            }}
          >
            {blog.content ? (
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            ) : (
              <div>
                <p>{blog.excerpt || "Nội dung bài viết đang được cập nhật..."}</p>
              </div>
            )}
          </motion.div>

          {/* Article Footer */}
          <motion.footer
            className="mt-12 pt-8 border-t border-[var(--border-soft)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: premiumEase }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "18px" }}>
                  Bạn thấy bài viết này hữu ích?
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  Chia sẻ với bạn bè hoặc liên hệ với chúng tôi để biết thêm thông tin.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.footer>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 lg:py-24 bg-[var(--background-muted)]">
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <h2 className="font-display text-[var(--text-primary)] mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Bài Viết Liên Quan
            </h2>
            <p className="text-[var(--text-secondary)]">
              Khám phá thêm những bài viết hữu ích khác về hoa tươi
            </p>
          </motion.div>

          <div className="text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white font-body font-medium transition-all duration-300 hover:scale-105"
              style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
            >
              <BookOpen className="w-5 h-5" />
              Xem tất cả bài viết
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-4 lg:px-8">
          <motion.div
            className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 lg:p-12 text-center text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>

            <h2 className="font-display text-white mb-4" style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}>
              Cần Tư Vấn Thêm?
            </h2>

            <p className="text-white/90 mb-8 max-w-lg mx-auto font-body" style={{ fontSize: "16px", lineHeight: 1.7 }}>
              Liên hệ với chúng tôi để được tư vấn chi tiết về cách chăm sóc hoa tươi và chọn hoa phù hợp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--primary)] hover:bg-gray-50 font-body font-medium transition-all duration-300 hover:scale-105"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[var(--primary)] font-body font-medium transition-all duration-300"
                style={{ borderRadius: "var(--radius-round)", fontSize: "16px" }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat Zalo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  )
}