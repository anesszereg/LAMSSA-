import type { LucideIcon } from "lucide-react";
import { Sofa, Lamp, BedDouble, Table2, Armchair, ImageIcon } from "lucide-react";
import { categories, products } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

const iconMap: Record<string, LucideIcon> = {
  seating: Sofa,
  lighting: Lamp,
  bedroom: BedDouble,
  dining: Table2,
  accent: Armchair,
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories"
        subtitle="Browse product categories"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => {
          const Icon = iconMap[category.toLowerCase()] || ImageIcon;
          const count = products.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          ).length;
          return (
            <AdminCard
              key={category}
              className="flex items-center justify-between transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8E0D5]/30 dark:bg-white/5">
                  <Icon className="h-6 w-6 text-[#8B6F4E]" />
                </div>
                <div>
                  <p className="font-serif text-lg font-medium capitalize">
                    {category}
                  </p>
                  <p className="text-sm text-foreground/50">
                    {count} product{count === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            </AdminCard>
          );
        })}
      </div>
    </div>
  );
}
