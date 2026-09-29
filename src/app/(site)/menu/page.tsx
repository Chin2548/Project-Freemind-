import type { Metadata } from "next";
import { getMenuItems } from "@/lib/data/menu";
import { getMenuCategories } from "@/lib/data/categories";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "The Menu",
  description: "Drinks with a story — the full cocktail catalogue at Freemind BKK.",
};

export default async function MenuPage() {
  const [items, categories] = await Promise.all([getMenuItems(), getMenuCategories()]);

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
          The Menu
        </p>
        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">
          Drinks with a story.
        </h1>
        <p className="mt-6 max-w-md font-sans text-sm leading-relaxed text-taupe md:text-base">
          Every glass here begins somewhere else — a memory, a season, a
          quiet argument between two ingredients. Explore the full menu
          below.
        </p>

        <div className="mt-16">
          <MenuBrowser items={items} categories={categories} />
        </div>
      </div>
    </div>
  );
}
