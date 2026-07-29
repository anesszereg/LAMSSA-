"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart, Search, User, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useUIStore } from "@/stores/ui";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/collections", label: "Collections" },
  { href: "/experience/serenity-suite", label: "360° Showroom" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book a Visit" },
];

export function Navigation() {
  const { data: session, status } = useSession();
  const { mobileMenuOpen, setMobileMenuOpen, setCartOpen, setSearchOpen } = useUIStore();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const [scrolled, setScrolled] = useState(false);
  const isAdmin = session?.user?.role === "admin";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out",
          scrolled
            ? "py-3 luxe-glass border-b border-[#E8E0D5]/60 shadow-sm"
            : "py-6 bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="group relative z-10 font-serif text-2xl font-medium tracking-tight text-foreground"
          >
            Adlane
            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-500 group-hover:w-full" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B6F4E] text-[9px] font-medium text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1A1816] text-[9px] font-medium text-white dark:bg-[#FAFAF8] dark:text-[#1A1816]">
                  {cartCount}
                </span>
              )}
            </button>
            {status === "loading" ? null : session ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden rounded-full p-2 text-[13px] font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground lg:block"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/account"
                  aria-label="Account"
                  className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  aria-label="Sign out"
                  className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full p-2 text-[13px] font-medium uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-foreground"
              >
                Sign In
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-full p-2 text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#FAFAF8] dark:bg-[#1A1816]"
          >
            <div className="mx-auto flex h-full max-w-[1600px] flex-col px-6 py-6 lg:px-10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-2xl font-medium tracking-tight"
                >
                  Adlane
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 transition-colors hover:bg-foreground/5"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-16 flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-serif text-4xl font-light text-foreground/90 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
