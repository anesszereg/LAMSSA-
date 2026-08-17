"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, p) => sum + (p?.price || 0) * (p?.quantity || 1),
    0
  );

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-32 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
            Shopping Cart
          </h1>
        </ScrollReveal>

        {cartProducts.length === 0 ? (
          <div className="mt-20 flex flex-col items-center gap-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#E8E0D5]/30">
              <ShoppingBag className="h-10 w-10 text-foreground/40" />
            </div>
            <p className="text-lg text-foreground/60">Your cart is empty.</p>
            <MagneticButton href="/collections" variant="primary">
              Continue Shopping
            </MagneticButton>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="space-y-8">
                {cartProducts.map((product) =>
                  product ? (
                    <li
                      key={product.id}
                      className="flex gap-6 rounded-3xl bg-white p-4 shadow-sm dark:bg-[#2C2A26]"
                    >
                      <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-[#F5F0E8]">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.slug}`}
                            className="mt-1 block font-serif text-xl font-medium hover:underline"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-foreground/70">
                            {formatPrice(product.price, product.currency)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-[#E8E0D5]">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                              className="px-3 py-2 transition-colors hover:bg-[#E8E0D5]/20"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-[2rem] text-center">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                              className="px-3 py-2 transition-colors hover:bg-[#E8E0D5]/20"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <ScrollReveal delay={0.1}>
              <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]">
                <h2 className="font-serif text-2xl font-medium">Order Summary</h2>
                <div className="mt-6 space-y-3 text-foreground/70">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, "DZD")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="my-6 border-t border-[#E8E0D5] dark:border-white/10" />
                <div className="flex justify-between text-xl font-medium">
                  <span>Estimated Total</span>
                  <span>{formatPrice(subtotal, "DZD")}</span>
                </div>
                <MagneticButton
                  href="/checkout"
                  variant="primary"
                  className="mt-8 w-full"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton
                  href="/collections"
                  variant="outline"
                  className="mt-3 w-full"
                >
                  Continue Shopping
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
