"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react";
import { useUIStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUIStore();
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
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col border-l border-[#E8E0D5]/60 bg-[#FAFAF8] p-0 sm:max-w-md dark:bg-[#1A1816] dark:border-white/10">
        <SheetHeader className="border-b border-[#E8E0D5]/60 p-6 dark:border-white/10">
          <SheetTitle className="flex items-center gap-3 font-serif text-2xl font-normal">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {cartProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E0D5]/30">
              <ShoppingBag className="h-8 w-8 text-foreground/40" />
            </div>
            <p className="text-foreground/60">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={() => setCartOpen(false)}
              className="inline-flex h-8 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-6">
                {cartProducts.map((product) =>
                  product ? (
                    <li key={product.id} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-[#F5F0E8]">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-foreground/50">
                            {product.category}
                          </p>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="font-serif text-base font-medium hover:underline"
                          >
                            {product.name}
                          </Link>
                          <p className="mt-1 text-sm">
                            {formatPrice(product.price, product.currency)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-[#E8E0D5]">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, product.quantity - 1)
                              }
                              className="px-2.5 py-1 transition-colors hover:bg-[#E8E0D5]/30"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm">
                              {product.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, product.quantity + 1)
                              }
                              className="px-2.5 py-1 transition-colors hover:bg-[#E8E0D5]/30"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="ml-auto text-foreground/40 transition-colors hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>

            <SheetFooter className="border-t border-[#E8E0D5]/60 p-6 dark:border-white/10">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-lg">
                  <span className="text-foreground/60">Subtotal</span>
                  <span className="font-serif font-medium">
                    {formatPrice(subtotal, "USD")}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex h-14 w-full items-center justify-center rounded-full bg-[#1A1816] text-sm font-medium uppercase tracking-wider text-[#FAFAF8] transition-colors hover:bg-[#2C2A26]"
                >
                  Proceed to Checkout
                </Link>
                <p className="text-center text-xs text-foreground/50">
                  Shipping & taxes calculated at checkout.
                </p>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
