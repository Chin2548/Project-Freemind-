"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type { ReservationStatus } from "@/lib/types";

export interface ReservationFormState {
  error: string | null;
  success?: boolean;
}

export async function createReservation(
  _prevState: ReservationFormState,
  formData: FormData
): Promise<ReservationFormState> {
  if (!isSupabaseConfigured) {
    return {
      error:
        "Online booking isn't connected yet. Please call or email us directly to reserve.",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const partySize = Number(formData.get("party_size") ?? 2);
  const date = String(formData.get("date") ?? "");
  const time = String(formData.get("time") ?? "");
  const notes = String(formData.get("notes") ?? "").trim();

  if (!name || !email || !phone || !date || !time) {
    return { error: "Please fill in your name, email, phone, date, and time." };
  }
  if (!Number.isFinite(partySize) || partySize < 1) {
    return { error: "Party size must be at least 1." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("reservations").insert({
    name,
    email,
    phone,
    party_size: partySize,
    date,
    time,
    notes,
  });

  if (error) return { error: "Something went wrong. Please try again." };

  revalidatePath("/admin/reservations");
  return { error: null, success: true };
}

export async function updateReservationStatus(id: string, status: ReservationStatus) {
  const supabase = await createClient();
  await supabase.from("reservations").update({ status }).eq("id", id);
  revalidatePath("/admin/reservations");
}

export async function deleteReservation(id: string) {
  const supabase = await createClient();
  await supabase.from("reservations").delete().eq("id", id);
  revalidatePath("/admin/reservations");
}
