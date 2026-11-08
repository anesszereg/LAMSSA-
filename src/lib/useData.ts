"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";
import * as en from "@/lib/data";
import * as ar from "@/lib/dataAr";

export function useData() {
  const { locale } = useLocale();
  return locale === "ar" ? ar : en;
}
