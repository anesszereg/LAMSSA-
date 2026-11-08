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
    name: "جناح السكينة",
    tagline: "ملاذ من الهدوء يتقاطع فيه الضوء والملمس والصمت.",
    roomType: "غرفة نوم رئيسية",
    heroImage: room1Images[0],
    gallery: room1Images,
    tourUrl: "https://mls.kuu.la/share/L86hw?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room1-web.mp4",
    story:
      "مستوحى من العظمة الهادئة لفيلا خاصة على ساحل أمالفي، صُمم جناح السكينة ليكون ملجأً حسّياً متكاملاً. لقد أُخذ بعين الاعتبار كل نسيج وسطح ونسبة لإبطاء الزمن وتعميق الراحة.",
    designerNotes:
      "استخدمنا لوحة محكومة من الحرير الخام والبلوط المصقول والبرونز لتُؤطّر السرير كقطعة معمارية محورية. تتنفس الغرفة عبر المساحات السلبية والضوء الطبيعي.",
    materials: ["بلوط مصقول", "حرير خام", "رخام ستاتواريو", "برونز", "كتان"],
    colorPalette: [
      { name: "ألباستر", hex: "#FAFAF8" },
      { name: "ترافرتين", hex: "#E8E0D5" },
      { name: "ضباب برونزي", hex: "#8B6F4E" },
      { name: "فحمي", hex: "#2C2A26" },
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
    name: "اللوفت الحضري",
    tagline: "أناقة حضرية منحوتة من الحجر والفولاذ والمخمل.",
    roomType: "غرفة نوم رئيسية",
    heroImage: room2Images[0],
    gallery: room2Images,
    tourUrl: "https://mls.kuu.la/share/L8xzV?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room2-web.mp4",
    story:
      "تلتقط مجموعة اللوفت الحضري ثنائية الحياة العصرية في المدينة: راحة ضخمة وبساطة راقية. صُممت للشقق ذات الارتفاع المزدوج وللجدران الفنية المنسّقة.",
    designerNotes:
      "تخلق الخطوط الأفقية القوية، والمقاعد المعيارية العميقة، وطاولات الحجر الأحادية مشهداً من الراحة. تُركّب خطة الإضاءة بين التوهج المحيط وضوء الأماكن المعماري.",
    materials: ["رخام نيرو ماركينا", "فولاذ مطلي بالمسحوق", "مخمل موهير", "بلوط مدخّن", "نحاس"],
    colorPalette: [
      { name: "غيمي", hex: "#F4F1EC" },
      { name: "بني رمادي", hex: "#A89B8C" },
      { name: "كربوني", hex: "#2C2A26" },
      { name: "نحاسي", hex: "#C9A86C" },
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
    name: "فيلا فيردي للطعام",
    tagline: "أناقة اجتماعية لأمسيات طويلة وحوارات متأخرة.",
    roomType: "غرفة نوم رئيسية",
    heroImage: room3Images[0],
    gallery: room3Images,
    tourUrl: "https://mls.kuu.la/share/L8xsg?fs=1&vr=1&zoom=1&thumbs=1&inst=fr",
    videoUrl: "/videos/room3-web.mp4",
    story:
      "تُعيد فيلا فيردي تصوّر غرفة الطعام الرسمية كمسرح دافئ ونحتي. تحلّ المنحنيات محلّ الزوايا؛ فتصبح الطاولة نصباً تذكارياً ومكاناً للالتقاء معاً.",
    designerNotes:
      "الطاولة الإهليلجية منحوتة من كتلة واحدة من الترافرتين ومقرونة بكراسي جلدية منخفضة الظهر. تعلو الثريا المصنوعة من الزجاج المنفوخ يدوياً كغيمة.",
    materials: ["ترافرتين", "جلد مُدبّر نباتياً", "زجاج منفوخ يدوياً", "جوز", "نحاس مصقول"],
    colorPalette: [
      { name: "كريمي", hex: "#F5F0E8" },
      { name: "حجر زيتوني", hex: "#C9B8A5" },
      { name: "جلدي", hex: "#8B6F4E" },
      { name: "جوزي", hex: "#5C4A3A" },
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
