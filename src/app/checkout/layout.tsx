import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Lamsa Luxury Interiors",
  description: "Complete your purchase of curated luxury furniture and interiors.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
