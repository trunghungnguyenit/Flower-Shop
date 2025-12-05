import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getProductBySlug, products } from "@/lib/products"
import { ProductDetailClient } from "@/components/product-detail-client"

const additionalServices = [
  { id: "card", name: "Thiệp chúc mừng", price: "20.000đ" },
  { id: "premium-wrap", name: "Giấy gói cao cấp", price: "50.000đ" },
  { id: "express", name: "Giao hàng siêu tốc (1h)", price: "30.000đ" },
]

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

// Generate metadata for each product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm | Hoa Tươi Đà Nẵng",
    }
  }

  return {
    title: `${product.name} - ${product.price} | Hoa Tươi Đà Nẵng`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-[73px] py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Không tìm thấy sản phẩm</h1>
          <Link href="/bo-suu-tap" className="text-primary hover:underline">
            Quay lại bộ sưu tập
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <main className="min-h-screen">
      <Header />
      <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      <Footer />
    </main>
  )
}
