"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

const data = [
  { name: "Mon", visitors: 240, orders: 12 },
  { name: "Tue", visitors: 320, orders: 18 },
  { name: "Wed", visitors: 280, orders: 14 },
  { name: "Thu", visitors: 450, orders: 24 },
  { name: "Fri", visitors: 390, orders: 20 },
  { name: "Sat", visitors: 520, orders: 30 },
  { name: "Sun", visitors: 410, orders: 22 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        subtitle="Traffic, conversions and engagement"
      />

      <AdminCard>
        <h3 className="mb-1 font-serif text-xl font-medium">Visitors & Orders</h3>
        <p className="mb-6 text-sm text-foreground/50">Weekly performance</p>
        <div className="h-[360px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="name"
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
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  border: "1px solid #E8E0D5",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#8B6F4E"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#C9A86C"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </AdminCard>
    </div>
  );
}
