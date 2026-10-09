"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[var(--color-bg)]">
      <Navbar />

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <span className="text-[var(--color-accent)] text-xs sm:text-sm font-medium">
              {t.about.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 mb-5 sm:mb-6 text-[var(--color-text)] leading-tight px-2">
              {t.about.title}
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2">
              {t.about.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
}
