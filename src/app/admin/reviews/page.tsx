const reviews = [
  { product: "Aria Platform Bed", author: "Elena M.", rating: 5, text: "Absolutely stunning craftsmanship." },
  { product: "Atlas Sectional Sofa", author: "Thomas W.", rating: 5, text: "The comfort is extraordinary." },
  { product: "Terra Dining Table", author: "Sarah O.", rating: 4, text: "Beautiful stone, heavy presence." },
];

export default function AdminReviewsPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Reviews</h2>
      <div className="grid gap-6">
        {reviews.map((review, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]">
            <div className="flex items-center justify-between">
              <p className="font-medium">{review.product}</p>
              <span className="text-sm text-[#C9A86C]">{"★".repeat(review.rating)}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{review.text}</p>
            <p className="mt-3 text-xs text-foreground/50">By {review.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
