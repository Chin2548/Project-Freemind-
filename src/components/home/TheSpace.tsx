import { ImageReveal } from "@/components/ImageReveal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLabel } from "@/components/SectionLabel";
import type { HomepageContent } from "@/lib/types";

export function TheSpace({ content }: { content: HomepageContent }) {
  return (
    <section id="the-space" className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-5 md:col-start-1 md:pt-16">
          <RevealOnScroll>
            <SectionLabel>{content.spaceLabel}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ivory md:text-5xl">
              {content.spaceHeadline}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-taupe md:text-base">
              {content.spaceBody}
            </p>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ImageReveal
            src={content.spaceImageUrl}
            alt="Dark wood interior of Freemind BKK, softly lit"
            className="aspect-[4/5] w-full"
          />
        </div>
      </div>
    </section>
  );
}
