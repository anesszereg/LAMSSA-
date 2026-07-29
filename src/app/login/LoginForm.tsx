"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { toast } from "sonner";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: true,
    });
    setLoading(false);
    if (result?.error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@adlane.com or user@adlane.com"
          className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
          required
        />
      </div>
      <MagneticButton
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </MagneticButton>
    </form>
  );
}
