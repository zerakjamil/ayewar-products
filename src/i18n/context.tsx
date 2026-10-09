"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, Translations, translations } from "./translations";

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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ckb");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ayewar_locale") as Locale;
    if (saved && (saved === "ckb" || saved === "ar" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("ayewar_locale", newLocale);
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
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
