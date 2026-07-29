import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collections as mockCollections } from "@/lib/data";
import { z } from "zod";

const dbConfigured = !!process.env.DATABASE_URL;

const collectionSchema = z.object({
  slug: z.string(),
  name: z.string(),
  roomType: z.string(),
  tagline: z.string(),
  heroImage: z.string(),
  story: z.string(),
  designerNotes: z.string(),
  estimatedPrice: z.number().int(),
  currency: z.string().default("USD"),
  dimensions: z.object({ width: z.number(), height: z.number(), depth: z.number(), unit: z.string() }),
  materials: z.array(z.string()),
  colorPalette: z.array(z.object({ name: z.string(), hex: z.string() })),
  gallery: z.array(z.string()),
});

export async function GET() {
  if (!dbConfigured) {
    return NextResponse.json({ collections: mockCollections });
  }

  const collections = await prisma.collection.findMany({
    include: { products: { select: { id: true, name: true, slug: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ collections });
}

export async function POST(req: NextRequest) {
  if (!dbConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json();
  const parsed = collectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const collection = await prisma.collection.create({
    data: parsed.data as any,
    include: { products: { select: { id: true, name: true, slug: true } } },
  });

  return NextResponse.json({ collection }, { status: 201 });
}
