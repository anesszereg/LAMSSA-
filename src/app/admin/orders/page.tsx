"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Orders</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
              <th className="p-4 font-medium text-foreground/60">Order ID</th>
              <th className="p-4 font-medium text-foreground/60">Customer</th>
              <th className="p-4 font-medium text-foreground/60">Date</th>
              <th className="p-4 font-medium text-foreground/60">Total</th>
              <th className="p-4 font-medium text-foreground/60">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-foreground/50">
                  Loading orders...
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                >
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer || order.userEmail || "Guest"}</td>
                  <td className="p-4 text-foreground/70">
                    {order.date || new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-medium">
                    {order.total
                      ? formatPrice(order.total, order.currency || "USD")
                      : order.total}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="rounded-full bg-[#E8E0D5]/30 px-3 py-1 text-xs outline-none dark:bg-white/10"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
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
