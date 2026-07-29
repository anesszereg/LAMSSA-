import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Adlane Luxury Interiors",
  description: "Get in touch with the Adlane team for showroom appointments and design inquiries.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
