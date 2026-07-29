import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const dbConfigured = !!process.env.DATABASE_URL;

const bookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
});

const mockBookings = [
  { id: "BK-1001", name: "Sophia Laurent", email: "sophia@example.com", type: "showroom", date: "2026-05-12", time: "14:00", status: "confirmed" },
  { id: "BK-1002", name: "Lucas Moreau", email: "lucas@example.com", type: "consultation", date: "2026-05-14", time: "10:00", status: "pending" },
];

export async function GET() {
  if (!dbConfigured) {
    return NextResponse.json({ bookings: mockBookings });
  }

  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ bookings });
}

export async function PATCH(req: NextRequest) {
  if (!dbConfigured) {
    return NextResponse.json({ success: true });
  }

  const body = await req.json();
  const parsed = bookingStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id, status } = body;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json({ success: true });
}
