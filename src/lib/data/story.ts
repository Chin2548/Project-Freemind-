import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { StoryContent, StorySectionContent } from "@/lib/types";
import { SAMPLE_STORY_CONTENT } from "./sample-story";

interface StoryContentRow {
  id: string;
  eyebrow: string;
  headline_line1: string;
  headline_line2: string;
  sections: StorySectionContent[];
  updated_at: string;
}

function mapRow(row: StoryContentRow): StoryContent {
  return {
    id: row.id,
    eyebrow: row.eyebrow,
    headlineLine1: row.headline_line1,
    headlineLine2: row.headline_line2,
    sections: row.sections ?? [],
    updatedAt: row.updated_at,
  };
}

export async function getStoryContent(): Promise<StoryContent> {
  if (!isSupabaseConfigured) {
    return SAMPLE_STORY_CONTENT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("story_content")
      .select("*")
      .eq("id", "default")
      .single();

    if (error) throw error;
    return mapRow(data as StoryContentRow);
  } catch {
    return SAMPLE_STORY_CONTENT;
  }
}
