"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function OrderInfoError() {
  return (
    <main className="pt-24 pb-16">
      <div className="mx-auto max-w-[800px] px-4 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Không tìm thấy thông tin đơn hàng
        </h1>
        <p className="text-gray-600 mb-6">
          Vui lòng thử đặt hàng lại hoặc liên hệ với chúng tôi để được hỗ trợ.
        </p>
        <Link href="/">
          <Button>Về trang chủ</Button>
        </Link>
      </div>
    </main>
  )
}