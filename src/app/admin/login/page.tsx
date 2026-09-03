"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/supabase/auth-actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<{ error: string | null }, FormData>(
    signIn,
    { error: null }
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6">
      <div className="w-full max-w-sm">
        <p className="font-serif text-2xl tracking-[0.1em] text-ivory">
          FREEMIND <span className="text-brass">BKK</span>
        </p>
        <p className="mt-2 font-sans text-xs uppercase tracking-[0.24em] text-taupe">
          Admin
        </p>

        <form action={formAction} className="mt-10 flex flex-col gap-5">
          <div>
            <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="mt-2 w-full border border-walnut bg-chocolate px-4 py-3 font-sans text-sm text-cream outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full border border-walnut bg-chocolate px-4 py-3 font-sans text-sm text-cream outline-none focus:border-brass"
            />
          </div>

          {state.error && (
            <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-4 border border-brass/60 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
          >
            {pending ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
