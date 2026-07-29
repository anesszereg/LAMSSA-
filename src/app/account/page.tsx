"use client";

import { User, Package, Heart, Calendar, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useWishlistStore } from "@/stores/wishlist";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";

const navItems = [
  { icon: Package, label: "Orders", count: 2 },
  { icon: Heart, label: "Wishlist", countKey: "wishlist" },
  { icon: Calendar, label: "Bookings", count: 1 },
  { icon: Settings, label: "Settings" },
];

export default function AccountPage() {
  const { data: session, status } = useSession({ required: true });
  const wishlistCount = useWishlistStore((s) => s.items.length);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] dark:bg-[#1A1816]">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-[#E8E0D5] border-t-[#8B6F4E]" />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-32 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <ScrollReveal>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
            My Account
          </h1>
          <div className="mt-8 flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#E8E0D5]/30">
                <User className="h-8 w-8 text-[#8B6F4E]" />
              </div>
              <div>
                <p className="font-serif text-2xl font-medium">{session?.user?.name || "Guest"}</p>
                <p className="text-foreground/60">{session?.user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 rounded-full border border-[#E8E0D5] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#E8E0D5]/20 dark:border-white/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {navItems.map((item) => {
            const count = item.countKey === "wishlist" ? wishlistCount : item.count;
            return (
              <ScrollReveal key={item.label} delay={0.05}>
                <button className="flex w-full flex-col items-start rounded-3xl bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-[#2C2A26]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8E0D5]/30">
                    <item.icon className="h-5 w-5 text-[#8B6F4E]" />
                  </div>
                  <p className="mt-4 font-serif text-xl font-medium">{item.label}</p>
                  {count !== undefined && (
                    <p className="mt-1 text-sm text-foreground/60">{count} items</p>
                  )}
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-12 rounded-3xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]">
          <h2 className="font-serif text-2xl font-medium">Recent Orders</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E8E0D5] dark:border-white/10">
                  <th className="pb-3 font-medium text-foreground/60">Order</th>
                  <th className="pb-3 font-medium text-foreground/60">Date</th>
                  <th className="pb-3 font-medium text-foreground/60">Status</th>
                  <th className="pb-3 text-right font-medium text-foreground/60">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "#ADL-9832", date: "Mar 14, 2026", status: "Delivered", total: "$12,400" },
                  { id: "#ADL-8741", date: "Jan 9, 2026", status: "In Production", total: "$28,900" },
                ].map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#E8E0D5]/60 dark:border-white/5"
                  >
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4 text-foreground/70">{order.date}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#E8E0D5]/30 px-3 py-1 text-xs dark:bg-white/10">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-right font-medium">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
