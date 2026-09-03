"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { MenuCategory } from "@/lib/types";

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    category: String(formData.get("category") ?? "signatures") as MenuCategory,
    price: Number(formData.get("price") ?? 0),
    currency: String(formData.get("currency") ?? "$"),
    image_url: String(formData.get("image_url") ?? ""),
    ingredients: parseList(formData.get("ingredients")),
    description: String(formData.get("description") ?? ""),
    story: String(formData.get("story") ?? ""),
    flavor_profile: parseList(formData.get("flavor_profile")),
    recommended_occasion: String(formData.get("recommended_occasion") ?? ""),
    featured: formData.get("featured") === "on",
    available: formData.get("available") === "on",
  };
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/menu/[id]", "page");
}

export async function createMenuItem(_prevState: { error: string | null }, formData: FormData) {
  const supabase = await createClient();
  const payload = buildPayload(formData);

  if (!payload.name.trim()) return { error: "Name is required." };

  const { error } = await supabase.from("menu_items").insert(payload);
  if (error) return { error: error.message };

  revalidatePublic();
  revalidatePath("/admin/menu");
  redirect("/admin/menu");
}

export async function updateMenuItem(
  id: string,
  _prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createClient();
  const payload = buildPayload(formData);

  if (!payload.name.trim()) return { error: "Name is required." };

  const { error } = await supabase.from("menu_items").update(payload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePublic();
  revalidatePath("/admin/menu");
  redirect("/admin/menu");
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  await supabase.from("menu_items").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/menu");
}
