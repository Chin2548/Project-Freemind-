"use client";

import Image from "next/image";
import { useState } from "react";
import { FormField, inputClass } from "./FormField";

export function ImageUrlField({
  name,
  label = "Image URL",
  defaultValue,
  hint = "Upload in Media, then paste the URL here.",
}: {
  name: string;
  label?: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [preview, setPreview] = useState(defaultValue ?? "");

  return (
    <FormField label={label} hint={hint}>
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-walnut bg-espresso">
          {preview ? (
            <Image
              src={preview}
              alt=""
              fill
              unoptimized
              className="object-cover"
              onError={() => setPreview("")}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center font-sans text-[9px] uppercase tracking-wider text-taupe/60">
              No image
            </span>
          )}
        </div>
        <input
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => setPreview(e.target.value)}
          className={inputClass}
        />
      </div>
    </FormField>
  );
}
