import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/40 bg-white/70 p-8 backdrop-blur-xl transition-all duration-500",
        "dark:border-white/10 dark:bg-[#2C2A26]/70",
        hover && "hover:-translate-y-1 hover:bg-white/85 hover:shadow-xl dark:hover:bg-[#2C2A26]/85",
        className
      )}
    >
      {children}
    </div>
  );
}
