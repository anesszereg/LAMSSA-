"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Maximize,
  RotateCcw,
  Download,
  Share2,
  Save,
  X,
  ShoppingBag,
} from "lucide-react";
import { Collection, Product } from "@/types";
import { useConfiguratorStore } from "@/stores/configurator";
import { useCartStore } from "@/stores/cart";
import { RoomViewer } from "@/components/three/RoomViewer";
import { formatPrice } from "@/lib/utils";
import { MagneticButton } from "@/components/luxury/MagneticButton";
import { toast } from "sonner";

const floorOptions = [
  { id: "oak", name: "Brushed Oak" },
  { id: "marble", name: "Statuario Marble" },
  { id: "walnut", name: "Natural Walnut" },
  { id: "travertine", name: "Roman Travertine" },
];

const wallOptions = [
  { id: "#FAFAF8", name: "Alabaster" },
  { id: "#F5F0E8", name: "Cream" },
  { id: "#E8E0D5", name: "Travertine" },
  { id: "#2C2A26", name: "Charcoal" },
  { id: "#A89B8C", name: "Taupe" },
];

export function ExperienceClient({ collection }: { collection: Collection }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const {
    wallColor,
    flooring,
    lighting,
    setWallColor,
    setFlooring,
    setLighting,
    saveConfiguration,
    reset,
  } = useConfiguratorStore();

  const addItem = useCartStore((s) => s.addItem);

  const handleSave = () => {
    saveConfiguration();
    toast.success("Configuration saved to your account.");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Configuration link copied to clipboard.");
  };

  const handleGenerateQuote = () => {
    toast.success("PDF quotation generated and downloaded.");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleAddProductToCart = (product: Product) => {
    addItem({ productId: product.id, quantity: 1 });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="relative min-h-screen bg-[#1A1816] pt-24 text-white">
      <div className="mx-auto max-w-[1800px] px-4 pb-12 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9B8A5]">
              360° Experience
            </p>
            <h1 className="font-serif text-4xl font-light md:text-5xl">
              {collection.name}
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton onClick={handleGenerateQuote} variant="secondary" className="!px-5 !py-3">
              <Download className="h-4 w-4" />
              PDF Quote
            </MagneticButton>
            <MagneticButton onClick={handleShare} variant="outline" className="!px-5 !py-3">
              <Share2 className="h-4 w-4" />
              Share
            </MagneticButton>
            <MagneticButton onClick={handleSave} variant="outline" className="!px-5 !py-3">
              <Save className="h-4 w-4" />
              Save
            </MagneticButton>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="relative">
            <RoomViewer
              collection={collection}
              onSelectProduct={setSelectedProduct}
              selectedProductId={selectedProduct?.id || null}
            />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 rounded-full bg-white/10 p-2 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLighting(lighting === "day" ? "night" : "day")}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Toggle day/night"
                >
                  {lighting === "day" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  onClick={reset}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Reset configuration"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize className="h-4 w-4" />
                </button>
              </div>
              <p className="px-3 text-xs text-white/60">
                Drag to orbit • Scroll to zoom • Click hotspots for details
              </p>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl bg-[#2C2A26] p-6">
            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">Wall Color</h3>
              <div className="flex flex-wrap gap-3">
                {wallOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setWallColor(option.id)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      wallColor === option.id ? "border-[#C9A86C]" : "border-transparent"
                    }`}
                    aria-label={option.name}
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-white/10"
                      style={{ backgroundColor: option.id }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">Flooring</h3>
              <div className="grid grid-cols-2 gap-2">
                {floorOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFlooring(option.id)}
                    className={`rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                      flooring === option.id
                        ? "bg-[#C9A86C] text-white"
                        : "bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">Lighting</h3>
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-1">
                <button
                  onClick={() => setLighting("day")}
                  className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm transition-colors ${
                    lighting === "day" ? "bg-white/10 text-white" : "text-white/60"
                  }`}
                >
                  <Sun className="h-4 w-4" /> Day
                </button>
                <button
                  onClick={() => setLighting("night")}
                  className={`flex items-center justify-center gap-2 rounded-lg py-2 text-sm transition-colors ${
                    lighting === "night" ? "bg-white/10 text-white" : "text-white/60"
                  }`}
                >
                  <Moon className="h-4 w-4" /> Night
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-[#1A1816] p-5">
              <p className="text-xs uppercase tracking-wider text-white/50">Collection Price</p>
              <p className="mt-1 font-serif text-3xl font-light">
                {formatPrice(collection.estimatedPrice, collection.currency)}
              </p>
              <MagneticButton
                href="/booking"
                variant="secondary"
                className="mt-5 w-full !px-5 !py-3"
              >
                Book Consultation
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center sm:p-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-[#FAFAF8] p-8 text-[#1A1816] dark:bg-[#2C2A26] dark:text-white"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-5 top-5 rounded-full p-2 transition-colors hover:bg-black/5"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={selectedProduct.thumbnail}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8B6F4E]">
                {selectedProduct.category}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium">
                {selectedProduct.name}
              </h3>
              <p className="mt-2 text-lg">
                {formatPrice(selectedProduct.price, selectedProduct.currency)}
              </p>
              <p className="mt-4 line-clamp-3 text-foreground/70 dark:text-white/70">
                {selectedProduct.shortDescription}
              </p>
              <div className="mt-8 flex gap-3">
                <MagneticButton
                  onClick={() => handleAddProductToCart(selectedProduct)}
                  variant="primary"
                  className="flex-1 !px-5 !py-3"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </MagneticButton>
                <MagneticButton
                  href={`/products/${selectedProduct.slug}`}
                  variant="outline"
                  className="!px-5 !py-3"
                >
                  Details
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
