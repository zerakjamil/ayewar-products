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
}: ProductCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <AnimatedSection delay={0.1}>
      <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <div className={`flex flex-col ${isReversed ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
          <div className="flex-1 p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <Image src={icon} alt={name} width={44} height={44} className="rounded-xl" />
              <span className="text-[var(--color-accent)] text-sm font-medium">{category}</span>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-5 text-[var(--color-text)]">{nameKu}</h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-8 text-[15px] max-w-lg">{description}</p>
            <div>
              <Link href={`/products/${slug}`} className="inline-flex items-center gap-2 text-sm font-medium border border-[var(--color-border)] px-6 py-3 rounded-full text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors">
                زیاتر بخوێنەرەوە
                <ArrowLeft size={14} />
              </Link>
            </div>
          </div>
          <div className="flex-1 py-10 px-6 flex items-center justify-center bg-[var(--color-bg-secondary)]/30">
            {mockups.length > 0 ? (
              <PhoneCarousel mockups={mockups} />
            ) : (
              <div className="flex items-center justify-center h-[400px]">
                <Image src={icon} alt={name} width={100} height={100} className="rounded-2xl opacity-20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
