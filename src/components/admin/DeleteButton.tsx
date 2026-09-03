"use client";

export function DeleteButton({
  action,
  confirmMessage = "Delete this? This can't be undone.",
}: {
  action: () => void;
  confirmMessage?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-[#d98b85]"
      >
        Delete
      </button>
    </form>
  );
}
