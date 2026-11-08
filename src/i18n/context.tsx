"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Locale, Translations, translations } from "./translations";
import { MotionConfig } from "framer-motion";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "ckb",
  setLocale: () => {},
  dir: "rtl",
  t: translations.ckb,
  mounted: false,
});

let memoryLocale: Locale = "ckb";
function getLocale(): Locale {
  try {
    const saved = localStorage.getItem("ayewar_locale");
    if (saved === "ckb" || saved === "ar" || saved === "en") return saved;
  } catch { /* The in-memory preference remains available. */ }
  return memoryLocale;
}
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("ayewar-language", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("ayewar-language", onChange);
  };
}
const subscribeMounted = () => () => {};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getLocale, () => "ckb" as Locale);
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  const setLocale = (newLocale: Locale) => {
    memoryLocale = newLocale;
    try { localStorage.setItem("ayewar_locale", newLocale); } catch { /* Keep language switching available when storage is blocked. */ }
    window.dispatchEvent(new Event("ayewar-language"));
  };

  const dir: "rtl" | "ltr" = locale === "en" ? "ltr" : "rtl";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        dir,
        t: translations[locale],
        mounted,
      }}
    >
      <div dir={dir} className={dir === "ltr" ? "font-sans ltr" : "font-sans rtl"}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
