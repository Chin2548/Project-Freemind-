"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { MenuCategoryDef, MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function MenuBrowser({
  items,
  categories,
}: {
  items: MenuItem[];
  categories: MenuCategoryDef[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? "");
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const filtered = useMemo(
    () => items.filter((item) => item.category === activeCategory),
    [items, activeCategory]
  );

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-8">
        <nav className="flex flex-wrap gap-x-8 gap-y-3 border-b border-walnut/50 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-sans text-xs uppercase tracking-[0.24em] transition-colors ${
                activeCategory === cat.id ? "text-ivory" : "text-taupe hover:text-cream"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <div className="mt-4 flex flex-col divide-y divide-walnut/40">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/menu/${item.id}`}
                  data-cursor="read"
                  onMouseEnter={() => setHoveredImage(item.imageUrl)}
                  onMouseLeave={() => setHoveredImage(null)}
                  className="group flex items-start justify-between gap-6 py-7"
                >
                  <div className="flex gap-6">
                    <span className="w-6 shrink-0 font-sans text-xs text-taupe/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-serif text-2xl text-ivory transition-colors group-hover:text-cream md:text-3xl">
                        {item.name}
                      </h3>
                      <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-taupe">
                        {item.ingredients.join(" / ")}
                      </p>
                      <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-brass">
                        {item.flavorProfile.join(" · ")}
                      </p>
                      <span className="mt-3 inline-block font-sans text-[11px] uppercase tracking-[0.18em] text-taupe underline decoration-brass/40 underline-offset-4 opacity-0 transition-opacity group-hover:opacity-100">
                        Read the story →
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 font-sans text-sm text-brass">
                    {formatPrice(item.price, item.currency)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-12 font-serif italic text-taupe">
              This category is being reimagined. Check back soon.
            </p>
          )}
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
                Hover a drink to see it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
