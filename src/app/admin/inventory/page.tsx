import { products } from "@/lib/data";

export default function AdminInventoryPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Inventory</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
              <th className="p-4 font-medium text-foreground/60">Product</th>
              <th className="p-4 font-medium text-foreground/60">SKU</th>
              <th className="p-4 font-medium text-foreground/60">Stock</th>
              <th className="p-4 font-medium text-foreground/60">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5">
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-foreground/70">{product.sku}</td>
                <td className="p-4 text-foreground/70">12</td>
                <td className="p-4">
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    In Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
