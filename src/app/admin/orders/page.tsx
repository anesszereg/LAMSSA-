"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
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

  const updateStatus = async (id: string, status: Order["status"]) => {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Orders"
        subtitle="Track and update customer orders"
      />

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
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
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-foreground/50">
                    No orders yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                  >
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8E0D5]/30 text-xs font-medium dark:bg-white/10">
                          {order.customer
                            ? order.customer
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                            : "G"}
                        </div>
                        <span>{order.customer || order.userEmail || "Guest"}</span>
                      </div>
                    </td>
                    <td className="p-4 text-foreground/70">
                      {order.date ||
                        (order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "—")}
                    </td>
                    <td className="p-4 font-medium">
                      {order.total
                        ? formatPrice(order.total, order.currency || "DZD")
                        : order.total}
                    </td>
                    <td className="p-4">
                      <Select
                        value={order.status}
                        onValueChange={(value) =>
                          updateStatus(order.id, value as Order["status"])
                        }
                      >
                        <SelectTrigger className="h-8 w-36 border-0 bg-transparent p-0 text-sm font-medium hover:bg-transparent focus:ring-0">
                          <SelectValue>
                            <StatusBadge status={order.status} />
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((s) => (
                            <SelectItem key={s} value={s}>
                              <span className="capitalize">{s}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
