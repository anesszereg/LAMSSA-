"use client";

const customers = [
  { name: "Elena Marchetti", email: "elena@example.com", orders: 4, spent: "$112,000", joined: "2023" },
  { name: "Thomas Whitfield", email: "thomas@example.com", orders: 7, spent: "$245,000", joined: "2022" },
  { name: "Sarah Okonjo", email: "sarah@example.com", orders: 3, spent: "$68,000", joined: "2024" },
  { name: "Marco Rossi", email: "marco@example.com", orders: 2, spent: "$54,000", joined: "2024" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Customers</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
              <th className="p-4 font-medium text-foreground/60">Name</th>
              <th className="p-4 font-medium text-foreground/60">Email</th>
              <th className="p-4 font-medium text-foreground/60">Orders</th>
              <th className="p-4 font-medium text-foreground/60">Total Spent</th>
              <th className="p-4 font-medium text-foreground/60">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5">
                <td className="p-4 font-medium">{customer.name}</td>
                <td className="p-4 text-foreground/70">{customer.email}</td>
                <td className="p-4">{customer.orders}</td>
                <td className="p-4 font-medium">{customer.spent}</td>
                <td className="p-4 text-foreground/70">{customer.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
