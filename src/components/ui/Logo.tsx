"use client";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  showMark = true,
  arabic = true,
}: {
  className?: string;
  showMark?: boolean;
  arabic?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-2xl font-medium tracking-tight leading-none",
        className
      )}
      style={{ fontFamily: "var(--font-arabic), var(--font-serif), serif" }}
    >
      {showMark && (
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#8B6F4E] text-[11px] font-bold text-white">
          {arabic ? "ل" : "L"}
        </span>
      )}
      <span>{arabic ? "لمسة" : "Lamsa"}</span>
    </span>
  );
}
