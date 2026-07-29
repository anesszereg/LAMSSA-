import { Metadata } from "next";
import { collections } from "@/lib/data";
import { CollectionCard } from "@/components/luxury/CollectionCard";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";

export const metadata: Metadata = {
  title: "Collections | Adlane Luxury Interiors",
  description:
    "Discover curated luxury room collections designed as complete living environments.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal className="mb-20 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
            Room Collections
          </p>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl lg:text-7xl">
            Complete environments
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
            Each collection is a fully resolved room concept — furniture,
            materials, lighting and atmosphere designed as one coherent vision.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid gap-8 md:grid-cols-2">
          {collections.map((collection) => (
            <StaggerItem key={collection.slug}>
              <CollectionCard collection={collection} variant="large" />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
