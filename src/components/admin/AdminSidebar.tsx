"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderOpen,
  ShoppingCart,
  Users,
  Calendar,
  Star,
  ImageIcon,
  BarChart3,
  Tag,
  Newspaper,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Logo } from "@/components/ui/Logo";
import { SignOutButton } from "./SignOutButton";

const groups = [
  {
    label: "Overview",
    links: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Catalog",
    links: [
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/collections", label: "Collections", icon: Layers },
      { href: "/admin/categories", label: "Categories", icon: FolderOpen },
      { href: "/admin/inventory", label: "Inventory", icon: Box },
    ],
  },
  {
    label: "Sales",
    links: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
      { href: "/admin/customers", label: "Customers", icon: Users },
      { href: "/admin/bookings", label: "Bookings", icon: Calendar },
    ],
  },
  {
    label: "Marketing",
    links: [
      { href: "/admin/discounts", label: "Discounts", icon: Tag },
      { href: "/admin/reviews", label: "Reviews", icon: Star },
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
      { href: "/admin/media", label: "Media", icon: ImageIcon },
    ],
  },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-4 py-6">
      <ul className="space-y-8">
        {groups.map((group) => (
          <li key={group.label}>
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClick}
                      className={cn(
                        "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                        active
                          ? "bg-[#8B6F4E]/20 text-[#C9A86C]"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <link.icon
                        className={cn(
                          "h-4 w-4 transition-colors",
                          active ? "text-[#C9A86C]" : "text-white/50 group-hover:text-white"
                        )}
                      />
                      {link.label}
                      {active && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#C9A86C]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function AdminSidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const SidebarContent = (
    <>
      <div className="flex h-20 items-center border-b border-white/10 px-6">
        <Link href="/admin" className="text-white">
          <Logo showMark />
        </Link>
      </div>
      <NavLinks onClick={() => setMobileOpen(false)} />
      <div className="border-t border-white/10 p-4">
        <SignOutButton />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 flex-col bg-[#1A1816] lg:flex">
        {SidebarContent}
      </aside>

      {/* Mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 bg-[#1A1816] p-0 text-white">
          <div className="flex h-full flex-col">{SidebarContent}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
