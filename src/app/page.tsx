"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useData } from "@/lib/useData";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";
import { CollectionCard } from "@/components/luxury/CollectionCard";

export default function HomePage() {
  const { t, dir } = useLocale();
  const { collections } = useData();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div dir={dir}>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[700px] w-full overflow-hidden"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/room-1/DSC07330.jpg"
            loading="eager"
            alt="Luxury bedroom interior"
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
                {t("heroTagline")}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="editorial-heading font-serif text-5xl font-light text-white md:text-7xl lg:text-8xl"
              >
                {t("heroTitle1")}
                <br />
                <span className="italic">{t("heroTitle2")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
              >
                {t("heroDescription")}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <MagneticButton href="/collections" variant="primary">
                  {t("exploreCollections")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton href="/booking" variant="outline">
                  {t("bookShowroom")}
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
          <span className="text-[10px] uppercase tracking-[0.2em]">{t("scroll")}</span>
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
                {t("lamsaPhilosophy")}
              </p>
              <h2 className="editorial-heading font-serif text-4xl font-light text-foreground md:text-5xl lg:text-6xl">
                {t("introTitle1")}
                <br />
                {t("introTitle2")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="editorial-body max-w-xl text-lg leading-relaxed text-foreground/70">
                {t("introBody")}
              </p>
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
                  {t("curatedCollections")}
                </p>
                <h2 className="editorial-heading font-serif text-4xl font-light md:text-5xl">
                  {t("roomConcepts")}
                </h2>
              </div>
              <MagneticButton href="/collections" variant="outline">
                {t("viewAllCollections")}
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
              {t("threeSixtyExperience")}
            </p>
            <h2 className="editorial-heading mx-auto max-w-4xl font-serif text-4xl font-light text-white md:text-6xl lg:text-7xl">
              {t("showroomHeroTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
              {t("showroomHeroDescription")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/experience/serenity-suite" variant="secondary">
                {t("launch360Showroom")}
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SHOWROOM BOOKING CTA */}
      <section className="bg-[#FAFAF8] py-32 dark:bg-[#1A1816]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="overflow-hidden rounded-[2rem] bg-[#1A1816] px-8 py-24 text-center text-white dark:bg-[#2C2A26] md:px-16">
            <ScrollReveal>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9B8A5]">
                {t("privateAppointments")}
              </p>
              <h2 className="editorial-heading mx-auto max-w-3xl font-serif text-4xl font-light md:text-6xl">
                {t("showroomVisitTitle")}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-white/70">
                {t("showroomVisitDescription")}
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <MagneticButton href="/booking" variant="secondary">
                  {t("bookVisit")}
                </MagneticButton>
                <MagneticButton href="/contact" variant="outline">
                  {t("contact")}
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
