"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import {
  createCategory,
  deleteCategory,
  renameCategory,
  reorderCategories,
} from "@/lib/data/category-actions";
import { inputClass } from "./FormField";
import type { MenuCategoryDef } from "@/lib/types";

export function CategoryManager({ categories }: { categories: MenuCategoryDef[] }) {
  const [createState, createAction, createPending] = useActionState(createCategory, {
    error: null,
  });
  const [list, setList] = useState(categories);
  const [deleteError, setDeleteError] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();
  const addFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (createState.category) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local list with the server action's result, not derivable during render
      setList((prev) => [...prev, createState.category!]);
      addFormRef.current?.reset();
    }
  }, [createState]);

  const move = (index: number, direction: -1 | 1) => {
    const next = [...list];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setList(next);
    startTransition(() => {
      reorderCategories(next.map((c) => c.id));
    });
  };

  const handleRename = (id: string, label: string) => {
    setList((prev) => prev.map((c) => (c.id === id ? { ...c, label } : c)));
  };

  const handleRenameCommit = (id: string, label: string) => {
    startTransition(() => {
      renameCategory(id, label);
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category? This can't be undone.")) return;
    const result = await deleteCategory(id);
    if (result.error) {
      setDeleteError((prev) => ({ ...prev, [id]: result.error! }));
    } else {
      setList((prev) => prev.filter((c) => c.id !== id));
      setDeleteError((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  return (
    <div className="flex max-w-xl flex-col gap-10">
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-brass">
          Existing Categories
        </p>
        <div className="mt-4 flex flex-col divide-y divide-walnut/40 border-y border-walnut/40">
          {list.length === 0 && (
            <p className="py-6 font-sans text-sm text-taupe">No categories yet.</p>
          )}
          {list.map((cat, i) => (
            <div key={cat.id} className="flex flex-col gap-2 py-4">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    className="font-sans text-xs text-taupe transition-colors hover:text-cream disabled:opacity-20"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === list.length - 1}
                    className="font-sans text-xs text-taupe transition-colors hover:text-cream disabled:opacity-20"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                </div>
                <input
                  defaultValue={cat.label}
                  onChange={(e) => handleRename(cat.id, e.target.value)}
                  onBlur={(e) => handleRenameCommit(cat.id, e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id)}
                  className="shrink-0 font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-[#d98b85]"
                >
                  Delete
                </button>
              </div>
              {deleteError[cat.id] && (
                <p className="pl-9 font-sans text-xs text-[#d98b85]">{deleteError[cat.id]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-brass">
          Add Category
        </p>
        <form ref={addFormRef} action={createAction} className="mt-4 flex items-start gap-3">
          <input
            name="label"
            placeholder="e.g. Mocktails"
            required
            className={inputClass}
          />
          <button
            type="submit"
            disabled={createPending}
            className="shrink-0 border border-brass/60 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10 disabled:opacity-50"
          >
            {createPending ? "Adding…" : "Add"}
          </button>
        </form>
        {createState.error && (
          <p className="mt-2 font-sans text-xs text-[#d98b85]">{createState.error}</p>
        )}
      </div>
    </div>
  );
}
