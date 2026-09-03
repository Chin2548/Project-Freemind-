"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const BUCKET = "media";

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  createdAt: string;
}

export async function listMedia(): Promise<MediaFile[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error || !data) return [];

  return data
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => {
      const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(file.name);
      return {
        name: file.name,
        url: publicUrl.publicUrl,
        size: file.metadata?.size ?? 0,
        createdAt: file.created_at ?? "",
      };
    });
}

export async function uploadMedia(_prevState: { error: string | null }, formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) return { error: "Choose a file to upload." };

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const { error } = await supabase.storage.from(BUCKET).upload(safeName, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/media");
  return { error: null };
}

export async function deleteMedia(name: string) {
  const supabase = await createClient();
  await supabase.storage.from(BUCKET).remove([name]);
  revalidatePath("/admin/media");
}
