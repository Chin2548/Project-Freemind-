export function AdminSection({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border border-walnut/50 bg-chocolate/40 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
        <div>
          <p className="font-serif text-lg text-ivory">{title}</p>
          {description && (
            <p className="mt-0.5 font-sans text-xs text-taupe">{description}</p>
          )}
        </div>
        <span className="shrink-0 font-sans text-taupe transition-transform duration-300 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="flex flex-col gap-6 border-t border-walnut/40 px-5 py-6">{children}</div>
    </details>
  );
}
