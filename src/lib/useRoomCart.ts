"use client";

import { useData } from "@/lib/useData";
import { useCartStore } from "@/stores/cart";

export function useRoomCart() {
  const { collections } = useData();
  const items = useCartStore((state) => state.items);
  const rooms = items.flatMap((item) => {
    const room = collections.find((room) => `room:${room.slug}` === item.productId);
    return room ? [{ ...room, cartId: item.productId, quantity: item.quantity }] : [];
  });
  return { rooms, items, subtotal: rooms.reduce((sum, room) => sum + room.estimatedPrice * room.quantity, 0), unresolved: items.length !== rooms.length };
}
