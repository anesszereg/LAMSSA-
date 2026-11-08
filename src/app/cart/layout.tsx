import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Lamsa Luxury Interiors",
  description: "Review your selected luxury pieces and proceed to checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
