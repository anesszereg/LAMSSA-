import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Lamsa Customer Support",
  description: "Schedule a callback with our customer support team for room advice, prices, and order help.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
