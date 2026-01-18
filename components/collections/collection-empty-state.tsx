"use client"

import { Search } from "lucide-react"

export function CollectionEmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-display text-[var(--text-primary)] font-semibold mb-2" style={{ fontSize: "20px" }}>
        Không tìm thấy sản phẩm
      </h3>
      <p className="font-body text-[var(--text-secondary)]" style={{ fontSize: "16px" }}>
        Thử chọn danh mục khác hoặc liên hệ với chúng tôi để được tư vấn.
      </p>
    </div>
  )
}