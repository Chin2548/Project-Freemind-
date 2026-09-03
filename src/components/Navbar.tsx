"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReservationButton } from "./ReservationButton";
import type { SiteSettings } from "@/lib/types";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/story", label: "Story" },
  { href: "/find-us", label: "Find Us" },
];

export function Navbar({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const [trackedPathname, setTrackedPathname] = useState(pathname);
  if (trackedPathname !== pathname) {
    setTrackedPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-walnut/60 bg-obsidian/85 backdrop-blur-sm"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
          <Link
            href="/"
            data-cursor="explore"
            className="font-serif text-lg tracking-[0.14em] text-ivory"
          >
            FREEMIND <span className="text-brass">BKK</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="explore"
                className={cn(
                  "font-sans text-[11px] uppercase tracking-[0.24em] transition-colors hover:text-ivory",
                  pathname === link.href ? "text-ivory" : "text-taupe"
                )}
              >
                {link.label}
              </Link>
            ))}
            <ReservationButton href={settings.reservationUrl}>Reserve</ReservationButton>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="h-px w-6 bg-ivory" />
            <span className="h-px w-6 bg-ivory" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-obsidian px-6 py-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg tracking-[0.14em] text-ivory">
                FREEMIND <span className="text-brass">BKK</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="font-sans text-[11px] uppercase tracking-[0.24em] text-taupe"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-4xl text-ivory"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ReservationButton href={settings.reservationUrl}>
                Reserve
              </ReservationButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
