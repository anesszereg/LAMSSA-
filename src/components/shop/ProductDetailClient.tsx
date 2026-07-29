"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Ruler, Shield, Truck } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/stores/cart";
import { formatPrice, formatDimension } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ProductCard } from "@/components/luxury/ProductCard";
import { WishlistButton } from "@/components/shop/WishlistButton";
import { toast } from "sonner";

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.id);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id);
  const [activeImage, setActiveImage] = useState(0);

  const addItem = useCartStore((s) => s.addItem);

  const finish = product.finishes.find((f) => f.id === selectedFinish);
  const color = product.colors.find((c) => c.id === selectedColor);
  const totalPrice =
    product.price + (finish?.priceAdjustment || 0) + (color?.priceAdjustment || 0);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      finish: finish?.name,
      color: color?.name,
    });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-32 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="mb-8 flex items-center gap-3 text-sm text-foreground/50">
          <Link href="/collections" className="hover:text-foreground">
            Collections
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#F5F0E8]">
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute right-4 top-4">
                <WishlistButton productId={product.id} />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl bg-[#F5F0E8] ${
                    activeImage === i ? "ring-2 ring-[#8B6F4E]" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-light md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-foreground/70">
              {formatPrice(totalPrice, product.currency)}
            </p>

            <p className="editorial-body mt-8 text-foreground/70">
              {product.description}
            </p>

            {product.finishes.length > 0 && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-medium">Finish: {finish?.name}</p>
                <div className="flex flex-wrap gap-3">
                  {product.finishes.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFinish(f.id)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${
                        selectedFinish === f.id
                          ? "border-[#8B6F4E] bg-[#8B6F4E]/5"
                          : "border-[#E8E0D5] bg-white hover:border-[#8B6F4E]/50"
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-foreground/10"
                        style={{ backgroundColor: f.hex }}
                      />
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-sm font-medium">Color: {color?.name}</p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedColor(c.id)}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        selectedColor === c.id
                          ? "border-[#8B6F4E]"
                          : "border-transparent"
                      }`}
                      aria-label={c.name}
                    >
                      <span
                        className="h-7 w-7 rounded-full border border-foreground/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex items-center rounded-full border border-[#E8E0D5]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 transition-colors hover:bg-[#E8E0D5]/20"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[2rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 transition-colors hover:bg-[#E8E0D5]/20"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <MagneticButton
                onClick={handleAddToCart}
                variant="primary"
                className="min-w-[220px]"
              >
                Add to Cart
              </MagneticButton>
              <MagneticButton
                href={`/experience/${product.collectionSlug || "serenity-suite"}`}
                variant="outline"
              >
                View in 360°
              </MagneticButton>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-[#E8E0D5]/60 pt-8">
              {[
                { icon: Ruler, label: formatDimension(product.dimensions) },
                { icon: Truck, label: "White-glove delivery" },
                { icon: Shield, label: "10-year warranty" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="h-5 w-5 text-[#8B6F4E]" />
                  <span className="text-xs text-foreground/60">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-24 rounded-[2rem] bg-[#F5F0E8] p-10 dark:bg-[#2C2A26] lg:p-16">
          <h2 className="mb-8 font-serif text-3xl font-light">Specifications</h2>
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border-b border-[#E8E0D5] pb-4 dark:border-white/10">
                <dt className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {key}
                </dt>
                <dd className="mt-1 text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <h3 className="mb-4 font-serif text-xl font-medium">Materials</h3>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-[#E8E0D5] bg-white px-4 py-1.5 text-sm dark:border-white/10 dark:bg-[#1A1816]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-10 font-serif text-3xl font-light">Related Pieces</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
