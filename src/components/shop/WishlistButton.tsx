"use client";

import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "md";
}

export function WishlistButton({
  productId,
  className,
  size = "md",
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistStore();
  const active = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(productId);
    toast(active ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={active}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-300",
        size === "md"
          ? "h-10 w-10 bg-white/90 shadow-sm hover:bg-white"
          : "h-8 w-8 bg-white/80",
        active ? "text-red-500" : "text-[#1A1816] hover:text-red-500",
        className
      )}
    >
      <Heart
        className={cn(
          size === "md" ? "h-4 w-4" : "h-3.5 w-3.5",
          active && "fill-current"
        )}
      />
    </button>
  );
}
