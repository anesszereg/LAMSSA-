import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account | Lamsa Luxury Interiors",
  description: "Manage your orders, wishlist, bookings and account settings.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
