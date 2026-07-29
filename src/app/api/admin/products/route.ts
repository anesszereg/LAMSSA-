import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { products as mockProducts } from "@/lib/data";
import { z } from "zod";

const dbConfigured = !!process.env.DATABASE_URL;

const productSchema = z.object({
  slug: z.string(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  price: z.number().int(),
  currency: z.string().default("USD"),
  dimensions: z.object({ width: z.number(), height: z.number(), depth: z.number(), unit: z.string() }),
  materials: z.array(z.string()),
  images: z.array(z.string()),
  thumbnail: z.string(),
  specifications: z.record(z.string()),
  isBestseller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  collectionSlug: z.string().optional(),
  finishes: z.array(z.object({ name: z.string(), hex: z.string(), priceAdjustment: z.number().int().default(0) })).default([]),
  colors: z.array(z.object({ name: z.string(), hex: z.string(), priceAdjustment: z.number().int().default(0) })).default([]),
});

export async function GET() {
  if (!dbConfigured) {
    return NextResponse.json({ products: mockProducts });
  }

  const products = await prisma.product.findMany({
    include: { finishes: true, colors: true, collection: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  if (!dbConfigured) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { collectionSlug, finishes, colors, ...data } = parsed.data;
  const collection = collectionSlug
    ? await prisma.collection.findUnique({ where: { slug: collectionSlug } })
    : null;

  const product = await prisma.product.create({
    data: {
      ...data,
      collectionId: collection?.id ?? null,
      finishes: { create: finishes },
      colors: { create: colors },
    },
    include: { finishes: true, colors: true, collection: true },
  });

  return NextResponse.json({ product }, { status: 201 });
}
