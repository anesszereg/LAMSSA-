import { Star } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

const reviews = [
  { product: "Aria Platform Bed", author: "Elena M.", rating: 5, text: "Absolutely stunning craftsmanship." },
  { product: "Atlas Sectional Sofa", author: "Thomas W.", rating: 5, text: "The comfort is extraordinary." },
  { product: "Terra Dining Table", author: "Sarah O.", rating: 4, text: "Beautiful stone, heavy presence." },
];

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reviews"
        subtitle="Customer feedback on products"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review, i) => (
          <AdminCard key={i} className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-medium">{review.product}</p>
              <div className="flex items-center gap-1 text-[#C9A86C]">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-sm font-medium">{review.rating}</span>
              </div>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">
              “{review.text}”
            </p>
            <p className="mt-4 text-xs text-foreground/50">By {review.author}</p>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
