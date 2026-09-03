import Link from "next/link";
import { cn } from "@/lib/utils";

interface ReservationButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
}

export function ReservationButton({
  href,
  children,
  className,
  variant = "light",
}: ReservationButtonProps) {
  const external = href.startsWith("http");

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      data-cursor="reserve"
      className={cn(
        "group relative inline-flex w-fit items-center gap-3 font-sans text-xs uppercase tracking-[0.28em]",
        variant === "light" ? "text-ivory" : "text-obsidian",
        className
      )}
    >
      <span className="relative pb-1">
        {children}
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0",
            variant === "light" ? "bg-brass" : "bg-obsidian"
          )}
        />
        <span
          className={cn(
            "absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-100 group-hover:scale-x-100",
            variant === "light" ? "bg-ivory" : "bg-obsidian"
          )}
        />
      </span>
      <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
