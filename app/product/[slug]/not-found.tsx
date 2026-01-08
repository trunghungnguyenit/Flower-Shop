import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { HeaderSection } from "@/components/header"
import { FooterSection } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-[1240px] px-4 lg:px-8">
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-[var(--background-muted)] rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-[var(--text-muted)]" strokeWidth={1} />
            </div>
            
            <h1 className="font-display text-3xl font-semibold text-[var(--text-primary)] mb-4">
              Không tìm thấy sản phẩm
            </h1>
            
            <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được gỡ bỏ. 
              Hãy khám phá các sản phẩm khác trong bộ sưu tập của chúng tôi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/collection">
                  Xem bộ sưu tập
                </Link>
              </Button>
              
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
                  Về trang chủ
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  )
}