import { categories } from "@/lib/data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Categories</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div key={category} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]">
            <p className="font-serif text-xl font-medium">{category}</p>
            <p className="mt-1 text-sm text-foreground/60">Manage products</p>
          </div>
        ))}
      </div>
    </div>
  );
}
