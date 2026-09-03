"use client";

import { useActionState, useState } from "react";
import { FormField, inputClass } from "./FormField";
import { ImageUrlField } from "./ImageUrlField";
import { updateSiteSettings } from "@/lib/data/settings-actions";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction, pending] = useActionState(updateSiteSettings, {
    error: null,
    success: false,
  });
  const [hours, setHours] = useState(
    settings.openingHours.length
      ? settings.openingHours
      : [{ days: "MON — THU", hours: "18:00 — 00:00" }]
  );

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <FormField label="Bar Name">
        <input name="bar_name" defaultValue={settings.barName} className={inputClass} />
      </FormField>

      <FormField label="Tagline">
        <input name="tagline" defaultValue={settings.tagline} className={inputClass} />
      </FormField>

      <FormField label="Phone">
        <input name="phone" defaultValue={settings.phone} className={inputClass} />
      </FormField>

      <FormField label="Email">
        <input name="email" defaultValue={settings.email} className={inputClass} />
      </FormField>

      <FormField label="Address">
        <textarea name="address" defaultValue={settings.address} rows={2} className={inputClass} />
      </FormField>

      <FormField label="Instagram URL">
        <input name="instagram_url" defaultValue={settings.instagramUrl} className={inputClass} />
      </FormField>

      <FormField label="Facebook URL">
        <input name="facebook_url" defaultValue={settings.facebookUrl} className={inputClass} />
      </FormField>

      <FormField label="TikTok URL">
        <input name="tiktok_url" defaultValue={settings.tiktokUrl} className={inputClass} />
      </FormField>

      <FormField label="Google Maps URL">
        <input name="google_maps_url" defaultValue={settings.googleMapsUrl} className={inputClass} />
      </FormField>

      <FormField label="Reservation URL">
        <input name="reservation_url" defaultValue={settings.reservationUrl} className={inputClass} />
      </FormField>

      <ImageUrlField
        name="find_us_image_url"
        label="Find Us Page — Background Image"
        defaultValue={settings.findUsImageUrl}
      />

      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe">
          Opening Hours
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {hours.map((entry, i) => (
            <div key={i} className="flex flex-col gap-2 sm:flex-row">
              <input
                name="hours_days"
                defaultValue={entry.days}
                placeholder="MON — THU"
                className={inputClass}
              />
              <input
                name="hours_hours"
                defaultValue={entry.hours}
                placeholder="18:00 — 00:00"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setHours((h) => h.filter((_, idx) => idx !== i))}
                className="shrink-0 self-start px-2 py-2 font-sans text-xs text-taupe transition-colors hover:text-[#d98b85] sm:self-auto"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setHours((h) => [...h, { days: "", hours: "" }])}
          className="mt-3 font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
        >
          + Add Row
        </button>
      </div>

      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}
      {state.success && (
        <p className="font-sans text-xs text-brass">Settings saved.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit border border-brass/60 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save Settings"}
      </button>
    </form>
  );
}
