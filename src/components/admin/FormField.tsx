export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-taupe">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-1 font-sans text-[11px] text-taupe/70">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full border border-walnut bg-chocolate px-4 py-2.5 font-sans text-sm text-cream outline-none focus:border-brass";
