import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { MenuItem } from "@/lib/types";
import { SAMPLE_MENU_ITEMS } from "./sample-menu";

interface MenuItemRow {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  image_url: string;
  ingredients: string[];
  description: string;
  story: string;
  flavor_profile: string[];
  recommended_occasion: string;
  featured: boolean;
  available: boolean;
  created_at: string;
  updated_at: string;
}

function mapRow(row: MenuItemRow): MenuItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category as MenuItem["category"],
    price: row.price,
    currency: row.currency,
    imageUrl: row.image_url,
    ingredients: row.ingredients ?? [],
    description: row.description,
    story: row.story,
    flavorProfile: row.flavor_profile ?? [],
    recommendedOccasion: row.recommended_occasion,
    featured: row.featured,
    available: row.available,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured) {
    return SAMPLE_MENU_ITEMS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("available", true)
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (error) throw error;
    return (data as MenuItemRow[]).map(mapRow);
  } catch {
    return SAMPLE_MENU_ITEMS;
  }
}

export async function getFeaturedMenuItems(): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((item) => item.featured);
}

export async function getMenuItemById(id: string): Promise<MenuItem | null> {
  const items = await getMenuItems();
  return items.find((item) => item.id === id) ?? null;
}

/** Admin-only: every item regardless of availability, read with the caller's session. */
export async function getAllMenuItemsAdmin(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("getAllMenuItemsAdmin error:", error);
    return [];
  }
  if (!data) return [];
  return (data as MenuItemRow[]).map(mapRow);
}

export async function getMenuItemByIdAdmin(id: string): Promise<MenuItem | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("menu_items").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapRow(data as MenuItemRow);
}
