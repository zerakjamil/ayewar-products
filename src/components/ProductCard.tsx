"use client";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/context";

interface ProductCardProps {
  name: string;
  slug: string;
  icon: StaticImageData;
  mockups: StaticImageData[];
  index: number;
}

export default function ProductCard({ name, slug, icon, mockups, index }: ProductCardProps) {
  const { dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowUpLeft : ArrowUpRight;
  return (
    <article className="project-card">
      <Link href={`/products/${slug}`} className="project-link" aria-labelledby={`project-${slug}`}>
        <div className="project-caption">
          <Image src={icon} width={40} height={40} alt="" className={`project-icon ${slug === "raiders" || slug === "passengers" ? "transit-icon" : ""}`} />
          <h2 id={`project-${slug}`}>{name}</h2>
        </div>
        <div className="project-art" dir="ltr">
          {mockups.map((mockup, i) => (
            <div className={`project-screen project-screen-${i + 1}`} key={mockup.src}>
              <Image src={mockup} alt="" fill sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 260px" className="object-cover object-top" priority={index < 2 && i === 0} />
            </div>
          ))}
          <span className="project-open" aria-hidden="true"><Arrow size={24} strokeWidth={1.75} /></span>
        </div>

      </Link>
    </article>
  );
}
