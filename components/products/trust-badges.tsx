"use client"

import { Truck, Shield, Clock } from "lucide-react"

export function TrustBadges() {
  const badges = [
    { icon: Truck, text: "Giao hàng nhanh" },
    { icon: Shield, text: "Hoa tươi 100%" },
    { icon: Clock, text: "Hỗ trợ 24/7" }
  ]

  return (
    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-soft)]">
      {badges.map((badge, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mb-2">
            <badge.icon className="w-6 h-6 text-[var(--primary)]" strokeWidth={1.5} />
          </div>
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {badge.text}
          </span>
        </div>
      ))}
    </div>
  )
}