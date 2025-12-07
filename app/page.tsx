import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSlider } from "@/components/hero-slider"
import { FeaturedProducts } from "@/components/featured-products"
import { OccasionCategories } from "@/components/occasion-categories"
import { FreeshipPromo } from "@/components/freeship-promo"
import { AboutSection } from "@/components/about-section"
import { CustomerReviews } from "@/components/customer-reviews"
import { ContactForm } from "@/components/contact-form"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-[73px]">
        <HeroSlider />
        <FeaturedProducts />
        <OccasionCategories />
        <FreeshipPromo />
        <AboutSection />
        <CustomerReviews />
        <ContactForm />
      </div>
      <Footer />
    </main>
  )
}
