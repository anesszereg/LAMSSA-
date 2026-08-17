import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { collections as mockCollections, products as mockProducts } from "@/lib/data";
import { z } from "zod";

const dbConfigured = !!process.env.DATABASE_URL;

const finishSchema = z.object({
  name: z.string(),
  hex: z.string(),
  priceAdjustment: z.number().int().default(0),
});

const colorSchema = z.object({
  name: z.string(),
  hex: z.string(),
  priceAdjustment: z.number().int().default(0),
});

const productSchema = z.object({
  slug: z.string(),
  sku: z.string(),
  name: z.string(),
  category: z.string(),
  shortDescription: z.string(),
  description: z.string(),
  price: z.number().int(),
  currency: z.string().default("DZD"),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    unit: z.string(),
  }),
  materials: z.array(z.string()),
  images: z.array(z.string()),
  thumbnail: z.string(),
  specifications: z.record(z.string()),
  isBestseller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  collectionSlug: z.string().optional(),
  finishes: z.array(finishSchema).default([]),
  colors: z.array(colorSchema).default([]),
});

const updateSchema = productSchema.partial().extend({ id: z.string() });

function syncCollectionProducts() {
  for (const collection of mockCollections) {
    collection.products = mockProducts.filter(
      (p) => p.collectionSlug === collection.slug
    );
  }
}

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
  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { collectionSlug, finishes, colors, ...data } = parsed.data;

  if (!dbConfigured) {
    const collection = mockCollections.find((c) => c.slug === collectionSlug);
    const product = {
      id: crypto.randomUUID(),
      ...data,
      collectionSlug: collection?.slug,
      inStock: true,
      rating: 0,
      reviewCount: 0,
      finishes: [],
      colors: [],
    };
    mockProducts.push(product);
    syncCollectionProducts();
    return NextResponse.json({ product }, { status: 201 });
  }

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

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, collectionSlug, finishes, colors, ...data } = parsed.data;

  if (!dbConfigured) {
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const collection = mockCollections.find((c) => c.slug === collectionSlug);
    mockProducts[index] = {
      ...mockProducts[index],
      ...data,
      id,
      collectionSlug: collectionSlug === undefined
        ? mockProducts[index].collectionSlug
        : collection?.slug,
      finishes: finishes ?? mockProducts[index].finishes,
      colors: colors ?? mockProducts[index].colors,
    } as (typeof mockProducts)[number];
    syncCollectionProducts();
    return NextResponse.json({ product: mockProducts[index] });
  }

  const collection = collectionSlug
    ? await prisma.collection.findUnique({ where: { slug: collectionSlug } })
    : null;

  const updateData: Record<string, unknown> = { ...data };
  if (collectionSlug !== undefined) {
    updateData.collectionId = collection?.id ?? null;
  }

  const product = await prisma.product.update({
    where: { id },
    data: updateData,
    include: { finishes: true, colors: true, collection: true },
  });

  if (finishes || colors) {
    await prisma.finish.deleteMany({ where: { productId: id } });
    await prisma.color.deleteMany({ where: { productId: id } });
    await prisma.product.update({
      where: { id },
      data: {
        finishes: { create: finishes || [] },
        colors: { create: colors || [] },
      },
      include: { finishes: true, colors: true, collection: true },
    });
  }

  return NextResponse.json({ product });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  if (!dbConfigured) {
    const index = mockProducts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    mockProducts.splice(index, 1);
    syncCollectionProducts();
    return NextResponse.json({ success: true });
  }

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
