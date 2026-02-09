import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "بەرهەمەکان | ئەیوار",
  description: "بەرهەمە داهێنەرانەکانی ئەیوار بۆ کوردستان",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="text-[var(--color-accent)] text-xs sm:text-sm font-medium">
              بەرهەمەکانمان
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 mb-5 sm:mb-6 text-[var(--color-text)] leading-tight">
              بەرهەمە داهێنەرانەکانی ئەیوار
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
              کۆمەڵەیەک بەرهەمی پێشکەوتوو کە دروستکراون بۆ دابینکردنی پێداویستیی جۆراوجۆری بەکارهێنەران لە دونیای دیجیتاڵی ئەمڕۆ.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.slug} delay={i * 0.1}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--color-accent)]/10 touch-manipulation"
                >
                  {/* Product Header */}
                  <div className="p-5 sm:p-8 pb-4 sm:pb-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <Image
                          src={product.icon}
                          alt={product.nameKu}
                          width={64}
                          height={64}
                          className="rounded-xl w-14 h-14 sm:w-16 sm:h-16"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-[var(--color-accent)] font-medium">
                          {product.category}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-text)] mt-1 mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-tight">
                          {product.nameKu}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="px-5 sm:px-8 pb-5 sm:pb-8">
                    <div className="flex flex-wrap gap-2">
                      {product.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 sm:px-3 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.technologies.length > 4 && (
                        <span className="px-2.5 sm:px-3 py-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-muted)]">
                          +{product.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preview Image - if available */}
                  {product.mockups.length > 0 && (
                    <div className="relative h-48 sm:h-56 md:h-64 bg-[var(--color-bg-secondary)] overflow-hidden">
                      <Image
                        src={product.mockups[0]}
                        alt={product.nameKu}
                        fill
                        className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
                    </div>
                  )}
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
