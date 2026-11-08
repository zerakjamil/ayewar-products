"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

      <section className="py-16 sm:py-24">
        <div className="site-container max-w-3xl text-start">
          <AnimatedSection>
            <h1 className="page-title mb-6">
              {t.nav.about}
            </h1>
            <p className="page-copy">
              {t.about.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
      </main>
      <Footer />
    </>
  );
}
