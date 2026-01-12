"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { scenarios } from "@/data/homepage-data";
import { getProductCountByOccasion } from "@/lib/product-filters";
import { FirebaseApi } from "@/api/firebase";
import { Product } from "@/api/api.type";
import {
  staggerContainer,
  staggerItem,
} from "@/components/animations/framer-variants";

// ================================================================
// SCENARIOS SECTION - "Bạn Đang Ở Tình Huống Nào?" với Signature Layout
// ================================================================
export function ScenariosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
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

  // Sample images for each scenario
  const scenarioImages = [
    "/romantic-red-roses-bouquet-luxury-gift.jpg",
    "/birthday-flower-bouquet-celebration.jpg", 
    "/mixed-pastel-flowers-bouquet-soft-colors.jpg",
    "/grand-opening-flower-stand.jpg",
    "/wedding-flowers-bridal-bouquet-elegant.jpg",
    "/decorative-flowers-interior-design.jpg"
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
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-3 text-xs"
          >
            Tìm hoa phù hợp
          </span>

          <h2
            className="font-display text-[var(--text-primary)] mb-3 text-2xl lg:text-3xl font-semibold"
          >
            Bạn Đang Ở Tình Huống Nào?
          </h2>

          <p
            className="font-body text-[var(--text-secondary)] max-w-xl mx-auto text-sm leading-relaxed"
          >
            Chúng tôi giúp bạn chọn mẫu hoa phù hợp nhất cho từng khoảnh khắc.
          </p>
        </div>

        {/* Scenarios List */}
        <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
          {scenarios.map((scenario, index) => {
            const image = scenarioImages[index] || scenarioImages[0];
            const isEven = index % 2 === 0;

            return (
              <Link
                key={scenario.occasionId}
                href={scenario.href}
                className="block group"
              >
                <div
                  className={`
                    flex flex-col lg:flex-row
                    ${!isEven ? 'lg:flex-row-reverse' : ''}
                    ${isEven ? 'bg-[#F8F6F4]' : 'bg-[#F5F5F5]'}
                    transition-all duration-300 hover:shadow-lg hover:z-10 relative
                    min-h-[200px] lg:min-h-[240px]
                    ${index !== scenarios.length - 1 ? 'border-b border-white/20' : ''}
                  `}
                >
                  {/* Content */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-display text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary)] transition-colors">
                      {scenario.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-sm leading-relaxed">
                      {scenario.tagline}
                    </p>

                    {/* Count Badge */}
                    <div className="mb-4">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[var(--primary)]/10 text-[var(--primary-dark)] group-hover:bg-[var(--primary)]/20 transition-colors">
                        {loading
                          ? "Đang tải..."
                          : `${getProductCountByOccasion(
                              products,
                              scenario.occasionId
                            )}+ mẫu hoa`}
                      </span>
                    </div>

                    {/* CTA Text */}
                    <div className="inline-flex items-center text-[var(--primary)] font-body text-sm tracking-wider uppercase group-hover:text-[var(--primary-dark)] transition-colors font-medium">
                      XEM HOA
                      <svg 
                        className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex-1 relative min-h-[200px] lg:min-h-[240px] overflow-hidden">
                    <div className="absolute inset-0">
                      <img
                        src={image}
                        alt={`${scenario.title} - hoa tươi`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Text Overlay */}
                    <div className={`absolute bottom-6 ${!isEven ? 'left-6' : 'right-6'} max-w-[180px]`}>
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                          Mỗi bó hoa là một câu chuyện.
                          <br />
                          Hãy để chúng tôi kể câu chuyện
                          <br />
                          của riêng bạn.
                        </p>
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