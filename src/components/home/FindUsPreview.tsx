import { ImageReveal } from "@/components/ImageReveal";
import { ReservationButton } from "@/components/ReservationButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLabel } from "@/components/SectionLabel";
import type { HomepageContent, SiteSettings } from "@/lib/types";

export function FindUsPreview({
  settings,
  content,
}: {
  settings: SiteSettings;
  content: HomepageContent;
}) {
  return (
    <section className="relative bg-obsidian py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        <div className="md:col-span-5 md:col-start-1 md:pt-16">
          <RevealOnScroll>
            <SectionLabel>{content.findusLabel}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ivory md:text-5xl">
              {content.findusHeadline}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-taupe md:text-base">
              {settings.address}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.3}>
            <div className="mt-8">
              <ReservationButton href="/find-us">Get Directions</ReservationButton>
            </div>
          </RevealOnScroll>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ImageReveal
            src="/images/photos/cocktail-old-fashioned-light.jpg"
            alt="Entrance to Freemind BKK at night"
            className="aspect-[4/5] w-full"
          />
        </div>
      </div>
    </section>
  );
}
