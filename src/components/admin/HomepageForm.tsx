"use client";

import { useActionState, useState } from "react";
import { updateHomepageContent } from "@/lib/data/homepage-actions";
import { AdminSection } from "./AdminSection";
import { FormField, inputClass } from "./FormField";
import { ImageUrlField } from "./ImageUrlField";
import type { HomepageContent, IngredientStep } from "@/lib/types";

export function HomepageForm({ content }: { content: HomepageContent }) {
  const [state, formAction, pending] = useActionState(updateHomepageContent, {
    error: null,
    success: false,
  });
  const [steps, setSteps] = useState<IngredientStep[]>(
    content.ingredientJourney.length
      ? content.ingredientJourney
      : [{ label: "", note: "", image: "" }]
  );

  return (
    <form action={formAction} className="flex max-w-3xl flex-col gap-5">
      <div className="flex items-center justify-between gap-4 border border-walnut/50 bg-chocolate/40 px-5 py-4">
        <p className="font-sans text-xs text-taupe">
          {state.success ? (
            <span className="text-brass">Homepage updated.</span>
          ) : (
            "Expand a section below, make changes, then save."
          )}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="shrink-0 border border-brass/60 px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save Homepage"}
        </button>
      </div>

      <AdminSection title="Hero" description="The full-screen opening scene." defaultOpen>
        <FormField label="Small Label">
          <input name="hero_label" defaultValue={content.heroLabel} className={inputClass} />
        </FormField>
        <FormField label="Headline">
          <input name="hero_headline" defaultValue={content.heroHeadline} className={inputClass} />
        </FormField>
        <FormField label="Tagline (italic line under headline)">
          <input name="hero_tagline" defaultValue={content.heroTagline} className={inputClass} />
        </FormField>
        <FormField label="Supporting Text">
          <textarea
            name="hero_subtext"
            defaultValue={content.heroSubtext}
            rows={2}
            className={inputClass}
          />
        </FormField>
        <ImageUrlField name="hero_image_url" defaultValue={content.heroImageUrl} />
      </AdminSection>

      <AdminSection title="The Space" description="First section after the hero.">
        <FormField label="Small Label">
          <input name="space_label" defaultValue={content.spaceLabel} className={inputClass} />
        </FormField>
        <FormField label="Headline">
          <input name="space_headline" defaultValue={content.spaceHeadline} className={inputClass} />
        </FormField>
        <FormField label="Body Text">
          <textarea name="space_body" defaultValue={content.spaceBody} rows={2} className={inputClass} />
        </FormField>
        <ImageUrlField name="space_image_url" defaultValue={content.spaceImageUrl} />
      </AdminSection>

      <AdminSection title="Philosophy" description="Large typography-only section.">
        <FormField label="Headline" hint="Use a new line for each line break.">
          <textarea
            name="philosophy_headline"
            defaultValue={content.philosophyHeadline}
            rows={3}
            className={inputClass}
          />
        </FormField>
        <FormField label="Supporting Text">
          <textarea
            name="philosophy_subtext"
            defaultValue={content.philosophySubtext}
            rows={2}
            className={inputClass}
          />
        </FormField>
      </AdminSection>

      <AdminSection title="The Craft" description="Cocktail craftsmanship section.">
        <FormField label="Small Label">
          <input name="craft_label" defaultValue={content.craftLabel} className={inputClass} />
        </FormField>
        <FormField label="Headline">
          <input name="craft_headline" defaultValue={content.craftHeadline} className={inputClass} />
        </FormField>
        <FormField label="Body Text">
          <textarea name="craft_body" defaultValue={content.craftBody} rows={2} className={inputClass} />
        </FormField>
        <ImageUrlField name="craft_image_url" defaultValue={content.craftImageUrl} />
      </AdminSection>

      <AdminSection
        title="Ingredient Journey"
        description="The scroll-driven sequence. The last step is treated as the finale."
      >
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3 border border-walnut/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brass">
                  Step {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => setSteps((s) => s.filter((_, idx) => idx !== i))}
                  className="font-sans text-[11px] uppercase tracking-[0.16em] text-taupe transition-colors hover:text-[#d98b85]"
                >
                  Remove
                </button>
              </div>
              <FormField label="Label">
                <input name="step_label" defaultValue={step.label} className={inputClass} />
              </FormField>
              <FormField label="Note">
                <input name="step_note" defaultValue={step.note} className={inputClass} />
              </FormField>
              <ImageUrlField name="step_image" label="Image URL" defaultValue={step.image} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSteps((s) => [...s, { label: "", note: "", image: "" }])}
          className="w-fit font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
        >
          + Add Step
        </button>
      </AdminSection>

      <AdminSection title="Menu &amp; Events Section Headers" description="Small labels shown above the Signature Cocktails and What's Happening sections.">
        <FormField label="Menu Section — Small Label">
          <input name="menu_section_label" defaultValue={content.menuSectionLabel} className={inputClass} />
        </FormField>
        <FormField label="Menu Section — Headline">
          <input
            name="menu_section_headline"
            defaultValue={content.menuSectionHeadline}
            className={inputClass}
          />
        </FormField>
        <FormField label="Events Section — Small Label">
          <input
            name="events_section_label"
            defaultValue={content.eventsSectionLabel}
            className={inputClass}
          />
        </FormField>
        <FormField label="Events Section — Headline">
          <input
            name="events_section_headline"
            defaultValue={content.eventsSectionHeadline}
            className={inputClass}
          />
        </FormField>
      </AdminSection>

      <AdminSection title="The Night" description="Wide cinematic statement section.">
        <FormField label="Headline" hint="Use a new line for each line break.">
          <textarea
            name="night_headline"
            defaultValue={content.nightHeadline}
            rows={2}
            className={inputClass}
          />
        </FormField>
        <ImageUrlField name="night_image_url" defaultValue={content.nightImageUrl} />
      </AdminSection>

      <AdminSection title="Find Us Preview" description="Small labels shown above the address preview.">
        <FormField label="Small Label">
          <input name="findus_label" defaultValue={content.findusLabel} className={inputClass} />
        </FormField>
        <FormField label="Headline">
          <input name="findus_headline" defaultValue={content.findusHeadline} className={inputClass} />
        </FormField>
      </AdminSection>

      <AdminSection title="Reserve" description="Final call-to-action section.">
        <FormField label="Headline">
          <input name="reserve_headline" defaultValue={content.reserveHeadline} className={inputClass} />
        </FormField>
        <ImageUrlField name="reserve_image_url" defaultValue={content.reserveImageUrl} />
      </AdminSection>

      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}
      {state.success && <p className="font-sans text-xs text-brass">Homepage updated.</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-brass/60 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save Homepage"}
      </button>
    </form>
  );
}
