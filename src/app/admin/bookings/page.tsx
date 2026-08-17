"use client";

import { useEffect, useState } from "react";
import { Booking } from "@/types";
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

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data.bookings || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, status: Booking["status"]) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Bookings"
        subtitle="Manage showroom visits and consultations"
      />

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
                <th className="p-4 font-medium text-foreground/60">Booking ID</th>
                <th className="p-4 font-medium text-foreground/60">Name</th>
                <th className="p-4 font-medium text-foreground/60">Type</th>
                <th className="p-4 font-medium text-foreground/60">Date</th>
                <th className="p-4 font-medium text-foreground/60">Time</th>
                <th className="p-4 font-medium text-foreground/60">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    No bookings yet.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                  >
                    <td className="p-4 font-medium">{booking.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8E0D5]/30 text-xs font-medium dark:bg-white/10">
                          {booking.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <span>{booking.name}</span>
                      </div>
                    </td>
                    <td className="p-4 capitalize text-foreground/70">
                      {booking.type}
                    </td>
                    <td className="p-4 text-foreground/70">{booking.date}</td>
                    <td className="p-4 text-foreground/70">{booking.time}</td>
                    <td className="p-4">
                      <Select
                        value={booking.status}
                        onValueChange={(value) =>
                          updateStatus(booking.id, value as Booking["status"])
                        }
                      >
                        <SelectTrigger className="h-8 w-36 border-0 bg-transparent p-0 text-sm font-medium hover:bg-transparent focus:ring-0">
                          <SelectValue>
                            <StatusBadge status={booking.status} />
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
