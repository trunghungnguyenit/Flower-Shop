"use client"

import { useEffect, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

// ================================================
// Floating Petals Effect
// ================================================

interface FloatingPetalsProps {
  count?: number
  className?: string
  enabled?: boolean
}

interface Petal {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
  type: "🌸" | "🌺" | "🌷" | "💮"
}

export function FloatingPetals({
  count = 15,
  className,
  enabled = true,
}: FloatingPetalsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const petals = useMemo(() => {
    const petalTypes: Petal["type"][] = ["🌸", "🌺", "🌷", "💮"]

    return Array.from({ length: count }, (_, i): Petal => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 16 + Math.random() * 12,
      opacity: 0.3 + Math.random() * 0.4,
      type: petalTypes[Math.floor(Math.random() * petalTypes.length)],
    }))
  }, [count])

  if (!enabled || !mounted) return null

  // Check for reduced motion preference
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-10",
        className
      )}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <span
          key={petal.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${petal.left}%`,
            top: "-30px",
            fontSize: `${petal.size}px`,
            opacity: petal.opacity,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          {petal.type}
        </span>
      ))}
    </div>
  )
}

// ================================================
// Floating Bubbles Effect (Alternative)
// ================================================

interface FloatingBubblesProps {
  count?: number
  className?: string
}

interface Bubble {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export function FloatingBubbles({
  count = 10,
  className,
}: FloatingBubblesProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i): Bubble => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 12,
      size: 8 + Math.random() * 16,
    }))
  }, [count])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none",
        className
      )}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm animate-float-up"
          style={{
            left: `${bubble.left}%`,
            bottom: "-20px",
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
