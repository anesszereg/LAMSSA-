"use client";

import { SignOutButton } from "./SignOutButton";

export function AdminHeader({ name }: { name: string }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#E8E0D5]/60 bg-white/80 px-8 py-4 backdrop-blur-md dark:border-white/10 dark:bg-[#2C2A26]/80">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-light">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-foreground/60">{name}</span>
          <div className="h-9 w-9 rounded-full bg-[#8B6F4E]" />
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
