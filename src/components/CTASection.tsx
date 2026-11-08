"use client";
import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/i18n/context";
export default function CTASection() {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowUpLeft : ArrowUpRight;
  return (
    <section className="site-container contact-strip">
      <Link href="/contact"><span>{t.nav.contact}</span><Arrow strokeWidth={1.25} aria-hidden="true" /></Link>
    </section>
  );
}
