import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCollections } from "@/lib/collections";

export const dynamic = "force-dynamic";
import { ExperienceClient } from "@/components/three/ExperienceClient";

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
    title: collection ? `${collection.name} | Lamsa Immersion` : "Lamsa Immersion",
    description: collection?.tagline,
    alternates: { canonical: `/experience/${slug}` },
    openGraph: {
      title: collection ? `${collection.name} | Lamsa Immersion` : "Lamsa Immersion",
      description: collection?.tagline,
      url: `/experience/${slug}`,
      images: collection ? [{ url: collection.heroImage, alt: collection.name }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: collection ? `${collection.name} | Lamsa Immersion` : "Lamsa Immersion",
      description: collection?.tagline,
      images: collection ? [collection.heroImage] : [],
    },
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collections = await getCollections();
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return notFound();

  return <ExperienceClient key={collection.slug} collection={collection} collections={collections} />;
}
