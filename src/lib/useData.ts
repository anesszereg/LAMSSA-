"use client";

import { useQuery } from "@tanstack/react-query";
import type { Collection } from "@/types";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import * as en from "@/lib/data";
import * as ar from "@/lib/dataAr";

export function useData() {
  const { locale } = useLocale();
  const fallback = locale === "ar" ? ar : en;
  const { data } = useQuery({
    queryKey: ["public-collections"],
    queryFn: async () => {
      const res = await fetch("/api/collections");
      if (!res.ok) throw new Error("Unable to load collections");
      return res.json() as Promise<{ collections: Collection[]; managed: boolean }>;
    },
    staleTime: 0,
  });
  return { ...fallback, collections: data?.managed ? data.collections : fallback.collections };
}
