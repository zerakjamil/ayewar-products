"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Layers,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Product, getProductContent } from "@/data/products";
import AnimatedSection from "@/components/AnimatedSection";
import PhoneCarousel from "@/components/PhoneCarousel";
import { useLanguage } from "@/i18n/context";

interface ProductDetailViewProps {
  product: Product;
  prevProduct: Product;
  nextProduct: Product;
}

export default function ProductDetailView({
  product,
  prevProduct,
  nextProduct,
}: ProductDetailViewProps) {
  const { t, locale, dir } = useLanguage();
  const content = getProductContent(product, locale);
  const prevContent = getProductContent(prevProduct, locale);
  const nextContent = getProductContent(nextProduct, locale);

  const BreadcrumbChevron = dir === "ltr" ? ChevronRight : ChevronLeft;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="pt-24 sm:pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-medium">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
            {t.detail.breadcrumbHome}
          </Link>
          <BreadcrumbChevron size={14} className="opacity-40" />
          <Link href="/products" className="hover:text-[var(--color-text)] transition-colors">
            {t.detail.breadcrumbProducts}
          </Link>
          <BreadcrumbChevron size={14} className="opacity-40" />
          <span className="text-[var(--color-text)] font-semibold truncate">{content.name}</span>
        </nav>
      </div>

      {/* Product Hero */}
      <section className="py-8 sm:py-12 md:py-16 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] flex-shrink-0 shadow-lg">
                  <Image
                    src={product.icon}
                    alt={content.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-text-muted)]">
                      {content.category}
                    </span>
                    <span
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                      style={{
                        borderColor: `${product.mockupColor}50`,
                        color: product.mockupColor,
                        backgroundColor: `${product.mockupColor}10`,
                      }}
                    >
                      {content.badge}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
                    {content.name}
                  </h1>
                  {content.nameSub && (
                    <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-mono mt-1">
                      {content.nameSub}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-[var(--color-text-muted)] text-base sm:text-lg md:text-xl max-w-4xl leading-relaxed text-start">
              {content.fullDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Interactive Showcase (Phone Carousel) */}
      <section className="py-16 sm:py-24 border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12">
            <span className="text-xs font-semibold px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-[var(--color-accent)] inline-block mb-3">
              {t.detail.mobileShowcase}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-snug">
              {content.name}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-2">
              {t.detail.mobileSubtitle}
            </p>
          </AnimatedSection>

          <AnimatedSection>
            {product.mockups.length > 0 ? (
              <PhoneCarousel mockups={product.mockups} accentColor={product.mockupColor} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <Image
                  src={product.icon}
                  alt={content.name}
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
          <AnimatedSection className="mb-10 text-center sm:text-start">
            <span className="text-xs font-semibold text-[var(--color-accent)]">
              {t.detail.featuresBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mt-1">
              {t.detail.featuresTitle}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {content.features.map((feature, i) => (
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
          <AnimatedSection className="mb-10 text-center sm:text-start">
            <span className="text-xs font-semibold text-[var(--color-accent)]">
              {t.detail.servicesBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] mt-1">
              {t.detail.servicesTitle}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {content.services.map((service, i) => (
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
              {dir === "ltr" ? (
                <ArrowLeft size={16} className="text-[var(--color-text-muted)]" />
              ) : (
                <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              )}
              <div className="text-start">
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  {t.detail.prevProject}
                </span>
                <span className="text-xs font-bold text-[var(--color-text)]">
                  {prevContent.name}
                </span>
              </div>
            </Link>

            <Link
              href="/products"
              className="text-xs font-semibold px-4 py-2 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {t.detail.allProjects}
            </Link>

            <Link
              href={`/products/${nextProduct.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-colors w-full sm:w-auto justify-end"
            >
              <div className="text-end">
                <span className="text-[10px] text-[var(--color-text-muted)] block">
                  {t.detail.nextProject}
                </span>
                <span className="text-xs font-bold text-[var(--color-text)]">
                  {nextContent.name}
                </span>
              </div>
              {dir === "ltr" ? (
                <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              ) : (
                <ArrowLeft size={16} className="text-[var(--color-text-muted)]" />
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
