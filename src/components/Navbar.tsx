"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ayewarLogo from "@/assets/icons/ayewar-icon.png";
import { useLanguage } from "@/i18n/context";
import type { Locale } from "@/i18n/translations";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { locale, setLocale, t } = useLanguage();
  const labels = { ckb: { menu: "مینو", language: "زمان", skip: "بڕۆ بۆ ناوەڕۆک" }, ar: { menu: "القائمة", language: "اللغة", skip: "انتقل إلى المحتوى" }, en: { menu: "Menu", language: "Language", skip: "Skip to content" } }[locale];
  const links = [{ href: "/products", name: t.nav.products }, { href: "/about", name: t.nav.about }, { href: "/contact", name: t.nav.contact }];
  const active = (href: string) => href === "/products" ? pathname === "/" || pathname.startsWith(href) : pathname === href;
  return (
    <header className="site-header" onKeyDown={(event) => { if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); } }}>
      <a href="#main-content" className="skip-link">{labels.skip}</a>
      <div className="site-container header-inner">
        <Link href="/" aria-label="Ayewar" className="brand-link"><Image src={ayewarLogo} alt="Ayewar" width={120} height={64} priority className="brand-logo" /></Link>
        <nav className="desktop-nav" aria-label={t.nav.home}>
          {links.map((link) => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.name}</Link>)}
        </nav>
        <div className="header-actions">
          <select className="language-select" aria-label={labels.language} value={locale} onChange={(event) => setLocale(event.target.value as Locale)}>
            <option value="ckb">کوردی</option><option value="ar">العربية</option><option value="en">English</option>
          </select>
          <button ref={trigger} className="menu-toggle" aria-label={labels.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav site-container" aria-label={labels.menu}>
        {links.map((link) => <Link key={link.href} href={link.href} aria-current={active(link.href) ? "page" : undefined} onClick={() => setOpen(false)}>{link.name}</Link>)}
      </nav>}
    </header>
  );
}
