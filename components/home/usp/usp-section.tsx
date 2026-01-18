"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { uspItems } from "@/data/homepage-data";
import {
  staggerContainerFast,
  scaleInUp,
  premiumEase,
} from "@/components/animations/framer-variants";

export function UspSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
      style={{ padding: "clamp(60px, 8vw, 100px) 0" }}
    >
      <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={staggerContainerFast}
        >
          {uspItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <motion.div
                key={index}
                className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                variants={scaleInUp}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Content */}
                <div className="p-6 text-center flex-1 flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="w-16 h-16 mb-4 mx-auto flex items-center justify-center rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(var(--primary))",
                    }}
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{ duration: 0.25, ease: premiumEase }}
                  >
                    <Icon className="w-7 h-7 text-black" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h4
                    className="font-display text-[var(--text-primary)] mb-2"
                    style={{ fontSize: "17px", fontWeight: 600 }}
                  >
                    {item.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="font-body text-[var(--text-secondary)] flex-1"
                    style={{ fontSize: "14px", lineHeight: 1.6 }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}