import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // In production, wire this to a notification service (e.g., Resend, SendGrid, AWS SES)
    console.log("Contact form submission:", result.data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process your message" },
      { status: 500 }
    );
  }
}
