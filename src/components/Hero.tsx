"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

export default function Hero() {
  return (
    <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-tight"
        >
          بەرهەمە داهێنەرانەکانی
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 sm:mt-6 flex justify-center"
        >
          <Image 
            src={ayewarLogo} 
            alt="Ayewar" 
            width={180} 
            height={60}
            className="h-12 sm:h-14 md:h-16 w-auto"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 sm:mt-6 text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2"
        >
          کۆمەڵەیەک بەرهەمی پێشکەوتوو کە دروستکراون بۆ
          دابینکردنی پێداویستیی جۆراوجۆری بەکارهێنەران لە دونیای دیجیتاڵی
          ئەمڕۆ. هەموو چارەسەرێک بە داهێنان، متمانەپێکراوی، و گەشەپێدان لە
          بیرکراوە، بۆ بەهێزکردنی بەکارهێنەران بۆ سەرکەوتن.
        </motion.p>
      </div>
    </section>
  );
}
