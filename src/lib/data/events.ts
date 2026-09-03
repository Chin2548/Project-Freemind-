import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { BarEvent } from "@/lib/types";
import { SAMPLE_EVENTS } from "./sample-events";

interface EventRow {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  category: string;
  description: string;
  image_url: string;
  location: string;
  booking_url: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

function mapRow(row: EventRow): BarEvent {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    startTime: row.start_time,
    endTime: row.end_time,
    category: row.category as BarEvent["category"],
    description: row.description,
    imageUrl: row.image_url,
    location: row.location,
    bookingUrl: row.booking_url,
    featured: row.featured,
    published: row.published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getEvents(): Promise<BarEvent[]> {
  if (!isSupabaseConfigured) {
    return [...SAMPLE_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("published", true)
      .order("date", { ascending: true });

    if (error) throw error;
    return (data as EventRow[]).map(mapRow);
  } catch {
    return [...SAMPLE_EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  }
}

export async function getUpcomingEvents(limit?: number): Promise<BarEvent[]> {
  const events = await getEvents();
  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.date >= todayStr);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export async function getEventById(id: string): Promise<BarEvent | null> {
  const events = await getEvents();
  return events.find((event) => event.id === id) ?? null;
}

/** Admin-only: every event regardless of published state, read with the caller's session. */
export async function getAllEventsAdmin(): Promise<BarEvent[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("getAllEventsAdmin error:", error);
    return [];
  }
  if (!data) return [];
  return (data as EventRow[]).map(mapRow);
}

export async function getEventByIdAdmin(id: string): Promise<BarEvent | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  if (error || !data) return null;
  return mapRow(data as EventRow);
}
