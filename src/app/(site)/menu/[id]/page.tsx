import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMenuItemById, getMenuItems } from "@/lib/data/menu";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { formatPrice } from "@/lib/utils";

export async function generateStaticParams() {
  const items = await getMenuItems();
  return items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getMenuItemById(id);
  if (!item) return {};
  return {
    title: item.name,
    description: item.description,
  };
}

export default async function CocktailStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getMenuItemById(id);
  if (!item) notFound();

  return (
    <div className="pt-28 pb-24 md:pt-32 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Link
          href="/menu"
          data-cursor="explore"
          className="font-sans text-xs uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ivory"
        >
          ← Back to the menu
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-chocolate">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" priority />
            </div>
          </div>

          <div className="md:col-span-6 md:pt-4">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-taupe">
                {item.ingredients.join(" / ")}
              </p>
              <div className="mt-4 flex items-baseline justify-between gap-6">
                <h1 className="font-serif text-5xl leading-[1.02] text-ivory md:text-6xl">
                  {item.name}
                </h1>
                <span className="shrink-0 font-sans text-xl text-brass">
                  {formatPrice(item.price, item.currency)}
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                The Story
              </p>
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-cream md:text-xl">
                &ldquo;{item.story}&rdquo;
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                Flavor Profile
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {item.flavorProfile.map((f) => (
                  <span key={f} className="font-sans text-sm text-taupe">
                    {f}
                  </span>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <p className="mt-10 font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                Best Enjoyed
              </p>
              <p className="mt-4 font-serif italic text-cream">
                &ldquo;{item.recommendedOccasion}&rdquo;
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
