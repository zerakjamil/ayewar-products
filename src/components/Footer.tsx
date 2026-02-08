"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

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
    <footer className="border-t border-[var(--color-border)] mt-20 md:mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="text-xl font-bold tracking-wide text-[var(--color-text)]">
              AYEWAR
            </Link>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mt-4 max-w-xs">
              لە ئایەواردا، باوەڕمان بە ئەوەیە کە گەیشتن بە تەواوی توانای
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
        <div className="mt-14 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            © ٢٠٢٦ ئایەوار - هەموو مافەکان پارێزراوە.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Twitter size={14} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-8 h-8 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
