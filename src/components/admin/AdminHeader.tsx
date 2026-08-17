"use client";

import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminHeader({
  name,
  onMenuClick,
}: {
  name: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E8E0D5]/60 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-[#2C2A26]/90 md:px-8 md:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-serif text-xl font-medium md:text-2xl">
              Studio Dashboard
            </h1>
            <p className="hidden text-xs text-foreground/50 md:block">
              Manage your collections, orders and showroom
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-full border border-[#E8E0D5]/60 bg-transparent pl-9 pr-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
            />
          </div>
          <button
            className="relative rounded-full p-2 text-foreground/60 transition-colors hover:bg-[#E8E0D5]/20 hover:text-foreground dark:hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#8B6F4E]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium leading-tight">{name}</p>
              <p className="text-xs text-foreground/50">Administrator</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8B6F4E] text-sm font-medium text-white">
              {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
