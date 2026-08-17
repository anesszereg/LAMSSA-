import { MagneticButton } from "@/components/luxury/MagneticButton";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FAFAF8] px-6 text-center dark:bg-[#1A1816]">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl font-light md:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-foreground/60">
        The room you are looking for does not exist. Let us guide you back to the
        showroom.
      </p>
      <div className="mt-10">
        <MagneticButton href="/" variant="primary">
          Return Home
        </MagneticButton>
      </div>
    </div>
  );
}
