"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Code2, Smartphone, Cpu, ShieldCheck } from "lucide-react";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

export default function Hero() {
  const highlights = [
    {
      icon: Smartphone,
      title: "٦ ئەپی کارای مۆبایل",
      subtitle: "iOS و Android لەسەر React Native & Expo",
    },
    {
      icon: Cpu,
      title: "کاتی ڕاستەوخۆ و خێرا",
      subtitle: "سۆکێت، بزوێنەری شەتڕەنج و مزادەی زیندوو",
    },
    {
      icon: Code2,
      title: "کلاود و مایکڕۆسێرڤس",
      subtitle: "Laravel 13، Docker، OSRM و Nominatim",
    },
    {
      icon: ShieldCheck,
      title: "ئاستی بەرهەمهێنان",
      subtitle: "ڕاستەقینە لە بازاڕ و لەسەر سێرڤەری خۆماڵی",
    },
  ];

  return (
    <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-20 relative overflow-hidden">
      {/* Background radial warmth - subtle, non-slop */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-accent)]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Creator / Organization Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)] mb-6 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>پۆرتفۆلیۆی تەلارسازی نەرمەکاڵا و بەرهەمەکان</span>
          <span className="text-[var(--color-border)]">|</span>
          <span className="font-semibold text-[var(--color-text)]">زێڕەک جەمیل</span>
        </motion.div>

        {/* Brand Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <Image
            src={ayewarLogo}
            alt="Ayewar"
            width={200}
            height={66}
            className="h-12 sm:h-16 md:h-18 w-auto filter drop-shadow-md"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] leading-snug max-w-4xl mx-auto"
        >
          بەرهەمە داهێنەرانە و پلاتفۆرمە مۆبایلە پێشکەوتووەکان
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4"
        >
          کۆمەڵێک ئەپڵیکەیشن و پلاتفۆرمی کارا لە بەرهەمهێناندا (Production) لە بوارەکانی هاتوچۆ و چاودێری پاس، حجزکردنی لوکس، مزادەی کاتی ڕاستەوخۆ، و شیکاری شەتڕەنج بە ژیری دەستکرد. تەواوی پرۆسەی دیزاینی ڕووکار، سیستەمی کلاود، و ئەپەکانی iOS و Android بە شێوازی سەربەخۆ ئەندازیاری کراون.
        </motion.p>

        {/* Engineering Highlights Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-10 sm:mt-12 text-right"
        >
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <div
                key={i}
                className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] mb-3">
                  <Icon size={16} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text)]">
                    {h.title}
                  </h4>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1 leading-normal">
                    {h.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
