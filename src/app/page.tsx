"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { products, getProductContent } from "@/data/products";
import { useLanguage } from "@/i18n/context";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const { t, locale } = useLanguage();

  const categories = [
    { id: "all", name: t.filters.all },
    { id: "transit", name: t.filters.transit },
    { id: "lifestyle", name: t.filters.services },
    { id: "realtime", name: t.filters.realtime },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "transit") return p.slug === "raiders" || p.slug === "students";
    if (activeCategory === "lifestyle") return p.slug === "dallak" || p.slug === "dallak-partners";
    if (activeCategory === "realtime") return p.slug === "chessmancer" || p.slug === "zidobid";
    return true;
  });

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />
      <Hero />

      {/* Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[var(--color-text)] text-[var(--color-bg)] shadow-md"
                  : "bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Showcase */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 md:space-y-24">
          {filteredProducts.map((product, index) => {
            const content = getProductContent(product, locale);
            return (
              <ProductCard
                key={product.slug}
                category={content.category}
                name={content.name}
                nameSub={content.nameSub}
                description={content.description}
                slug={product.slug}
                icon={product.icon}
                mockups={product.mockups}
                index={index}
                badge={content.badge}
                tagline={content.tagline}
                mockupColor={product.mockupColor}
              />
            );
          })}
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
