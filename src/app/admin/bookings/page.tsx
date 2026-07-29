"use client";

import { useEffect, useState } from "react";

const statusOptions = ["pending", "confirmed", "cancelled", "completed"];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
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

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Bookings</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
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
            ) : (
              bookings.map((booking: any) => (
                <tr key={booking.id} className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5">
                  <td className="p-4 font-medium">{booking.id}</td>
                  <td className="p-4">{booking.name}</td>
                  <td className="p-4 text-foreground/70 capitalize">{booking.type}</td>
                  <td className="p-4 text-foreground/70">{booking.date}</td>
                  <td className="p-4 text-foreground/70">{booking.time}</td>
                  <td className="p-4">
                    <select
                      value={booking.status}
                      onChange={(e) => updateStatus(booking.id, e.target.value)}
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
