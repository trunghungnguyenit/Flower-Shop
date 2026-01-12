import Link from "next/link"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FirebaseApi, getFirstImage, formatImageUrl, formatPrice } from "@/api/firebase"
import { ProductDetailClient } from "@/components/product-detail-client"
import type { SanPham } from "@/api/api.type"

export async function generateStaticParams() {
  try {
    const res = await FirebaseApi.getSanPham()
    if (res.ok && Array.isArray(res.data)) {
      return res.data
        .filter((product: SanPham) => product.slug)
        .map((product: SanPham) => ({
          slug: product.slug!,
        }))
    }
  } catch (error) {
    console.error("Error generating static params:", error)
  }
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const res = await FirebaseApi.getSanPhamBySlug(slug)
    if (res.ok && res.data) {
      const product = res.data as SanPham
      const price = formatPrice(product.Gia)
      const firstImage = formatImageUrl(getFirstImage(product.image))
      
      return {
        title: `${product.TenHoa} | Hoa Tươi Đà Nẵng`,
        description: product.MoTa || `${product.TenHoa} - Hoa tươi chất lượng cao tại Đà Nẵng`,
        openGraph: {
          title: product.TenHoa,
          description: product.MoTa || `${product.TenHoa} - Hoa tươi chất lượng cao tại Đà Nẵng`,
          images: firstImage ? [firstImage] : [],
        },
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
  }

  return {
    title: "Không tìm thấy sản phẩm | Hoa Tươi Đà Nẵng",
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  try {
    const res = await FirebaseApi.getSanPhamBySlug(slug)
    
    if (!res.ok || !res.data) {
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

    const product = res.data as SanPham

    // Lấy sản phẩm liên quan (cùng loại hoa)
    const allProductsRes = await FirebaseApi.getSanPham()
    const relatedProducts = allProductsRes.ok && Array.isArray(allProductsRes.data) 
      ? allProductsRes.data
          .filter((p: SanPham) => p.loai_hoa === product.loai_hoa && p.id !== product.id)
          .slice(0, 4)
      : []



    // Pass SanPham objects directly to ProductDetailClient
    const productForClient = product
    const relatedProductsForClient = relatedProducts

    return (
      <main className="min-h-screen">
        <Header />
        <ProductDetailClient product={productForClient} relatedProducts={relatedProductsForClient} />
        <Footer />
      </main>
    )
  } catch (error) {
    console.error("Error loading product:", error)
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-[73px] py-24 text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Lỗi khi tải sản phẩm</h1>
          <Link href="/bo-suu-tap" className="text-primary hover:underline">
            Quay lại bộ sưu tập
          </Link>
        </div>
        <Footer />
      </main>
    )
  }
}
