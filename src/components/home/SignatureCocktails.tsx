import Link from "next/link";
import { ImageReveal } from "@/components/ImageReveal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLabel } from "@/components/SectionLabel";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";

export function SignatureCocktails({
  items,
  label,
  headline,
}: {
  items: MenuItem[];
  label: string;
  headline: string;
}) {
  return (
    <section className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <RevealOnScroll>
              <SectionLabel>{label}</SectionLabel>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ivory md:text-5xl">
                {headline}
              </h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.15}>
            <Link
              href="/menu"
              data-cursor="explore"
              className="font-sans text-xs uppercase tracking-[0.28em] text-taupe underline decoration-brass/50 decoration-1 underline-offset-8 transition-colors hover:text-ivory"
            >
              Read the full story →
            </Link>
          </RevealOnScroll>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {items.slice(0, 3).map((item, i) => (
            <RevealOnScroll key={item.id} delay={0.1 * i}>
              <Link href={`/menu/${item.id}`} data-cursor="read" className="group block">
                <ImageReveal
                  src={item.imageUrl}
                  alt={item.name}
                  className="aspect-[4/5] w-full"
                />
                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl text-ivory">{item.name}</h3>
                    <span className="font-sans text-sm text-brass">
                      {formatPrice(item.price, item.currency)}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-xs uppercase tracking-[0.16em] text-taupe">
                    {item.ingredients.join(" / ")}
                  </p>
                  <p className="mt-3 font-serif italic text-sm text-taupe">
                    {item.description}
                  </p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
