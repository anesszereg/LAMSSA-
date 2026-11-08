"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ScrollCinemaProps {
  src: string;
  title: string;
  tagline?: string;
  href?: string;
  index: number;
}

export function ScrollCinema({
  src,
  title,
  tagline,
  href,
  index,
}: ScrollCinemaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration) return;
    const target = progress * duration;
    if (Math.abs(video.currentTime - target) > 0.05) {
      video.currentTime = target;
    }
  });

  // Overlay fades in mid-scroll, then out as the sequence ends
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.7, 0.9],
    [0, 1, 1, 0]
  );
  const overlayY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1A1816]">
        <motion.video
          ref={videoRef}
          src={src}
          style={{ scale: videoScale }}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <motion.div
          style={{ opacity: overlayOpacity, y: overlayY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
            {String(index).padStart(2, "0")}
          </p>
          <h3 className="editorial-heading font-serif text-5xl font-light md:text-7xl">
            {title}
          </h3>
          {tagline && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">
              {tagline}
            </p>
          )}
          {href && (
            <a
              href={href}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/90 backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-[#1A1816]"
            >
              Explore Room
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}
