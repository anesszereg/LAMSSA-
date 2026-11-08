"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Orbit, Clapperboard } from "lucide-react";
import { useData } from "@/lib/useData";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { formatPrice } from "@/lib/utils";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";

export default function CollectionsPage() {
  const { t, dir } = useLocale();
  const { collections } = useData();

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]" dir={dir}>
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        {/* HEADER */}
        <ScrollReveal className="mb-24 flex flex-col justify-between gap-8 border-b border-foreground/10 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              {t("roomCollections")}
            </p>
            <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl lg:text-7xl">
              {t("completeEnvironments")}
            </h1>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-foreground/60">
            {t("collectionsIntro")}
          </p>
        </ScrollReveal>

        {/* ROOM INDEX */}
        <div className="space-y-32">
          {collections.map((collection, i) => {
            const reversed = i % 2 === 1;
            return (
              <ScrollReveal key={collection.slug}>
                <article className="group grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  {/* IMAGE */}
                  <Link
                    href={`/collections/${collection.slug}`}
                    className={`relative block overflow-hidden rounded-3xl lg:col-span-7 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/11] w-full">
                      <Image
                        src={collection.heroImage}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
                      {/* index badge */}
                      <span className="absolute left-6 top-6 rounded-full bg-black/30 px-4 py-2 font-serif text-sm text-white backdrop-blur-md">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {/* hover arrow */}
                      <span className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-[#C9A86C] group-hover:text-[#1A1816]">
                        <ArrowUpRight className="h-5 w-5 text-white transition-colors group-hover:text-[#1A1816]" />
                      </span>
                    </div>
                  </Link>

                  {/* DETAILS */}
                  <div
                    className={`lg:col-span-5 ${
                      reversed ? "lg:order-1 lg:text-right" : ""
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B6F4E]">
                      {collection.roomType}
                    </p>
                    <h2 className="editorial-heading mt-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl">
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="transition-colors hover:text-[#8B6F4E]"
                      >
                        {collection.name}
                      </Link>
                    </h2>
                    <p className="mt-5 text-base leading-relaxed text-foreground/60 lg:text-lg">
                      {collection.tagline}
                    </p>

                    {/* materials */}
                    <div
                      className={`mt-6 flex flex-wrap gap-2 ${
                        reversed ? "lg:justify-end" : ""
                      }`}
                    >
                      {collection.materials.slice(0, 4).map((m) => (
                        <span
                          key={m}
                          className="rounded-full border border-foreground/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-foreground/60"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    {/* price */}
                    <p className="mt-6 font-serif text-2xl font-light text-foreground/80">
                      {formatPrice(collection.estimatedPrice, collection.currency)}
                      <span className="ml-2 text-xs uppercase tracking-[0.2em] text-foreground/40">
                        {collection.currency === "DZD" ? "est." : "estimated"}
                      </span>
                    </p>

                    {/* actions */}
                    <div
                      className={`mt-8 flex flex-wrap items-center gap-3 ${
                        reversed ? "lg:justify-end" : ""
                      }`}
                    >
                      <Link
                        href={`/collections/${collection.slug}`}
                        className="rounded-full bg-[#1A1816] px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8B6F4E] dark:bg-[#C9A86C] dark:text-[#1A1816] dark:hover:bg-[#d9b87e]"
                      >
                        View Room
                      </Link>
                      {collection.tourUrl && (
                        <Link
                          href={`/experience/${collection.slug}`}
                          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-[#8B6F4E] hover:text-[#8B6F4E]"
                        >
                          <Orbit className="h-4 w-4" />
                          360° Tour
                        </Link>
                      )}
                      {collection.videoUrl && (
                        <Link
                          href={`/collections/${collection.slug}#film`}
                          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:border-[#8B6F4E] hover:text-[#8B6F4E]"
                        >
                          <Clapperboard className="h-4 w-4" />
                          Film
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
