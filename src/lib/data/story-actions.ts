"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { StorySectionContent } from "@/lib/types";

export async function updateStoryContent(
  _prevState: { error: string | null; success?: boolean },
  formData: FormData
) {
  const supabase = await createClient();

  const labels = formData.getAll("section_label") as string[];
  const titles = formData.getAll("section_title") as string[];
  const bodies = formData.getAll("section_body") as string[];
  const images = formData.getAll("section_image") as string[];

  const sections: StorySectionContent[] = labels
    .map((label, i) => ({
      label: label.trim(),
      title: (titles[i] ?? "").trim(),
      body: (bodies[i] ?? "").trim(),
      image: (images[i] ?? "").trim(),
      // Checkboxes only submit a value when checked, so each row's box is
      // named with its index to line it up with the getAll()-ordered fields
      // above instead of relying on getAll("section_reverse"), which would
      // silently drop unchecked rows and misalign everything after them.
      reverse: formData.get(`section_reverse_${i}`) === "on",
    }))
    .filter((section) => section.label || section.title);

  const payload = {
    eyebrow: String(formData.get("eyebrow") ?? ""),
    headline_line1: String(formData.get("headline_line1") ?? ""),
    headline_line2: String(formData.get("headline_line2") ?? ""),
    sections,
  };

  const { error } = await supabase
    .from("story_content")
    .update(payload)
    .eq("id", "default");

  if (error) return { error: error.message };

  revalidatePath("/story");
  revalidatePath("/admin/story");
  return { error: null, success: true };
}
