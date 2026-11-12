"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize,
  Download,
  Share2,
  Orbit,
  Images,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";
import { Collection } from "@/types";
import { RoomCarousel } from "@/components/three/RoomCarousel";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { toast } from "sonner";
import { RoomPurchase } from "@/components/shop/RoomPurchase";

export function ExperienceClient({ collection, collections }: { collection: Collection; collections: Collection[] }) {
  const roomIndex = collections.findIndex((room) => room.slug === collection.slug);
  const previousRoom = collections[(roomIndex - 1 + collections.length) % collections.length];
  const nextRoom = collections[(roomIndex + 1) % collections.length];
  const [view, setView] = useState<"tour" | "gallery">(
    collection.tourUrl ? "tour" : "gallery"
  );

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Configuration link copied to clipboard.");
  };

  const handleGenerateQuote = () => {
    toast.success("PDF quotation generated and downloaded.");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1A1816] pt-24 text-white">
      <div className="mx-auto max-w-[1800px] px-4 pb-12 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9B8A5]">
              Lamsa Immersion
            </p>
            <h1 className="font-serif text-4xl font-light md:text-5xl">
              {collection.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">{collection.tagline}</p>
            <p className="mt-3 text-xs uppercase tracking-widest text-[#C9B8A5]">Room {roomIndex + 1} of {collections.length}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton onClick={handleGenerateQuote} variant="secondary" className="!px-5 !py-3">
              <Download className="h-4 w-4" />
              PDF Quote
            </MagneticButton>
            <MagneticButton onClick={handleShare} variant="outline" className="!px-5 !py-3">
              <Share2 className="h-4 w-4" />
              Share
            </MagneticButton>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="relative">
            {collection.tourUrl && view === "tour" ? (
              <div className="relative h-[60vh] w-full overflow-hidden rounded-3xl bg-[#F5F0E8] md:h-[75vh]">
                <iframe
                  src={collection.tourUrl}
                  title={`${collection.name} - 360° Tour`}
                  className="h-full w-full border-0"
                  allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
                  allowFullScreen
                />
              </div>
            ) : (
              <RoomCarousel
                collection={collection}
                onSelectProduct={() => {}}
                selectedProductId={null}
              />
            )}

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#2C2A26] p-3">
              <div className="flex items-center gap-2">
                {collection.tourUrl && (
                  <>
                    <button
                      onClick={() => setView("tour")}
                      className={`flex h-10 items-center justify-center gap-2 rounded-full px-4 transition-colors ${
                        view === "tour" ? "bg-[#C9A86C] text-[#1A1816]" : "bg-white/10 hover:bg-white/20"
                      }`}
                      aria-label="Show 360° tour"
                    >
                      <Orbit className="h-4 w-4" />
                      <span className="text-xs">360° Tour</span>
                    </button>
                    <button
                      onClick={() => setView("gallery")}
                      className={`flex h-10 items-center justify-center gap-2 rounded-full px-4 transition-colors ${
                        view === "gallery" ? "bg-[#C9A86C] text-[#1A1816]" : "bg-white/10 hover:bg-white/20"
                      }`}
                      aria-label="Show photo gallery"
                    >
                      <Images className="h-4 w-4" />
                      <span className="text-xs">Gallery</span>
                    </button>
                  </>
                )}
                <button
                  onClick={toggleFullscreen}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
              <p className="px-3 text-xs text-white/60">
                {view === "tour" ? "360° virtual tour" : "Room showcase"}
              </p>
            </div>
          </div>

          <aside className="space-y-6 self-start rounded-3xl border border-white/10 bg-[#2C2A26] p-5">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-2xl">Explore all rooms</h2>
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/60">{collections.length}</span>
              </div>
              <p className="mb-5 text-sm text-white/60">Choose a room to step inside its 360° tour or browse its photos.</p>
              <nav aria-label="Choose a room" className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
                {collections.map((room, index) => {
                  const selected = room.slug === collection.slug;
                  return (
                    <Link
                      key={room.slug}
                      href={`/experience/${room.slug}`}
                      aria-current={selected ? "page" : undefined}
                      className={`flex min-w-[250px] items-center gap-3 rounded-2xl border p-3 transition-colors focus-visible:outline-2 focus-visible:outline-[#C9A86C] lg:min-w-0 ${selected ? "border-[#C9A86C] bg-[#C9A86C]/10" : "border-white/10 hover:border-white/30 hover:bg-white/5"}`}
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image src={room.heroImage} alt={room.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-[10px] uppercase tracking-widest text-[#C9B8A5]">Room {String(index + 1).padStart(2, "0")}</p>
                        <p className="text-sm font-medium">{room.name}</p>
                        <p className="mt-1 text-xs text-white/50">{room.tourUrl ? "360° Tour + Photos" : "Photo gallery"}</p>
                      </div>
                      {selected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#C9A86C]" />}
                    </Link>
                  );
                })}
              </nav>
              {collections.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link href={`/experience/${previousRoom.slug}`} aria-label={`Previous room: ${previousRoom.name}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-3 py-3 text-xs transition-colors hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Previous room</Link>
                  <Link href={`/experience/${nextRoom.slug}`} aria-label={`Next room: ${nextRoom.name}`} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-3 py-3 text-xs transition-colors hover:bg-white/10">Next room<ArrowRight className="h-4 w-4" /></Link>
                </div>
              )}
            </div>
            <Link href={`/collections/${collection.slug}`} className="block text-sm text-[#C9B8A5] underline underline-offset-4 hover:text-white">View room details, photos & film</Link>
            <div className="rounded-2xl bg-[#1A1816] p-5">
              <p className="text-xs uppercase tracking-wider text-white/50">Collection Price</p>
              <p className="mt-1 font-serif text-3xl font-light">
                {formatPrice(collection.estimatedPrice, collection.currency)}
              </p>
              <div className="mt-5"><RoomPurchase slug={collection.slug} /></div>
              <MagneticButton
                href="/booking"
                variant="secondary"
                className="mt-5 w-full !px-5 !py-3"
              >
                Book a Call
              </MagneticButton>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
