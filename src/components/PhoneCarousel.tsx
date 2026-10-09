"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLanguage } from "@/i18n/context";

interface PhoneCarouselProps {
  mockups: StaticImageData[];
  accentColor?: string;
}

export default function PhoneCarousel({ mockups, accentColor = "#38bdf8" }: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { dir } = useLanguage();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

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

  // Preload all mockup images on mount so swipe transitions are instantaneous
  useEffect(() => {
    if (typeof window === "undefined" || !mockups) return;
    mockups.forEach((img) => {
      if (img?.src) {
        const preloader = new window.Image();
        preloader.src = img.src;
      }
    });
  }, [mockups]);

  // Auto-advance timer when not paused
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
      dir === "rtl" ? next() : prev();
    } else if (e.key === "ArrowRight") {
      dir === "rtl" ? prev() : next();
    }
  };

  // Drag end handler (for mouse drag and Framer Motion gestures)
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 40;
    const velocity = 250;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX < -threshold || velocityX < -velocity) {
      // Swiped towards left
      dir === "rtl" ? prev() : next();
    } else if (offsetX > threshold || velocityX > velocity) {
      // Swiped towards right
      dir === "rtl" ? next() : prev();
    }
  };

  // Touch event handlers for native mobile swipe fallback
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Only trigger if horizontal swipe is greater than vertical movement
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left
        dir === "rtl" ? prev() : next();
      } else {
        // Swiped right
        dir === "rtl" ? next() : prev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!mockups || mockups.length === 0) return null;

  // Seamless slide variants - crossfade and slide without leaving a blank frame
  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? (dir === "rtl" ? -100 : 100) : (dir === "rtl" ? 100 : -100),
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? (dir === "rtl" ? 100 : -100) : (dir === "rtl" ? -100 : 100),
      opacity: 0,
      scale: 0.98,
    }),
  };

  return (
    <div
      className="flex flex-col items-center gap-5 select-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Interactive Mobile Mockup Showcase"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Hidden eager preloading to prevent any black flicker on initial swipe */}
      <div className="hidden" aria-hidden="true">
        {mockups.map((m, idx) => (
          <Image
            key={idx}
            src={m}
            alt="preloaded"
            width={300}
            height={650}
            priority
            loading="eager"
          />
        ))}
      </div>

      {/* Phone container */}
      <div className="relative">
        {/* Subtle ambient light tinted with the app's brand color */}
        <div
          className="absolute -inset-8 rounded-[64px] blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
          style={{ backgroundColor: accentColor }}
        />

        {/* Phone chassis */}
        <div className="relative h-[440px] w-[215px] sm:h-[500px] sm:w-[245px] md:h-[540px] md:w-[265px]">
          {/* Bezel frame */}
          <div className="absolute inset-0 rounded-[46px] sm:rounded-[52px] md:rounded-[56px] border-[10px] sm:border-[12px] border-[#141822] bg-[#141822] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/15">
            {/* Dynamic Island / pill speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-[#0a0d14] rounded-full z-30 flex items-center justify-end px-2.5 gap-1.5 shadow-sm pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-[#1c2438]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2a3652]/60" />
            </div>

            {/* Screen Viewport with smooth lighter background */}
            <div
              className="relative w-full h-full overflow-hidden rounded-[36px] sm:rounded-[40px] md:rounded-[44px] bg-[#121622] touch-pan-y cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Subtle top screen light ambiance */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/20 pointer-events-none z-10" />

              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={handleDragEnd}
                  transition={{
                    x: { type: "spring", stiffness: 350, damping: 32 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={mockups[current]}
                    alt={`App Screen ${current + 1}`}
                    fill
                    className="object-cover brightness-[1.04] contrast-[1.01]"
                    sizes="(max-width: 640px) 215px, (max-width: 768px) 245px, 265px"
                    priority
                    loading="eager"
                    draggable={false}
                  />
                  {/* Subtle glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.07] pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Home indicator bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-1 bg-white/45 rounded-full z-30 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center gap-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-3.5 py-1.5 shadow-lg">
        {/* Back button: Left in LTR, Right in RTL */}
        <button
          onClick={prev}
          disabled={mockups.length <= 1}
          className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-30 p-0"
          aria-label="Previous screen"
        >
          {dir === "rtl" ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
        </button>

        {/* Counter & Play/Pause */}
        <div className="flex items-center gap-1.5 px-1 text-xs font-mono text-[var(--color-text-muted)]">
          <span className="font-semibold text-[var(--color-text)]">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="opacity-40">/</span>
          <span className="opacity-60">{String(mockups.length).padStart(2, "0")}</span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ml-0.5"
            aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
          >
            {isPlaying ? <Pause size={11} /> : <Play size={11} />}
          </button>
        </div>

        {/* Forward button: Right in LTR, Left in RTL */}
        <button
          onClick={next}
          disabled={mockups.length <= 1}
          className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-30 p-0"
          aria-label="Next screen"
        >
          {dir === "rtl" ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
        </button>
      </div>

      {/* Micro Progress Bar / Indicator Dots */}
      <div className="flex items-center gap-1 justify-center">
        {mockups.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`h-1 rounded-full transition-all duration-300 p-0 border-0 outline-none block ${
              i === current
                ? "w-4 bg-[var(--color-text)]"
                : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
            }`}
            aria-label={`Go to screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
