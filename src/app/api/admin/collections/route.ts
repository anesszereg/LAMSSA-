import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
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
  currency: z.string().default("DZD"),
  dimensions: z.object({
    width: z.number(),
    height: z.number(),
    depth: z.number(),
    unit: z.string(),
  }),
  materials: z.array(z.string()),
  colorPalette: z.array(z.object({ name: z.string(), hex: z.string() })),
  gallery: z.array(z.string()),
});

const updateSchema = collectionSchema.partial().extend({ id: z.string() });

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
  const body = await req.json();
  const parsed = collectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!dbConfigured) {
    const collection = {
      id: crypto.randomUUID(),
      ...parsed.data,
      featured: false,
      products: [],
    };
    mockCollections.push(collection);
    return NextResponse.json({ collection }, { status: 201 });
  }

  const collection = await prisma.collection.create({
    data: parsed.data as Prisma.CollectionCreateInput,
    include: { products: { select: { id: true, name: true, slug: true } } },
  });

  return NextResponse.json({ collection }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, ...data } = parsed.data;

  if (!dbConfigured) {
    const index = mockCollections.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }
    mockCollections[index] = { ...mockCollections[index], ...data } as (typeof mockCollections)[number];
    return NextResponse.json({ collection: mockCollections[index] });
  }

  const collection = await prisma.collection.update({
    where: { id },
    data: data as Prisma.CollectionUpdateInput,
    include: { products: { select: { id: true, name: true, slug: true } } },
  });

  return NextResponse.json({ collection });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  if (!dbConfigured) {
    const index = mockCollections.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: "Collection not found" },
        { status: 404 }
      );
    }
    mockCollections.splice(index, 1);
    return NextResponse.json({ success: true });
  }

  await prisma.collection.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
