"use client";

import { useState, useEffect, useCallback, useRef, useSyncExternalStore } from "react";
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
  appName?: string;
}

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

function getFullscreenState() {
  if (!document.fullscreenEnabled || !document.documentElement.requestFullscreen || !document.exitFullscreen) return "unavailable";
  return document.fullscreenElement ? "active" : "available";
}

const getServerFullscreenState = () => "unavailable" as const;

export default function PhoneCarousel({
  mockups,
  appName,
}: PhoneCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isManualPaused, setIsManualPaused] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenMode, setFullscreenMode] = useState<"screenshot" | "device">("screenshot");
  const nativeFullscreenState = useSyncExternalStore(subscribeFullscreen, getFullscreenState, getServerFullscreenState);
  const [nativeFullscreenFailed, setNativeFullscreenFailed] = useState(false);
  const isNativeFullscreen = nativeFullscreenState === "active";

  const { dir, t } = useLanguage();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const ownsNativeFullscreen = useRef(false);

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
    if (isManualPaused || isHovered || hasFocus || isInteracted || isFullscreen || mockups.length <= 1) return;

    const timer = setInterval(() => {
      next();
    }, 4500);

    return () => clearInterval(timer);
  }, [isManualPaused, isHovered, hasFocus, isInteracted, isFullscreen, mockups.length, next]);

  // Fullscreen open / close helpers
  const openFullscreen = useCallback(() => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    handleUserInteraction();
    setIsFullscreen(true);
  }, [handleUserInteraction]);

  const closeFullscreen = useCallback(() => {
    handleUserInteraction();
    setIsFullscreen(false);
  }, [handleUserInteraction]);

  useEffect(() => {
    if (!isFullscreen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    dialog?.querySelector<HTMLButtonElement>("[data-gallery-close]")?.focus();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (ownsNativeFullscreen.current && document.fullscreenElement) {
        void document.exitFullscreen().catch(() => {});
      }
      ownsNativeFullscreen.current = false;
      returnFocusRef.current?.focus();
    };
  }, [isFullscreen]);

  const toggleNativeFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        ownsNativeFullscreen.current = false;
      } else {
        await document.documentElement.requestFullscreen();
        if (!dialogRef.current?.open) {
          await document.exitFullscreen();
          return;
        }
        ownsNativeFullscreen.current = true;
      }
    } catch {
      setNativeFullscreenFailed(true);
      dialogRef.current?.querySelector<HTMLButtonElement>("[data-gallery-close]")?.focus();
    }
  }, []);

  // Window keyboard listener for fullscreen navigation & escape
  useEffect(() => {
    if (!isFullscreen) return;

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeFullscreen();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        (dir === "rtl" ? swipeNext : swipePrev)();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        (dir === "rtl" ? swipePrev : swipeNext)();
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
      e.preventDefault();
      (dir === "rtl" ? swipeNext : swipePrev)();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      (dir === "rtl" ? swipePrev : swipeNext)();
    }
  };

  // Drag end handler (for desktop mouse drag and Framer Motion swipe gestures)
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 35;
    const velocity = 250;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX < -threshold || velocityX < -velocity) {
      (dir === "rtl" ? swipePrev : swipeNext)();
    } else if (offsetX > threshold || velocityX > velocity) {
      (dir === "rtl" ? swipeNext : swipePrev)();
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
        (dir === "rtl" ? swipePrev : swipeNext)();
      } else {
        (dir === "rtl" ? swipeNext : swipePrev)();
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
        (dir === "rtl" ? swipePrev : swipeNext)();
      } else {
        (dir === "rtl" ? swipeNext : swipePrev)();
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

  const labels = t.gallery;

  return (
    <>
      <div
        className="phone-gallery flex flex-col items-center gap-5 select-none"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label={`${appName ?? ""} ${labels.gallery}`.trim()}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false); }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Phone container */}
        <div className="relative group">
          <div className="relative phone-frame-size">
            <div className="device-chassis">
              {/* Screen Viewport with smooth lighter background */}
              <div
                className="device-screen touch-pan-y cursor-grab active:cursor-grabbing"
                style={{ aspectRatio: `${mockups[current].width} / ${mockups[current].height}` }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
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
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={mockups[current]}
                      alt={`${appName ?? ""} ${labels.screen} ${current + 1}`.trim()}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 216px, (max-width: 768px) 248px, 268px"
                      priority
                      loading="eager"
                      draggable={false}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

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
            aria-label={labels.previous}
          >
            {dir === "rtl" ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>

          {/* Counter, Play/Pause & Fullscreen Trigger */}
          <div dir="ltr" className="flex items-center gap-1.5 px-1 text-xs font-mono text-[var(--color-text-muted)]">
            <span aria-live={isManualPaused ? "polite" : "off"} aria-atomic="true" className="font-semibold text-[var(--color-text)]">
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
              aria-label={isManualPaused ? labels.play : labels.pause}
              aria-pressed={!isManualPaused}
            >
              {isManualPaused ? <Play size={16} /> : <Pause size={16} />}
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
            aria-label={labels.next}
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
              aria-current={i === current ? "true" : undefined}
              data-gallery-page
              aria-label={`${labels.goToScreen} ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* IMMERSIVE FULLSCREEN APP PREVIEW MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <dialog
            ref={dialogRef}
            onCancel={(event) => { event.preventDefault(); closeFullscreen(); }}
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")).filter((button) => button.getClientRects().length > 0);
              const first = controls[0];
              const last = controls[controls.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
            className="fixed inset-0 m-0 w-screen h-dvh max-w-none max-h-none border-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between items-center select-none overflow-hidden touch-none"
            aria-modal="true"
            aria-label={labels.fullscreenBtn}
            onTouchStart={handleFsTouchStart}
            onTouchEnd={handleFsTouchEnd}
          >
            {/* TOP BAR */}
            <div
              className="relative z-50 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left / Start: Title & Screen Counter */}
              <div className="flex items-center gap-3">
                <div dir="ltr" aria-live="polite" aria-atomic="true" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-white text-xs font-mono">
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
                  aria-pressed={fullscreenMode === "screenshot"}
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
                  aria-pressed={fullscreenMode === "device"}
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
                {nativeFullscreenState !== "unavailable" && !nativeFullscreenFailed && <button
                  onClick={toggleNativeFullscreen}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-colors"
                  aria-label={labels.nativeFullscreen}
                  aria-pressed={isNativeFullscreen}
                  title={labels.nativeFullscreen}
                >
                  {isNativeFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>}

                <button
                  data-gallery-close
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
                  swipePrev();
                }}
                className="hidden md:flex absolute rtl:right-8 ltr:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label={labels.previous}
              >
                {dir === "rtl" ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
              </button>

              {/* Desktop Side Chevron Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  swipeNext();
                }}
                className="hidden md:flex absolute rtl:left-8 ltr:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xl"
                aria-label={labels.next}
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
                      <div className="relative h-full w-full sm:h-[86vh] sm:w-auto sm:aspect-[9/19.5] sm:max-h-[920px] max-w-full sm:rounded-3xl overflow-hidden sm:shadow-2xl sm:ring-1 sm:ring-white/15 bg-black sm:bg-[#111111] flex items-center justify-center">
                        <Image
                          src={mockups[current]}
                          alt={`${appName ?? ""} ${labels.screen} ${current + 1}`.trim()}
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
                  <div className="absolute inset-0 device-chassis">
                    <div className="relative w-full h-full overflow-hidden rounded-3xl bg-[#111111] cursor-grab active:cursor-grabbing">
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
                            alt={`${appName ?? ""} ${labels.screen} ${current + 1}`.trim()}
                            fill
                            className="object-contain"
                            sizes="600px"
                            priority
                            loading="eager"
                            draggable={false}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

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
                    aria-current={i === current ? "true" : undefined}
              data-gallery-page
              aria-label={`${labels.goToScreen} ${i + 1}`}
                  />
                ))}
              </div>


            </div>
          </dialog>
        )}
      </AnimatePresence>
    </>
  );
}
