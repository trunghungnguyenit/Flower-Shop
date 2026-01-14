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
import Image from "next/image";

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
    "/tang-nguoi-yeu/nguoi-iu-7.jpg",
    "/tang-sinh-nhat/sinh-nhat-7.jpg",
    "/tang-me/me-8.jpg",
    "/khai-truong/khai-truong.jpg",
    "/cuoi/cuoi-10.jpg",
    "/trang-tri/trang-tri-5.jpg"
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block font-body text-[var(--text-primary)] tracking-[0.25em] uppercase mb-4"
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
                    ${isEven ? 'bg-white' : 'bg-white'}
                    transition-all duration-300 hover:shadow-lg hover:z-10 relative
                    min-h-[200px] lg:min-h-[240px]
                    ${index !== scenarios.length - 1 ? 'border-b border-white/20' : ''}
                  `}
                >
                  {/* Content */}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-display text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-primary)] transition-colors">
                      {scenario.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-primary)] mb-4 max-w-sm leading-relaxed">
                      {scenario.tagline}
                    </p>

                    {/* CTA Text */}
                    <div className="mb-4">
                      <div className="inline-flex items-center gap-2 px-5 py-2 border border-[var(--text-primary)] 
                  rounded-full
                  text-sm font-body font-medium
                  text-[var(--text-primary)]
                  hover:bg-[var(--text-primary)] hover:text-white
                  transition-all duration-300">
                        XEM HOA
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
                      </div>
                    </div>


                  </div>

                  {/* Image */}
                  <div className="relative flex-1 relative h-full aspect-[4/3] lg:aspect-[1/1]">
                      <Image
                        src={image}
                        alt={`${scenario.title} - hoa tươi`}
                        fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
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