import { NextRequest, NextResponse } from "next/server";
import { products as mockProducts } from "@/lib/data";
import { stripe, isStripeEnabled } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import type Stripe from "stripe";

const dbConfigured = !!process.env.DATABASE_URL;

interface CheckoutItem {
  productId: string;
  quantity: number;
  finish?: string;
  color?: string;
}

interface CheckoutProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  thumbnail: string;
  shortDescription: string;
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: CheckoutItem[] } = await req.json();

    const productCatalog = dbConfigured
      ? await prisma.product.findMany({ include: { finishes: true, colors: true } })
      : mockProducts;

    const products = productCatalog as unknown as CheckoutProduct[];

    const lineItems = items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
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

    const total = items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * (item.quantity || 1);
    }, 0);

    const currency = products.find((p) => p.id === items[0].productId)?.currency || "DZD";

    let orderId: string | null = null;
    if (dbConfigured) {
      const order = await prisma.order.create({
        data: {
          total,
          currency,
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId);
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
        line_items: lineItems as Stripe.Checkout.SessionCreateParams.LineItem[],
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
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
