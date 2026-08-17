import { Tag } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

const discounts = [
  { code: "WELCOME2026", value: "10% off", status: "Active", uses: 24 },
  { code: "TRADE25", value: "$25,000 off collections", status: "Active", uses: 8 },
  { code: "SUMMER15", value: "15% off", status: "Expired", uses: 132 },
];

export default function AdminDiscountsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Discounts"
        subtitle="Active and expired promotion codes"
      />

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
                <th className="p-4 font-medium text-foreground/60">Code</th>
                <th className="p-4 font-medium text-foreground/60">Value</th>
                <th className="p-4 font-medium text-foreground/60">Status</th>
                <th className="p-4 font-medium text-foreground/60">Uses</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((discount) => (
                <tr
                  key={discount.code}
                  className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E0D5]/30 dark:bg-white/5">
                        <Tag className="h-4 w-4 text-[#8B6F4E]" />
                      </div>
                      <span className="font-medium">{discount.code}</span>
                    </div>
                  </td>
                  <td className="p-4">{discount.value}</td>
                  <td className="p-4">
                    <StatusBadge status={discount.status.toLowerCase()} />
                  </td>
                  <td className="p-4 text-foreground/70">{discount.uses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
