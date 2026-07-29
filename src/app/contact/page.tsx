"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { ScrollReveal } from "@/components/luxury/ScrollReveal";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Your message has been sent. Our team will reply shortly.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        toast.error(data.error?.message || "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-[#FAFAF8] pb-32 pt-40 dark:bg-[#1A1816]">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6F4E]">
              Contact
            </p>
            <h1 className="editorial-heading font-serif text-5xl font-light md:text-6xl">
              Let's create
              <br />
              something lasting.
            </h1>
            <p className="editorial-body mt-6 max-w-lg text-lg leading-relaxed text-foreground/70">
              Whether you are planning a full residence, a single room, or a private
              showroom visit, our design team is here to guide every decision.
            </p>

            <div className="mt-12 space-y-6">
              {[
                { icon: MapPin, label: "Adlane Atelier", value: "Via Monte Napoleone 23, Milan" },
                { icon: Phone, label: "Phone", value: "+39 02 1234 5678" },
                { icon: Mail, label: "Email", value: "studio@adlane.com" },
                { icon: Clock, label: "Showroom Hours", value: "Mon–Sat, 10am–7pm CET" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0E8] dark:bg-[#2C2A26]">
                    <item.icon className="h-5 w-5 text-[#8B6F4E]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground/50">
                      {item.label}
                    </p>
                    <p className="mt-1 text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-8 shadow-sm dark:bg-[#2C2A26] lg:p-12">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="h-12 w-full rounded-xl border border-[#E8E0D5] bg-transparent px-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
                  placeholder="How can we help?"
                />
              </div>
              <div className="mt-6 space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-[#E8E0D5] bg-transparent p-4 text-sm outline-none transition-colors focus:border-[#8B6F4E] dark:border-white/10"
                  placeholder="Tell us about your project..."
                />
              </div>
              <div className="mt-8">
                <MagneticButton type="submit" variant="primary" className="w-full">
                  Send Message
                </MagneticButton>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
