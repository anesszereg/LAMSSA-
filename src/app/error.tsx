"use client";

import { useEffect } from "react";
import { MagneticButton } from "@/components/luxury/MagneticButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAFAF8] px-6 text-center dark:bg-[#1A1816]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
        Error
      </p>
      <h1 className="mt-4 font-serif text-4xl font-light md:text-6xl">
        Something went wrong
      </h1>
      <p className="mt-6 max-w-md text-foreground/60">
        We could not render this room. Please try again or return home.
      </p>
      <div className="mt-10 flex gap-4">
        <MagneticButton onClick={reset} variant="primary">
          Try Again
        </MagneticButton>
        <MagneticButton href="/" variant="outline">
          Return Home
        </MagneticButton>
      </div>
    </div>
  );
}
