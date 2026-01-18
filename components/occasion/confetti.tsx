"use client"

import { motion } from "framer-motion"

// ================================================================
// CONFETTI COMPONENT
// ================================================================

interface ConfettiProps {
  active: boolean
  position: { x: number; y: number }
  colors?: string[]
}

export function Confetti({ active, position, colors }: ConfettiProps) {
  const defaultColors = ["#FF69B4", "#FFD700", "#FF6347", "#98FB98", "#87CEEB", "#DDA0DD"]
  const confettiColors = colors || defaultColors

  if (!active) return null

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: position.x, top: position.y }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: confettiColors[i % confettiColors.length] }}
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200 - 50,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}