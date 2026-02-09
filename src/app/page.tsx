import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Products */}
      <section className="py-16 sm:py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 md:space-y-24">
          {products.map((product, index) => (
            <ProductCard
              key={product.slug}
              category={product.category}
              name={product.name}
              nameKu={product.nameKu}
              description={product.description}
              slug={product.slug}
              icon={product.icon}
              mockups={product.mockups}
              index={index}
            />
          ))}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
