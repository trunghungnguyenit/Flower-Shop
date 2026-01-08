"use client"

import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

// ================================================
// Confetti Effect
// ================================================

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  color: string
  size: number
  delay: number
  duration: number
}

interface ConfettiEffectProps {
  active: boolean
  duration?: number
  pieceCount?: number
  className?: string
  onComplete?: () => void
}

export function ConfettiEffect({
  active,
  duration = 3000,
  pieceCount = 50,
  className,
  onComplete,
}: ConfettiEffectProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const colors = [
    "var(--primary)",
    "var(--primary-light)",
    "var(--accent-gold)",
    "var(--accent-rose)",
    "#FFB5C2",
    "#FFE4A0",
    "#C9E4DE",
    "#F0E6EF",
  ]

  const generateConfetti = useCallback(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }))
    setPieces(newPieces)
  }, [pieceCount])

  useEffect(() => {
    if (active) {
      generateConfetti()
      setIsVisible(true)

      const timer = setTimeout(() => {
        setIsVisible(false)
        setPieces([])
        onComplete?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [active, duration, generateConfetti, onComplete])

  if (!isVisible || pieces.length === 0) return null

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden pointer-events-none z-50",
        className
      )}
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  )
}

// ================================================
// Heart Pop Effect (For wishlist, etc.)
// ================================================

interface HeartPopEffectProps {
  active: boolean
  x?: number
  y?: number
  onComplete?: () => void
}

export function HeartPopEffect({
  active,
  x = 50,
  y = 50,
  onComplete,
}: HeartPopEffectProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [active, onComplete])

  if (!isVisible) return null

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden="true"
    >
      {/* Main Heart */}
      <span className="text-4xl animate-heart-pop">❤️</span>

      {/* Smaller hearts radiating */}
      {[...Array(6)].map((_, i) => (
        <span
          key={i}
          className="absolute text-lg animate-heart-radiate"
          style={{
            transform: `rotate(${i * 60}deg) translateY(-20px)`,
            animationDelay: `${i * 0.05}s`,
          }}
        >
          💕
        </span>
      ))}
    </div>
  )
}

// ================================================
// Success Checkmark Animation
// ================================================

interface SuccessCheckProps {
  active: boolean
  size?: number
}

export function SuccessCheck({ active, size = 80 }: SuccessCheckProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (active) {
      setIsVisible(true)
    }
  }, [active])

  if (!isVisible) return null

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Circle */}
      <svg
        className="absolute animate-draw-circle"
        viewBox="0 0 100 100"
        style={{ width: size, height: size }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--success)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="283"
          strokeDashoffset="283"
          style={{
            animation: "draw-circle 0.6s ease-out forwards",
          }}
        />
      </svg>

      {/* Checkmark */}
      <svg
        className="absolute"
        viewBox="0 0 100 100"
        style={{ width: size * 0.5, height: size * 0.5 }}
      >
        <path
          d="M25 50 L45 70 L75 30"
          fill="none"
          stroke="var(--success)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="100"
          strokeDashoffset="100"
          style={{
            animation: "draw-check 0.4s ease-out 0.6s forwards",
          }}
        />
      </svg>
    </div>
  )
}
