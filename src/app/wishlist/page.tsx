"use client";

import { products } from "@/lib/data";
import { useWishlistStore } from "@/stores/wishlist";
import { ProductCard } from "@/components/luxury/ProductCard";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-32 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
            Wishlist
          </h1>
        </ScrollReveal>

        {wishlistProducts.length === 0 ? (
          <div className="mt-20 flex flex-col items-center gap-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8E0D5]/30">
              <Heart className="h-10 w-10 text-foreground/40" />
            </div>
            <p className="text-lg text-foreground/60">Your wishlist is empty.</p>
            <MagneticButton href="/collections" variant="primary">
              Explore Collections
            </MagneticButton>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
