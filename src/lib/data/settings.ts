import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { OpeningHoursEntry, SiteSettings } from "@/lib/types";
import { SAMPLE_SETTINGS } from "./sample-settings";

interface SettingsRow {
  id: string;
  bar_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  google_maps_url: string;
  reservation_url: string;
  opening_hours: OpeningHoursEntry[];
  find_us_image_url: string;
  updated_at: string;
}

function mapRow(row: SettingsRow): SiteSettings {
  return {
    id: row.id,
    barName: row.bar_name,
    tagline: row.tagline,
    phone: row.phone,
    email: row.email,
    address: row.address,
    instagramUrl: row.instagram_url,
    facebookUrl: row.facebook_url,
    tiktokUrl: row.tiktok_url,
    googleMapsUrl: row.google_maps_url,
    reservationUrl: row.reservation_url,
    openingHours: row.opening_hours ?? [],
    findUsImageUrl: row.find_us_image_url || "/images/photos/bar-glasses-candle.jpg",
    updatedAt: row.updated_at,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) {
    return SAMPLE_SETTINGS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error) throw error;
    return mapRow(data as SettingsRow);
  } catch {
    return SAMPLE_SETTINGS;
  }
}
