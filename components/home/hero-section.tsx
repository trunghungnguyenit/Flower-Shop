"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, MessageCircle } from "lucide-react"
import { CONTACT } from "@/lib/constants"
import { heroSlides } from "@/data/homepage-data"
import { premiumEase } from "@/components/animations/framer-variants"
import { SoftGradientMotion, PremiumFloatingPetals, SoftLightLeaks } from "@/components/animations/background-effects"

// ================================================================
// HERO SECTION - PREMIUM FRAMER MOTION
// ================================================================
export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms for depth effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Slides with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: premiumEase }}
          className="absolute inset-0"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <Image
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            fill
            className="relative object-cover"
            priority
          />
          {/* Multi-layer gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Premium Animation Layers */}
      <SoftGradientMotion />
      <PremiumFloatingPetals />
      <SoftLightLeaks />

      {/* Content with Parallax */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
              className="inline-block font-body text-white tracking-[0.25em] uppercase mb-4"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              Hoa tươi mỗi ngày
            </motion.span>

            {/* Title with AnimatePresence for smooth transitions */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: premiumEase }}
                className="font-display text-white mb-4"
                style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 600, lineHeight: 1.1 }}
              >
                {heroSlides[currentSlide].title}
                <br />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-white"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.span>
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.2, ease: premiumEase }}
                className="font-body text-white mb-8 max-w-lg"
                style={{ fontSize: "18px", lineHeight: 1.7 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: premiumEase }}
              className="flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/collection"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black font-body font-medium border border-white/30 transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                >
                  Xem Bộ Sưu Tập
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={CONTACT.zaloLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-black font-body font-medium border border-white/30 transition-colors duration-300"
                  style={{ borderRadius: "var(--radius-round)", fontSize: "15px" }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Tư Vấn Qua Zalo
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 transition-all duration-300",
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            )}
            style={{ borderRadius: "var(--radius-round)" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-2 text-black/60"
      >
        <span className="font-body text-xs tracking-wider uppercase">Cuộn xuống</span>
        <motion.div className="w-px h-12 bg-black/30 relative overflow-hidden">
          <motion.div
            className="w-full h-4 bg-black"
            animate={{ y: ["-100%", "400%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}