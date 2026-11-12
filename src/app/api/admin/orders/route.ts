import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { listRoomOrders, updateRoomOrderStatus } from "@/lib/local-room-orders";

const dbConfigured = !!process.env.DATABASE_URL;

const orderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const localOrders = await listRoomOrders();
  if (!dbConfigured) {
    return NextResponse.json({ orders: localOrders }, { headers: { "Cache-Control": "no-store" } });
  }

  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders: [...localOrders, ...orders] }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const parsed = orderStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Expect body to also include id for the order
  const { id, status } = body;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  if (id.startsWith("ROOM-")) {
    const updated = await updateRoomOrderStatus(id, parsed.data.status);
    return NextResponse.json(updated ? { success: true } : { error: "Order not found" }, { status: updated ? 200 : 404 });
  }
  if (!dbConfigured) return NextResponse.json({ error: "Order not found" }, { status: 404 });
  await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
