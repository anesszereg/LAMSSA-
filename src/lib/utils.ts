import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatDimension(
  dimensions: { width: number; height: number; depth: number; unit: string }
) {
  const { width, height, depth, unit } = dimensions;
  return `${width} × ${height} × ${depth} ${unit}`;
}
