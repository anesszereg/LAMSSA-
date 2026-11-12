"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart";
import { useUIStore } from "@/stores/ui";
import { useLocale } from "@/lib/i18n/LocaleProvider";

export function RoomPurchase({ slug }: { slug: string }) {
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUIStore((state) => state.setCartOpen);
  const router = useRouter();
  const { isAr } = useLocale();
  const add = (checkout: boolean) => {
    const productId = `room:${slug}`;
    if (checkout && useCartStore.getState().items.some((item) => item.productId === productId)) {
      router.push("/checkout");
      return;
    }
    addItem({ productId, quantity: 1 });
    if (checkout) router.push("/checkout");
    else setCartOpen(true);
  };
  return (
    <div className="w-full space-y-3">
      <button onClick={() => add(false)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#C9A86C] px-6 py-3 text-sm font-semibold text-[#1A1816] transition-colors hover:bg-[#ddbf8a]"><ShoppingBag className="h-4 w-4" />{isAr ? "أضف الغرفة إلى السلة" : "Add room to cart"}</button>
      <button onClick={() => add(true)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-current px-6 py-3 text-sm transition-opacity hover:opacity-70">{isAr ? "اطلب هذه الغرفة" : "Order this room"}<ArrowRight className="h-4 w-4" /></button>
      <p className="text-center text-xs opacity-60">{isAr ? "بدون دفع الآن. تأكيد الطلب والتوصيل عبر الهاتف." : "No payment now. Order and delivery confirmed by phone."}</p>
    </div>
  );
}
