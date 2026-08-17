"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import { collections, products, testimonials } from "@/lib/data";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";
import { CollectionCard } from "@/components/luxury/CollectionCard";
import { ProductCard } from "@/components/luxury/ProductCard";
import { TestimonialSlider } from "@/components/luxury/TestimonialSlider";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] w-full overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=2400&q=80"
            loading="eager"
            alt="Luxury interior living room"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32 lg:justify-center lg:pb-0"
        >
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
            <div className="max-w-3xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-white/70"
              >
                Immersive Luxury Interiors
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="editorial-heading font-serif text-5xl font-light text-white md:text-7xl lg:text-8xl"
              >
                Live in a
                <br />
                <span className="italic">work of art.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
              >
                Explore complete room concepts in 360°, curate every finish, and
                book a private showroom visit with our design team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <MagneticButton href="/collections" variant="primary">
                  Explore Collections
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/booking" variant="outline">
                  Book Showroom Visit
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="h-10 w-[1px] bg-white/30"
          />
        </motion.div>
      </section>

      {/* INTRO */}
      <section className="relative overflow-hidden bg-[#FAFAF8] py-32 dark:bg-[#1A1816]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <ScrollReveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
                The Adlane Philosophy
              </p>
              <h2 className="editorial-heading font-serif text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
                Every room is a
                <br />
                complete story.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="editorial-body max-w-xl text-lg leading-relaxed text-foreground/70">
                We do not sell individual pieces. We compose environments where
                proportion, material, light and texture exist in quiet dialogue.
                Each collection is a turnkey vision — from architectural furniture
                to the last accent — designed to be experienced before it is
                installed.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-foreground transition-colors hover:text-[#8B6F4E]"
              >
                Our atelier
                <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="bg-[#F5F0E8] py-32 dark:bg-[#2C2A26]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
                  Curated Collections
                </p>
                <h2 className="editorial-heading font-serif text-4xl font-light md:text-5xl">
                  Room concepts
                </h2>
              </div>
              <MagneticButton href="/collections" variant="outline">
                View All Collections
              </MagneticButton>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <StaggerItem key={collection.slug}>
                <CollectionCard collection={collection} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* IMMERSIVE SHOWROOM CTA */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581784878214-8d5596b98a01?auto=format&fit=crop&w=2400&q=80"
            alt="Luxury interior"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center lg:px-10">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              360° Experience
            </p>
            <h2 className="editorial-heading mx-auto max-w-4xl font-serif text-4xl font-light text-white md:text-6xl lg:text-7xl">
              Walk through your future room before a single piece arrives.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              Explore every collection in real-time 3D. Change finishes, wall colors
              and lighting. Click furniture to shop the piece.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/experience/serenity-suite" variant="secondary">
                Launch 360° Showroom
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-[#FAFAF8] py-32 dark:bg-[#1A1816]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <ScrollReveal>
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
                  Signature Pieces
                </p>
                <h2 className="editorial-heading font-serif text-4xl font-light md:text-5xl">
                  Shop individual works
                </h2>
              </div>
              <MagneticButton href="/collections" variant="outline">
                Browse Collections
              </MagneticButton>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#F5F0E8] py-32 dark:bg-[#2C2A26]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <ScrollReveal className="mb-16 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              Client Voices
            </p>
            <h2 className="editorial-heading font-serif text-4xl font-light md:text-5xl">
              Designed for discerning lives
            </h2>
          </ScrollReveal>
          <TestimonialSlider testimonials={testimonials} />
        </div>
      </section>

      {/* SHOWROOM BOOKING CTA */}
      <section className="bg-[#FAFAF8] py-32 dark:bg-[#1A1816]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] bg-[#1A1816] px-8 py-24 text-center text-white dark:bg-[#2C2A26] md:px-16">
            <ScrollReveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9B8A5]">
                Private Appointments
              </p>
              <h2 className="editorial-heading mx-auto max-w-3xl font-serif text-4xl font-light md:text-6xl">
                Visit our showroom and let the room speak for itself.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-white/70">
                Schedule a one-on-one consultation with our design team to
                experience materials, configure finishes, and plan your space.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <MagneticButton href="/booking" variant="secondary">
                  Book a Visit
                </MagneticButton>
                <MagneticButton href="/contact" variant="outline">
                  Contact Us
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
