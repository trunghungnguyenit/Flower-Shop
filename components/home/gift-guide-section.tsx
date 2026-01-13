"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { giftGuides } from "@/data/homepage-data";
import { getProductCountByGiftGuide } from "@/lib/product-filters";
import { FirebaseApi } from "@/api/firebase";
import { Product } from "@/api/api.type";

// ================================================================
// GIFT GUIDE SECTION - "Gợi Ý Quà Theo Người Nhận" với Vertical Layout
// ================================================================
export function GiftGuideSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products to get real counts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await FirebaseApi.getProduct();
        if (res.ok && Array.isArray(res.data)) {
          setProducts(res.data.filter((product: Product) => product.isActive));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Sample images for gift guides
  const giftGuideImages = [
    "/tang-nguoi-yeu/nguoi-iu-13.jpg",
    "/tang-me/me-8.jpg",
    "/sunflower-birthday-bouquet.jpg",
    "/khai-truong/khai-truong.jpg",
    "/cuoi/cuoi-9.jpg"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block font-body text-[var(--text-primary)] tracking-[0.25em] uppercase mb-4"
          >
            Chọn quà dễ dàng
          </span>

          <h2
            className="font-display text-[var(--text-primary)] mb-3 text-2xl lg:text-3xl font-semibold"
          >
            Gợi Ý Quà Tặng Theo Người Nhận
          </h2>

          <p
            className="font-body text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed"
          >
            Không biết chọn gì? Hãy để chúng tôi gợi ý mẫu phù hợp nhất.
          </p>
        </div>

        {/* Gift Guides List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {giftGuides.map((guide, index) => {
            const IconComponent = guide.icon;
            const image = giftGuideImages[index] || giftGuideImages[0];

            return (
              <Link
                key={guide.giftGuideId}
                href={guide.href}
                className="block group"
              >
                <div
                  className="
                    flex flex-col
                    bg-white
                    transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
                    min-h-[400px]
                    rounded-2xl
                    overflow-hidden
                    border border-gray-100
                  "
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={image}
                      alt={`${guide.title} - hoa tươi`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">

                    {/* Title */}
                    <h3 className="text-base font-display text-[var(--text-primary)] mb-2 transition-colors font-semibold">
                      {guide.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-primary)] mb-4 leading-relaxed line-clamp-3 flex-1">
                      {guide.description}
                    </p>

                    {/* Count Badge */}
                    <div className="mb-4">
                      {/* Wrapper phải có group */}
                      <div className="group">

                        {/* CTA */}
                        <div className="relative inline-flex items-center font-body text-sm tracking-wider uppercase font-medium text-[var(--text-primary)] h-5 overflow-hidden">

                          {/* Default text */}
                          <span className="inline-flex items-center transition-all duration-300 group-hover:-translate-y-5">
                            XEM HOA
                            <svg
                              className="ml-2 w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </span>

                          {/* Hover text */}
                          <span className="absolute left-0 top-5 inline-flex items-center text-[var(--text-primary)] transition-all duration-300 group-hover:top-0">
                            {loading
                              ? "ĐANG TẢI..."
                              : `${getProductCountByGiftGuide(
                                products,
                                guide.giftGuideId
                              )} MẪU HOA`}
                          </span>

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}