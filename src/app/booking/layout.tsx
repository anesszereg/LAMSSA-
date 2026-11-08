import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Visit | Lamsa Luxury Interiors",
  description: "Schedule a private showroom visit or interior design consultation.",
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
