"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[9998]"
        >
          <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                <Cookie size={20} className="text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)]">
                ئێمە کوکی بەکاردەهێنین
              </h3>
            </div>

            {/* Content */}
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
              ئێمە هەموو کوکیەکان بە شێوەیەکی بنەڕەتی چالاک دەکەین بۆ دڵنیابوون لە کارکردنی دروستی ماڵپەڕەکەمان، و شیکاری بەپێی{" "}
              <Link 
                href="#" 
                className="text-[var(--color-accent)] hover:underline"
              >
                سیاسەتی کوکی
              </Link>
              .
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                قبوڵکردنی هەموو
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-[var(--color-text)] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[var(--color-bg)] transition-colors"
              >
                ڕەتکردنەوە
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
