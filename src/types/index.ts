export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  collectionSlug?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  description: string;
  shortDescription: string;
  specifications: Record<string, string>;
  dimensions: { width: number; height: number; depth: number; unit: string };
  materials: string[];
  finishes: FinishOption[];
  colors: ColorOption[];
  inStock: boolean;
  sku: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestseller?: boolean;
  downloads?: { label: string; url: string }[];
  installationGuide?: string;
}

export interface FinishOption {
  id: string;
  name: string;
  hex: string;
  priceAdjustment: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  priceAdjustment: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  tourUrl?: string;
  videoUrl?: string;
  story: string;
  designerNotes: string;
  materials: string[];
  colorPalette: { name: string; hex: string }[];
  dimensions: { width: number; height: number; depth: number; unit: string };
  estimatedPrice: number;
  currency: string;
  products: Product[];
  roomType: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  project: string;
  image: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  year: string;
  description: string;
  images: string[];
  services: string[];
  squareMeters: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  finish?: string;
  color?: string;
}

export interface Booking {
  id: string;
  type: 'showroom' | 'consultation';
  date: string;
  time: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface Order {
  id: string;
  status: string;
  total: number;
  currency: string;
  customer?: string;
  userEmail?: string;
  date?: string;
  createdAt?: string;
  items?: { productId: string; quantity: number; price: number }[];
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  label: string;
}

export interface RoomConfiguration {
  wallColor: string;
  flooring: string;
  finishes: Record<string, string>;
  lighting: 'day' | 'night';
}
