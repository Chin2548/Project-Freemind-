import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { MenuCategoryDef } from "@/lib/types";
import { SAMPLE_MENU_CATEGORIES } from "./sample-categories";

interface MenuCategoryRow {
  id: string;
  label: string;
  sort_order: number;
}

function mapRow(row: MenuCategoryRow): MenuCategoryDef {
  return { id: row.id, label: row.label, sortOrder: row.sort_order };
}

export async function getMenuCategories(): Promise<MenuCategoryDef[]> {
  if (!isSupabaseConfigured) {
    return SAMPLE_MENU_CATEGORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return SAMPLE_MENU_CATEGORIES;
    return (data as MenuCategoryRow[]).map(mapRow);
  } catch {
    return SAMPLE_MENU_CATEGORIES;
  }
}
