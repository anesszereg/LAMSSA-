import { Metadata } from "next";
import Image from "next/image";
import { collections, products } from "@/lib/data";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";

export const metadata: Metadata = {
  title: "Gallery | Adlane Luxury Interiors",
  description: "A visual journey through our furniture, materials, and interiors.",
};

export default function GalleryPage() {
  const images = [
    ...collections.map((c) => ({ src: c.heroImage, alt: c.name, span: "col-span-1 row-span-2" })),
    ...products.slice(0, 6).map((p) => ({ src: p.thumbnail, alt: p.name, span: "" })),
    ...collections.flatMap((c) =>
      c.gallery.slice(1, 3).map((src) => ({ src, alt: c.name, span: "" }))
    ),
  ];

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal className="mb-20 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
            Gallery
          </p>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl lg:text-7xl">
            A world of refined detail
          </h1>
        </ScrollReveal>

        <StaggerContainer className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:auto-rows-[280px] lg:grid-cols-4">
          {images.map((image, i) => (
            <StaggerItem
              key={i}
              className={
                i % 5 === 0
                  ? "col-span-2 row-span-2"
                  : i % 7 === 0
                  ? "col-span-2"
                  : ""
              }
            >
              <div className="group relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
