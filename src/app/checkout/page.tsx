"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/stores/cart";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(() =>
    searchParams.get("success") === "true" ? 3 : 1
  );
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      const orderId = searchParams.get("orderId");
      if (orderId) {
        fetch(`/api/orders/${orderId}/pay`, { method: "POST" }).catch(() => {});
      }
      toast.success("Order placed successfully.");
    }
  }, [searchParams]);

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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Unable to start checkout");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Checkout failed";
      toast.error(message);
      setProcessing(false);
    }
  };

  if (cartProducts.length === 0 && step !== 3) {
    return (
      <div className="bg-[#FAFAF8] pb-32 pt-40 text-center dark:bg-[#1A1816]">
        <h1 className="font-serif text-5xl font-light">Checkout</h1>
        <p className="mt-4 text-foreground/60">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-32 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
            Checkout
          </h1>
          <div className="mt-8 flex items-center gap-4 text-sm">
            {["Cart", "Shipping & Payment", "Confirmation"].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                    step > i
                      ? "bg-[#8B6F4E] text-white"
                      : step === i + 1
                      ? "border border-[#8B6F4E] text-[#8B6F4E]"
                      : "border border-[#E8E0D5] text-foreground/40"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={step === i + 1 ? "font-medium" : "text-foreground/50"}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {step === 1 && (
              <ScrollReveal>
                <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]">
                  <h2 className="font-serif text-2xl font-medium">Order Items</h2>
                  <ul className="mt-6 space-y-6">
                    {cartProducts.map((product) =>
                      product ? (
                        <li key={product.id} className="flex gap-4">
                          <div className="relative h-20 w-16 overflow-hidden rounded-xl bg-[#F5F0E8]">
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-serif font-medium">{product.name}</p>
                            <p className="text-sm text-foreground/60">
                              Qty: {product.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            {formatPrice(product.price * product.quantity, product.currency)}
                          </p>
                        </li>
                      ) : null
                    )}
                  </ul>
                  <MagneticButton
                    onClick={() => setStep(2)}
                    variant="primary"
                    className="mt-8 w-full"
                  >
                    Continue to Payment
                  </MagneticButton>
                </div>
              </ScrollReveal>
            )}

            {step === 2 && (
              <ScrollReveal>
                <form
                  onSubmit={handlePayment}
                  className="rounded-3xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]"
                >
                  <h2 className="font-serif text-2xl font-medium">Shipping & Payment</h2>
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    <Input label="First Name" required />
                    <Input label="Last Name" required />
                    <Input label="Email" type="email" required />
                    <Input label="Phone" type="tel" />
                    <Input label="Address" className="md:col-span-2" required />
                    <Input label="City" required />
                    <Input label="Postal Code" required />
                  </div>
                  <h3 className="mt-10 font-serif text-xl font-medium">Payment</h3>
                  <div className="mt-6 space-y-4">
                    <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Expiry" placeholder="MM/YY" required />
                      <Input label="CVC" placeholder="123" required />
                    </div>
                  </div>
                  <MagneticButton
                    type="submit"
                    variant="primary"
                    className="mt-8 w-full"
                    disabled={processing}
                  >
                    {processing ? "Processing..." : "Pay & Place Order"}
                  </MagneticButton>
                </form>
              </ScrollReveal>
            )}

            {step === 3 && (
              <ScrollReveal>
                <div className="rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-[#2C2A26]">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E0D5]/30">
                    <svg
                      className="h-10 w-10 text-[#8B6F4E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="mt-6 font-serif text-3xl font-medium">
                    Thank you for your order
                  </h2>
                  <p className="mt-3 text-foreground/70">
                    Your confirmation has been sent to your email. Our concierge team
                    will contact you within 24 hours.
                  </p>
                  <MagneticButton href="/collections" variant="primary" className="mt-8">
                    Continue Shopping
                  </MagneticButton>
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="rounded-3xl bg-[#F5F0E8] p-8 dark:bg-[#2C2A26]">
              <h2 className="font-serif text-2xl font-medium">Summary</h2>
              <div className="mt-6 space-y-3 text-foreground/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, "DZD")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>Included</span>
                </div>
              </div>
              <div className="my-6 border-t border-[#E8E0D5] dark:border-white/10" />
              <div className="flex justify-between text-xl font-medium">
                <span>Total</span>
                <span>{formatPrice(subtotal, "DZD")}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  className = "",
  ...props
}: {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
      />
    </div>
  );
}
