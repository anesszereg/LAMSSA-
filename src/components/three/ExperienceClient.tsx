"use client";

import { useState } from "react";
import {
  Maximize,
  Download,
  Share2,
  Orbit,
  Images,
} from "lucide-react";
import { Collection } from "@/types";
import { RoomCarousel } from "@/components/three/RoomCarousel";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { toast } from "sonner";

export function ExperienceClient({ collection }: { collection: Collection }) {
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
              360° Experience
            </p>
            <h1 className="font-serif text-4xl font-light md:text-5xl">
              {collection.name}
            </h1>
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

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-full bg-white/10 p-2 backdrop-blur-md">
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

          <div className="space-y-6 rounded-3xl bg-[#2C2A26] p-6">
            <div className="rounded-2xl bg-[#1A1816] p-5">
              <p className="text-xs uppercase tracking-wider text-white/50">Collection Price</p>
              <p className="mt-1 font-serif text-3xl font-light">
                {formatPrice(collection.estimatedPrice, collection.currency)}
              </p>
              <MagneticButton
                href="/booking"
                variant="secondary"
                className="mt-5 w-full !px-5 !py-3"
              >
                Book Consultation
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
