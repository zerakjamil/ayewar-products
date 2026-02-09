"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";

const productLinks = [
  { name: "ChessIFY", href: "/products/chessify" },
  { name: "Raiders", href: "/products/raiders" },
  { name: "Students", href: "/products/students" },
  { name: "Zidobid", href: "/products/zidobid" },
];

const companyLinks = [
  { name: "دەربارەمان", href: "/about" },
  { name: "بلۆگ", href: "#" },
  { name: "کاریگەری", href: "#" },
  { name: "سیاسەتی تایبەتمەندی", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16 sm:mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center">
              <Image 
                src={ayewarLogo} 
                alt="Ayewar" 
                width={120} 
                height={40}
                className="h-8 sm:h-10 w-auto"
              />
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-4 max-w-xs">
              لە ئەیواردا، باوەڕمان بە ئەوەیە کە گەیشتن بە تەواوی توانای
              داهێنەرانەت پێویستی بە کاری سەخت، دڵسۆزی، و داهێنان هەیە.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)] mb-4">بەرهەمەکان</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)] mb-4">کۆمپانیا</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text)] mb-4">پەیوەندی</h4>
            <a
              href="mailto:info@ayewar.com"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-sm transition-colors block"
            >
              info@ayewar.com
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-14 pt-5 sm:pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-xs sm:text-sm text-center md:text-right">
            © ٢٠٢٦ ئەیوار - هەموو مافەکان پارێزراوە.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/zerakjamil"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
            >
              <Github size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
