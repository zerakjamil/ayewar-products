"use client";

import { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface PhoneCarouselProps {
  mockups: StaticImageData[];
  accentColor?: string;
}

export default function PhoneCarousel({ mockups, accentColor = "#38bdf8" }: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const next = useCallback(() => {
    if (mockups.length <= 1) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % mockups.length);
  }, [mockups.length]);

  const prev = useCallback(() => {
    if (mockups.length <= 1) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + mockups.length) % mockups.length);
  }, [mockups.length]);

  // Auto-advance when playing
  useEffect(() => {
    if (!isPlaying || mockups.length <= 1) return;
    const timer = setInterval(() => {
      next();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, mockups.length, next]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      next();
    } else if (e.key === "ArrowRight") {
      prev();
    }
  };

  if (!mockups || mockups.length === 0) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <div
      className="flex flex-col items-center gap-6 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="نمایشی وێنەکان بە مۆبایل"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Phone container */}
      <div className="relative">
        {/* Subtle ambient light tinted with the app's brand color */}
        <div
          className="absolute -inset-10 rounded-[64px] blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: accentColor }}
        />

        {/* Phone chassis */}
        <div className="relative h-[440px] w-[215px] sm:h-[500px] sm:w-[245px] md:h-[540px] md:w-[265px]">
          {/* Bezel frame */}
          <div className="absolute inset-0 rounded-[46px] sm:rounded-[52px] md:rounded-[56px] border-[10px] sm:border-[12px] border-[#141822] bg-[#141822] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/10">
            {/* Dynamic Island / pill speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2.5 gap-1.5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#1c2438]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2a3652]/60" />
            </div>

            {/* Screen Viewport */}
            <div className="relative w-full h-full overflow-hidden rounded-[36px] sm:rounded-[40px] md:rounded-[44px] bg-black">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 320, damping: 32 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={mockups[current]}
                    alt={`ڕوونمای ئەپڵیکەیشن ${current + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 215px, (max-width: 768px) 245px, 265px"
                    priority={current === 0}
                    draggable={false}
                  />
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-white/40 rounded-full z-30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-4 py-2 shadow-lg">
        {/* RTL: Previous slide is right arrow */}
        <button
          onClick={prev}
          disabled={mockups.length <= 1}
          className="w-9 h-9 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-30"
          aria-label="وێنەی پێشوو"
        >
          <ChevronRight size={16} />
        </button>

        {/* Counter & Play/Pause */}
        <div className="flex items-center gap-2 px-1 text-xs font-mono text-[var(--color-text-muted)]">
          <span className="font-semibold text-[var(--color-text)]">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span>/</span>
          <span>{String(mockups.length).padStart(2, "0")}</span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ml-1"
            aria-label={isPlaying ? "وەستاندنی خۆکار" : "دەستپێکردنی خۆکار"}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>

        {/* RTL: Next slide is left arrow */}
        <button
          onClick={next}
          disabled={mockups.length <= 1}
          className="w-9 h-9 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-30"
          aria-label="وێنەی دواتر"
        >
          <ChevronLeft size={16} />
        </button>
      </div>

      {/* Thumbnails dots */}
      <div className="flex items-center gap-1.5 flex-wrap justify-center max-w-xs">
        {mockups.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-[var(--color-text)] shadow-sm"
                : "w-2 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
            }`}
            aria-label={`بڕۆ بۆ وێنەی ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
