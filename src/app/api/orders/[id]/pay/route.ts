import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const dbConfigured = !!process.env.DATABASE_URL;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!dbConfigured) {
      return NextResponse.json({ success: true });
    }

    await prisma.order.update({
      where: { id },
      data: { status: "processing" },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Unable to update order" },
      { status: 500 }
    );
  }
}
