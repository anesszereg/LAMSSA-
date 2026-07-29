import Image from "next/image";
import { products, collections } from "@/lib/data";
import { MediaUploader } from "@/components/admin/MediaUploader";

export default function AdminMediaPage() {
  const images = [
    ...collections.map((c) => c.heroImage),
    ...products.map((p) => p.thumbnail),
  ].slice(0, 20);

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl font-light">Media Library</h2>
      <MediaUploader />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-[#E8E0D5]/20">
            <Image src={src} alt={`Media ${i + 1}`} fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
    </div>
  );
}
