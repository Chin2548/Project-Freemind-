"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { EVENT_CATEGORY_LABELS, type BarEvent, type EventCategory } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

const CATEGORIES: EventCategory[] = [
  "live-music",
  "dj-night",
  "guest-bartender",
  "tasting",
  "special-night",
  "collaboration",
];

export function EventArchive({ events }: { events: BarEvent[] }) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? events
        : events.filter((e) => e.category === activeCategory),
    [events, activeCategory]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, BarEvent[]>();
    for (const event of filtered) {
      const d = new Date(`${event.date}T00:00:00`);
      const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      map.set(key, [...(map.get(key) ?? []), event]);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const availableCategories = CATEGORIES.filter((c) => events.some((e) => e.category === c));

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-8">
        <nav className="flex flex-wrap gap-x-8 gap-y-3 border-b border-walnut/50 pb-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`font-sans text-xs uppercase tracking-[0.24em] transition-colors ${
              activeCategory === "all" ? "text-ivory" : "text-taupe hover:text-cream"
            }`}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-sans text-xs uppercase tracking-[0.24em] transition-colors ${
                activeCategory === cat ? "text-ivory" : "text-taupe hover:text-cream"
              }`}
            >
              {EVENT_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </nav>

        <div className="mt-4">
          {grouped.length === 0 && (
            <p className="py-12 font-serif italic text-taupe">
              Nothing scheduled yet in this category. Something is always
              being planned.
            </p>
          )}
          {grouped.map(([month, monthEvents]) => (
            <div key={month} className="mt-10 first:mt-0">
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-brass">
                {month}
              </p>
              <div className="mt-4 flex flex-col divide-y divide-walnut/40 border-t border-walnut/40">
                {monthEvents.map((event) => {
                  const d = formatEventDate(event.date);
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      data-cursor="open"
                      onMouseEnter={() => setHoveredImage(event.imageUrl)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="group flex items-start gap-6 py-7"
                    >
                      <div className="w-14 shrink-0">
                        <span className="block font-serif text-4xl text-ivory">
                          {d.day}
                        </span>
                        <span className="mt-1 block font-sans text-[10px] uppercase tracking-[0.16em] text-taupe">
                          {d.weekday.slice(0, 3)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-brass">
                          {EVENT_CATEGORY_LABELS[event.category]}
                        </p>
                        <h3 className="mt-1 font-serif text-2xl text-ivory transition-colors group-hover:text-cream">
                          {event.title}
                        </h3>
                        <p className="mt-1 font-sans text-xs text-taupe">
                          {event.startTime} — {event.endTime}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden aspect-[4/5] overflow-hidden bg-chocolate md:col-span-4 md:block">
        <AnimatePresence mode="wait">
          {hoveredImage ? (
            <motion.div
              key={hoveredImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image src={hoveredImage} alt="" fill className="object-cover" />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className="px-8 text-center font-serif italic text-taupe">
                Hover an evening to see it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
