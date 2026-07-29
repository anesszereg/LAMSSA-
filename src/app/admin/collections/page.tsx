"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { formatPrice } from "@/lib/utils";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.collections || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-3xl font-light">Collections</h2>
        <MagneticButton variant="primary">Add Collection</MagneticButton>
      </div>

      {loading ? (
        <p className="text-foreground/50">Loading collections...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection: any) => (
            <div
              key={collection.slug}
              className="rounded-2xl bg-white p-6 shadow-sm dark:bg-[#2C2A26]"
            >
              <p className="text-xs uppercase tracking-wider text-foreground/50">
                {collection.roomType}
              </p>
              <h3 className="mt-2 font-serif text-xl font-medium">{collection.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-foreground/70">
                {collection.tagline}
              </p>
              <p className="mt-4 text-sm font-medium">
                {formatPrice(collection.estimatedPrice, collection.currency)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
