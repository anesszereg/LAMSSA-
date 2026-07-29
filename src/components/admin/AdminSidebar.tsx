"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  Users,
  Calendar,
  Star,
  ImageIcon,
  BarChart3,
  Tag,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/collections", label: "Collections", icon: Layers },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/inventory", label: "Inventory", icon: Package },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/discounts", label: "Discounts", icon: Tag },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col border-r border-[#E8E0D5]/60 bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816] lg:flex">
      <div className="flex h-20 items-center border-b border-[#E8E0D5]/60 px-8 dark:border-white/10">
        <Link href="/admin" className="font-serif text-2xl font-medium">
          Adlane Admin
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    active
                      ? "bg-[#1A1816] text-white dark:bg-[#FAFAF8] dark:text-[#1A1816]"
                      : "text-foreground/70 hover:bg-[#E8E0D5]/20 hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-[#E8E0D5]/60 p-4 dark:border-white/10">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-[#E8E0D5]/20 hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
