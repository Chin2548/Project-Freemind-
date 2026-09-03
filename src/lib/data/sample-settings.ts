import type { SiteSettings } from "@/lib/types";

export const SAMPLE_SETTINGS: SiteSettings = {
  id: "default",
  barName: "FREEMIND BKK",
  tagline: "Free your mind.",
  phone: "+66 XX XXX XXXX",
  email: "hello@freemindbkk.com",
  address: "Soi Sukhumvit, Khlong Toei, Bangkok 10110, Thailand",
  instagramUrl: "https://instagram.com/freemindbkk",
  facebookUrl: "https://facebook.com/freemindbkk",
  tiktokUrl: "https://tiktok.com/@freemindbkk",
  googleMapsUrl: "https://maps.google.com/?q=Bangkok+Thailand",
  reservationUrl: "#reserve",
  openingHours: [
    { days: "MON — THU", hours: "18:00 — 00:00" },
    { days: "FRI — SAT", hours: "18:00 — 02:00" },
    { days: "SUN", hours: "18:00 — 00:00" },
  ],
  findUsImageUrl: "/images/photos/bar-glasses-candle.jpg",
  updatedAt: new Date().toISOString(),
};
