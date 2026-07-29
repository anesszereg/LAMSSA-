export default function AdminBlogPage() {
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Blog Posts</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "The Art of Negative Space", date: "Jul 25, 2026" },
          { title: "Material Dialogues: Marble and Wood", date: "Jul 18, 2026" },
        ].map((post, i) => (
          <div key={i} className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]">
            <p className="text-xs text-foreground/50">{post.date}</p>
            <h3 className="mt-2 font-serif text-xl font-medium">{post.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
