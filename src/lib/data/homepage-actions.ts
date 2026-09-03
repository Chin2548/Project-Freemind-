"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { IngredientStep } from "@/lib/types";

export async function updateHomepageContent(
  _prevState: { error: string | null; success?: boolean },
  formData: FormData
) {
  const supabase = await createClient();

  const stepLabels = formData.getAll("step_label") as string[];
  const stepNotes = formData.getAll("step_note") as string[];
  const stepImages = formData.getAll("step_image") as string[];
  const ingredientJourney: IngredientStep[] = stepLabels
    .map((label, i) => ({
      label: label.trim(),
      note: (stepNotes[i] ?? "").trim(),
      image: (stepImages[i] ?? "").trim(),
    }))
    .filter((step) => step.label);

  const payload = {
    hero_label: String(formData.get("hero_label") ?? ""),
    hero_headline: String(formData.get("hero_headline") ?? ""),
    hero_tagline: String(formData.get("hero_tagline") ?? ""),
    hero_subtext: String(formData.get("hero_subtext") ?? ""),
    hero_image_url: String(formData.get("hero_image_url") ?? ""),
    space_label: String(formData.get("space_label") ?? ""),
    space_headline: String(formData.get("space_headline") ?? ""),
    space_body: String(formData.get("space_body") ?? ""),
    space_image_url: String(formData.get("space_image_url") ?? ""),
    philosophy_headline: String(formData.get("philosophy_headline") ?? ""),
    philosophy_subtext: String(formData.get("philosophy_subtext") ?? ""),
    craft_label: String(formData.get("craft_label") ?? ""),
    craft_headline: String(formData.get("craft_headline") ?? ""),
    craft_body: String(formData.get("craft_body") ?? ""),
    craft_image_url: String(formData.get("craft_image_url") ?? ""),
    ingredient_journey: ingredientJourney,
    menu_section_label: String(formData.get("menu_section_label") ?? ""),
    menu_section_headline: String(formData.get("menu_section_headline") ?? ""),
    events_section_label: String(formData.get("events_section_label") ?? ""),
    events_section_headline: String(formData.get("events_section_headline") ?? ""),
    night_headline: String(formData.get("night_headline") ?? ""),
    night_image_url: String(formData.get("night_image_url") ?? ""),
    findus_label: String(formData.get("findus_label") ?? ""),
    findus_headline: String(formData.get("findus_headline") ?? ""),
    reserve_headline: String(formData.get("reserve_headline") ?? ""),
    reserve_image_url: String(formData.get("reserve_image_url") ?? ""),
  };

  const { error } = await supabase
    .from("homepage_content")
    .update(payload)
    .eq("id", "default");

  if (error) return { error: error.message };

  revalidatePath("/");
  revalidatePath("/admin/homepage");
  return { error: null, success: true };
}
