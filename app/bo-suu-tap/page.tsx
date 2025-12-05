import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { products, categories, occasions } from "@/lib/products"
import { CollectionFilters } from "@/components/collection-filters"

export const metadata: Metadata = {
  title: "Bộ Sưu Tập Hoa Tươi | Hoa Tươi Đà Nẵng",
  description: "Khám phá bộ sưu tập hoa tươi đẹp nhất tại Đà Nẵng. Hoa sinh nhật, hoa cưới, hoa Tết, hoa khai trương và nhiều loại hoa khác.",
}

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; occasion?: string }>
}) {
  const params = await searchParams
  const selectedCategory = params.category || "all"
  const selectedOccasion = params.occasion || "all"

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category === selectedCategory
    const occasionMatch = selectedOccasion === "all" || product.occasion.includes(selectedOccasion)
    return categoryMatch && occasionMatch
  })

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        {/* Page Header */}
        <section className="bg-secondary/30 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <p className="text-primary text-sm tracking-[0.3em] uppercase mb-3">Khám phá</p>
            <h1 className="text-3xl lg:text-5xl font-semibold text-foreground mb-4">Bộ Sưu Tập Hoa</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Khám phá những mẫu hoa tươi đẹp nhất, được thiết kế tinh tế cho mọi dịp
            </p>
          </div>
        </section>

        {/* Filters & Products */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Filters */}
            <CollectionFilters
              categories={categories}
              occasions={occasions}
              selectedCategory={selectedCategory}
              selectedOccasion={selectedOccasion}
            />

            {/* Results count */}
            <p className="text-muted-foreground mb-6">Hiển thị {filteredProducts.length} sản phẩm</p>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  slug={product.slug}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Không tìm thấy sản phẩm phù hợp. Vui lòng thử bộ lọc khác.</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
