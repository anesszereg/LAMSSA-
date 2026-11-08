import { MetadataRoute } from "next";
import { collections } from "@/lib/data";

const baseUrl = "https://lamsa.com";

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
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.7,
    })
  );
}
