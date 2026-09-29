"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/supabase/auth-actions";

const GROUPS = [
  {
    heading: "Content",
    links: [
      { href: "/admin", label: "Overview", hint: "Quick stats" },
      { href: "/admin/reservations", label: "Reservations", hint: "Table requests" },
      { href: "/admin/homepage", label: "Homepage", hint: "Text & images" },
      { href: "/admin/story", label: "Story Page", hint: "Text & images" },
      { href: "/admin/menu", label: "Menu", hint: "Drinks & prices" },
      { href: "/admin/categories", label: "Categories", hint: "Menu tabs" },
      { href: "/admin/events", label: "Events", hint: "What's on" },
    ],
  },
  {
    heading: "Site",
    links: [
      { href: "/admin/media", label: "Media", hint: "Photo uploads" },
      { href: "/admin/settings", label: "Settings", hint: "Contact & hours" },
    ],
  },
];

export function AdminSidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col justify-between border-r border-walnut/50 bg-chocolate p-6 md:w-60">
      <div>
        <Link href="/admin" className="font-serif text-lg tracking-[0.08em] text-ivory">
          FREEMIND <span className="text-brass">BKK</span>
        </Link>
        <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-taupe">
          Admin
        </p>

        <nav className="mt-10 flex flex-col gap-8">
          {GROUPS.map((group) => (
            <div key={group.heading}>
              <p className="px-3 font-sans text-[10px] uppercase tracking-[0.24em] text-taupe/70">
                {group.heading}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {group.links.map((link) => {
                  const active =
                    link.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-baseline justify-between gap-3 rounded-sm px-3 py-2 transition-colors ${
                        active ? "bg-espresso" : "hover:bg-espresso/40"
                      }`}
                    >
                      <span
                        className={`font-sans text-xs uppercase tracking-[0.18em] ${
                          active ? "text-ivory" : "text-cream"
                        }`}
                      >
                        {link.label}
                      </span>
                      <span className="font-sans text-[10px] text-taupe/70">{link.hint}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-3 border-t border-walnut/40 pt-4">
        {email && <p className="truncate font-sans text-[11px] text-taupe">{email}</p>}
        <Link
          href="/"
          target="_blank"
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
        >
          ← View site
        </Link>
        <form action={signOut}>
          <button
            type="submit"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
          >
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
