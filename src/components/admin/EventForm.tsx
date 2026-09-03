"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "./FormField";
import { ImageUrlField } from "./ImageUrlField";
import { EVENT_CATEGORY_LABELS, type BarEvent, type EventCategory } from "@/lib/types";

type FormAction = (
  prevState: { error: string | null },
  formData: FormData
) => Promise<{ error: string | null }>;

export function EventForm({ action, event }: { action: FormAction; event?: BarEvent }) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <FormField label="Title">
        <input name="title" defaultValue={event?.title} required className={inputClass} />
      </FormField>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <FormField label="Date">
          <input
            type="date"
            name="date"
            defaultValue={event?.date}
            required
            className={inputClass}
          />
        </FormField>
        <FormField label="Start Time">
          <input
            type="time"
            name="start_time"
            defaultValue={event?.startTime ?? "20:00"}
            className={inputClass}
          />
        </FormField>
        <FormField label="End Time">
          <input
            type="time"
            name="end_time"
            defaultValue={event?.endTime ?? "23:00"}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Category">
        <select name="category" defaultValue={event?.category ?? "special-night"} className={inputClass}>
          {(Object.keys(EVENT_CATEGORY_LABELS) as EventCategory[]).map((c) => (
            <option key={c} value={c}>
              {EVENT_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Description">
        <textarea
          name="description"
          defaultValue={event?.description}
          rows={3}
          className={inputClass}
        />
      </FormField>

      <ImageUrlField name="image_url" defaultValue={event?.imageUrl} />

      <FormField label="Location">
        <input
          name="location"
          defaultValue={event?.location ?? "FREEMIND BKK"}
          className={inputClass}
        />
      </FormField>

      <FormField label="Booking URL" hint="Leave as #reserve to use the site-wide reservation link.">
        <input
          name="booking_url"
          defaultValue={event?.bookingUrl ?? "#reserve"}
          className={inputClass}
        />
      </FormField>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-taupe">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={event?.featured}
            className="accent-brass"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-taupe">
          <input
            type="checkbox"
            name="published"
            defaultChecked={event?.published ?? true}
            className="accent-brass"
          />
          Published
        </label>
      </div>

      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit border border-brass/60 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
