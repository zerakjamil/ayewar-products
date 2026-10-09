"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-bg)] pointer-events-none select-none"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-4"
          >
            <Image
              src={ayewarLogo}
              alt="Ayewar"
              width={160}
              height={50}
              className="h-10 sm:h-12 w-auto"
              priority
            />
            {/* Shimmer loading progress bar */}
            <div className="w-36 h-1 rounded-full overflow-hidden bg-[var(--color-border)]">
              <div className="w-full h-full skeleton-shimmer" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
