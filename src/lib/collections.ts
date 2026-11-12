import "server-only";
import { prisma } from "@/lib/prisma";
import { collections } from "@/lib/data";
import type { Collection } from "@/types";

export async function getCollections(): Promise<Collection[]> {
  if (!process.env.DATABASE_URL) return collections;
  const rows = await prisma.collection.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map((row) => ({
    ...row,
    videoUrl: row.videoUrl ?? undefined,
    tourUrl: row.tourUrl ?? undefined,
    dimensions: row.dimensions as Collection["dimensions"],
    colorPalette: row.colorPalette as Collection["colorPalette"],
    featured: false,
    products: [],
  }));
}
