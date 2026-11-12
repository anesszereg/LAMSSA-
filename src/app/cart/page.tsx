"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { useRoomCart } from "@/lib/useRoomCart";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { rooms, items, subtotal, unresolved } = useRoomCart();
  const { updateQuantity, removeItem } = useCartStore();
  return (
    <div className="min-h-screen bg-background px-6 pb-24 pt-36">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#8B6F4E]">01 Cart / 02 Your details / 03 Confirmation</p>
        <h1 className="mb-10 mt-4 font-serif text-5xl">Your rooms, thoughtfully chosen.</h1>
        {!items.length ? <div className="rounded-3xl border border-border p-12 text-center"><ShoppingBag className="mx-auto mb-4 h-10 w-10 opacity-40" /><p className="mb-6 text-lg">Your cart is waiting for your perfect room.</p><Link href="/collections" className="underline underline-offset-4">Explore the rooms</Link></div> : (
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {rooms.map((room) => <article key={room.cartId} className="flex gap-5 rounded-3xl border border-border p-5">
                <Link href={`/collections/${room.slug}`} className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl"><Image src={room.heroImage} alt={room.name} fill sizes="112px" className="object-cover" /></Link>
                <div className="flex-1"><p className="text-xs uppercase tracking-widest opacity-50">Complete room</p><Link href={`/collections/${room.slug}`} className="mt-1 block font-serif text-2xl">{room.name}</Link><p className="mt-2">{formatPrice(room.estimatedPrice, room.currency)}</p>
                  <div className="mt-4 flex items-center gap-4"><button aria-label={`Decrease ${room.name} quantity`} onClick={() => updateQuantity(room.cartId, room.quantity - 1)} className="rounded-full border border-border p-2"><Minus className="h-4 w-4" /></button><span>{room.quantity}</span><button aria-label={`Increase ${room.name} quantity`} disabled={room.quantity >= 10} onClick={() => updateQuantity(room.cartId, room.quantity + 1)} className="rounded-full border border-border p-2 disabled:opacity-30"><Plus className="h-4 w-4" /></button><button aria-label={`Remove ${room.name}`} onClick={() => removeItem(room.cartId)} className="ms-auto p-2 text-red-600"><Trash2 className="h-4 w-4" /></button></div>
                </div>
              </article>)}
              {unresolved && <div role="alert" className="rounded-2xl border border-amber-400 p-4"><p>Some items are unavailable or no longer supported. Remove them before continuing.</p>{items.filter((item) => !rooms.some((room) => room.cartId === item.productId)).map((item) => <button key={item.productId} onClick={() => removeItem(item.productId)} className="mt-2 block underline">Remove unavailable item</button>)}</div>}
              <Link href="/collections" className="inline-block py-3 text-sm underline underline-offset-4">Continue exploring</Link>
            </div>
            <aside className="h-fit rounded-3xl bg-[#F5F0E8] p-7 text-[#1A1816] lg:sticky lg:top-28"><h2 className="font-serif text-2xl">Order summary</h2><div className="my-6 flex justify-between"><span>Room subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p className="mb-6 text-sm leading-relaxed opacity-60">Delivery fees, availability, and final payment are confirmed by phone. No payment is collected online.</p>{!unresolved && <Link href="/checkout" className="flex items-center justify-center gap-2 rounded-full bg-[#1A1816] px-6 py-4 text-sm text-white">Continue to your details<ArrowRight className="h-4 w-4" /></Link>}</aside>
          </div>
        )}
      </div>
    </div>
  );
}
