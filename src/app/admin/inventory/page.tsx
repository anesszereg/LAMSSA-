import { products } from "@/lib/data";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Inventory"
        subtitle="Stock levels and SKU overview"
      />

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
                <th className="p-4 font-medium text-foreground/60">Product</th>
                <th className="p-4 font-medium text-foreground/60">SKU</th>
                <th className="p-4 font-medium text-foreground/60">Stock</th>
                <th className="p-4 font-medium text-foreground/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <tr
                  key={product.id}
                  className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                >
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 font-mono text-xs text-foreground/70">
                    {product.sku}
                  </td>
                  <td className="p-4 text-foreground/70">{12 + i}</td>
                  <td className="p-4">
                    <StatusBadge status="active" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
