"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Phone, MessageCircle, ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/constants";
import { HeaderSection } from "@/components/header";
import { FooterSection } from "@/components/footer";

// ================================================================
// ANIMATION VARIANTS
// ================================================================

const premiumEase = [0.25, 0.1, 0.25, 1] as const;

// ================================================================
// OCCASIONS MAIN LAYOUT COMPONENT
// ================================================================

interface Occasion {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
  emoji: string;
}

interface OccasionsMainLayoutProps {
  occasions: Occasion[];
}

export function OccasionsMainLayout({ occasions }: OccasionsMainLayoutProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <HeaderSection />

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1100px] px-4 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm font-body mb-8">
            <Link
              href="/"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 text-[var(--text-muted)]" />
            <span className="text-[var(--text-primary)] font-medium">
              Dịp lễ
            </span>
          </nav>

          {/* Hero Content */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <h1
              className="font-display text-[var(--text-primary)] mb-6"
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              Hoa Tươi Cho Mọi
              <br />
              <span className="text-[var(--text-primary)]">Dịp Đặc Biệt</span>
            </h1>

            <p
              className="font-body text-[var(--text-primary)] max-w-2xl mx-auto mb-8"
              style={{ fontSize: "18px", lineHeight: 1.7 }}
            >
              Từ Tết Nguyên Đán đến sinh nhật, từ đám cưới đến khai trương -
              chúng tôi có những mẫu hoa phù hợp cho mọi dịp lễ quan trọng trong
              cuộc sống.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#danh-sach-dip-le"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--text-primary)] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white font-body font-medium transition-all duration-300"
                style={{
                  borderRadius: "var(--radius-round)",
                  fontSize: "16px",
                }}
              >
                Xem tất cả dịp lễ
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white font-body font-medium transition-all duration-300"
                style={{
                  borderRadius: "var(--radius-round)",
                  fontSize: "16px",
                }}
              >
                <MessageCircle className="w-5 h-5" />
                Tư vấn ngay
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Occasions Grid */}
      <section
        ref={ref}
        id="danh-sach-dip-le"
        className="py-16 lg:py-24 bg-[var(--background-muted)]"
      >
        <div className="mx-auto max-w-[1200px] px-4 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <span className="inline-block font-body text-[var(--text-primary)] tracking-[0.25em] uppercase mb-4 text-sm font-medium">
              Chọn dịp lễ phù hợp
            </span>
            <h2
              className="font-display text-[var(--text-primary)] mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 600 }}
            >
              Các Dịp Lễ Phổ Biến
            </h2>
            <p
              className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
              style={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Mỗi dịp lễ đều có ý nghĩa riêng và cần những loại hoa phù hợp. Hãy
              chọn dịp lễ để xem các mẫu hoa được gợi ý.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {occasions.map((occasion, index) => (
              <motion.div
                key={occasion.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: premiumEase,
                }}
                whileHover={{ y: -8 }}
              >
                <Link href={occasion.href}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={occasion.image}
                        alt={occasion.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Icon */}
                      <div className="absolute top-4 left-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm",
                            occasion.color === "red" &&
                              "bg-red-500/20 text-red-100",
                            occasion.color === "pink" &&
                              "bg-pink-500/20 text-pink-100",
                            occasion.color === "rose" &&
                              "bg-rose-500/20 text-rose-100",
                            occasion.color === "orange" &&
                              "bg-orange-500/20 text-orange-100",
                            occasion.color === "gray" &&
                              "bg-gray-500/20 text-gray-100",
                            occasion.color === "purple" &&
                              "bg-purple-500/20 text-purple-100",
                            occasion.color === "emerald" &&
                              "bg-emerald-500/20 text-emerald-100"
                          )}
                        >
                          <occasion.icon
                            className="w-5 h-5"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Emoji */}
                      <div className="absolute top-4 right-4 text-2xl animate-bounce">
                        {occasion.emoji}
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3
                          className="font-display text-white font-semibold mb-1"
                          style={{ fontSize: "18px" }}
                        >
                          {occasion.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p
                        className="font-body text-[var(--text-secondary)] mb-4"
                        style={{ fontSize: "14px", lineHeight: 1.6 }}
                      >
                        {occasion.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="font-body text-[var(--text-primary)] font-medium text-sm">
                          Xem chi tiết
                        </span>
                        <ArrowRight className="w-4 h-4 text-[var(--text-primary)] group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
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
              <Calendar className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>

            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600 }}
            >
              Không Tìm Thấy Dịp Lễ Phù Hợp?
            </h2>

            <p
              className="text-white/90 mb-8 max-w-lg mx-auto font-body"
              style={{ fontSize: "16px", lineHeight: 1.7 }}
            >
              Liên hệ với chúng tôi để được tư vấn về các loại hoa phù hợp cho
              dịp lễ đặc biệt của bạn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CONTACT.phoneLink}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--primary)] hover:bg-gray-50 font-body font-medium transition-all duration-300 hover:scale-105"
                style={{
                  borderRadius: "var(--radius-round)",
                  fontSize: "16px",
                }}
              >
                <Phone className="w-5 h-5" />
                Gọi ngay: {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.zaloLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[var(--primary)] font-body font-medium transition-all duration-300"
                style={{
                  borderRadius: "var(--radius-round)",
                  fontSize: "16px",
                }}
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
  );
}