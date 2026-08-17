"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { Product } from "@/types";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Collection } from "@/types";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminCard } from "@/components/admin/AdminCard";
import { StatusBadge } from "@/components/admin/StatusBadge";

const emptyForm = {
  name: "",
  slug: "",
  sku: "",
  category: "",
  price: "",
  currency: "DZD",
  collectionSlug: "",
  shortDescription: "",
  description: "",
  thumbnail: "",
  images: "",
  materials: "",
  width: "",
  height: "",
  depth: "",
  unit: "cm",
  isNew: false,
  isBestseller: false,
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

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProducts = () => {
    setLoading(true);
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const fetchCollections = () => {
    fetch("/api/admin/collections")
      .then((res) => res.json())
      .then((data) => setCollections(data.collections || []));
  };

  useEffect(() => {
    // Data fetch on mount is the standard pattern for this page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
    fetchCollections();
  }, []);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );
  }, [search, items]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      currency: product.currency,
      collectionSlug: product.collectionSlug || "",
      shortDescription: product.shortDescription,
      description: product.description,
      thumbnail: product.thumbnail,
      images: product.images.join("\n"),
      materials: product.materials.join(", "),
      width: String(product.dimensions.width),
      height: String(product.dimensions.height),
      depth: String(product.dimensions.depth),
      unit: product.dimensions.unit,
      isNew: !!product.isNew,
      isBestseller: !!product.isBestseller,
    });
    setDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      slug: form.slug,
      sku: form.sku,
      category: form.category,
      price: Number(form.price),
      currency: form.currency,
      collectionSlug: form.collectionSlug || undefined,
      shortDescription: form.shortDescription,
      description: form.description,
      thumbnail: form.thumbnail,
      images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
      materials: form.materials.split(",").map((s) => s.trim()).filter(Boolean),
      dimensions: {
        width: Number(form.width),
        height: Number(form.height),
        depth: Number(form.depth),
        unit: form.unit,
      },
      specifications: {},
      isNew: form.isNew,
      isBestseller: form.isBestseller,
      finishes: [],
      colors: [],
    };

    const url = "/api/admin/products";
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { ...payload, id: editing.id } : payload;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success(editing ? "Product updated" : "Product created");
      setDialogOpen(false);
      resetForm();
      fetchProducts();
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error?.message || "Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product deleted");
      fetchProducts();
    } else {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Products"
        subtitle={`Manage ${items.length} products in your catalog`}
        action={
          <MagneticButton variant="primary" onClick={openAdd}>
            <Plus className="h-4 w-4" />
            Add Product
          </MagneticButton>
        }
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <Input
            placeholder="Search by name, SKU or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <AdminCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E8E0D5] bg-[#FAFAF8] dark:border-white/10 dark:bg-[#1A1816]">
                <th className="p-4 font-medium text-foreground/60">Product</th>
                <th className="p-4 font-medium text-foreground/60">Category</th>
                <th className="p-4 font-medium text-foreground/60">SKU</th>
                <th className="p-4 font-medium text-foreground/60">Price</th>
                <th className="p-4 font-medium text-foreground/60">Status</th>
                <th className="p-4 text-right font-medium text-foreground/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    Loading products...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-foreground/50">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-[#E8E0D5]/60 last:border-0 dark:border-white/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#F5F0E8] dark:bg-[#1A1816]">
                          <Image
                            src={product.thumbnail}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-foreground/50">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-foreground/70">{product.category}</td>
                    <td className="p-4 text-foreground/70 font-mono text-xs">{product.sku}</td>
                    <td className="p-4 font-medium">
                      {formatPrice(product.price, product.currency)}
                    </td>
                    <td className="p-4">
                      <StatusBadge status="active" />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => openEdit(product)}
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDelete(product.id)}
                          aria-label="Delete"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex h-[90dvh] w-[calc(100%-1rem)] max-w-2xl flex-col p-0 sm:h-auto sm:max-h-[90dvh]">
          <DialogHeader className="border-b border-[#E8E0D5]/60 p-4 dark:border-white/10 sm:p-6">
            <DialogTitle className="font-serif text-2xl font-light">
              {editing ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <DialogDescription>
              Fill in the product details. All prices are in Algerian Dinar (DZD).
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
                  <Field label="SKU" required>
                    <Input
                      required
                      value={form.sku}
                      onChange={(e) => setForm({ ...form, sku: e.target.value })}
                    />
                  </Field>
                  <Field label="Category" required>
                    <Input
                      required
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Pricing & Collection
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Price" required>
                    <Input
                      required
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </Field>
                  <Field label="Currency" required>
                    <Input
                      required
                      value={form.currency}
                      onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    />
                  </Field>
                  <Field label="Collection">
                    <Select
                      value={form.collectionSlug}
                      onValueChange={(value) =>
                        setForm({ ...form, collectionSlug: value || "" })
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select collection" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {collections.map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Media
                </h3>
                <div className="space-y-4">
                  <Field label="Thumbnail URL" required>
                    <Input
                      required
                      value={form.thumbnail}
                      onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                    />
                  </Field>
                  <Field label="Gallery Images (one per line)">
                    <Textarea
                      value={form.images}
                      onChange={(e) => setForm({ ...form, images: e.target.value })}
                      rows={3}
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
                  Details
                </h3>
                <div className="space-y-4">
                  <Field label="Materials (comma separated)">
                    <Input
                      value={form.materials}
                      onChange={(e) => setForm({ ...form, materials: e.target.value })}
                    />
                  </Field>
                  <Field label="Short Description" required>
                    <Input
                      required
                      value={form.shortDescription}
                      onChange={(e) =>
                        setForm({ ...form, shortDescription: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Description" required>
                    <Textarea
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={4}
                    />
                  </Field>
                </div>
              </section>

              <section className="rounded-2xl bg-[#F5F0E8]/40 p-4 dark:bg-[#1A1816]/40 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground/60">
                  Badges
                </h3>
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.isNew}
                      onCheckedChange={(checked) =>
                        setForm({ ...form, isNew: checked === true })
                      }
                    />
                    New arrival
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox
                      checked={form.isBestseller}
                      onCheckedChange={(checked) =>
                        setForm({ ...form, isBestseller: checked === true })
                      }
                    />
                    Bestseller
                  </label>
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
                {editing ? "Save Changes" : "Create Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
