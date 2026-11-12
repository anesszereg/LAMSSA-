import { MetadataRoute } from "next";
import { collections } from "@/lib/data";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://lamsa.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/collections",
    "/projects",
    "/gallery",
    "/about",
    "/contact",
    "/booking",
  ];

  const collectionRoutes = collections.map((c) => `/collections/${c.slug}`);
  const experienceRoutes = collections.map((c) => `/experience/${c.slug}`);

  return [...staticRoutes, ...collectionRoutes, ...experienceRoutes].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7,
    })
  );
}
