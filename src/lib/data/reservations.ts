import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { Reservation, ReservationStatus } from "@/lib/types";

interface ReservationRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  party_size: number;
  date: string;
  time: string;
  notes: string;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

function mapRow(row: ReservationRow): Reservation {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    partySize: row.party_size,
    date: row.date,
    time: row.time,
    notes: row.notes,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Admin-only: every reservation, read with the caller's session. */
export async function getReservationsAdmin(): Promise<Reservation[]> {
  if (!isSupabaseConfigured) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) {
    console.error("getReservationsAdmin error:", error);
    return [];
  }
  if (!data) return [];
  return (data as ReservationRow[]).map(mapRow);
}
