import { cn } from "@/lib/utils";

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]",
        className
      )}
    >
      {children}
    </div>
  );
}
