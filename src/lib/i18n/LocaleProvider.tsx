"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  type Locale,
  defaultLocale,
  dirByLocale,
  t,
  dictionary,
} from "./dictionary";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  isAr: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

const STORAGE_KEY = "lamsa-locale";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  return stored && dictionary[stored] ? stored : defaultLocale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  const toggleLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    setLocale(next);
  };

  const dir = dirByLocale[locale];
  const isAr = locale === "ar";
  const translate = (key: string) => t(locale, key);

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, toggleLocale, dir, t: translate, isAr }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
