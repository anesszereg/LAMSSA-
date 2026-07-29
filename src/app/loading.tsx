export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF8] dark:bg-[#1A1816]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#E8E0D5] border-t-[#8B6F4E]" />
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground/50">
          Loading
        </p>
      </div>
    </div>
  );
}
