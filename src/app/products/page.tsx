import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Layers } from "lucide-react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata = {
  title: "بەرهەمەکان | ئەیوار",
  description: "بەرهەمە داهێنەرانە و پلاتفۆرمە مۆبایلەکانی ئەیوار بۆ کوردستان",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-accent)] inline-block mb-4">
              ئیکۆسیستەمی تەکنەلۆجی
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--color-text)] leading-snug">
              بەرهەم و پلاتفۆرمە مۆبایلەکان
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mt-4 px-2">
              تەواوی بەرهەمەکان لەسەر بنەمای تەکنەلۆژیای سەردەم و ڕووکاری پێشکەوتوو بەرهەم هێنراون، و لەسەر ئاستی بەرهەمهێنان (Production) لە کوردستان کاردەکەن.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.slug} delay={i * 0.08}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex flex-col justify-between h-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 hover:shadow-xl shadow-md"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex-shrink-0">
                        <Image
                          src={product.icon}
                          alt={product.nameKu}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: `${product.mockupColor}40`,
                          color: product.mockupColor,
                          backgroundColor: `${product.mockupColor}10`,
                        }}
                      >
                        {product.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="mb-3">
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {product.category}
                      </span>
                      <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mt-0.5 leading-snug">
                        {product.nameKu}
                      </h3>
                      <p className="text-xs text-[var(--color-text-muted)] font-mono">
                        {product.name}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-3 mb-4">
                      {product.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] font-mono">
                          +{product.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Preview Image */}
                  {product.mockups.length > 0 && (
                    <div className="relative h-48 sm:h-52 bg-[var(--color-bg-secondary)] overflow-hidden border-t border-[var(--color-border)]">
                      <Image
                        src={product.mockups[0]}
                        alt={product.nameKu}
                        fill
                        className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[var(--color-text)]">
                        <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
                          {product.mockups.length} ڕوونمای HD
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-[-3px] transition-transform">
                          <span>زیاتر ببینە</span>
                          <ArrowLeft size={13} />
                        </span>
                      </div>
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
