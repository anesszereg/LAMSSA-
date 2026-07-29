import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Adlane Luxury Interiors",
  description: "Explore individually curated luxury furniture, lighting and décor pieces.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
