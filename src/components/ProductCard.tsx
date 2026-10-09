"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import PhoneCarousel from "./PhoneCarousel";

interface ProductCardProps {
  category: string;
  name: string;
  nameKu: string;
  description: string;
  slug: string;
  icon: StaticImageData;
  mockups: StaticImageData[];
  index: number;
  badge?: string;
  tagline?: string;
  mockupColor?: string;
}

export default function ProductCard({
  category,
  name,
  nameKu,
  description,
  slug,
  icon,
  mockups,
  index,
  badge,
  tagline,
  mockupColor = "#38bdf8",
}: ProductCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <AnimatedSection delay={0.1}>
      <article className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl sm:rounded-3xl overflow-hidden hover:border-[var(--color-border-hover)] transition-all duration-300 shadow-xl shadow-black/30">
        <div className={`flex flex-col ${isReversed ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          {/* Content side */}
          <div className="flex-1 p-6 sm:p-8 md:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              {/* Header meta */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex-shrink-0 shadow-md">
                    <Image
                      src={icon}
                      alt={name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] inline-block">
                      {category}
                    </span>
                  </div>
                </div>

                {badge && (
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{
                      borderColor: `${mockupColor}40`,
                      color: mockupColor,
                      backgroundColor: `${mockupColor}10`,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text)] leading-snug">
                  {nameKu}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-mono mt-1">
                  {name}
                </p>
                {tagline && (
                  <p className="text-sm sm:text-base font-medium text-[var(--color-text)]/90 mt-2">
                    {tagline}
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-[var(--color-text-muted)] leading-relaxed mb-6 text-sm sm:text-[15px]">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2">
              <Link
                href={`/products/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold border border-[var(--color-border)] px-6 py-3 rounded-full text-[var(--color-text)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:border-[var(--color-border-hover)] transition-all shadow-sm"
              >
                <span>زیاتر بخوێنەرەوە</span>
                <ArrowLeft size={15} />
              </Link>
            </div>
          </div>

          {/* Phone Mockup Showcase */}
          <div className="flex-1 py-10 sm:py-12 px-4 sm:px-8 flex items-center justify-center bg-[var(--color-bg-secondary)]/50 border-t lg:border-t-0 lg:border-r border-[var(--color-border)]">
            {mockups.length > 0 ? (
              <PhoneCarousel mockups={mockups} accentColor={mockupColor} />
            ) : (
              <div className="flex items-center justify-center h-[420px]">
                <Image
                  src={icon}
                  alt={name}
                  width={96}
                  height={96}
                  className="rounded-2xl opacity-20"
                />
              </div>
            )}
          </div>
        </div>
      </article>
    </AnimatedSection>
  );
}
