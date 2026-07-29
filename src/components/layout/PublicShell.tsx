"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { SearchModal } from "./SearchModal";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navigation />}
      {children}
      {!isAdmin && <Footer />}
      {!isAdmin && <SearchModal />}
      {!isAdmin && <CartDrawer />}
    </>
  );
}
