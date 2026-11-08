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
      <div className="site-container detail-breadcrumb">
        <nav aria-label={t.detail.breadcrumbProducts} className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-medium">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
            {t.detail.breadcrumbHome}
          </Link>
          <BreadcrumbChevron size={14} className="opacity-40" />
          <Link href="/products" className="hover:text-[var(--color-text)] transition-colors">
            {t.detail.breadcrumbProducts}
          </Link>
          <BreadcrumbChevron size={14} className="opacity-40" />
          <span aria-current="page" className="text-[var(--color-text)] font-semibold truncate">{content.name}</span>
        </nav>
      </div>
      <section className="detail-intro">
        <div className="site-container">
          <AnimatedSection>
            <div className="detail-title-row">
              <div className="detail-identity">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] flex-shrink-0">
                  <Image
                    src={product.icon}
                    alt={content.name}
                    width={80}
                    height={80}
                    className={`object-cover w-full h-full ${product.slug === "raiders" || product.slug === "passengers" ? "transit-icon" : ""}`}
                    priority
                  />
                </div>

                <div>
                  <h1 className="page-title">
                    {content.name}
                  </h1>
                </div>
              </div>
            </div>

            <p className="page-copy">
              {content.fullDescription}
            </p>
          </AnimatedSection>
        </div>
      </section>
      <section className="detail-section border-b border-[var(--color-border)]">
        <div className="site-container">
          <AnimatedSection>
            {product.mockups.length > 0 ? (
              <PhoneCarousel
                mockups={product.mockups}
                appName={content.name}
              />
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
      <section className="detail-section border-b border-[var(--color-border)]">
        <div className="site-container">
          <AnimatedSection className="mb-8 text-start">
            <h2 className="text-2xl font-medium text-[var(--color-text)]">
              {t.detail.featuresTitle}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {content.features.map((feature, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 h-full flex flex-col justify-between hover:border-[var(--color-border-hover)] transition-colors">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center mb-4 text-[var(--color-text)]">
                      <CheckCircle2 size={18} />
                    </div>
                    <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {content.services.length > 0 && <section className="detail-section">
        <div className="site-container">
          <AnimatedSection className="mb-8 text-start">
            <h2 className="text-2xl font-medium text-[var(--color-text)]">
              {t.detail.servicesTitle}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {content.services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.03}>
                <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center mx-auto mb-3 text-[var(--color-text-muted)]">
                    <Layers size={16} />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)]">
                    {service}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>}
      <section className="py-12 border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]/40">
        <div className="site-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/products/${prevProduct.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-colors w-full sm:w-auto min-w-0"
            >
              {dir === "ltr" ? (
                <ArrowLeft size={16} className="text-[var(--color-text-muted)]" />
              ) : (
                <ArrowRight size={16} className="text-[var(--color-text-muted)]" />
              )}
              <div className="min-w-0 text-start">
                <span className="sr-only">
                  {t.detail.prevProject}
                </span>
                <span className="text-sm font-medium text-[var(--color-text)]">
                  {prevContent.name}
                </span>
              </div>
            </Link>

            <Link
              href="/products"
              className="text-sm font-medium px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {t.detail.allProjects}
            </Link>

            <Link
              href={`/products/${nextProduct.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-hover)] transition-colors w-full sm:w-auto min-w-0 justify-end"
            >
              <div className="min-w-0 text-end">
                <span className="sr-only">
                  {t.detail.nextProject}
                </span>
                <span className="text-sm font-medium text-[var(--color-text)]">
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
