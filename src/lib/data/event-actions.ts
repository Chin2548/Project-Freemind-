"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { EventCategory } from "@/lib/types";

function buildPayload(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    date: String(formData.get("date") ?? ""),
    start_time: String(formData.get("start_time") ?? "20:00"),
    end_time: String(formData.get("end_time") ?? "23:00"),
    category: String(formData.get("category") ?? "special-night") as EventCategory,
    description: String(formData.get("description") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    location: String(formData.get("location") ?? ""),
    booking_url: String(formData.get("booking_url") ?? "#reserve"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/events/[id]", "page");
}

export async function createEvent(_prevState: { error: string | null }, formData: FormData) {
  const supabase = await createClient();
  const payload = buildPayload(formData);

  if (!payload.title.trim()) return { error: "Title is required." };
  if (!payload.date) return { error: "Date is required." };

  const { error } = await supabase.from("events").insert(payload);
  if (error) return { error: error.message };

  revalidatePublic();
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prevState: { error: string | null },
  formData: FormData
) {
  const supabase = await createClient();
  const payload = buildPayload(formData);

  if (!payload.title.trim()) return { error: "Title is required." };
  if (!payload.date) return { error: "Date is required." };

  const { error } = await supabase.from("events").update(payload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePublic();
  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePublic();
  revalidatePath("/admin/events");
}
