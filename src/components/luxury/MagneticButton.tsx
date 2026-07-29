"use client";

import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = "primary",
  href,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-500",
    variant === "primary" &&
      "bg-[#1A1816] text-[#FAFAF8] hover:bg-[#2C2A26] dark:bg-[#FAFAF8] dark:text-[#1A1816] dark:hover:bg-[#E8E0D5]",
    variant === "secondary" &&
      "bg-[#8B6F4E] text-white hover:bg-[#6B5437]",
    variant === "outline" &&
      "border border-[#1A1816]/20 bg-transparent text-[#1A1816] hover:border-[#1A1816] dark:border-white/20 dark:text-[#FAFAF8] dark:hover:border-white",
    variant === "ghost" &&
      "bg-transparent text-[#1A1816] hover:bg-[#1A1816]/5 dark:text-[#FAFAF8] dark:hover:bg-white/5",
    disabled && "pointer-events-none opacity-50",
    className
  );

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:translate-x-0.5">
        {children}
      </span>
      <motion.span
        className={cn(
          "absolute inset-0 origin-center scale-0 rounded-full transition-transform duration-500 group-hover:scale-150",
          variant === "primary" ? "bg-[#2C2A26] dark:bg-[#E8E0D5]" : "bg-[#1A1816]/5 dark:bg-white/5"
        )}
      />
    </>
  );

  const props = {
    ref: ref as React.RefObject<HTMLButtonElement & HTMLAnchorElement>,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: baseStyles,
    onClick,
    disabled,
  };

  if (href) {
    return (
      <motion.a href={href} {...props}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...props}>
      {content}
    </motion.button>
  );
}
