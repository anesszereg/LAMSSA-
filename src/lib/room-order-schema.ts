import { z } from "zod";
import { normalizeAlgerianPhone, wilayas } from "@/lib/wilayas";

export const roomOrderSchema = z.object({
  requestId: z.string().uuid(),
  items: z.array(z.object({ productId: z.string().regex(/^room:[a-z0-9-]+$/), quantity: z.number().int().min(1).max(10) })).min(1).max(20),
  expectedTotal: z.number().int().nonnegative(),
  customer: z.object({
    name: z.string().trim().min(3, "Enter your full name").max(120),
    phone: z.string().transform(normalizeAlgerianPhone).refine((phone) => /^0[567]\d{8}$/.test(phone), "Enter a valid Algerian mobile number (05, 06 or 07)"),
    wilaya: z.string().refine((code) => wilayas.some((wilaya) => wilaya.code === code), "Choose your wilaya"),
    commune: z.string().trim().min(2, "Enter your commune").max(120),
    address: z.string().trim().min(8, "Enter a complete delivery address").max(500),
    notes: z.string().trim().max(1000).optional(),
  }),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to being contacted about your order" }) }),
});
