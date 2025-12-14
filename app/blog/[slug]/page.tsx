"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useParams } from "next/navigation"
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
  Share2,
  ArrowRight,
  BookOpen,
  Heart,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Copy,
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

// ================================================================
// BLOG POST DATA
// ================================================================

function getBlogPostBySlug(slug: string) {
  const blogPosts = {
    "cach-cham-soc-hoa-tuoi": {
      id: 1,
      title: "Cách Chăm Sóc Hoa Tươi Để Giữ Được Lâu Nhất",
      excerpt: "Những bí quyết đơn giản giúp hoa tươi của bạn tươi đẹp và bền lâu hơn, tiết kiệm chi phí và mang lại niềm vui lâu dài.",
      image: "/blog/flower-care-tips.jpg",
      category: "Chăm sóc hoa",
      author: "Hoa Tươi Đà Nẵng",
      date: "15/12/2024",
      readTime: "5 phút đọc",
      slug: "cach-cham-soc-hoa-tuoi",
      content: `
        <p>Hoa tươi là món quà tuyệt vời của thiên nhiên, mang lại vẻ đẹp và hương thơm cho không gian sống. Tuy nhiên, để giữ hoa tươi lâu và đẹp nhất, bạn cần biết cách chăm sóc đúng cách.</p>

        <h2>1. Chuẩn Bị Bình Hoa Sạch Sẽ</h2>
        <p>Trước khi cắm hoa, hãy đảm bảo bình hoa được rửa sạch bằng nước ấm và xà phòng. Điều này giúp loại bỏ vi khuẩn có thể làm hỏng hoa.</p>

        <h2>2. Cắt Gốc Hoa Đúng Cách</h2>
        <p>Cắt gốc hoa xiên góc 45 độ dưới vòi nước chảy. Điều này giúp tăng diện tích hấp thụ nước và ngăn không khí vào thân hoa.</p>

        <h2>3. Sử dụng Nước Sạch và Thay Đổi Thường Xuyên</h2>
        <p>Sử dụng nước sạch, tốt nhất là nước đã được lọc. Thay nước mỗi 2-3 ngày và rửa sạch bình hoa mỗi lần thay.</p>

        <h2>4. Loại Bỏ Lá Dưới Mực Nước</h2>
        <p>Tất cả lá nằm dưới mực nước cần được loại bỏ để tránh thối rữa và nhiễm khuẩn.</p>

        <h2>5. Đặt Hoa Ở Vị Trí Phù Hợp</h2>
        <p>Tránh đặt hoa dưới ánh nắng trực tiếp, gần nguồn nhiệt hoặc trong gió lùa. Chọn nơi thoáng mát, có ánh sáng gián tiếp.</p>

        <h2>6. Sử dụng Chất Bảo Quản Hoa</h2>
        <p>Có thể thêm một ít đường, giấm hoặc thuốc bảo quản hoa chuyên dụng vào nước để kéo dài tuổi thọ của hoa.</p>

        <p><strong>Kết luận:</strong> Với những mẹo đơn giản này, bạn có thể giữ hoa tươi đẹp từ 7-14 ngày, thậm chí lâu hơn tùy loại hoa. Hãy áp dụng ngay để tận hưởng vẻ đẹp của hoa tươi lâu nhất có thể!</p>
      `
    },
    "y-nghia-cac-loai-hoa": {
      id: 2,
      title: "Ý Nghĩa Của Các Loại Hoa Trong Văn Hóa Việt Nam",
      excerpt: "Tìm hiểu về ý nghĩa sâu sắc của từng loại hoa trong văn hóa truyền thống Việt Nam và cách chọn hoa phù hợp cho từng dịp.",
      image: "/blog/flower-meanings.jpg",
      category: "Văn hóa",
      author: "Hoa Tươi Đà Nẵng",
      date: "12/12/2024",
      readTime: "7 phút đọc",
      slug: "y-nghia-cac-loai-hoa",
      content: `
        <p>Trong văn hóa Việt Nam, mỗi loài hoa đều mang một ý nghĩa riêng biệt, thể hiện tình cảm và lời chúc của người tặng. Hãy cùng tìm hiểu ý nghĩa của các loại hoa phổ biến.</p>

        <h2>1. Hoa Hồng - Biểu Tượng Tình Yêu</h2>
        <p><strong>Hoa hồng đỏ:</strong> Tình yêu nồng cháy, đam mê</p>
        <p><strong>Hoa hồng hồng:</strong> Tình yêu ngọt ngào, lãng mạn</p>
        <p><strong>Hoa hồng trắng:</strong> Tình yêu thuần khiết, tôn kính</p>
        <p><strong>Hoa hồng vàng:</strong> Tình bạn, sự quan tâm</p>

        <h2>2. Hoa Sen - Biểu Tượng Thanh Cao</h2>
        <p>Hoa sen tượng trưng cho sự thanh cao, thuần khiết và vượt lên khỏi bùn nhơ. Trong Phật giáo, sen là biểu tượng của sự giác ngộ.</p>

        <h2>3. Hoa Cúc - Trường Thọ và May Mắn</h2>
        <p>Hoa cúc vàng mang ý nghĩa trường thọ, thịnh vượng. Hoa cúc trắng thường dùng trong tang lễ, thể hiện lòng thương tiếc.</p>

        <h2>4. Hoa Đào - Đón Xuân và May Mắn</h2>
        <p>Hoa đào là biểu tượng của mùa xuân, sự khởi đầu mới và may mắn. Không thể thiếu trong dịp Tết Nguyên Đán.</p>

        <h2>5. Hoa Mai - Kiên Cường và Hy Vọng</h2>
        <p>Hoa mai vàng tượng trưng cho sự kiên cường, bền bỉ và hy vọng. Cũng là hoa không thể thiếu trong dịp Tết.</p>

        <h2>6. Hoa Ly - Thuần Khiết và Cao Quý</h2>
        <p>Hoa ly trắng biểu tượng của sự thuần khiết, cao quý. Thường được sử dụng trong các dịp trang trọng.</p>

        <p><strong>Lời khuyên:</strong> Khi chọn hoa tặng, hãy chú ý đến ý nghĩa của từng loại hoa để thể hiện đúng tình cảm và lời chúc của mình.</p>
      `
    }
  }

  return blogPosts[slug as keyof typeof blogPosts] || null
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const post = getBlogPostBySlug(slug)

  if (!post) {
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
    const title = post.title

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
            <span className="text-[var(--text-primary)] font-medium line-clamp-1">{post.title}</span>
          </nav>

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            {/* Category */}
            <div className="mb-4">
              <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-body font-medium rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[var(--text-primary)] mb-6" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 600, lineHeight: 1.3 }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] mb-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
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
              src={post.image}
              alt={post.title}
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
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

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