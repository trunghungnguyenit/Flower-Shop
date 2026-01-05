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
  staggerItemScale,
  premiumEase,
} from "@/components/animations/framer-variants";

// ================================================================
// SCENARIOS SECTION - "Bạn Đang Ở Hoàn Cảnh Nào?"
// ================================================================
export function ScenariosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(80px, 10vw, 140px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          <motion.span
            className="inline-block font-body text-[var(--primary)] tracking-[0.25em] uppercase mb-4"
            style={{ fontSize: "13px", fontWeight: 500 }}
            variants={staggerItem}
          >
            Tìm hoa phù hợp
          </motion.span>

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Bạn Đang Ở Tình Huống Nào?
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Chúng tôi giúp bạn chọn mẫu hoa phù hợp nhất cho từng khoảnh khắc.
          </motion.p>
        </motion.div>

        {/* Scenarios Grid */}
        {/* Scenarios Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {scenarios.map((scenario, index) => {
            const IconComponent = scenario.icon;

            return (
              <motion.div
                key={index}
                variants={staggerItemScale}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Link
                  href={scenario.href}
                  className="
            group relative h-full
            flex flex-col items-center justify-between
            p-6
            bg-white
            border border-[var(--border-soft)]
            rounded-[var(--radius-medium)]
            shadow-[var(--shadow-sm)]
            transition-all duration-300
            hover:border-[var(--primary)]/40
            hover:shadow-[0_8px_30px_rgba(217,124,138,0.15)]
          "
                >
                  {/* Icon */}
                  <div
                    className="
              w-16 h-16
              flex items-center justify-center
              rounded-full
              bg-[var(--secondary)]
              border border-[var(--border-soft)]
              transition-all duration-300
              group-hover:bg-[var(--primary)]/10
              group-hover:border-[var(--primary)]/20
            "
                  >
                    <IconComponent
                      className="w-7 h-7 text-[var(--primary-dark)]"
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4 flex-1 flex flex-col items-center">
                    <h4 className="text-center text-base font-semibold text-[var(--text-primary)] group-hover:text-[var(--primary-dark)]">
                      {scenario.title}
                    </h4>

                    <p className="mt-2 text-center text-sm text-[var(--text-secondary)] line-clamp-2">
                      {scenario.tagline}
                    </p>
                  </div>

                  {/* Badge */}
                  <span
                    className="
            mt-4
            inline-flex items-center
            px-3 py-1
            rounded-full
            text-xs font-medium
            bg-[var(--primary)]/10
            text-[var(--primary-dark)]
            transition-colors duration-300
            group-hover:bg-[var(--primary)]/20
          "
                  >
                    {loading
                      ? "..."
                      : `${getProductCountByOccasion(
                          products,
                          scenario.occasionId
                        )}+ mẫu hoa`}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
