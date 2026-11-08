"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LangToggle({ className }: { className?: string }) {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className={
        "rounded-full border border-[#E8E0D5] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-colors hover:bg-foreground/5 dark:border-white/10 " +
        className
      }
      aria-label="Toggle language"
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
