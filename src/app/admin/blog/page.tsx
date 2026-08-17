import { Calendar } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

const posts = [
  { title: "The Art of Negative Space", date: "Jul 25, 2026" },
  { title: "Material Dialogues: Marble and Wood", date: "Jul 18, 2026" },
];

export default function AdminBlogPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Blog Posts"
        subtitle="Manage editorial content"
      />

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post, i) => (
          <AdminCard key={i} className="flex flex-col justify-between transition-shadow hover:shadow-md">
            <div>
              <div className="flex items-center gap-2 text-xs text-foreground/50">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </div>
              <h3 className="mt-3 font-serif text-xl font-medium">{post.title}</h3>
            </div>
            <p className="mt-4 text-sm text-foreground/50">Draft</p>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
