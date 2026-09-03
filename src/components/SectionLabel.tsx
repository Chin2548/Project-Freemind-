import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-sans text-xs uppercase tracking-[0.28em]",
        light ? "text-brass" : "text-taupe",
        className
      )}
    >
      {children}
    </p>
  );
}
