import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import { PublicShell } from "@/components/layout/PublicShell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoKufi = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lamsa | Luxury Interior Showroom",
  description:
    "Immersive digital showroom for curated luxury interiors. Explore complete room concepts in 360°, customize finishes, and book a private design consultation.",
  keywords: [
    "luxury furniture",
    "interior design",
    "showroom",
    "360 experience",
    "home decor",
  ],
  openGraph: {
    title: "Lamsa | Luxury Interior Showroom",
    description:
      "Explore complete luxury room concepts, walk through rooms in 360°, and shop individual furniture pieces.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${cormorant.variable} ${notoKufi.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>
          <PublicShell>
            <main className="flex-1">{children}</main>
          </PublicShell>
        </Providers>
      </body>
    </html>
  );
}
