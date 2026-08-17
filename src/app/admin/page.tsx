"use client";

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
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 56000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 72000 },
  { month: "Jun", revenue: 64000 },
  { month: "Jul", revenue: 81000 },
];

const stats = [
  {
    label: "Total Revenue",
    value: "401,000 DA",
    change: "+12%",
    changeType: "up" as const,
    icon: DollarSign,
  },
  {
    label: "Orders",
    value: "86",
    change: "+5%",
    changeType: "up" as const,
    icon: ShoppingBag,
  },
  {
    label: "Customers",
    value: "342",
    change: "+8%",
    changeType: "up" as const,
    icon: Users,
  },
  {
    label: "Bookings",
    value: "24",
    change: "+18%",
    changeType: "up" as const,
    icon: Calendar,
  },
];

const recentOrders = [
  { id: "#ADL-9832", customer: "Elena Marchetti", total: "$12,400", status: "Delivered" },
  { id: "#ADL-9831", customer: "Thomas Whitfield", total: "$28,900", status: "Processing" },
  { id: "#ADL-9830", customer: "Sarah Okonjo", total: "$8,200", status: "Shipped" },
  { id: "#ADL-9829", customer: "Marco Rossi", total: "$45,600", status: "Pending" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Overview"
        subtitle="Here is what is happening across your showroom today."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.changeType === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <AdminCard key={stat.label} className="flex flex-col">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8E0D5]/30 dark:bg-white/5">
                  <Icon className="h-5 w-5 text-[#8B6F4E]" />
                </div>
                <div className="flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <ChangeIcon className="h-3.5 w-3.5" />
                  {stat.change}
                </div>
              </div>
              <p className="mt-4 font-serif text-3xl font-light">{stat.value}</p>
              <p className="text-sm text-foreground/50">{stat.label}</p>
            </AdminCard>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-xl font-medium">Revenue</h3>
              <p className="text-sm text-foreground/50">Monthly revenue this year</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis
                  dataKey="month"
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  cursor={{ fill: "rgba(139, 111, 78, 0.05)" }}
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
        </AdminCard>

        <AdminCard>
          <h3 className="font-serif text-xl font-medium">Recent Orders</h3>
          <p className="text-sm text-foreground/50">Latest transactions</p>
          <div className="mt-6 space-y-5">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border-b border-[#E8E0D5]/30 pb-4 last:border-0 last:pb-0 dark:border-white/5"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs text-foreground/50">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.total}</p>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
