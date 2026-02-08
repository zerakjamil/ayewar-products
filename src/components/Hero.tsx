"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase"
        >
          بەرهەمە داهێنەرانەکانی{" "}
          <span className="text-[var(--color-accent)]">ئایەوار</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 text-[var(--color-text-muted)] text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
        >
          کۆمەڵەیەکی بەرهەمی پێشکەوتوو بدۆزەرەوە کە بە وریایی دروستکراون بۆ
          دابینکردنی پێداویستیەکانی جۆراوجۆری بەکارهێنەران لە دونیای دیجیتاڵی
          ئەمڕۆدا. هەموو چارەسەرێک بە داهێنان، متمانەپێکراوی، و گەشەپێدان لە
          بیرکراوە، بۆ بەهێزکردنی بەکارهێنەران بۆ سەرکەوتن.
        </motion.p>
      </div>
    </section>
  );
}
