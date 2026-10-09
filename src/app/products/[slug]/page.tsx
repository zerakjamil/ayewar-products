import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Smartphone,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneCarousel from "@/components/PhoneCarousel";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.nameKu} | ئەیوار`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const productIndex = products.findIndex((p) => p.slug === slug);
  if (productIndex === -1) notFound();

  const product = products[productIndex];
  const prevProduct = products[(productIndex - 1 + products.length) % products.length];
  const nextProduct = products[(productIndex + 1) % products.length];

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="pt-24 sm:pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-medium">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
            سەرەتا
          </Link>
          <ChevronLeft size={14} className="opacity-40" />
          <Link href="/products" className="hover:text-[var(--color-text)] transition-colors">
            بەرهەمەکان
          </Link>
          <ChevronLeft size={14} className="opacity-40" />
          <span className="text-[var(--color-text)] font-semibold truncate">{product.nameKu}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="py-10 sm:py-16 md:py-20 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl flex-shrink-0">
                  <Image
                    src={product.icon}
                    alt={product.nameKu}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs text-[var(--color-accent)] font-semibold">
                      {product.category}
                    </span>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${product.mockupColor}50`,
                        color: product.mockupColor,
                        backgroundColor: `${product.mockupColor}10`,
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
                    {product.nameKu}
                  </h1>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-mono mt-1">
                    {product.name}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-[var(--color-text-muted)] text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed text-justify">
              {product.fullDescription}
            </p>

            {/* Architecture / Tech Stack pills */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[var(--color-text-muted)] ml-2">
                تەلارسازی و بزوێنەرەکان:
              </span>
              {product.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-3 py-1 rounded-md bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Key Metrics */}
            {product.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {product.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                  >
                    <div
                      className="text-xl sm:text-2xl font-bold font-mono"
                      style={{ color: product.mockupColor }}
                    >
                      {m.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Main Interactive Showcase (Phone Carousel) */}
      <section className="py-16 sm:py-24 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-semibold px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-accent)] inline-block mb-3">
              ڕوونمای مۆبایل
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-snug">
              نموونەی ڕووکاری ئەپڵیکەیشن
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2">
              تەواوی ڕووکارەکان لەسەر ئامێری ڕاستەقینە دیزاین و گەشەپێدراون
            </p>
          </AnimatedSection>

          <AnimatedSection>
            {product.mockups.length > 0 ? (
              <PhoneCarousel mockups={product.mockups} accentColor={product.mockupColor} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <Image
                  src={product.icon}
                  alt={product.nameKu}
                  width={80}
                  height={80}
                  className="rounded-2xl opacity-20"
                />
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 sm:py-20 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-10 text-center sm:text-right">
            <span className="text-xs font-semibold text-[var(--color-accent)]">تایبەتمەندییەکان</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mt-1">
              تایبەتمەندییە سەرەکییەکان
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {product.features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 h-full flex flex-col justify-between hover:border-[var(--color-border-hover)] transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center mb-4 text-[var(--color-text)]">
                      <CheckCircle2 size={18} style={{ color: product.mockupColor }} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[var(--color-text)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Deliverables */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-10 text-center sm:text-right">
            <span className="text-xs font-semibold text-[var(--color-accent)]">بواری کارکردن</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mt-1">
              خزمەتگوزاری و ئەندازیاری دابینکراو
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {product.services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-3 text-[var(--color-text-muted)]">
                    <Layers size={16} />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-[var(--color-text)]">
                    {service}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Next / Previous Project Navigation */}
      <section className="py-12 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/products/${prevProduct.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-colors w-full sm:w-auto"
            >
              <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              <div className="text-right">
                <span className="text-[10px] text-[var(--color-text-muted)] block">پڕۆژەی پێشوو</span>
                <span className="text-xs font-bold text-[var(--color-text)]">
                  {prevProduct.nameKu}
                </span>
              </div>
            </Link>

            <Link
              href="/products"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              هەموو پڕۆژەکان
            </Link>

            <Link
              href={`/products/${nextProduct.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-colors w-full sm:w-auto justify-end"
            >
              <div className="text-left">
                <span className="text-[10px] text-[var(--color-text-muted)] block">پڕۆژەی دواتر</span>
                <span className="text-xs font-bold text-[var(--color-text)]">
                  {nextProduct.nameKu}
                </span>
              </div>
              <ArrowLeft size={16} className="text-[var(--color-text-muted)]" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
