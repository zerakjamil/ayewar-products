"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhoneCarouselProps {
  mockups: StaticImageData[];
}

export default function PhoneCarousel({ mockups }: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  if (!mockups || mockups.length === 0) return null;

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % mockups.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + mockups.length) % mockups.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -150 : 150,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Phone container */}
      <div className="relative h-[380px] w-[190px] sm:h-[440px] sm:w-[220px] md:h-[480px] md:w-[240px]">
        {/* Phone frame */}
        <div className="absolute inset-0 rounded-[36px] sm:rounded-[42px] md:rounded-[46px] border-[6px] sm:border-[8px] border-[#1c1c1e] bg-[#1c1c1e] shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] md:w-[110px] h-[24px] sm:h-[28px] md:h-[30px] bg-[#1c1c1e] rounded-b-xl z-20" />
          
          {/* Screen */}
          <div className="relative w-full h-full overflow-hidden rounded-[30px] sm:rounded-[34px] md:rounded-[38px] bg-black">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 400, damping: 40 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={mockups[current]}
                  alt={`Screenshot ${current + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 190px, (max-width: 768px) 220px, 240px"
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[80px] sm:w-[100px] h-1 bg-white/30 rounded-full z-20" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          disabled={mockups.length <= 1}
          className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-all disabled:opacity-30"
          aria-label="Previous"
        >
          <ChevronRight size={16} />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {mockups.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 \${
                i === current
                  ? "w-5 h-1.5 bg-[var(--color-accent)]"
                  : "w-1.5 h-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
              }`}
              aria-label={`Slide \${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={mockups.length <= 1}
          className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-all disabled:opacity-30"
          aria-label="Next"
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </div>
  );
}
