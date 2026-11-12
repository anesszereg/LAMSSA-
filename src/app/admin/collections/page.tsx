"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { formatPrice } from "@/lib/utils";
import { Collection } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { MediaUploader } from "@/components/admin/MediaUploader";

const emptyForm = {
  name: "",
  slug: "",
  roomType: "",
  tagline: "",
  heroImage: "",
  videoUrl: "",
  tourUrl: "",
  story: "",
  designerNotes: "",
  estimatedPrice: "",
  currency: "DZD",
  materials: "",
  colorPalette: "",
  gallery: "",
  width: "",
  height: "",
  depth: "",
  unit: "m",
};

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 text-sm font-medium text-foreground/80">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Collection | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchCollections = () => {
    setLoading(true);
    fetch("/api/admin/collections")
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.collections || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    // Data fetch on mount is the standard pattern for this page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCollections();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return collections.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.roomType.toLowerCase().includes(term)
    );
  }, [search, collections]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (collection: Collection) => {
    setEditing(collection);
    setForm({
      name: collection.name,
      slug: collection.slug,
      roomType: collection.roomType,
      tagline: collection.tagline,
      heroImage: collection.heroImage,
      videoUrl: collection.videoUrl || "",
      tourUrl: collection.tourUrl || "",
      story: collection.story,
      designerNotes: collection.designerNotes,
      estimatedPrice: String(collection.estimatedPrice),
      currency: collection.currency,
      materials: collection.materials.join(", "),
      colorPalette: collection.colorPalette
        .map((c) => `${c.name}:${c.hex}`)
        .join(", "),
      gallery: collection.gallery.join("\n"),
      width: String(collection.dimensions.width),
      height: String(collection.dimensions.height),
      depth: String(collection.dimensions.depth),
      unit: collection.dimensions.unit,
    });
    setDialogOpen(true);
  };

  const parseColorPalette = (value: string) => {
    return value
      .split(",")
      .map((part) => {
        const [name, hex] = part.trim().split(":");
        return { name: name?.trim() || "", hex: hex?.trim() || "" };
      })
      .filter((c) => c.name && c.hex);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug,
      roomType: form.roomType,
      tagline: form.tagline,
      heroImage: form.heroImage,
      videoUrl: form.videoUrl,
      tourUrl: form.tourUrl,
      story: form.story,
      designerNotes: form.designerNotes,
      estimatedPrice: Number(form.estimatedPrice),
      currency: form.currency,
      materials: form.materials.split(",").map((s) => s.trim()).filter(Boolean),
      colorPalette: parseColorPalette(form.colorPalette),
      gallery: form.gallery.split("\n").map((s) => s.trim()).filter(Boolean),
      dimensions: {
        width: Number(form.width),
        height: Number(form.height),
        depth: Number(form.depth),
        unit: form.unit,
      },
    };

    const url = "/api/admin/collections";
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...payload, id: editing.id } : payload;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editing ? "Collection updated" : "Collection created");
      setDialogOpen(false);
      resetForm();
      fetchCollections();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error?.message || "Failed to save collection");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    const res = await fetch(`/api/admin/collections?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Collection deleted");
      fetchCollections();
    } else {
      toast.error("Failed to delete collection");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Collections"
        subtitle={`Manage ${collections.length} room collections`}
        action={
          <MagneticButton variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add Collection
          </MagneticButton>
        }
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-foreground/50">Loading collections...</p>
      ) : filtered.length === 0 ? (
        <p className="text-foreground/50">No collections found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((collection) => (
            <AdminCard
              key={collection.slug}
              className="group overflow-hidden p-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={collection.heroImage}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => openEdit(collection)}
                    className="bg-white/90 text-black hover:bg-white"
                    aria-label="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(collection.id)}
                    className="bg-white/90 text-red-600 hover:bg-white"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                    {collection.roomType}
                  </p>
                  <h3 className="font-serif text-xl font-medium text-white">
                    {collection.name}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="line-clamp-2 text-sm text-foreground/70">
                  {collection.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium">
                    {formatPrice(collection.estimatedPrice, collection.currency)}
                  </p>
                  <p className="text-xs text-foreground/50">
                    {collection.products.length} products
                  </p>
                </div>
              </div>
            </AdminCard>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex h-[90dvh] w-[calc(100%-1rem)] max-w-2xl flex-col p-0 sm:h-auto sm:max-h-[90dvh]">
          <DialogHeader className="border-b border-[#E8E0D5]/60 p-4 dark:border-white/10 sm:p-6">
            <DialogTitle className="font-serif text-2xl font-light">
              {editing ? "Edit Collection" : "Add Collection"}
            </DialogTitle>
            <DialogDescription>
              Configure the room collection. Estimated price is in Algerian Dinar (DZD).
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  General Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" required>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </Field>
                  <Field label="Slug" required>
                    <Input
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    />
                  </Field>
                  <Field label="Room Type" required>
                    <Input
                      required
                      value={form.roomType}
                      onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                    />
                  </Field>
                  <Field label="Tagline" required>
                    <Input
                      required
                      value={form.tagline}
                      onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Pricing & Hero
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Estimated Price" required>
                    <Input
                      required
                      type="number"
                      value={form.estimatedPrice}
                      onChange={(e) =>
                        setForm({ ...form, estimatedPrice: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Currency" required>
                    <Input
                      required
                      value={form.currency}
                      onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    />
                  </Field>
                  <MediaUploader onUpload={(url) => setForm((prev) => ({ ...prev, heroImage: url }))} />
                  <Field label="Film URL">
                    <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="/videos/room1-web.mp4 or Cloudinary URL" />
                    <MediaUploader resourceType="video" onUpload={(url) => setForm((prev) => ({ ...prev, videoUrl: url }))} />
                    {form.videoUrl && <video src={form.videoUrl} controls preload="metadata" className="mt-3 aspect-video w-full rounded-xl" />}
                  </Field>
                  <Field label="360° Tour URL">
                    <Input value={form.tourUrl} onChange={(e) => setForm({ ...form, tourUrl: e.target.value })} placeholder="https://mls.kuu.la/share/..." />
                  </Field>
                  <Field label="Hero Image URL" required>
                    <Input
                      required
                      value={form.heroImage}
                      onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Dimensions
                </h3>
                <div className="grid gap-4 sm:grid-cols-4">
                  <Field label="Width" required>
                    <Input
                      required
                      type="number"
                      value={form.width}
                      onChange={(e) => setForm({ ...form, width: e.target.value })}
                    />
                  </Field>
                  <Field label="Height" required>
                    <Input
                      required
                      type="number"
                      value={form.height}
                      onChange={(e) => setForm({ ...form, height: e.target.value })}
                    />
                  </Field>
                  <Field label="Depth" required>
                    <Input
                      required
                      type="number"
                      value={form.depth}
                      onChange={(e) => setForm({ ...form, depth: e.target.value })}
                    />
                  </Field>
                  <Field label="Unit" required>
                    <Input
                      required
                      value={form.unit}
                      onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Palette & Materials
                </h3>
                <div className="space-y-4">
                  <Field label="Materials (comma separated)">
                    <Input
                      value={form.materials}
                      onChange={(e) => setForm({ ...form, materials: e.target.value })}
                    />
                  </Field>
                  <Field label="Color Palette (Name:#hex, comma separated)">
                    <Input
                      value={form.colorPalette}
                      onChange={(e) =>
                        setForm({ ...form, colorPalette: e.target.value })
                      }
                      placeholder="Alabaster:#FAFAF8, Charcoal:#2C2A26"
                    />
                  </Field>
                  <MediaUploader onUpload={(url) => setForm((prev) => ({ ...prev, gallery: [prev.gallery, url].filter(Boolean).join("\n") }))} />
                  <p className="text-sm text-foreground/60">Upload photos individually. Reorder or remove photos by editing the URL lines below. Removing a URL does not delete the Cloudinary asset.</p>
                  <Field label="Gallery (one URL per line)">
                    <Textarea
                      value={form.gallery}
                      onChange={(e) => setForm({ ...form, gallery: e.target.value })}
                      rows={3}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Copy
                </h3>
                <div className="space-y-4">
                  <Field label="Story" required>
                    <Textarea
                      required
                      value={form.story}
                      onChange={(e) => setForm({ ...form, story: e.target.value })}
                      rows={3}
                    />
                  </Field>
                  <Field label="Designer Notes" required>
                    <Textarea
                      required
                      value={form.designerNotes}
                      onChange={(e) =>
                        setForm({ ...form, designerNotes: e.target.value })
                      }
                      rows={3}
                    />
                  </Field>
                </div>
              </section>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#E8E0D5]/60 p-4 dark:border-white/10 sm:p-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editing ? "Save Changes" : "Create Collection"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
