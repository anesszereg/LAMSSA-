import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

const customers = [
  { name: "Elena Marchetti", email: "elena@example.com", orders: 4, spent: "$112,000", joined: "2023" },
  { name: "Thomas Whitfield", email: "thomas@example.com", orders: 7, spent: "$245,000", joined: "2022" },
  { name: "Sarah Okonjo", email: "sarah@example.com", orders: 3, spent: "$68,000", joined: "2024" },
  { name: "Marco Rossi", email: "marco@example.com", orders: 2, spent: "$54,000", joined: "2024" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Customers"
        subtitle="Manage your client relationships"
      />

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
                <th className="p-4 font-medium text-foreground/60">Customer</th>
                <th className="p-4 font-medium text-foreground/60">Email</th>
                <th className="p-4 font-medium text-foreground/60">Orders</th>
                <th className="p-4 font-medium text-foreground/60">Total Spent</th>
                <th className="p-4 font-medium text-foreground/60">Joined</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.email}
                  className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8E0D5]/30 text-xs font-medium dark:bg-white/10">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-foreground/70">{customer.email}</td>
                  <td className="p-4">{customer.orders}</td>
                  <td className="p-4 font-medium">{customer.spent}</td>
                  <td className="p-4 text-foreground/70">{customer.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
