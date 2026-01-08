"use client"

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

// ================================================
// Form Input
// ================================================

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, label, error, icon, iconPosition = "left", type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            className="block font-body text-[var(--text-primary)] mb-2"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {label}
            {props.required && <span className="text-[var(--danger)] ml-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Icon Left */}
          {icon && iconPosition === "left" && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={type}
            className={cn(
              "w-full h-12 px-4 font-body bg-white text-[var(--text-primary)]",
              "border-[1.5px] border-[var(--border-soft)]",
              "transition-all duration-300",
              "placeholder:text-[var(--text-muted)]",
              "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
              "hover:border-[var(--border-medium)]",
              "disabled:bg-[var(--background-muted)] disabled:cursor-not-allowed",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/20",
              icon && iconPosition === "left" && "pl-12",
              icon && iconPosition === "right" && "pr-12",
              className
            )}
            style={{
              borderRadius: "var(--radius-medium)",
              fontSize: "15px",
            }}
            {...props}
          />

          {/* Icon Right */}
          {icon && iconPosition === "right" && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
              {icon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p
            className="mt-2 font-body text-[var(--danger)]"
            style={{ fontSize: "13px" }}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormInput.displayName = "FormInput"

// ================================================
// Form Textarea
// ================================================

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            className="block font-body text-[var(--text-primary)] mb-2"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {label}
            {props.required && <span className="text-[var(--danger)] ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          className={cn(
            "w-full min-h-[120px] px-4 py-3 font-body bg-white text-[var(--text-primary)]",
            "border-[1.5px] border-[var(--border-soft)]",
            "transition-all duration-300 resize-y",
            "placeholder:text-[var(--text-muted)]",
            "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
            "hover:border-[var(--border-medium)]",
            "disabled:bg-[var(--background-muted)] disabled:cursor-not-allowed",
            error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/20",
            className
          )}
          style={{
            borderRadius: "var(--radius-medium)",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
          {...props}
        />

        {/* Error Message */}
        {error && (
          <p
            className="mt-2 font-body text-[var(--danger)]"
            style={{ fontSize: "13px" }}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormTextarea.displayName = "FormTextarea"

// ================================================
// Form Select
// ================================================

interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, label, error, options, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            className="block font-body text-[var(--text-primary)] mb-2"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {label}
            {props.required && <span className="text-[var(--danger)] ml-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-12 px-4 pr-12 font-body bg-white text-[var(--text-primary)] appearance-none cursor-pointer",
              "border-[1.5px] border-[var(--border-soft)]",
              "transition-all duration-300",
              "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
              "hover:border-[var(--border-medium)]",
              "disabled:bg-[var(--background-muted)] disabled:cursor-not-allowed",
              error && "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/20",
              !props.value && "text-[var(--text-muted)]",
              className
            )}
            style={{
              borderRadius: "var(--radius-medium)",
              fontSize: "15px",
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon */}
          <ChevronDown
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] pointer-events-none"
            strokeWidth={1.5}
          />
        </div>

        {/* Error Message */}
        {error && (
          <p
            className="mt-2 font-body text-[var(--danger)]"
            style={{ fontSize: "13px" }}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

FormSelect.displayName = "FormSelect"

// ================================================
// Form Checkbox
// ================================================

interface FormCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 border-[1.5px] border-[var(--border-soft)] bg-white transition-all duration-200",
              "peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)]",
              "peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20",
              "group-hover:border-[var(--primary)]"
            )}
            style={{ borderRadius: "4px" }}
          />
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span
          className="font-body text-[var(--text-primary)]"
          style={{ fontSize: "14px" }}
        >
          {label}
        </span>
      </label>
    )
  }
)

FormCheckbox.displayName = "FormCheckbox"

// ================================================
// Form Radio
// ================================================

interface FormRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string
}

export const FormRadio = forwardRef<HTMLInputElement, FormRadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "w-5 h-5 rounded-full border-[1.5px] border-[var(--border-soft)] bg-white transition-all duration-200",
              "peer-checked:border-[var(--primary)]",
              "peer-focus:ring-2 peer-focus:ring-[var(--primary)]/20",
              "group-hover:border-[var(--primary)]"
            )}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[var(--primary)] scale-0 peer-checked:scale-100 transition-transform duration-200"
          />
        </div>
        <span
          className="font-body text-[var(--text-primary)]"
          style={{ fontSize: "14px" }}
        >
          {label}
        </span>
      </label>
    )
  }
)

FormRadio.displayName = "FormRadio"
