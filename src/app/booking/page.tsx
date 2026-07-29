"use client";

import { useState } from "react";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";
import { toast } from "sonner";

const timeSlots = [
  "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

export default function BookingPage() {
  const [type, setType] = useState<"showroom" | "consultation">("showroom");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, ...form }),
      });
      if (res.ok) {
        toast.success(
          `Your ${type === "showroom" ? "showroom visit" : "consultation"} request has been received. We will confirm shortly.`
        );
        setForm({ name: "", email: "", phone: "", date: "", time: "", notes: "" });
      } else {
        const data = await res.json();
        toast.error(data.error?.message || "Failed to submit booking.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
            Private Appointments
          </p>
          <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
            Book your experience
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/70">
            Choose a showroom visit to experience our collections, or a design
            consultation to plan your space.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-[#2C2A26] lg:p-16"
          >
            <div className="mb-10 grid grid-cols-2 gap-4">
              {(["showroom", "consultation"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`rounded-xl py-4 text-sm font-medium uppercase tracking-wider transition-all ${
                    type === t
                      ? "bg-[#1A1816] text-white dark:bg-[#FAFAF8] dark:text-[#1A1816]"
                      : "border border-[#E8E0D5] text-foreground/70 hover:border-[#8B6F4E] dark:border-white/10"
                  }`}
                >
                  {t === "showroom" ? "Showroom Visit" : "Design Consultation"}
                </button>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field
                icon={User}
                label="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                required
              />
              <Field
                icon={Mail}
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                required
              />
              <Field
                icon={Phone}
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
              />
              <Field
                icon={Calendar}
                label="Preferred Date"
                type="date"
                value={form.date}
                onChange={(v) => setForm({ ...form, date: v })}
                required
              />
            </div>

            <div className="mt-6">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-[#8B6F4E]" />
                Preferred Time
              </label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm({ ...form, time: slot })}
                    className={`rounded-lg py-2 text-sm transition-colors ${
                      form.time === slot
                        ? "bg-[#8B6F4E] text-white"
                        : "border border-[#E8E0D5] hover:border-[#8B6F4E] dark:border-white/10"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4 text-[#8B6F4E]" />
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full rounded-xl border border-[#E8E0D5] bg-transparent p-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
                placeholder="Tell us about your project, preferred collection, or any accessibility needs..."
              />
            </div>

            <div className="mt-10">
              <MagneticButton type="submit" variant="primary" className="w-full">
                Confirm Booking Request
              </MagneticButton>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={label} className="flex items-center gap-2 text-sm font-medium">
        <Icon className="h-4 w-4 text-[#8B6F4E]" />
        {label}
      </label>
      <input
        id={label}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
        placeholder={label}
      />
    </div>
  );
}
