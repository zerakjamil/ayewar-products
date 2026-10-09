"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";
import { useLanguage } from "@/i18n/context";

const productLinks = [
  { name: "Chessmancer", href: "/products/chessmancer" },
  { name: "Dallak", href: "/products/dallak" },
  { name: "Dallak Partners", href: "/products/dallak-partners" },
  { name: "Raiders", href: "/products/raiders" },
  { name: "Students", href: "/products/students" },
  { name: "Zidobid", href: "/products/zidobid" },
];

export default function Footer() {
  const { t } = useLanguage();

  const companyLinks = [
    { name: t.nav.about, href: "/about" },
    { name: t.nav.contact, href: "/contact" },
    { name: t.nav.products, href: "/products" },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] mt-20 sm:mt-28 md:mt-36 bg-[var(--color-bg-secondary)]/50">
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
                className="h-8 sm:h-9 w-auto"
              />
            </Link>
            <p className="text-[var(--color-text-muted)] text-xs sm:text-sm leading-relaxed mt-4 max-w-xs">
              {t.footer.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-mono">
              <span>{t.footer.engineerLabel}</span>
              <span className="text-[var(--color-text)] font-semibold">{t.footer.engineerName}</span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider">
              {t.footer.productsTitle}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs sm:text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs sm:text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & GitHub */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text)] mb-4 uppercase tracking-wider">
              {t.footer.contactTitle}
            </h4>
            <a
              href="mailto:info@ayewar.com"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] text-xs sm:text-sm transition-colors block mb-4"
            >
              info@ayewar.com
            </a>
            <a
              href="https://github.com/zerakjamil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs border border-[var(--color-border)] bg-[var(--color-bg-card)] px-3 py-2 rounded-lg text-[var(--color-text)] hover:border-[var(--color-border-hover)] transition-colors"
            >
              <Github size={14} />
              <span>github.com/zerakjamil</span>
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>{t.footer.copyright}</p>
          <p className="font-mono">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
