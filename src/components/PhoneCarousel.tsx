"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PhoneCarouselProps {
  mockups: StaticImageData[];
}

export default function PhoneCarousel({ mockups }: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate
  useEffect(() => {
    if (mockups.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % mockups.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mockups.length]);

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
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Phone container with premium glow */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Outer glow ring */}
        <div className="absolute -inset-12 bg-gradient-to-b from-[var(--color-accent)]/30 via-[var(--color-accent-secondary)]/20 to-transparent rounded-[80px] blur-3xl opacity-60" />
        
        {/* Secondary glow */}
        <motion.div 
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -inset-6 bg-gradient-to-br from-[var(--color-accent)]/25 to-[var(--color-accent-secondary)]/15 rounded-[60px] blur-2xl"
        />

        {/* Phone device */}
        <div className="relative h-[420px] w-[210px] sm:h-[480px] sm:w-[240px] md:h-[520px] md:w-[260px]" style={{ perspective: '1000px' }}>
          {/* Premium phone frame */}
          <div className="absolute inset-0 rounded-[44px] sm:rounded-[50px] md:rounded-[54px] border-[10px] sm:border-[12px] border-[#1a1a1c] bg-[#1a1a1c] shadow-2xl shadow-black/50 overflow-hidden">
            {/* Glossy frame highlight */}
            <div className="absolute -inset-px rounded-[inherit] bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none z-30" />
            
            {/* Screen */}
            <div className="relative w-full h-full overflow-hidden rounded-[34px] sm:rounded-[38px] md:rounded-[42px] bg-black">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    rotateY: { duration: 0.3 },
                  }}
                  className="absolute inset-0"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Image
                    src={mockups[current]}
                    alt={`Screenshot ${current + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 210px, (max-width: 768px) 240px, 260px"
                    priority
                    draggable={false}
                  />
                  {/* Screen glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Home indicator - Premium style */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[105px] sm:w-[115px] h-[5px] bg-white/50 rounded-full z-20 shadow-sm" />
          </div>
          
          {/* Reflection effect */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-[var(--color-accent)]/10 to-transparent blur-xl opacity-50 rounded-full" />
        </div>
      </motion.div>

      {/* Premium Controls */}
      <div className="flex items-center gap-5">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          disabled={mockups.length <= 1}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:shadow-none"
          aria-label="Previous"
        >
          <ChevronRight size={18} />
        </motion.button>

        {/* Premium Dots */}
        <div className="flex items-center gap-2.5">
          {mockups.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.15 }}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              className={`rounded-full transition-all duration-300 ${i === current
                  ? "w-8 h-2.5 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)] shadow-lg shadow-[var(--color-accent)]/30"
                  : "w-2.5 h-2.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          disabled={mockups.length <= 1}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-bg-secondary)] to-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]/50 hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all disabled:opacity-30 disabled:hover:border-[var(--color-border)] disabled:hover:shadow-none"
          aria-label="Next"
        >
          <ChevronLeft size={18} />
        </motion.button>
      </div>
    </div>
  );
}
