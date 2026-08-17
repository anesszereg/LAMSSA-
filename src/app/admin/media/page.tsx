import Image from "next/image";
import { products, collections } from "@/lib/data";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";

export default function AdminMediaPage() {
  const images = [
    ...collections.map((c) => c.heroImage),
    ...products.map((p) => p.thumbnail),
  ].slice(0, 20);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Media Library"
        subtitle="Manage images used across the site"
      />

      <AdminCard>
        <MediaUploader />
      </AdminCard>

      <AdminCard className="p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#E8E0D5]/20"
            >
              <Image
                src={src}
                alt={`Media ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="200px"
              />
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
