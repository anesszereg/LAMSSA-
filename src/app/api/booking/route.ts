import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bookingSchema = z.object({
  type: z.enum(["showroom", "consultation"]),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  notes: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // In production, persist to database and notify concierge team
    console.log("Booking request:", result.data);

    return NextResponse.json({ success: true, bookingId: "BK-" + Date.now() });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your booking" },
      { status: 500 }
    );
  }
}
