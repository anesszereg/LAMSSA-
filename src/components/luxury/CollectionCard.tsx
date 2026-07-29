"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Collection } from "@/types";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  variant?: "large" | "medium";
}

export function CollectionCard({ collection, variant = "medium" }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.slug}`} className="group block">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "relative overflow-hidden rounded-3xl bg-[#F5F0E8] shadow-sm transition-shadow duration-500 group-hover:shadow-xl",
          variant === "large" ? "aspect-[4/5]" : "aspect-[3/4]"
        )}
      >
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            {collection.roomType}
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
          <h3 className="font-serif text-2xl font-medium md:text-3xl">
            {collection.name}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/80">
            {collection.tagline}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
