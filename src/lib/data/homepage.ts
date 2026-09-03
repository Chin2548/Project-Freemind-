import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { HomepageContent, IngredientStep } from "@/lib/types";
import { SAMPLE_HOMEPAGE_CONTENT } from "./sample-homepage";

interface HomepageContentRow {
  id: string;
  hero_label: string;
  hero_headline: string;
  hero_tagline: string;
  hero_subtext: string;
  hero_image_url: string;
  space_label: string;
  space_headline: string;
  space_body: string;
  space_image_url: string;
  philosophy_headline: string;
  philosophy_subtext: string;
  craft_label: string;
  craft_headline: string;
  craft_body: string;
  craft_image_url: string;
  ingredient_journey: IngredientStep[];
  menu_section_label: string;
  menu_section_headline: string;
  events_section_label: string;
  events_section_headline: string;
  night_headline: string;
  night_image_url: string;
  findus_label: string;
  findus_headline: string;
  reserve_headline: string;
  reserve_image_url: string;
  updated_at: string;
}

function mapRow(row: HomepageContentRow): HomepageContent {
  return {
    id: row.id,
    heroLabel: row.hero_label,
    heroHeadline: row.hero_headline,
    heroTagline: row.hero_tagline,
    heroSubtext: row.hero_subtext,
    heroImageUrl: row.hero_image_url,
    spaceLabel: row.space_label,
    spaceHeadline: row.space_headline,
    spaceBody: row.space_body,
    spaceImageUrl: row.space_image_url,
    philosophyHeadline: row.philosophy_headline,
    philosophySubtext: row.philosophy_subtext,
    craftLabel: row.craft_label,
    craftHeadline: row.craft_headline,
    craftBody: row.craft_body,
    craftImageUrl: row.craft_image_url,
    ingredientJourney: row.ingredient_journey ?? [],
    menuSectionLabel: row.menu_section_label,
    menuSectionHeadline: row.menu_section_headline,
    eventsSectionLabel: row.events_section_label,
    eventsSectionHeadline: row.events_section_headline,
    nightHeadline: row.night_headline,
    nightImageUrl: row.night_image_url,
    findusLabel: row.findus_label,
    findusHeadline: row.findus_headline,
    reserveHeadline: row.reserve_headline,
    reserveImageUrl: row.reserve_image_url,
    updatedAt: row.updated_at,
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  if (!isSupabaseConfigured) {
    return SAMPLE_HOMEPAGE_CONTENT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_content")
      .select("*")
      .eq("id", "default")
      .single();

    if (error) throw error;
    return mapRow(data as HomepageContentRow);
  } catch {
    return SAMPLE_HOMEPAGE_CONTENT;
  }
}
