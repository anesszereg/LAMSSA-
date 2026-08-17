import { ReactNode } from "react";

export function AdminPageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 pb-6 md:flex-row md:items-end md:pb-8">
      <div>
        <h2 className="font-serif text-3xl font-light md:text-4xl">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-foreground/50">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}
