import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Lamsa Luxury Interiors",
  description: "Get in touch with the Lamsa team for showroom appointments and design inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
