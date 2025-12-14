"use client"

import { useRef, useEffect } from "react"

// ================================================================
// PREMIUM BACKGROUND ANIMATIONS
// ================================================================

// Layer 1: Soft Gradient Motion - Cloud Drift Effect
export function SoftGradientMotion() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Gradient Blob 1 */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.12]"
        style={{
          background: "radial-gradient(circle, #F6DCE8 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          left: "-10%",
          animation: "gradientDrift1 30s ease-in-out infinite",
        }}
      />
      {/* Gradient Blob 2 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #FDF1E8 0%, transparent 70%)",
          filter: "blur(70px)",
          top: "30%",
          right: "-15%",
          animation: "gradientDrift2 35s ease-in-out infinite",
        }}
      />
      {/* Gradient Blob 3 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #F7D88A 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "10%",
          left: "20%",
          animation: "gradientDrift3 40s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes gradientDrift1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 30px) scale(1.05); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes gradientDrift2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -30px) scale(1.1); }
        }
        @keyframes gradientDrift3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -20px) scale(1.05); }
          75% { transform: translate(-20px, 30px) scale(0.95); }
        }
      `}</style>
    </div>
  )
}

// Layer 2: Premium Floating Petals with Canvas
export function PremiumFloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let isActive = true

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Petal colors - pastel palette
    const petalColors = [
      "rgba(231, 166, 177, 0.12)", // #E7A6B1
      "rgba(242, 193, 206, 0.10)", // #F2C1CE
      "rgba(247, 216, 138, 0.08)", // #F7D88A
      "rgba(217, 124, 138, 0.10)", // #D97C8A
    ]

    // Create petals
    interface Petal {
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      rotation: number
      rotationSpeed: number
      color: string
      swayAmplitude: number
      swaySpeed: number
      phase: number
    }

    const petals: Petal[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 15 + Math.random() * 20,
      speedY: 0.3 + Math.random() * 0.5,
      speedX: 0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayAmplitude: 30 + Math.random() * 40,
      swaySpeed: 0.01 + Math.random() * 0.015,
      phase: Math.random() * Math.PI * 2,
    }))

    // Draw petal shape
    const drawPetal = (petal: Petal) => {
      ctx.save()
      ctx.translate(petal.x, petal.y)
      ctx.rotate(petal.rotation)
      ctx.globalAlpha = 1

      // Petal shape - heart-like
      ctx.beginPath()
      ctx.moveTo(0, -petal.size / 2)
      ctx.bezierCurveTo(
        petal.size / 2, -petal.size / 2,
        petal.size / 2, petal.size / 4,
        0, petal.size / 2
      )
      ctx.bezierCurveTo(
        -petal.size / 2, petal.size / 4,
        -petal.size / 2, -petal.size / 2,
        0, -petal.size / 2
      )
      ctx.closePath()

      ctx.fillStyle = petal.color
      ctx.fill()

      // Add soft blur effect
      ctx.shadowColor = petal.color
      ctx.shadowBlur = 8
      ctx.fill()

      ctx.restore()
    }

    // Animation loop
    let time = 0
    const animate = () => {
      if (!isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      petals.forEach((petal) => {
        // Sway movement
        petal.speedX = Math.sin(time * petal.swaySpeed + petal.phase) * petal.swayAmplitude * 0.01
        petal.x += petal.speedX
        petal.y += petal.speedY
        petal.rotation += petal.rotationSpeed

        // Reset when off screen
        if (petal.y > canvas.height + petal.size) {
          petal.y = -petal.size * 2
          petal.x = Math.random() * canvas.width
        }

        drawPetal(petal)
      })

      animationId = requestAnimationFrame(animate)
    }

    // Visibility change handler - pause when tab not active
    const handleVisibility = () => {
      isActive = !document.hidden
      if (isActive) animate()
    }

    document.addEventListener("visibilitychange", handleVisibility)
    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.8 }}
    />
  )
}

// Layer 3: Soft Light Leaks
export function SoftLightLeaks() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[3]">
      {/* Light Leak 1 */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, #F7D88A 0%, transparent 60%)",
          filter: "blur(40px)",
          top: "20%",
          right: "10%",
          animation: "lightLeak1 50s ease-in-out infinite",
        }}
      />
      {/* Light Leak 2 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, #E8A4AF 0%, transparent 60%)",
          filter: "blur(50px)",
          bottom: "30%",
          left: "5%",
          animation: "lightLeak2 60s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes lightLeak1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.10; }
          50% { transform: translate(-20px, 30px); opacity: 0.12; }
        }
        @keyframes lightLeak2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.08; }
          50% { transform: translate(30px, -20px); opacity: 0.10; }
        }
      `}</style>
    </div>
  )
}

// Particle Glow Effect for Best Seller Section
export function ParticleGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let isActive = true

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()
    window.addEventListener("resize", resize)

    // Particles
    interface Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
      targetAlpha: number
    }

    const particles: Particle[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 1 + Math.random() * 1.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      color: Math.random() > 0.5 ? "#FFFFFF" : "#F7D88A",
      alpha: 0.1 + Math.random() * 0.1,
      targetAlpha: 0.1 + Math.random() * 0.15,
    }))

    const animate = () => {
      if (!isActive) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Twinkle effect
        p.alpha += (p.targetAlpha - p.alpha) * 0.02
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = 0.08 + Math.random() * 0.12
        }

        // Draw particle with glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.shadowColor = p.color
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.globalAlpha = 1
      })

      animationId = requestAnimationFrame(animate)
    }

    const handleVisibility = () => {
      isActive = !document.hidden
      if (isActive) animate()
    }

    document.addEventListener("visibilitychange", handleVisibility)
    animate()

    return () => {
      isActive = false
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", handleVisibility)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

// Soft Spotlight Motion for Story Section
export function SoftSpotlight() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.16]"
        style={{
          background: "radial-gradient(circle, #F6DCE8 0%, transparent 60%)",
          filter: "blur(60px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "spotlightPulse 8s ease-in-out infinite",
          mixBlendMode: "soft-light",
        }}
      />
      <style jsx>{`
        @keyframes spotlightPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.16; }
          50% { transform: translate(-45%, -55%) scale(1.1); opacity: 0.20; }
        }
      `}</style>
    </div>
  )
}

// Gradient Drift for Decor & Gift Sections
export function GradientDrift({ variant = "decor" }: { variant?: "decor" | "gift" }) {
  const colors = variant === "decor"
    ? { c1: "#F6DCE8", c2: "#E8A4AF" }
    : { c1: "#FDF1E8", c2: "#F7D88A" }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute w-full h-full opacity-[0.12]"
        style={{
          background: `linear-gradient(135deg, ${colors.c1} 0%, transparent 50%, ${colors.c2} 100%)`,
          filter: "blur(80px)",
          animation: "driftGradient 80s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[60%] h-[60%] rounded-full opacity-[0.08]"
        style={{
          background: `radial-gradient(circle, ${colors.c2} 0%, transparent 70%)`,
          filter: "blur(60px)",
          bottom: "-10%",
          right: "-10%",
          animation: "driftGradient2 100s ease-in-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes driftGradient {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -10px) rotate(2deg); }
        }
        @keyframes driftGradient2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.1); }
        }
      `}</style>
    </div>
  )
}