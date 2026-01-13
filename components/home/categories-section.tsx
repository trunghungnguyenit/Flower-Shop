"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { categories } from "@/data/homepage-data";
import { getProductCountByOccasion } from "@/lib/product-filters";
import { FirebaseApi } from "@/api/firebase";
import { Product } from "@/api/api.type";
import {
  staggerContainer,
  staggerItem,
} from "@/components/animations/framer-variants";
import { cn } from "@/lib/utils";

// ================================================================
// CATEGORIES SECTION - "Hoa Theo Dịp"
// ================================================================
export function CategoriesSection() {
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
      className="relative bg-white overflow-hidden py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >

          <motion.h2
            className="font-display text-[var(--text-primary)] mb-4"
            style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 600 }}
            variants={staggerItem}
          >
            Hoa Theo Dịp
          </motion.h2>

          <motion.p
            className="font-body text-[var(--text-secondary)] max-w-2xl mx-auto"
            style={{ fontSize: "17px", lineHeight: 1.7 }}
            variants={staggerItem}
          >
            Tìm mẫu hoa phù hợp cho từng khoảnh khắc quan trọng trong cuộc sống.
          </motion.p>
        </motion.div>

        {/* Categories Grid - Bento Style */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainer}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              className={cn(
                "h-full",
                index === 0 && "lg:col-span-2 lg:row-span-2"
              )}
            >
              <Link
                href={category.href}
                className="
          group relative block h-full overflow-hidden
          rounded-[var(--radius-large)]
          shadow-[var(--shadow-card)]
        "
              >
                {/* Image wrapper – thống nhất aspect */}
                <div className="relative h-full aspect-[4/3] lg:aspect-[1/1]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3
                      className={cn(
                        "font-display text-white font-semibold leading-tight",
                        index === 0
                          ? "text-xl lg:text-2xl"
                          : "text-base lg:text-lg"
                      )}
                    >
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs lg:text-sm text-white">
                      {loading
                        ? "..."
                        : `${getProductCountByOccasion(
                            products,
                            category.occasionId
                          )}+ mẫu hoa`}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}