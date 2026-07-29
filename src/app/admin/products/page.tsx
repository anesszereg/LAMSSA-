"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";

export default function AdminProductsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-light">Products</h2>
        <MagneticButton variant="primary">Add Product</MagneticButton>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
              <th className="p-4 font-medium text-foreground/60">Name</th>
              <th className="p-4 font-medium text-foreground/60">Category</th>
              <th className="p-4 font-medium text-foreground/60">SKU</th>
              <th className="p-4 font-medium text-foreground/60">Price</th>
              <th className="p-4 font-medium text-foreground/60">Stock</th>
              <th className="p-4 font-medium text-foreground/60">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-foreground/50">
                  Loading products...
                </td>
              </tr>
            ) : (
              items.map((product: any) => (
                <tr
                  key={product.id}
                  className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                >
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4 text-foreground/70">{product.category}</td>
                  <td className="p-4 text-foreground/70">{product.sku}</td>
                  <td className="p-4">{formatPrice(product.price, product.currency)}</td>
                  <td className="p-4 text-foreground/70">In Stock</td>
                  <td className="p-4">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
