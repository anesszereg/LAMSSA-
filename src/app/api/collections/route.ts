import { NextResponse } from "next/server";
import { getCollections } from "@/lib/collections";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ collections: await getCollections(), managed: !!process.env.DATABASE_URL });
}
