import { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In | Lamsa Luxury Interiors",
  description: "Sign in to access your account, wishlist and saved designs.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-6 dark:bg-[#1A1816]">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-10 shadow-sm dark:bg-[#2C2A26]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-light">Welcome back</h1>
          <p className="mt-3 text-sm text-foreground/60">
            Sign in to access your account and saved designs.
          </p>
        </div>
        <Suspense fallback={<div className="mt-8 h-48 animate-pulse rounded-xl bg-[#E8E0D5]/20" />}>
          <LoginForm />
        </Suspense>
        <div className="mt-6 text-center text-xs text-foreground/50">
          Demo accounts: admin@lamsa.com / admin123 or user@lamsa.com / user123
        </div>
      </div>
    </div>
  );
}
