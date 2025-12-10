"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, Cake, Sparkles, Gift, Star, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { colors, spacing, radius, shadows, typography, animation } from "@/lib/design-tokens";

// ================================================
// TYPES
// ================================================
interface WhenToGiveItem {
  icon: string;
  text: string;
}

interface FlowerType {
  name: string;
  meaning: string;
}

interface FlowerTypesData {
  title: string;
  description: string;
  items: FlowerType[];
  colors: string[];
  image: string;
}

interface Combo {
  id: number;
  name: string;
  description: string;
  includes: string[];
  price: number;
  image: string;
}

export interface GiftGuide {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  whenToGive: WhenToGiveItem[];
  flowerTypes: FlowerTypesData;
  combos: Combo[];
  collectionLink: string;
}

interface Props {
  guide: GiftGuide;
}

// ================================================
// ICON MAP
// ================================================
const iconMap = {
  Heart,
  Cake,
  Sparkles,
  Gift,
  Star,
};

// ================================================
// FORMAT PRICE
// ================================================
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN").format(price);
};

// ================================================
// CONFETTI EFFECT
// ================================================
const triggerConfetti = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x, y },
    colors: [colors.primary, colors.accentGold, colors.accentRose, "#FFF"],
    ticks: 120,
    gravity: 0.8,
    scalar: 0.9,
  });
};

// ================================================
// MAIN COMPONENT
// ================================================
export default function GiftGuideClient({ guide }: Props) {
  const [hoveredCombo, setHoveredCombo] = useState<number | null>(null);

  return (
    <div style={{ background: colors.background }}>
      {/* BREADCRUMB */}
      <Breadcrumb slug={guide.slug} title={guide.title} />

      {/* HERO */}
      <Hero guide={guide} />

      {/* WHEN TO GIVE */}
      <WhenToGiveSection whenToGive={guide.whenToGive} />

      {/* FLOWER TYPES */}
      <FlowerTypesSection flowerTypes={guide.flowerTypes} />

      {/* COMBOS */}
      <CombosSection
        combos={guide.combos}
        hoveredCombo={hoveredCombo}
        setHoveredCombo={setHoveredCombo}
      />

      {/* CTA TO COLLECTION */}
      <CollectionCTA collectionLink={guide.collectionLink} slug={guide.slug} />
    </div>
  );
}

// ================================================
// BREADCRUMB
// ================================================
function Breadcrumb({ slug, title }: { slug: string; title: string }) {
  return (
    <section
      style={{
        padding: `${spacing[6]} ${spacing[4]}`,
        maxWidth: "1240px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: spacing[2],
          fontSize: typography.fontSize.bodySmall,
          color: colors.textSecondary,
        }}
      >
        <Link
          href="/"
          style={{
            color: colors.textSecondary,
            textDecoration: "none",
            transition: `color ${animation.duration.fast}`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
        >
          Trang chủ
        </Link>
        <span>/</span>
        <Link
          href="/#gift-guide"
          style={{
            color: colors.textSecondary,
            textDecoration: "none",
            transition: `color ${animation.duration.fast}`,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
        >
          Gợi ý quà
        </Link>
        <span>/</span>
        <span style={{ color: colors.textPrimary, fontWeight: typography.fontWeight.medium }}>
          {title.replace("Gợi ý hoa tặng ", "")}
        </span>
      </div>
    </section>
  );
}

// ================================================
// HERO
// ================================================
function Hero({ guide }: { guide: GiftGuide }) {
  return (
    <section
      style={{
        position: "relative",
        height: "clamp(400px, 50vh, 600px)",
        overflow: "hidden",
        background: colors.backgroundAlt,
      }}
    >
      {/* Background Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: `linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.4) 100%), url(${guide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </motion.div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1240px",
          margin: "0 auto",
          padding: `0 ${spacing[4]}`,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: typography.fontSize.h1,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing[4],
            lineHeight: typography.lineHeight.heading,
          }}
        >
          {guide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.bodyLarge,
            color: colors.textSecondary,
            maxWidth: "600px",
            fontStyle: "italic",
          }}
        >
          {guide.subtitle}
        </motion.p>
      </div>
    </section>
  );
}

// ================================================
// WHEN TO GIVE SECTION
// ================================================
function WhenToGiveSection({ whenToGive }: { whenToGive: WhenToGiveItem[] }) {
  return (
    <section
      style={{
        padding: `${spacing.sectionYSmall} ${spacing[4]}`,
        maxWidth: "1240px",
        margin: "0 auto",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize: typography.fontSize.h2,
          fontWeight: typography.fontWeight.bold,
          color: colors.textPrimary,
          marginBottom: spacing[8],
          textAlign: "center",
        }}
      >
        Khi nào nên tặng hoa?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          background: colors.backgroundAlt,
          padding: spacing[8],
          borderRadius: radius.large,
          boxShadow: shadows.card,
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[5] }}>
          {whenToGive.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing[4],
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: radius.medium,
                    background: colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={24} color={colors.textLight} strokeWidth={2} />
                </div>
                <p
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.fontSize.body,
                    color: colors.textPrimary,
                    fontWeight: typography.fontWeight.medium,
                  }}
                >
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

// ================================================
// FLOWER TYPES SECTION
// ================================================
function FlowerTypesSection({ flowerTypes }: { flowerTypes: FlowerTypesData }) {
  return (
    <section
      style={{
        padding: `${spacing.sectionYSmall} ${spacing[4]}`,
        background: colors.backgroundMuted,
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: typography.fontSize.h2,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing[3],
            textAlign: "center",
          }}
        >
          {flowerTypes.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.body,
            color: colors.textSecondary,
            textAlign: "center",
            marginBottom: spacing[10],
          }}
        >
          {flowerTypes.description}
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: spacing[10],
            alignItems: "center",
          }}
        >
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h3
              style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.h4,
                fontWeight: typography.fontWeight.semibold,
                color: colors.textPrimary,
                marginBottom: spacing[5],
              }}
            >
              Loại hoa phù hợp
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing[4] }}>
              {flowerTypes.items.map((item, index) => (
                <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: spacing[3] }}>
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: colors.primary,
                      marginTop: "8px",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: typography.fontSize.body,
                        fontWeight: typography.fontWeight.semibold,
                        color: colors.textPrimary,
                        marginBottom: spacing[1],
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: typography.fontFamily.body,
                        fontSize: typography.fontSize.bodySmall,
                        color: colors.textSecondary,
                      }}
                    >
                      {item.meaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3
              style={{
                fontFamily: typography.fontFamily.body,
                fontSize: typography.fontSize.h4,
                fontWeight: typography.fontWeight.semibold,
                color: colors.textPrimary,
                marginTop: spacing[8],
                marginBottom: spacing[4],
              }}
            >
              Tông màu gợi ý
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: spacing[2] }}>
              {flowerTypes.colors.map((color, index) => (
                <span
                  key={index}
                  style={{
                    padding: `${spacing[2]} ${spacing[4]}`,
                    background: colors.backgroundAlt,
                    borderRadius: radius.round,
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.fontSize.bodySmall,
                    color: colors.textPrimary,
                    fontWeight: typography.fontWeight.medium,
                    border: `1px solid ${colors.borderSoft}`,
                  }}
                >
                  {color}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            style={{
              position: "relative",
              borderRadius: radius.large,
              overflow: "hidden",
              boxShadow: shadows.cardHover,
              aspectRatio: "4/5",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                background: `url(${flowerTypes.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ================================================
// COMBOS SECTION
// ================================================
function CombosSection({
  combos,
  hoveredCombo,
  setHoveredCombo,
}: {
  combos: Combo[];
  hoveredCombo: number | null;
  setHoveredCombo: (id: number | null) => void;
}) {
  return (
    <section
      style={{
        padding: `${spacing.sectionY} ${spacing[4]}`,
        maxWidth: "1240px",
        margin: "0 auto",
      }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: typography.fontFamily.display,
          fontSize: typography.fontSize.h2,
          fontWeight: typography.fontWeight.bold,
          color: colors.textPrimary,
          marginBottom: spacing[3],
          textAlign: "center",
        }}
      >
        3 gợi ý quà tặng dành riêng cho bạn
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: typography.fontFamily.body,
          fontSize: typography.fontSize.bodyLarge,
          color: colors.textSecondary,
          textAlign: "center",
          marginBottom: spacing[12],
        }}
      >
        Chúng tôi đã chọn lọc những combo tốt nhất dành cho bạn
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: spacing[8],
        }}
      >
        {combos.map((combo, index) => (
          <ComboCard
            key={combo.id}
            combo={combo}
            index={index}
            isHovered={hoveredCombo === combo.id}
            onHover={() => setHoveredCombo(combo.id)}
            onLeave={() => setHoveredCombo(null)}
          />
        ))}
      </div>
    </section>
  );
}

// ================================================
// COMBO CARD
// ================================================
function ComboCard({
  combo,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  combo: Combo;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const handleOrderClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerConfetti(e.currentTarget);
    // Add to cart logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        background: colors.background,
        borderRadius: radius.large,
        overflow: "hidden",
        boxShadow: isHovered ? shadows.cardLifted : shadows.card,
        transition: `all ${animation.duration.normal} ${animation.ease.smooth}`,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        border: `1px solid ${colors.borderSoft}`,
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          overflow: "hidden",
          background: colors.backgroundAlt,
        }}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            background: `url(${combo.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: spacing[4],
            right: spacing[4],
            background: colors.accentGold,
            color: colors.textPrimary,
            padding: `${spacing[2]} ${spacing[4]}`,
            borderRadius: radius.round,
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.small,
            fontWeight: typography.fontWeight.bold,
            boxShadow: shadows.md,
          }}
        >
          Gợi ý #{index + 1}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: spacing[6] }}>
        <h3
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: typography.fontSize.h4,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing[2],
          }}
        >
          {combo.name}
        </h3>

        <p
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.bodySmall,
            color: colors.textSecondary,
            marginBottom: spacing[5],
            lineHeight: typography.lineHeight.body,
          }}
        >
          {combo.description}
        </p>

        {/* Includes */}
        <div style={{ marginBottom: spacing[5] }}>
          <p
            style={{
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.semibold,
              color: colors.textPrimary,
              marginBottom: spacing[3],
              textTransform: "uppercase",
              letterSpacing: typography.letterSpacing.wide,
            }}
          >
            Bao gồm:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing[2] }}>
            {combo.includes.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: spacing[2] }}>
                <Check size={16} color={colors.primary} strokeWidth={2.5} />
                <span
                  style={{
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.fontSize.bodySmall,
                    color: colors.textSecondary,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            marginBottom: spacing[5],
            paddingTop: spacing[5],
            borderTop: `1px solid ${colors.borderSoft}`,
          }}
        >
          <p
            style={{
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.caption,
              color: colors.textMuted,
              marginBottom: spacing[1],
            }}
          >
            Giá tham khảo:
          </p>
          <p
            style={{
              fontFamily: typography.fontFamily.display,
              fontSize: typography.fontSize.h3,
              fontWeight: typography.fontWeight.bold,
              color: colors.primary,
            }}
          >
            {formatPrice(combo.price)}đ
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: spacing[3] }}>
          <button
            onClick={handleOrderClick}
            style={{
              width: "100%",
              padding: `${spacing[4]} ${spacing[6]}`,
              background: colors.primary,
              color: colors.textLight,
              border: "none",
              borderRadius: radius.medium,
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              cursor: "pointer",
              transition: `all ${animation.duration.normal} ${animation.ease.smooth}`,
              boxShadow: shadows.md,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.primaryDark;
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = shadows.glowPrimary;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.primary;
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = shadows.md;
            }}
          >
            Đặt ngay combo này
          </button>

          <Link
            href={`/san-pham/combo-${combo.id}`}
            style={{
              width: "100%",
              padding: `${spacing[4]} ${spacing[6]}`,
              background: "transparent",
              color: colors.primary,
              border: `2px solid ${colors.primary}`,
              borderRadius: radius.medium,
              fontFamily: typography.fontFamily.body,
              fontSize: typography.fontSize.body,
              fontWeight: typography.fontWeight.semibold,
              textDecoration: "none",
              textAlign: "center",
              display: "inline-block",
              transition: `all ${animation.duration.normal} ${animation.ease.smooth}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.primaryLight;
              e.currentTarget.style.borderColor = colors.primaryDark;
              e.currentTarget.style.color = colors.primaryDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = colors.primary;
              e.currentTarget.style.color = colors.primary;
            }}
          >
            Xem chi tiết combo
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ================================================
// COLLECTION CTA
// ================================================
function CollectionCTA({ collectionLink, slug }: { collectionLink: string; slug: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const getTitle = (slug: string) => {
    const map: Record<string, string> = {
      "cho-nguoi-yeu": "người yêu",
      "cho-me": "mẹ",
      "cho-ban-than": "bạn thân",
      "cho-sep": "sếp",
      "cho-vo-chong": "vợ/chồng",
    };
    return map[slug] || "";
  };

  return (
    <section
      style={{
        padding: `${spacing.sectionYSmall} ${spacing[4]}`,
        background: colors.backgroundMuted,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: colors.background,
          padding: spacing[10],
          borderRadius: radius.xl,
          boxShadow: shadows.card,
          textAlign: "center",
          border: `1px solid ${colors.borderSoft}`,
        }}
      >
        <h2
          style={{
            fontFamily: typography.fontFamily.display,
            fontSize: typography.fontSize.h3,
            fontWeight: typography.fontWeight.bold,
            color: colors.textPrimary,
            marginBottom: spacing[4],
          }}
        >
          Xem tất cả mẫu hoa phù hợp
        </h2>

        <p
          style={{
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.body,
            color: colors.textSecondary,
            marginBottom: spacing[8],
            lineHeight: typography.lineHeight.body,
          }}
        >
          Khám phá bộ sưu tập đầy đủ với hơn 50+ mẫu hoa được chọn lọc kỹ càng dành cho {getTitle(slug)}
        </p>

        <Link
          href={collectionLink}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: spacing[3],
            padding: `${spacing[5]} ${spacing[8]}`,
            background: colors.primary,
            color: colors.textLight,
            textDecoration: "none",
            borderRadius: radius.medium,
            fontFamily: typography.fontFamily.body,
            fontSize: typography.fontSize.bodyLarge,
            fontWeight: typography.fontWeight.semibold,
            boxShadow: isHovered ? shadows.glowPrimary : shadows.md,
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            transition: `all ${animation.duration.normal} ${animation.ease.smooth}`,
          }}
        >
          Xem tất cả mẫu cho {getTitle(slug)}
          <motion.div
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight size={20} strokeWidth={2.5} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
