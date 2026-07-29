"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/shop/WishlistButton";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F0E8]">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {(product.isNew || product.isBestseller) && (
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="rounded-full bg-[#1A1816] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  New
                </span>
              )}
              {product.isBestseller && (
                <span className="rounded-full bg-[#8B6F4E] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                  Bestseller
                </span>
              )}
            </div>
          )}
          <div className="absolute right-4 top-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <WishlistButton productId={product.id} />
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/50">
            {product.category}
          </p>
          <h3 className="font-serif text-lg font-medium text-foreground">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-foreground/80">
            {formatPrice(product.price, product.currency)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
