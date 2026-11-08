"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function HtmlDirector() {
  const { dir, locale } = useLocale();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    document.documentElement.classList.remove("ltr", "rtl");
    document.documentElement.classList.add(dir);
  }, [dir, locale]);

  return null;
}
