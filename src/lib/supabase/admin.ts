import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./env";

/**
 * Service-role client for privileged server-side operations only
 * (admin CRUD, storage writes). Never import this from a Client Component.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !serviceRoleKey) {
    throw new Error(
      "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createSupabaseClient(SUPABASE_URL, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
