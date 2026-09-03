"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "./FormField";
import { ImageUrlField } from "./ImageUrlField";
import { MENU_CATEGORY_LABELS, type MenuCategory, type MenuItem } from "@/lib/types";

type FormAction = (
  prevState: { error: string | null },
  formData: FormData
) => Promise<{ error: string | null }>;

export function MenuItemForm({
  action,
  item,
}: {
  action: FormAction;
  item?: MenuItem;
}) {
  const [state, formAction, pending] = useActionState(action, { error: null });

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <FormField label="Name">
        <input name="name" defaultValue={item?.name} required className={inputClass} />
      </FormField>

      <FormField label="Category">
        <select name="category" defaultValue={item?.category ?? "signatures"} className={inputClass}>
          {(Object.keys(MENU_CATEGORY_LABELS) as MenuCategory[]).map((c) => (
            <option key={c} value={c}>
              {MENU_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex gap-4">
        <FormField label="Price">
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={item?.price}
            required
            className={inputClass}
          />
        </FormField>
        <div className="w-24 shrink-0">
          <FormField label="Currency">
            <input name="currency" defaultValue={item?.currency ?? "$"} className={inputClass} />
          </FormField>
        </div>
      </div>

      <ImageUrlField name="image_url" defaultValue={item?.imageUrl} />

      <FormField label="Ingredients" hint="Comma-separated, e.g. Gin, Jasmine, Bitter Orange">
        <input
          name="ingredients"
          defaultValue={item?.ingredients.join(", ")}
          className={inputClass}
        />
      </FormField>

      <FormField label="Short Description">
        <textarea
          name="description"
          defaultValue={item?.description}
          rows={2}
          className={inputClass}
        />
      </FormField>

      <FormField label="Story">
        <textarea name="story" defaultValue={item?.story} rows={5} className={inputClass} />
      </FormField>

      <FormField label="Flavor Profile" hint="Comma-separated, e.g. Floral, Citrus, Dry">
        <input
          name="flavor_profile"
          defaultValue={item?.flavorProfile.join(", ")}
          className={inputClass}
        />
      </FormField>

      <FormField label="Best Enjoyed / Recommended Occasion">
        <input
          name="recommended_occasion"
          defaultValue={item?.recommendedOccasion}
          className={inputClass}
        />
      </FormField>

      <div className="flex gap-8">
        <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-taupe">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={item?.featured}
            className="accent-brass"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 font-sans text-xs uppercase tracking-[0.18em] text-taupe">
          <input
            type="checkbox"
            name="available"
            defaultChecked={item?.available ?? true}
            className="accent-brass"
          />
          Available
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
