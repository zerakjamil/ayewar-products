"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image 
            src={ayewarLogo} 
            alt="Ayewar" 
            width={120} 
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Center nav - pill container */}
        <div className="hidden md:flex items-center gap-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-5 py-2 rounded-full text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="bg-[var(--color-accent)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            پەیوەندی
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[var(--color-text)] p-2"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] py-3 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-[var(--color-accent)] text-white px-6 py-3 rounded-full text-sm font-medium text-center mt-2"
              >
                پەیوەندی
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
