import { NextRequest, NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";
import { roomOrderSchema } from "@/lib/room-order-schema";
import { saveRoomOrder } from "@/lib/local-room-orders";
import { wilayas } from "@/lib/wilayas";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (req.headers.get("origin") && req.headers.get("origin") !== req.nextUrl.origin) return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
  if (Number(req.headers.get("content-length") || 0) > 20000) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  try {
    const parsed = roomOrderSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check your details", fields: parsed.error.flatten() }, { status: 400 });
    const { items, customer, expectedTotal, requestId } = parsed.data;
    if (new Set(items.map((item) => item.productId)).size !== items.length) return NextResponse.json({ error: "Duplicate rooms in cart" }, { status: 400 });
    const catalog = await getCollections();
    const lines = items.map((item) => {
      const room = catalog.find((room) => `room:${room.slug}` === item.productId);
      if (!room || room.currency !== "DZD" || !Number.isSafeInteger(room.estimatedPrice) || room.estimatedPrice <= 0) return null;
      return { slug: room.slug, name: room.name, quantity: item.quantity, price: room.estimatedPrice };
    });
    if (lines.some((line) => !line)) return NextResponse.json({ error: "A room is unavailable. Please review your cart." }, { status: 409 });
    const validLines = lines.filter((line) => line !== null);
    const total = validLines.reduce((sum, line) => sum + line.price * line.quantity, 0);
    if (total !== expectedTotal) return NextResponse.json({ error: "Prices have changed. Please reload your cart and review the updated subtotal." }, { status: 409 });
    const id = `ROOM-${requestId}`;
    await saveRoomOrder({ id, customer: customer.name, phone: customer.phone, shippingAddress: { country: "DZ", wilaya: customer.wilaya, wilayaName: wilayas.find((wilaya) => wilaya.code === customer.wilaya)!.name, commune: customer.commune, address: customer.address }, notes: customer.notes || "", total, currency: "DZD", status: "pending", paymentStatus: "unpaid", date: new Date().toISOString(), items: validLines });
    return NextResponse.json({ orderId: id, total, currency: "DZD" }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Your order could not be saved. Please try again; your cart is unchanged." }, { status: 500 });
  }
}
