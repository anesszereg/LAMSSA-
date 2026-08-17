import { Prisma, PrismaClient } from "@prisma/client";
import { collections, products } from "../src/lib/data";

const prisma = new PrismaClient();

async function main() {
  for (const collection of collections) {
    await prisma.collection.upsert({
      where: { slug: collection.slug },
      update: {
        name: collection.name,
        roomType: collection.roomType,
        tagline: collection.tagline,
        heroImage: collection.heroImage,
        story: collection.story,
        designerNotes: collection.designerNotes,
        estimatedPrice: collection.estimatedPrice,
        currency: collection.currency,
        dimensions: collection.dimensions,
        materials: collection.materials,
        colorPalette: collection.colorPalette as Prisma.InputJsonValue,
        gallery: collection.gallery,
      },
      create: {
        id: collection.id,
        slug: collection.slug,
        name: collection.name,
        roomType: collection.roomType,
        tagline: collection.tagline,
        heroImage: collection.heroImage,
        story: collection.story,
        designerNotes: collection.designerNotes,
        estimatedPrice: collection.estimatedPrice,
        currency: collection.currency,
        dimensions: collection.dimensions,
        materials: collection.materials,
        colorPalette: collection.colorPalette as Prisma.InputJsonValue,
        gallery: collection.gallery,
      },
    });
  }

  // Upsert products with relations
  for (const product of products) {
    const collection = await prisma.collection.findUnique({
      where: { slug: product.collectionSlug },
    });

    const upserted = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        sku: product.sku,
        category: product.category,
        shortDescription: product.shortDescription,
        description: product.description,
        price: product.price,
        currency: product.currency,
        dimensions: product.dimensions,
        materials: product.materials,
        images: product.images,
        thumbnail: product.thumbnail,
        specifications: product.specifications as Prisma.InputJsonValue,
        isBestseller: product.isBestseller,
        isNew: product.isNew,
        collectionId: collection?.id ?? null,
      },
      create: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        sku: product.sku,
        category: product.category,
        shortDescription: product.shortDescription,
        description: product.description,
        price: product.price,
        currency: product.currency,
        dimensions: product.dimensions,
        materials: product.materials,
        images: product.images,
        thumbnail: product.thumbnail,
        specifications: product.specifications as Prisma.InputJsonValue,
        isBestseller: product.isBestseller,
        isNew: product.isNew,
        collectionId: collection?.id ?? null,
      },
    });

    // Delete old finishes/colors and recreate
    await prisma.finish.deleteMany({ where: { productId: upserted.id } });
    await prisma.color.deleteMany({ where: { productId: upserted.id } });

    for (const finish of product.finishes) {
      await prisma.finish.create({
        data: {
          name: finish.name,
          hex: finish.hex,
          priceAdjustment: finish.priceAdjustment,
          productId: upserted.id,
        },
      });
    }

    for (const color of product.colors) {
      await prisma.color.create({
        data: {
          name: color.name,
          hex: color.hex,
          priceAdjustment: color.priceAdjustment,
          productId: upserted.id,
        },
      });
    }
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
