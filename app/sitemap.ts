// app/sitemap.ts

import type { MetadataRoute } from "next";

import { SITE_URL } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/work",
    "/careers",
    "/contact",
    "/blog",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  // TODO: once /work/[slug] case-study pages exist and pull from a real
  // data source (CMS, MDX, or a projects.ts constant), map their slugs
  // in here the same way staticRoutes are mapped above.

  return staticEntries;
}
