import { NextRequest, NextResponse } from "next/server";
import { products as mockProducts } from "@/lib/data";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const dbConfigured = !!process.env.DATABASE_URL;

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    const products = dbConfigured
      ? await prisma.product.findMany({ include: { finishes: true, colors: true } })
      : mockProducts;

    const lineItems = items
      .map((item: { productId: string; quantity: number; finish?: string; color?: string }) => {
        const product = products.find((p: any) => p.id === item.productId);
        if (!product) return null;
        return {
          price_data: {
            currency: product.currency.toLowerCase(),
            product_data: {
              name: product.name,
              images: [product.thumbnail],
              description: product.shortDescription,
            },
            unit_amount: product.price,
          },
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    if (lineItems.length === 0) {
      return NextResponse.json({ error: "No valid items" }, { status: 400 });
    }

    const total = items.reduce((sum: number, item: any) => {
      const product = products.find((p: any) => p.id === item.productId);
      return sum + (product?.price || 0) * (item.quantity || 1);
    }, 0);

    const currency = products.find((p: any) => p.id === items[0].productId)?.currency || "USD";

    let orderId: string | null = null;
    if (dbConfigured) {
      const order = await prisma.order.create({
        data: {
          total,
          currency,
          items: {
            create: items.map((item: any) => {
              const product = products.find((p: any) => p.id === item.productId);
              return {
                quantity: item.quantity,
                price: product?.price || 0,
                finish: item.finish || null,
                color: item.color || null,
                productId: item.productId,
              };
            }),
          },
        },
      });
      orderId = order.id;
    }

    const successUrl = orderId
      ? `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout?success=true&orderId=${orderId}`
      : `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/checkout?success=true`;

    if (isStripeEnabled() && stripe) {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems as any,
        success_url: successUrl,
        cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/cart`,
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "IT", "FR", "DE", "ES"],
        },
        automatic_tax: { enabled: false },
      });
      return NextResponse.json({ url: session.url });
    }

    // Fallback when Stripe keys are not configured
    return NextResponse.json({ url: successUrl });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
