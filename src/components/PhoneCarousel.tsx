"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  X,
  Smartphone,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/i18n/context";

interface PhoneCarouselProps {
  mockups: StaticImageData[];
  accentColor?: string;
  appName?: string;
}

export default function PhoneCarousel({
  mockups,
  accentColor = "#38bdf8",
  appName,
}: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState<"screenshot" | "device">("screenshot");
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  const { dir, locale } = useLanguage();

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const fsTouchStartX = useRef<number | null>(null);
  const fsTouchStartY = useRef<number | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);

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

  // When user swipes, clicks, or interacts, pause auto-swiping for 30 seconds
  const handleUserInteraction = useCallback(() => {
    setIsInteracted(true);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsInteracted(false);
    }, 30000);
  }, []);

  // Debounced swipe triggers to prevent double advance when both drag and touch events fire
  const swipeNext = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTimeRef.current < 250) return;
    lastSwipeTimeRef.current = now;
    handleUserInteraction();
    next();
  }, [handleUserInteraction, next]);

  const swipePrev = useCallback(() => {
    const now = Date.now();
    if (now - lastSwipeTimeRef.current < 250) return;
    lastSwipeTimeRef.current = now;
    handleUserInteraction();
    prev();
  }, [handleUserInteraction, prev]);

  // Cleanup idle timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  // Auto-advance timer: runs only when NOT manual-paused, NOT hovered, NOT interacted, and NOT in fullscreen
  useEffect(() => {
    if (isManualPaused || isHovered || isInteracted || isFullscreen || mockups.length <= 1) return;

    const timer = setInterval(() => {
      next();
    }, 4500);

    return () => clearInterval(timer);
  }, [isManualPaused, isHovered, isInteracted, isFullscreen, mockups.length, next]);

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

  // Fullscreen open / close helpers
  const openFullscreen = useCallback(() => {
    handleUserInteraction();
    setIsFullscreen(true);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }
  }, [handleUserInteraction]);

  const closeFullscreen = useCallback(() => {
    handleUserInteraction();
    setIsFullscreen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }, [handleUserInteraction]);

  const toggleNativeFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    } else {
      document.documentElement.requestFullscreen?.().catch(() => {});
    }
  }, []);

  // Track native fullscreen state change
  useEffect(() => {
    const handleFsChange = () => {
      setIsNativeFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
    };
  }, []);

  // Window keyboard listener for fullscreen navigation & escape
  useEffect(() => {
    if (!isFullscreen) return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullscreen();
      } else if (e.key === "ArrowLeft") {
        dir === "rtl" ? swipeNext() : swipePrev();
      } else if (e.key === "ArrowRight") {
        dir === "rtl" ? swipePrev() : swipeNext();
      }
    };

    window.addEventListener("keydown", handleWindowKeyDown);
    return () => {
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [isFullscreen, closeFullscreen, dir, swipeNext, swipePrev]);

  // Keyboard navigation for carousel when focused in normal mode
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      dir === "rtl" ? swipeNext() : swipePrev();
    } else if (e.key === "ArrowRight") {
      dir === "rtl" ? swipePrev() : swipeNext();
    }
  };

  // Drag end handler (for desktop mouse drag and Framer Motion swipe gestures)
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 35;
    const velocity = 250;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX < -threshold || velocityX < -velocity) {
      dir === "rtl" ? swipePrev() : swipeNext();
    } else if (offsetX > threshold || velocityX > velocity) {
      dir === "rtl" ? swipeNext() : swipePrev();
    }
  };

  // Touch event handlers for native mobile swipe fallback in normal view
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        dir === "rtl" ? swipePrev() : swipeNext();
      } else {
        dir === "rtl" ? swipeNext() : swipePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Touch event handlers for fullscreen view
  const handleFsTouchStart = (e: React.TouchEvent) => {
    fsTouchStartX.current = e.touches[0].clientX;
    fsTouchStartY.current = e.touches[0].clientY;
  };

  const handleFsTouchEnd = (e: React.TouchEvent) => {
    if (fsTouchStartX.current === null || fsTouchStartY.current === null) return;
    const diffX = fsTouchStartX.current - e.changedTouches[0].clientX;
    const diffY = fsTouchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        dir === "rtl" ? swipePrev() : swipeNext();
      } else {
        dir === "rtl" ? swipeNext() : swipePrev();
      }
    }

    fsTouchStartX.current = null;
    fsTouchStartY.current = null;
  };

  if (!mockups || mockups.length === 0) return null;

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

  const isAutoPlaying = !isManualPaused && !isHovered && !isInteracted && !isFullscreen;

  // Localized microcopy
  const labels = {
    fullscreenBtn:
      locale === "ckb"
        ? "پێش‌نمایشی تەواوی شاشە"
        : locale === "ar"
        ? "عرض بملء الشاشة"
        : "Full Screen Preview",
    fullscreenShort:
      locale === "ckb" ? "تەواوی شاشە" : locale === "ar" ? "ملء الشاشة" : "Full Screen",
    screenshotMode:
      locale === "ckb"
        ? "تەنها وێنە (App View)"
        : locale === "ar"
        ? "لقطة الشاشة فقط"
        : "App View",
    deviceMode:
      locale === "ckb"
        ? "چوارچێوەی مۆبایل"
        : locale === "ar"
        ? "إطار الهاتف"
        : "Phone Frame",
    hint:
      locale === "ckb"
        ? "بۆ گۆڕینی وێنەکان پەنجە بخشێنە · بۆ دەرچوون کلیک بکە یان Esc دابگرە"
        : locale === "ar"
        ? "اسحب للتنقل بين الشاشات · اضغط في أي مكان أو استخدم Esc للخروج"
        : "Swipe to navigate · Tap anywhere or press Esc to exit",
    close: locale === "ckb" ? "داخستن" : locale === "ar" ? "إغلاق" : "Close",
  };

  return (
    <>
      <div
        className="flex flex-col items-center gap-5 select-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive Mobile Mockup Showcase"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hidden eager preloading to prevent any black flicker */}
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
        <div className="relative group">
          <div
            className="absolute -inset-8 rounded-[64px] blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: accentColor }}
          />

          <div className="relative h-[440px] w-[215px] sm:h-[500px] sm:w-[245px] md:h-[540px] md:w-[265px]">
            <div className="absolute inset-0 rounded-[46px] sm:rounded-[52px] md:rounded-[56px] border-[10px] sm:border-[12px] border-[#141822] bg-[#141822] shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/15">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-4 bg-[#0a0d14] rounded-full z-30 flex items-center justify-end px-2.5 gap-1.5 shadow-sm pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#1c2438]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#2a3652]/60" />
              </div>

              {/* Quick floating Fullscreen trigger button on the top right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreen();
                }}
                className="absolute top-2.5 rtl:left-2.5 ltr:right-2.5 z-40 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white/90 hover:text-white border border-white/20 text-[10px] font-medium shadow-md transition-all hover:scale-105 active:scale-95 group/btn"
                aria-label={labels.fullscreenBtn}
                title={labels.fullscreenBtn}
              >
                <Maximize2 size={10} className="group-hover/btn:scale-110 transition-transform" />
                <span className="hidden sm:inline">{labels.fullscreenShort}</span>
              </button>

              {/* Screen Viewport with smooth lighter background */}
              <div
                className="relative w-full h-full overflow-hidden rounded-[36px] sm:rounded-[40px] md:rounded-[44px] bg-[#121622] touch-pan-y cursor-grab active:cursor-grabbing"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
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
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-3.5 py-1.5 shadow-lg">
          {/* Back button */}
          <button
            onClick={() => {
              handleUserInteraction();
              prev();
            }}
            disabled={mockups.length <= 1}
            className="w-8 h-8 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors disabled:opacity-30 p-0"
            aria-label="Previous screen"
          >
            {dir === "rtl" ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          {/* Counter, Play/Pause & Fullscreen Trigger */}
          <div className="flex items-center gap-1.5 px-1 text-xs font-mono text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text)]">
              {String(current + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span className="opacity-60">{String(mockups.length).padStart(2, "0")}</span>

            {/* Play / Pause toggle */}
            <button
              onClick={() => {
                if (isManualPaused) {
                  setIsManualPaused(false);
                  setIsInteracted(false);
                } else {
                  setIsManualPaused(true);
                }
              }}
              className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors ml-0.5"
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              title={
                isAutoPlaying
                  ? "Auto-advancing"
                  : isInteracted
                  ? "Paused for 30s after user input"
                  : "Paused"
              }
            >
              {isAutoPlaying ? <Pause size={11} /> : <Play size={11} />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={openFullscreen}
              className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors ml-0.5"
              aria-label={labels.fullscreenBtn}
              title={labels.fullscreenBtn}
            >
              <Maximize2 size={12} />
            </button>
          </div>

          {/* Forward button */}
          <button
            onClick={() => {
              handleUserInteraction();
              next();
            }}
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
                handleUserInteraction();
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

      {/* IMMERSIVE FULLSCREEN APP PREVIEW MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between items-center select-none overflow-hidden touch-none"
            role="dialog"
            aria-modal="true"
            aria-label={labels.fullscreenBtn}
            onTouchStart={handleFsTouchStart}
            onTouchEnd={handleFsTouchEnd}
          >
            {/* Ambient Brand Glow in background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20 blur-3xl transition-colors duration-700"
              style={{
                background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* TOP BAR */}
            <div
              className="relative z-50 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left / Start: Title & Screen Counter */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">{String(current + 1).padStart(2, "0")}</span>
                  <span className="opacity-40">/</span>
                  <span className="opacity-70">{String(mockups.length).padStart(2, "0")}</span>
                </div>

                {appName && (
                  <span className="hidden sm:inline-block text-white/80 text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {appName}
                  </span>
                )}
              </div>

              {/* Center: Mode switcher on desktop (App Screenshot vs Phone Chassis) */}
              <div className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md">
                <button
                  onClick={() => setFullscreenMode("screenshot")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    fullscreenMode === "screenshot"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Eye size={12} />
                  <span>{labels.screenshotMode}</span>
                </button>
                <button
                  onClick={() => setFullscreenMode("device")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    fullscreenMode === "device"
                      ? "bg-white text-black shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <Smartphone size={12} />
                  <span>{labels.deviceMode}</span>
                </button>
              </div>

              {/* Right / End: Native Fullscreen Toggle & Close Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleNativeFullscreen}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-colors"
                  aria-label="Toggle native fullscreen"
                  title="Toggle native fullscreen"
                >
                  {isNativeFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>

                <button
                  onClick={closeFullscreen}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-medium text-xs transition-colors"
                  aria-label={labels.close}
                >
                  <X size={16} />
                  <span className="hidden sm:inline">{labels.close}</span>
                  <span className="hidden sm:inline text-[10px] opacity-60 font-mono">ESC</span>
                </button>
              </div>
            </div>

            {/* CENTER VIEWPORT (The App Experience) */}
            <div
              className="relative z-40 flex-1 w-full flex items-center justify-center p-0 sm:p-4 overflow-hidden"
              onClick={closeFullscreen}
            >
              {/* Desktop Side Chevron Left */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dir === "rtl" ? swipeNext() : swipePrev();
                }}
                className="hidden md:flex absolute rtl:right-8 ltr:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Previous screen"
              >
                {dir === "rtl" ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
              </button>

              {/* Desktop Side Chevron Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dir === "rtl" ? swipePrev() : swipeNext();
                }}
                className="hidden md:flex absolute rtl:left-8 ltr:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label="Next screen"
              >
                {dir === "rtl" ? <ChevronLeft size={22} /> : <ChevronRight size={22} />}
              </button>

              {/* MODE 1: Frameless Full App Screenshot (fits phone screen natively or displays clean edge-to-edge) */}
              {fullscreenMode === "screenshot" ? (
                <div
                  className="relative w-full h-full max-h-[100dvh] flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
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
                      className="absolute inset-0 flex items-center justify-center p-0 sm:p-4 cursor-grab active:cursor-grabbing"
                    >
                      <div className="relative h-full w-full sm:h-[86vh] sm:w-auto sm:aspect-[9/19.5] sm:max-h-[920px] max-w-full sm:rounded-3xl overflow-hidden sm:shadow-2xl sm:ring-1 sm:ring-white/15 bg-black sm:bg-[#121622] flex items-center justify-center">
                        <Image
                          src={mockups[current]}
                          alt={`App Screenshot ${current + 1}`}
                          fill
                          className="object-contain brightness-[1.03] contrast-[1.01]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                          priority
                          loading="eager"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04] pointer-events-none" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                /* MODE 2: Full Realistic Device Chassis (Enlarged Phone Frame) */
                <div
                  className="relative h-[86vh] max-h-[820px] w-auto aspect-[9/19.5] max-w-[92vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="absolute inset-0 rounded-[54px] border-[12px] border-[#141822] bg-[#141822] shadow-2xl shadow-black overflow-hidden ring-1 ring-white/20">
                    {/* Dynamic Island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#0a0d14] rounded-full z-30 flex items-center justify-end px-3 gap-1.5 shadow-sm pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-[#1c2438]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a3652]/60" />
                    </div>

                    <div className="relative w-full h-full overflow-hidden rounded-[42px] bg-[#121622] cursor-grab active:cursor-grabbing">
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
                            sizes="600px"
                            priority
                            loading="eager"
                            draggable={false}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/45 rounded-full z-30 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM BAR */}
            <div
              className="relative z-50 w-full px-4 py-3.5 sm:py-5 flex flex-col items-center gap-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5 justify-center">
                {mockups.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleUserInteraction();
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 p-0 border-0 outline-none block ${
                      i === current
                        ? "w-6 bg-white shadow-md shadow-white/30"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to screen ${i + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Hint */}
              <p className="text-[11px] sm:text-xs text-white/50 text-center font-mono">
                {labels.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
