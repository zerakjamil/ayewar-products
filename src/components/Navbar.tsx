"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Github, ArrowUpRight, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";
import { useLanguage } from "@/i18n/context";
import { Locale } from "@/i18n/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { locale, setLocale, t, dir } = useLanguage();

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.products, href: "/products" },
    { name: t.nav.about, href: "/about" },
  ];

  const languages: { code: Locale; label: string }[] = [
    { code: "ckb", label: "کوردی" },
    { code: "ar", label: "عربي" },
    { code: "en", label: "EN" },
  ];

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
          aria-label="Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side controls: Language Switcher + GitHub + Contact */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full p-1 shadow-sm gap-0.5">
            <Globe size={13} className="text-[var(--color-text-muted)] mx-1.5 opacity-70" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`px-2.5 py-1 rounded-full text-xs transition-all ${
                  locale === lang.code
                    ? "bg-[var(--color-text)] text-[var(--color-bg)] font-semibold shadow-xs"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
                aria-label={`Switch to ${lang.label}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

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
            {t.nav.contact}
          </Link>
        </div>

        {/* Mobile: Language + toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full p-0.5 text-xs">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`px-2 py-0.5 rounded-full text-[11px] transition-all ${
                  locale === lang.code
                    ? "bg-[var(--color-text)] text-[var(--color-bg)] font-semibold"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[var(--color-text)] p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-card)] touch-manipulation"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-bg)]/98 border-b border-[var(--color-border)] backdrop-blur-xl px-4 py-6 space-y-4"
          >
            {/* Nav links */}
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[var(--color-text)] hover:bg-[var(--color-bg-card)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-base font-semibold text-[var(--color-text)] bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center transition-colors mt-2"
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Language Switcher in Drawer */}
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                <Globe size={14} />
                <span>Language</span>
              </span>
              <div className="flex items-center bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full p-1 gap-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLocale(lang.code);
                    }}
                    className={`px-3 py-1 rounded-full text-xs transition-all ${
                      locale === lang.code
                        ? "bg-[var(--color-text)] text-[var(--color-bg)] font-semibold"
                        : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* GitHub Profile */}
            <div className="pt-2">
              <a
                href="https://github.com/zerakjamil"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] bg-[var(--color-bg-card)] transition-colors"
              >
                <Github size={14} />
                <span>github.com/zerakjamil</span>
                <ArrowUpRight size={12} className="opacity-60" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
