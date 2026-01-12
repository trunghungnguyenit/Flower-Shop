"use client"

import { forwardRef, ButtonHTMLAttributes, useState, useRef } from "react"
import { cn } from "@/lib/utils"

// ================================================
// Button Variants
// ================================================

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "secondary"
  size?: "sm" | "md" | "lg" | "xl"
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      children,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return

      // Ripple effect
      const button = buttonRef.current
      if (button) {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const id = Date.now()

        setRipples((prev) => [...prev, { x, y, id }])
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id))
        }, 600)
      }

      onClick?.(e)
    }

    const baseStyles = `
      relative overflow-hidden
      inline-flex items-center justify-center gap-2
      font-body font-medium
      transition-all duration-300
      disabled:opacity-50 disabled:cursor-not-allowed
      focus:outline-none focus:ring-2 focus:ring-offset-2
    `

    const variantStyles = {
      primary: `
        bg-[var(--primary)] text-black
        hover:bg-[var(--primary-dark)] hover:scale-[1.03]
        focus:ring-[var(--primary)]/50
        shadow-[0_4px_16px_rgba(217,124,138,0.3)]
        hover:shadow-[0_8px_24px_rgba(217,124,138,0.4)]
      `,
      outline: `
        bg-transparent text-[var(--primary)]
        border-[1.5px] border-[var(--primary)]
        hover:bg-[var(--primary)] hover:text-black hover:scale-[1.03]
        focus:ring-[var(--primary)]/50
      `,
      ghost: `
        bg-transparent text-[var(--text-primary)]
        hover:bg-[var(--background-muted)] hover:text-[var(--primary)]
        focus:ring-[var(--primary)]/30
      `,
      secondary: `
        bg-[var(--accent-gold)] text-[var(--text-primary)]
        hover:bg-[var(--accent-gold)]/90 hover:scale-[1.03]
        focus:ring-[var(--accent-gold)]/50
        shadow-[0_4px_16px_rgba(247,216,138,0.3)]
      `,
    }

    const sizeStyles = {
      sm: "h-9 px-4 text-sm rounded-[var(--radius-soft)]",
      md: "h-11 px-6 text-[15px] rounded-[var(--radius-medium)]",
      lg: "h-[52px] px-8 text-base rounded-[var(--radius-medium)]",
      xl: "h-[60px] px-10 text-lg rounded-[var(--radius-large)]",
    }

    return (
      <button
        ref={(node) => {
          // Handle both refs
          ;(buttonRef as any).current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {/* Ripple Effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ripple pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        {/* Loading Spinner */}
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon Left */}
        {icon && iconPosition === "left" && !loading && (
          <span className="flex-shrink-0">{icon}</span>
        )}

        {/* Children */}
        {children}

        {/* Icon Right */}
        {icon && iconPosition === "right" && !loading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </button>
    )
  }
)

Button.displayName = "Button"

// ================================================
// Icon Button
// ================================================

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      rounded-full transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-2
    `

    const variantStyles = {
      primary: `
        bg-[var(--primary)] text-black
        hover:bg-[var(--primary-dark)] hover:scale-110
        focus:ring-[var(--primary)]/50
      `,
      outline: `
        bg-transparent text-[var(--primary)]
        border-[1.5px] border-[var(--primary)]
        hover:bg-[var(--primary)] hover:text-black hover:scale-110
        focus:ring-[var(--primary)]/50
      `,
      ghost: `
        bg-transparent text-[var(--text-secondary)]
        hover:bg-[var(--background-muted)] hover:text-[var(--primary)] hover:scale-110
        focus:ring-[var(--primary)]/30
      `,
    }

    const sizeStyles = {
      sm: "w-8 h-8",
      md: "w-10 h-10",
      lg: "w-12 h-12",
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"
