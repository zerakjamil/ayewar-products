"use client";
import Link from "next/link";
import { useLanguage } from "@/i18n/context";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="site-container portfolio-heading">
      <h1>{t.nav.products}</h1>
      <Link className="play-link" href="/play">{t.nav.play} ↗</Link>
    </section>
  );
}
