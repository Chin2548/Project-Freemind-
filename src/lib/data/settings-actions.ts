"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { OpeningHoursEntry } from "@/lib/types";

export async function updateSiteSettings(
  _prevState: { error: string | null; success?: boolean },
  formData: FormData
) {
  const supabase = await createClient();

  const days = formData.getAll("hours_days") as string[];
  const hours = formData.getAll("hours_hours") as string[];
  const openingHours: OpeningHoursEntry[] = days
    .map((d, i) => ({ days: d.trim(), hours: (hours[i] ?? "").trim() }))
    .filter((entry) => entry.days && entry.hours);

  const payload = {
    bar_name: String(formData.get("bar_name") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    address: String(formData.get("address") ?? ""),
    instagram_url: String(formData.get("instagram_url") ?? ""),
    facebook_url: String(formData.get("facebook_url") ?? ""),
    tiktok_url: String(formData.get("tiktok_url") ?? ""),
    google_maps_url: String(formData.get("google_maps_url") ?? ""),
    reservation_url: String(formData.get("reservation_url") ?? ""),
    opening_hours: openingHours,
    find_us_image_url: String(formData.get("find_us_image_url") ?? ""),
  };

  const { error } = await supabase
    .from("site_settings")
    .update(payload)
    .eq("id", "default");

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");
  return { error: null, success: true };
}
