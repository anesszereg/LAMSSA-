import { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections } from "@/lib/data";
import { ExperienceClient } from "@/components/three/ExperienceClient";

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  return {
    title: collection ? `360° ${collection.name} | Lamsa` : "360° Experience | Lamsa",
    description: collection?.tagline,
  };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) return notFound();

  return <ExperienceClient collection={collection} />;
}
