"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
} from "lucide-react";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";

const data = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 56000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 72000 },
  { month: "Jun", revenue: 64000 },
  { month: "Jul", revenue: 81000 },
];

const stats = [
  { label: "Total Revenue", value: "$401,000", change: "+12%", icon: DollarSign },
  { label: "Orders", value: "86", change: "+5%", icon: ShoppingBag },
  { label: "Customers", value: "342", change: "+8%", icon: Users },
  { label: "Bookings", value: "24", change: "+18%", icon: Calendar },
];

const recentOrders = [
  { id: "#ADL-9832", customer: "Elena Marchetti", total: "$12,400", status: "Delivered" },
  { id: "#ADL-9831", customer: "Thomas Whitfield", total: "$28,900", status: "In Production" },
  { id: "#ADL-9830", customer: "Sarah Okonjo", total: "$8,200", status: "Shipped" },
  { id: "#ADL-9829", customer: "Marco Rossi", total: "$45,600", status: "Pending" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h2 className="font-serif text-3xl font-light">Overview</h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <ScrollReveal key={stat.label} delay={0.05}>
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8E0D5]/30">
                  <stat.icon className="h-5 w-5 text-[#8B6F4E]" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 font-serif text-3xl font-light">{stat.value}</p>
              <p className="text-sm text-foreground/60">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]">
          <h3 className="mb-6 font-serif text-xl font-medium">Revenue</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="month" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #E8E0D5",
                  }}
                />
                <Bar dataKey="revenue" fill="#8B6F4E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <div className="rounded-2xl bg-white p-8 shadow-sm dark:bg-[#2C2A26]">
          <h3 className="mb-6 font-serif text-xl font-medium">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E8E0D5] dark:border-white/10">
                  <th className="pb-3 font-medium text-foreground/60">Order</th>
                  <th className="pb-3 font-medium text-foreground/60">Customer</th>
                  <th className="pb-3 font-medium text-foreground/60">Total</th>
                  <th className="pb-3 font-medium text-foreground/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#E8E0D5]/60 dark:border-white/5"
                  >
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">{order.customer}</td>
                    <td className="py-4">{order.total}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#E8E0D5]/30 px-3 py-1 text-xs dark:bg-white/10">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
