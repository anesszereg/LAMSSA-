"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-[#E8E0D5] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#E8E0D5]/20 dark:border-white/10"
    >
      Sign Out
    </button>
  );
}
