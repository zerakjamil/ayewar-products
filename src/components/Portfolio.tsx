"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { products, getProductContent } from "@/data/products";
import { useLanguage } from "@/i18n/context";

const groups = {
  all: products.map((product) => product.slug),
  transit: ["raiders", "passengers"],
  services: ["ledger", "soragh", "dallak", "dallak-partners"],
  realtime: ["chessmancer", "zidobid"],
};

export default function Portfolio() {
  const [category, setCategory] = useState<keyof typeof groups>("all");
  const { t, locale } = useLanguage();
  const filtered = products.filter((product) => groups[category].includes(product.slug));
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <section className="site-container portfolio" aria-label={t.nav.products}>
          <div className="portfolio-toolbar">
            <div className="portfolio-filters" role="group" aria-label={t.nav.products}>
              {(Object.keys(groups) as (keyof typeof groups)[]).map((id) => (
                <button key={id} onClick={() => setCategory(id)} aria-pressed={category === id} className="filter-button">{t.filters[id]}</button>
              ))}
            </div>
            <span className="sr-only" aria-live="polite" aria-atomic="true">{t.nav.products}: {filtered.length}</span>
          </div>
          <div className="portfolio-grid">
            {filtered.map((product) => (
              <ProductCard key={product.slug} name={getProductContent(product, locale).name} slug={product.slug} icon={product.icon} mockups={product.cardMockups ?? product.mockups.slice(3, 5)} index={products.indexOf(product)} />
            ))}
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
