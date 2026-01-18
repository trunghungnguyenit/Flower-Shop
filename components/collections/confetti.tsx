"use client"

import { motion } from "framer-motion"

interface ConfettiProps {
  active: boolean
  position: { x: number; y: number }
}

export function Confetti({ active, position }: ConfettiProps) {
  const colors = ["#F5B5C8", "#D4A5E8", "#A8D5BA", "#F9E79F", "#AED6F1", "#F5CBA7"]

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
          style={{ backgroundColor: colors[i % colors.length] }}
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