import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const dbConfigured = !!process.env.DATABASE_URL;

const orderStatusSchema = z.object({
  status: z.enum(["pending", "processing", "shipped", "delivered", "cancelled"]),
});

const mockOrders = [
  { id: "ORD-7A3X", customer: "Sophia Laurent", email: "sophia@example.com", total: 12400, status: "delivered", date: "2026-03-14" },
  { id: "ORD-9B2M", customer: "Lucas Moreau", email: "lucas@example.com", total: 28900, status: "processing", date: "2026-04-02" },
];

export async function GET() {
  if (!dbConfigured) {
    return NextResponse.json({ orders: mockOrders });
  }

  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}

export async function PATCH(req: NextRequest) {
  if (!dbConfigured) {
    return NextResponse.json({ success: true });
  }

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

  await prisma.order.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
