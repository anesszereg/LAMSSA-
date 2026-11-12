"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, Truck, Loader2 } from "lucide-react";
import { useRoomCart } from "@/lib/useRoomCart";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";
import { wilayas } from "@/lib/wilayas";
import { roomOrderSchema } from "@/lib/room-order-schema";

const inputClass = "mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-[#8B6F4E] focus:ring-2 focus:ring-[#8B6F4E]/20 aria-[invalid=true]:border-red-500";

export default function CheckoutPage() {
  const { rooms, items, subtotal, unresolved } = useRoomCart();
  const clearCart = useCartStore((state) => state.clearCart);
  const [customer, setCustomer] = useState({ name: "", phone: "", wilaya: "", commune: "", address: "", notes: "" });
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState<{ orderId: string; total: number } | null>(null);
  const requestId = useRef<string | null>(null);
  const submitting = useRef(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return;
    setError("");
    requestId.current ??= crypto.randomUUID();
    const payload = { requestId: requestId.current, items: items.map(({ productId, quantity }) => ({ productId, quantity })), expectedTotal: subtotal, customer, consent };
    const parsed = roomOrderSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(Object.fromEntries(parsed.error.issues.map((issue) => [issue.path.at(-1)!, issue.message])));
      setError("Please correct the highlighted details before continuing.");
      return;
    }
    setErrors({});
    submitting.current = true;
    setBusy(true);
    try {
      const res = await fetch("/api/room-orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Unable to submit order");
      setReceipt(result);
      clearCart();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to submit order. Please try again.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  };

  if (receipt) return (
    <div className="min-h-screen bg-background px-6 pb-24 pt-40"><div className="mx-auto max-w-2xl rounded-[2rem] border border-border p-8 text-center md:p-14" role="status">
      <CheckCircle2 className="mx-auto mb-6 h-14 w-14 text-[#8B6F4E]" /><p className="text-xs uppercase tracking-[0.25em] text-[#8B6F4E]">Order request received</p><h1 className="mt-4 font-serif text-4xl">Thank you, {customer.name}.</h1><p className="mt-5 leading-relaxed opacity-70">Our customer service team will call {customer.phone} to confirm your rooms, availability, delivery fees, and payment arrangements. Your order is pending confirmation; no payment has been collected.</p><div className="my-8 rounded-2xl bg-muted p-5"><p className="break-all text-xs opacity-60">Reference: {receipt.orderId}</p><p className="mt-3 font-serif text-2xl">Room subtotal: {formatPrice(receipt.total)}</p></div><p className="mb-8 text-sm opacity-60">Save your order reference for follow-up. Delivery cost is not included in the subtotal.</p><Link href="/collections" className="inline-flex rounded-full bg-[#1A1816] px-7 py-4 text-sm text-white">Explore more rooms</Link>
    </div></div>
  );

  if (!items.length) return <div className="min-h-[70vh] px-6 pb-24 pt-40 text-center"><h1 className="font-serif text-4xl">Choose a room first.</h1><Link href="/collections" className="mt-6 inline-block underline underline-offset-4">Explore collections</Link></div>;

  return (
    <div className="min-h-screen bg-background px-6 pb-24 pt-36"><div className="mx-auto max-w-6xl">
      <Link href="/cart" className="mb-6 inline-flex items-center gap-2 text-sm opacity-60"><ArrowLeft className="h-4 w-4" />Back to cart</Link>
      <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F4E]">01 Cart / 02 Your details / 03 Confirmation</p>
      <h1 className="mb-3 mt-4 font-serif text-5xl">Let’s make room for you.</h1><p className="mb-10 max-w-2xl opacity-60">Leave your details. We’ll call you to confirm your order and arrange delivery in Algeria. No account or online payment required.</p>
      <form onSubmit={submit} noValidate className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border p-6 md:p-8"><h2 className="mb-6 flex items-center gap-3 font-serif text-2xl"><Phone className="h-5 w-5 text-[#8B6F4E]" />Contact details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <label htmlFor="name" className="text-sm font-medium">Full name *<input id="name" autoComplete="name" maxLength={120} required disabled={busy} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className="mt-2 block text-xs text-red-600">{errors.name}</span>}</label>
              <label htmlFor="phone" className="text-sm font-medium">Algerian mobile number *<input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0550 12 34 56" required disabled={busy} value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className={inputClass} aria-invalid={!!errors.phone} aria-describedby="phone-help" /><span id="phone-help" className={`mt-2 block text-xs ${errors.phone ? "text-red-600" : "opacity-50"}`}>{errors.phone || "05, 06, 07 or +213 format. We use this number to confirm your order."}</span></label>
            </div>
          </section>
          <section className="rounded-3xl border border-border p-6 md:p-8"><h2 className="mb-6 flex items-center gap-3 font-serif text-2xl"><Truck className="h-5 w-5 text-[#8B6F4E]" />Delivery address · Algeria</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <label htmlFor="wilaya" className="text-sm font-medium">Wilaya / Province *<select id="wilaya" autoComplete="address-level1" required disabled={busy} value={customer.wilaya} onChange={(e) => setCustomer({ ...customer, wilaya: e.target.value })} className={inputClass} aria-invalid={!!errors.wilaya} aria-describedby={errors.wilaya ? "wilaya-error" : undefined}><option value="">Select your wilaya</option>{wilayas.map((wilaya) => <option key={wilaya.code} value={wilaya.code}>{wilaya.code} — {wilaya.name}</option>)}</select>{errors.wilaya && <span id="wilaya-error" className="mt-2 block text-xs text-red-600">{errors.wilaya}</span>}</label>
              <label htmlFor="commune" className="text-sm font-medium">Commune / City *<input id="commune" autoComplete="address-level2" maxLength={120} required disabled={busy} value={customer.commune} onChange={(e) => setCustomer({ ...customer, commune: e.target.value })} className={inputClass} aria-invalid={!!errors.commune} aria-describedby={errors.commune ? "commune-error" : undefined} />{errors.commune && <span id="commune-error" className="mt-2 block text-xs text-red-600">{errors.commune}</span>}</label>
              <label htmlFor="address" className="text-sm font-medium sm:col-span-2">Street address *<textarea id="address" autoComplete="street-address" rows={3} maxLength={500} placeholder="Street, building, apartment, and nearby landmark" required disabled={busy} value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} className={inputClass} aria-invalid={!!errors.address} aria-describedby={errors.address ? "address-error" : undefined} />{errors.address && <span id="address-error" className="mt-2 block text-xs text-red-600">{errors.address}</span>}</label>
              <label htmlFor="notes" className="text-sm font-medium sm:col-span-2">Anything we should know? <span className="opacity-50">(optional)</span><textarea id="notes" rows={3} maxLength={1000} placeholder="Delivery access, preferred callback time, or questions" disabled={busy} value={customer.notes} onChange={(e) => setCustomer({ ...customer, notes: e.target.value })} className={inputClass} /></label>
            </div>
          </section>
        </div>
        <aside className="rounded-3xl bg-[#F5F0E8] p-7 text-[#1A1816] lg:sticky lg:top-28"><h2 className="mb-6 font-serif text-2xl">Your room selection</h2><div className="space-y-5">{rooms.map((room) => <div key={room.cartId} className="flex gap-3"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl"><Image src={room.heroImage} alt={room.name} fill sizes="64px" className="object-cover" /></div><div><p className="text-sm font-medium">{room.name} × {room.quantity}</p><p className="mt-1 text-sm opacity-60">{formatPrice(room.estimatedPrice * room.quantity, room.currency)}</p></div></div>)}</div>
          <div className="mt-6 space-y-3 border-t border-black/10 pt-6 text-sm"><div className="flex justify-between"><span>Room subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="flex justify-between gap-3"><span>Delivery fee</span><span className="text-right opacity-60">Confirmed by phone</span></div><div className="flex justify-between"><span>Payment due now</span><strong>{formatPrice(0)}</strong></div></div>
          <p className="my-5 text-xs leading-relaxed opacity-60">This is an order request, not a completed payment. Availability, final price, delivery coverage and fees will be confirmed before you commit.</p>
          <label className="flex items-start gap-3 text-xs leading-relaxed"><input type="checkbox" checked={consent} disabled={busy} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B6F4E]" aria-describedby={errors.consent ? "consent-error" : undefined} /><span>I agree to be contacted by customer service about this order. My details will be used to process the request.</span></label>{errors.consent && <p id="consent-error" className="mt-2 text-xs text-red-600">{errors.consent}</p>}
          {unresolved && <p role="alert" className="mt-4 text-sm text-red-600">Some items are unavailable. <Link href="/cart" className="underline">Review your cart</Link>.</p>}
          {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={busy || unresolved || !rooms.length} className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1A1816] px-5 py-4 text-sm font-medium text-white transition-colors hover:bg-[#8B6F4E] disabled:opacity-50">{busy ? <><Loader2 className="h-4 w-4 animate-spin" />Saving your request…</> : "Send order request"}</button><p className="mt-3 text-center text-xs opacity-50">No card required. No charge today.</p>
        </aside>
      </form>
    </div></div>
  );
}
