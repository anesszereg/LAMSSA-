export default function AdminDiscountsPage() {
  const discounts = [
    { code: "WELCOME2026", value: "10% off", status: "Active", uses: 24 },
    { code: "TRADE25", value: "$25,000 off collections", status: "Active", uses: 8 },
    { code: "SUMMER15", value: "15% off", status: "Expired", uses: 132 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Discounts</h2>
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#2C2A26]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E8E0D5] dark:border-white/10">
              <th className="p-4 font-medium text-foreground/60">Code</th>
              <th className="p-4 font-medium text-foreground/60">Value</th>
              <th className="p-4 font-medium text-foreground/60">Status</th>
              <th className="p-4 font-medium text-foreground/60">Uses</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.code} className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5">
                <td className="p-4 font-medium">{discount.code}</td>
                <td className="p-4">{discount.value}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 text-xs ${
                    discount.status === "Active"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {discount.status}
                  </span>
                </td>
                <td className="p-4 text-foreground/70">{discount.uses}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
