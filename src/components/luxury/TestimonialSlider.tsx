"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/types";

interface TestimonialSliderProps {
  testimonials: Testimonial[];
}

export function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] bg-white p-10 shadow-sm dark:bg-[#1A1816] md:p-16">
        <Quote className="absolute right-8 top-8 h-12 w-12 text-[#E8E0D5] dark:text-[#2C2A26]" />
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <p className="editorial-body max-w-2xl font-serif text-xl font-light leading-relaxed text-foreground md:text-2xl">
              “{testimonials[index].quote}”
            </p>
            <div className="mt-10 flex flex-col items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={testimonials[index].image}
                  alt={testimonials[index].author}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-serif text-lg font-medium">
                  {testimonials[index].author}
                </p>
                <p className="text-sm text-foreground/60">
                  {testimonials[index].role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E0D5] transition-colors hover:bg-[#E8E0D5]/30 dark:border-white/10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#8B6F4E]" : "w-2 bg-[#E8E0D5] dark:bg-white/20"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E8E0D5] transition-colors hover:bg-[#E8E0D5]/30 dark:border-white/10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
