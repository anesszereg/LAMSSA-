import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | Adlane Luxury Interiors",
  description: "Your saved collection of luxury furniture and interior pieces.",
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
