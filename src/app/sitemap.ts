import type { MetadataRoute } from "next";
import { getMenuItems } from "@/lib/data/menu";
import { getEvents } from "@/lib/data/events";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freemindbkk.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [items, events] = await Promise.all([getMenuItems(), getEvents()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/menu`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/events`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/find-us`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const menuRoutes: MetadataRoute.Sitemap = items.map((item) => ({
    url: `${siteUrl}/menu/${item.id}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/events/${event.id}`,
    lastModified: event.updatedAt,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...menuRoutes, ...eventRoutes];
}
