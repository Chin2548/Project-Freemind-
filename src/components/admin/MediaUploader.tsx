"use client";

import { useActionState, useRef } from "react";
import { uploadMedia } from "@/lib/data/media-actions";

export function MediaUploader() {
  const [state, formAction, pending] = useActionState(uploadMedia, { error: null });
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-wrap items-center gap-4 border border-dashed border-walnut p-6"
    >
      <input
        type="file"
        name="file"
        accept="image/*"
        required
        className="font-sans text-xs text-taupe file:mr-4 file:border file:border-walnut file:bg-chocolate file:px-4 file:py-2 file:font-sans file:text-xs file:uppercase file:tracking-[0.18em] file:text-cream"
      />
      <button
        type="submit"
        disabled={pending}
        className="border border-brass/60 px-5 py-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload"}
      </button>
      {state.error && <p className="font-sans text-xs text-[#d98b85]">{state.error}</p>}
    </form>
  );
}
