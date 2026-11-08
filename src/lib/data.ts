import { Collection, Product } from "@/types";
import type { Testimonial, Project } from "@/types";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const room1Images = [
  "/room-1/DSC07330.jpg",
  "/room-1/DSC07332.jpg",
  "/room-1/DSC07334.jpg",
  "/room-1/DSC07335.jpg",
  "/room-1/DSC07337.jpg",
  "/room-1/DSC07342.jpg",
  "/room-1/DSC07344.jpg",
  "/room-1/DSC07357.jpg",
  "/room-1/DSC07358.jpg",
  "/room-1/DSC07359.jpg",
  "/room-1/DSC07362.jpg",
  "/room-1/DSC07366.jpg",
  "/room-1/DSC07367.jpg",
  "/room-1/DSC07370.jpg",
];

const room2Images = [
  "/room-2/DSC07406.jpg",
  "/room-2/DSC07410.jpg",
  "/room-2/DSC07413.jpg",
  "/room-2/DSC07415.jpg",
  "/room-2/DSC07416.jpg",
  "/room-2/DSC07422.jpg",
  "/room-2/DSC07424.jpg",
  "/room-2/DSC07429.jpg",
  "/room-2/DSC07432.jpg",
];

const room3Images = [
  "/room-3/DSC07372.jpg",
  "/room-3/DSC07374.jpg",
  "/room-3/DSC07379.jpg",
  "/room-3/DSC07380.jpg",
  "/room-3/DSC07384.jpg",
  "/room-3/DSC07389.jpg",
  "/room-3/DSC07390.jpg",
  "/room-3/DSC07391.jpg",
  "/room-3/DSC07392.jpg",
  "/room-3/DSC07393.jpg",
  "/room-3/DSC07399.jpg",
];

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "serenity-suite",
    name: "Serenity Suite",
    tagline: "A sanctuary of calm where light, texture and silence converge.",
    roomType: "Master Bedroom",
    heroImage: room1Images[0],
    gallery: room1Images,
    tourUrl: "https://mls.kuu.la/share/L86hw?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room1-web.mp4",
    story:
      "Inspired by the quiet grandeur of a private villa on the Amalfi coast, Serenity Suite is designed as a complete sensorial retreat. Every textile, surface and proportion has been considered to slow time and deepen rest.",
    designerNotes:
      "We used a restrained palette of raw silk, brushed oak and bronze to frame the bed as the architectural centerpiece. The room breathes through negative space and natural light.",
    materials: ["Brushed Oak", "Raw Silk", "Statuario Marble", "Bronze","Linen"],
    colorPalette: [
      { name: "Alabaster", hex: "#FAFAF8" },
      { name: "Travertine", hex: "#E8E0D5" },
      { name: "Bronze Mist", hex: "#8B6F4E" },
      { name: "Charcoal", hex: "#2C2A26" },
    ],
    dimensions: { width: 5.2, height: 3.1, depth: 4.8, unit: "m" },
    estimatedPrice: 124000,
    currency: "DZD",
    featured: true,
    products: [],
  },
  {
    id: "c2",
    slug: "metropolitan-loft",
    name: "Metropolitan Loft",
    tagline: "Urban sophistication carved in stone, steel and velvet.",
    roomType: "Master Bedroom",
    heroImage: room2Images[0],
    gallery: room2Images,
    tourUrl: "https://mls.kuu.la/share/L8xzV?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room2-web.mp4",
    story:
      "The Metropolitan Loft collection captures the duality of modern city living: monumental comfort and refined minimalism. Designed for double-height apartments and curated gallery walls.",
    designerNotes:
      "Strong horizontal lines, deep modular seating and monolithic stone tables create a landscape of comfort. The lighting plan layers ambient glow with architectural spotlights.",
    materials: ["Nero Marquina Marble", "Powder-coated Steel", "Mohair Velvet", "Smoked Oak","Brass"],
    colorPalette: [
      { name: "Cloud", hex: "#F4F1EC" },
      { name: "Taupe", hex: "#A89B8C" },
      { name: "Carbon", hex: "#2C2A26" },
      { name: "Brass", hex: "#C9A86C" },
    ],
    dimensions: { width: 8.4, height: 3.6, depth: 6.2, unit: "m" },
    estimatedPrice: 198000,
    currency: "DZD",
    featured: true,
    products: [],
  },
  {
    id: "c3",
    slug: "villa-verde-dining",
    name: "Villa Verde Dining",
    tagline: "Convivial elegance for long evenings and lingering conversations.",
    roomType: "Master Bedroom",
    heroImage: room3Images[0],
    gallery: room3Images,
    tourUrl: "https://mls.kuu.la/share/L8xsg?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room3-web.mp4",
    story:
      "Villa Verde reimagines the formal dining room as a warm, sculptural stage. Curves replace corners; the table becomes both monument and gathering place.",
    designerNotes:
      "The elliptical table is carved from a single block of travertine and paired with low-backed leather chairs. A hand-blown glass chandelier hovers like a cloud.",
    materials: ["Travertine", "Vegetable-tanned Leather", "Hand-blown Glass", "Walnut","Brushed Brass"],
    colorPalette: [
      { name: "Cream", hex: "#F5F0E8" },
      { name: "Olive Stone", hex: "#C9B8A5" },
      { name: "Saddle", hex: "#8B6F4E" },
      { name: "Walnut", hex: "#5C4A3A" },
    ],
    dimensions: { width: 6.0, height: 3.0, depth: 5.5, unit: "m" },
    estimatedPrice: 156000,
    currency: "DZD",
    featured: true,
    products: [],
  },
];

export const products: Product[] = [];
export const testimonials: Testimonial[] = [];
export const projects: Project[] = [];
export const categories: string[] = [];
