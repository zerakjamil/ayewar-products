"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left image area */}
              <div className="hidden md:block md:w-2/5 h-64 md:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-l from-[var(--color-bg-card)] to-transparent z-10" />
                <div
                  className="w-full h-full min-h-[280px]"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-bg-secondary) 0%, var(--color-bg) 100%)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-10 md:p-16 text-center md:text-right">
                <span className="text-[var(--color-accent)] text-sm font-medium">
                  هاوکاربە لەگەڵ ئێمە
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-3 mb-6 text-[var(--color-text)]">
                  ئامادەیت بۆ باشترکردنی کارەکانت؟
                </h2>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] px-8 py-3 rounded-full text-sm font-medium hover:bg-[var(--color-bg-secondary)] transition-colors"
                >
                  پەیوەندیمان پێوە بکە
                  <ArrowLeft size={14} />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
