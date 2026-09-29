"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(label: string) {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/menu");
  revalidatePath("/admin/categories");
}

interface CreateCategoryState {
  error: string | null;
  category?: { id: string; label: string; sortOrder: number };
}

export async function createCategory(
  _prevState: CreateCategoryState,
  formData: FormData
): Promise<CreateCategoryState> {
  const label = String(formData.get("label") ?? "").trim();
  if (!label) return { error: "Name is required." };

  const supabase = await createClient();

  const slug = slugify(label);
  if (!slug) return { error: "That name doesn't make a valid category." };

  const { count } = await supabase
    .from("menu_categories")
    .select("id", { count: "exact", head: true });

  const sortOrder = count ?? 0;
  const { error } = await supabase.from("menu_categories").insert({
    id: slug,
    label,
    sort_order: sortOrder,
  });

  if (error) {
    if (error.code === "23505") {
      return { error: "A category with a similar name already exists." };
    }
    return { error: error.message };
  }

  revalidatePublic();
  return { error: null, category: { id: slug, label, sortOrder } };
}

export async function renameCategory(id: string, label: string) {
  if (!label.trim()) return;
  const supabase = await createClient();
  await supabase.from("menu_categories").update({ label: label.trim() }).eq("id", id);
  revalidatePublic();
}

export async function deleteCategory(
  id: string
): Promise<{ error: string | null }> {
  const supabase = await createClient();

  const { count } = await supabase
    .from("menu_items")
    .select("id", { count: "exact", head: true })
    .eq("category", id);

  if (count && count > 0) {
    return {
      error: `${count} menu item${count === 1 ? "" : "s"} still use this category. Move or delete them first.`,
    };
  }

  const { error } = await supabase.from("menu_categories").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePublic();
  return { error: null };
}

export async function reorderCategories(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("menu_categories").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePublic();
}
