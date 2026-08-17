import { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";

export const metadata: Metadata = {
  title: "About | Adlane Luxury Interiors",
  description:
    "Learn about Adlane's philosophy of curated luxury interiors and made-in-Italy craftsmanship.",
};

const stats = [
  { value: "40+", label: "Years of Craft" },
  { value: "120", label: "Atelier Artisans" },
  { value: "35", label: "Countries Served" },
  { value: "∞", label: "Room Concepts" },
];

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              About Adlane
            </p>
            <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl lg:text-7xl">
              The art of
              <br />
              <span className="italic">living well.</span>
            </h1>
            <p className="editorial-body mt-8 max-w-xl text-lg leading-relaxed text-foreground/70">
              Founded on the belief that a room should feel like a private sanctuary,
              Adlane brings together Italian craftsmanship, architectural rigor, and a
              deep respect for materials. Every collection is conceived as a complete
              environment — not a catalog of objects.
            </p>
            <p className="editorial-body mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
              Our ateliers in Milan and our digital showroom work in harmony to let
              clients walk through their future home before a single piece is made.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?auto=format&fit=crop&w=1600&q=80"
                alt="Adlane atelier interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-32 grid gap-8 border-t border-[#E8E0D5]/60 pt-20 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <ScrollReveal key={stat.label} delay={0.1}>
              <div className="text-center">
                <p className="font-serif text-5xl font-light text-[#8B6F4E]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm uppercase tracking-wider text-foreground/60">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-32 rounded-[2rem] bg-[#F5F0E8] p-10 dark:bg-[#2C2A26] lg:p-20">
          <h2 className="editorial-heading max-w-3xl font-serif text-4xl font-light md:text-5xl">
            Materials first.
            <br />
            Design follows.
          </h2>
          <p className="editorial-body mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
            From Statuario marble to vegetable-tanned leather, we select every surface
            for how it ages, how it feels, and how it catches light. Sustainability is
            not a feature — it is the natural result of choosing things made to last
            generations.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
