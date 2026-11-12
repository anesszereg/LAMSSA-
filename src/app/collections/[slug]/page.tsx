import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Ruler, Palette, BookOpen } from "lucide-react";
import { getCollections } from "@/lib/collections";

export const dynamic = "force-dynamic";
import { formatPrice, formatDimension } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/luxury/ScrollReveal";
import { ProductCard } from "@/components/luxury/ProductCard";
import { ScrollCinema } from "@/components/luxury/ScrollCinema";
import { RoomPurchase } from "@/components/shop/RoomPurchase";

export async function generateStaticParams() {
  return (await getCollections()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = (await getCollections()).find((c) => c.slug === slug);
  return {
    title: `${collection?.name || "Collection"} | Lamsa`,
    description: collection?.tagline,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      title: `${collection?.name || "Collection"} | Lamsa`,
      description: collection?.tagline,
      url: `/collections/${slug}`,
      images: collection ? [{ url: collection.heroImage, alt: collection.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection?.name || "Collection"} | Lamsa`,
      description: collection?.tagline,
      images: collection ? [collection.heroImage] : [],
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = (await getCollections()).find((c) => c.slug === slug);
  if (!collection) return notFound();

  return (
    <div className="bg-[#FAFAF8] pb-32 dark:bg-[#1A1816]">
      {/* HERO */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src={collection.heroImage}
          alt={collection.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-6 pb-20 lg:px-10">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
              {collection.roomType}
            </p>
            <h1 className="editorial-heading max-w-4xl font-serif text-5xl font-light text-white md:text-7xl lg:text-8xl">
              {collection.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/80">
              {collection.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* CINEMATIC FILM — scroll-scrubbed */}
      {collection.videoUrl && (
        <div id="film">
          <ScrollCinema
          src={collection.videoUrl}
          index={1}
          title={collection.name}
          tagline={collection.tagline}
        />
        </div>
      )}

      {/* STORY */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              The Story
            </p>
            <p className="editorial-body text-xl leading-relaxed text-foreground/80 lg:text-2xl">
              {collection.story}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              Designer Notes
            </p>
            <p className="editorial-body text-lg leading-relaxed text-foreground/70">
              {collection.designerNotes}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* GALLERY + DETAILS */}
      <section className="border-y border-[#E8E0D5]/60 bg-[#F5F0E8] py-24 dark:border-white/10 dark:bg-[#2C2A26]">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-3">
            {collection.gallery.map((image, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={`${collection.name} view ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-3">
            <ScrollReveal>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAF8] dark:bg-[#1A1816]">
                  <Palette className="h-5 w-5 text-[#8B6F4E]" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-medium">Color Palette</h3>
                  <div className="flex flex-wrap gap-3">
                    {collection.colorPalette.map((color) => (
                      <div key={color.name} className="flex items-center gap-2">
                        <span
                          className="h-8 w-8 rounded-full border border-foreground/10 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm text-foreground/70">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAF8] dark:bg-[#1A1816]">
                  <BookOpen className="h-5 w-5 text-[#8B6F4E]" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-medium">Materials</h3>
                  <ul className="space-y-1 text-foreground/70">
                    {collection.materials.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FAFAF8] dark:bg-[#1A1816]">
                  <Ruler className="h-5 w-5 text-[#8B6F4E]" />
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-xl font-medium">Dimensions</h3>
                  <p className="text-foreground/70">
                    {formatDimension(collection.dimensions)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRICING & CTA */}
      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-[#1A1816] p-10 text-white dark:bg-[#2C2A26] lg:flex-row lg:items-center lg:p-16">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C9B8A5]">
                Estimated Collection Price
              </p>
              <p className="font-serif text-4xl font-light md:text-5xl">
                {formatPrice(collection.estimatedPrice, collection.currency)}
              </p>
              <p className="mt-2 text-white/60">
                Includes all furniture, materials, and finishes shown.
              </p>
            </div>
            <div className="flex w-full flex-wrap gap-4 lg:max-w-sm">
              <RoomPurchase slug={collection.slug} />
              <MagneticButton
                href={`/experience/${collection.slug}`}
                variant="secondary"
              >
                Explore in 360°
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/booking" variant="outline">
                Book a Call
              </MagneticButton>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* INCLUDED PRODUCTS */}
      <section className="mx-auto max-w-[1600px] px-6 pb-24 lg:px-10">
        <ScrollReveal>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
                Furniture Included
              </p>
              <h2 className="editorial-heading font-serif text-4xl font-light">
                Shop the room
              </h2>
            </div>
            <MagneticButton href="/experience/serenity-suite" variant="outline">
              Explore Lamsa Immersion
            </MagneticButton>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {collection.products.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
