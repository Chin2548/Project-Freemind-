"use client";

import { useActionState } from "react";
import { createReservation, type ReservationFormState } from "@/lib/data/reservation-actions";

const inputClass =
  "w-full border border-walnut bg-chocolate px-4 py-3 font-sans text-sm text-cream outline-none focus:border-brass";
const labelClass = "font-sans text-[10px] uppercase tracking-[0.24em] text-taupe";

const initialState: ReservationFormState = { error: null };

export function ReservationForm({ defaultNotes = "" }: { defaultNotes?: string }) {
  const [state, formAction, pending] = useActionState(createReservation, initialState);

  if (state.success) {
    return (
      <div className="border border-brass/40 bg-chocolate/40 px-6 py-10 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.28em] text-brass">
          Request Sent
        </p>
        <h2 className="mt-4 font-serif text-3xl text-ivory">We&apos;ll see you soon.</h2>
        <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-taupe">
          Your table request has been sent. We&apos;ll confirm by email or phone
          shortly — for anything urgent, feel free to call us directly.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Party Size</label>
          <select name="party_size" defaultValue="2" className={`mt-2 ${inputClass}`}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Person" : "People"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Date</label>
          <input
            type="date"
            name="date"
            required
            min={new Date().toISOString().slice(0, 10)}
            className={`mt-2 ${inputClass}`}
          />
        </div>
        <div>
          <label className={labelClass}>Time</label>
          <input type="time" name="time" required defaultValue="19:00" className={`mt-2 ${inputClass}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name</label>
          <input name="name" required className={`mt-2 ${inputClass}`} />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input name="phone" type="tel" required className={`mt-2 ${inputClass}`} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input name="email" type="email" required className={`mt-2 ${inputClass}`} />
      </div>

      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={defaultNotes}
          placeholder="Anything we should know — an occasion, a seating preference..."
          className={`mt-2 ${inputClass}`}
        />
      </div>

      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit border border-brass/60 px-8 py-3 font-sans text-xs uppercase tracking-[0.28em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Book Now"}
      </button>
    </form>
  );
}
