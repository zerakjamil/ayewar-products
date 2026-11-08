"use client";
import Link from "next/link";
import { useLanguage } from "@/i18n/context";
export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-container site-footer">
      <span>© 2026 Ayewar</span>
      <div><Link href="/about">{t.footer.engineerName}</Link><a href="mailto:info@ayewar.com">info@ayewar.com</a><a href="https://github.com/zerakjamil" target="_blank" rel="noopener noreferrer">GitHub</a></div>
    </footer>
  );
}
