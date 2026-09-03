"use client";

import { useActionState, useState } from "react";
import { updateStoryContent } from "@/lib/data/story-actions";
import { FormField, inputClass } from "./FormField";
import { ImageUrlField } from "./ImageUrlField";
import type { StoryContent, StorySectionContent } from "@/lib/types";

export function StoryForm({ content }: { content: StoryContent }) {
  const [state, formAction, pending] = useActionState(updateStoryContent, {
    error: null,
    success: false,
  });
  const [sections, setSections] = useState<StorySectionContent[]>(
    content.sections.length
      ? content.sections
      : [{ label: "", title: "", body: "", image: "", reverse: false }]
  );

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-8">
      <div className="flex flex-col gap-6 border border-walnut/50 bg-chocolate/40 p-5">
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-brass">
          Opening Statement
        </p>
        <FormField label="Small Label">
          <input name="eyebrow" defaultValue={content.eyebrow} className={inputClass} />
        </FormField>
        <FormField label="Headline — Line 1">
          <input name="headline_line1" defaultValue={content.headlineLine1} className={inputClass} />
        </FormField>
        <FormField label="Headline — Line 2 (italic)">
          <input name="headline_line2" defaultValue={content.headlineLine2} className={inputClass} />
        </FormField>
      </div>

      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-brass">
          Sections
        </p>
        <p className="mt-1 font-sans text-xs text-taupe">
          Each one alternates text and image down the page.
        </p>

        <div className="mt-4 flex flex-col gap-6">
          {sections.map((section, i) => (
            <div key={i} className="flex flex-col gap-3 border border-walnut/40 p-4">
              <div className="flex items-center justify-between">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brass">
                  Section {i + 1}
                </p>
                <button
                  type="button"
                  onClick={() => setSections((s) => s.filter((_, idx) => idx !== i))}
                  className="font-sans text-[11px] uppercase tracking-[0.16em] text-taupe transition-colors hover:text-[#d98b85]"
                >
                  Remove
                </button>
              </div>
              <FormField label="Small Label" hint="e.g. 01 / Philosophy">
                <input name="section_label" defaultValue={section.label} className={inputClass} />
              </FormField>
              <FormField label="Title">
                <input name="section_title" defaultValue={section.title} className={inputClass} />
              </FormField>
              <FormField label="Body">
                <textarea
                  name="section_body"
                  defaultValue={section.body}
                  rows={3}
                  className={inputClass}
                />
              </FormField>
              <ImageUrlField name="section_image" label="Image URL" defaultValue={section.image} />
              <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-taupe">
                <input
                  type="checkbox"
                  name={`section_reverse_${i}`}
                  defaultChecked={section.reverse}
                  className="accent-brass"
                />
                Image on the left (reverse layout)
              </label>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            setSections((s) => [...s, { label: "", title: "", body: "", image: "", reverse: false }])
          }
          className="mt-4 w-fit font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
        >
          + Add Section
        </button>
      </div>

      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}
      {state.success && <p className="font-sans text-xs text-brass">Story page updated.</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-fit border border-brass/60 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save Story Page"}
      </button>
    </form>
  );
}
