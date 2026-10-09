"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Github, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

const navLinks = [
  { name: "سەرەتا", href: "/" },
  { name: "بەرهەمەکان", href: "/products" },
  { name: "دەربارە", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 touch-manipulation">
          <Image
            src={ayewarLogo}
            alt="Ayewar"
            width={120}
            height={40}
            className="h-8 sm:h-9 w-auto"
            priority
          />
        </Link>

        {/* Center nav pills */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full px-2 py-1.5 shadow-sm"
          aria-label="سەرەکی"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/zerakjamil"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3.5 py-2 rounded-full transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={14} />
            <span className="font-mono">GitHub</span>
            <ArrowUpRight size={12} className="opacity-60" />
          </a>

          <Link
            href="/contact"
            className="bg-[var(--color-text)] text-[var(--color-bg)] px-5 py-2 rounded-full text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            پەیوەندی
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[var(--color-text)] p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] touch-manipulation"
          aria-label={mobileOpen ? "داخستنی مێنۆ" : "کردنەوەی مێنۆ"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-bg-card)] border-t border-[var(--color-border)] shadow-2xl"
          >
            <div className="px-5 py-5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] py-3 text-sm font-medium border-b border-[var(--color-border)]/50 transition-colors touch-manipulation"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 flex flex-col gap-2">
                <a
                  href="https://github.com/zerakjamil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] py-3 rounded-xl text-xs font-mono"
                >
                  <Github size={16} />
                  <span>github.com/zerakjamil</span>
                </a>

                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[var(--color-text)] text-[var(--color-bg)] py-3 rounded-xl text-xs font-bold text-center touch-manipulation shadow-md"
                >
                  پەیوەندی
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
