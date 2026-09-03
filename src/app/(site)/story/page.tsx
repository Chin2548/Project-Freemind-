import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { StorySection } from "@/components/story/StorySection";
import { getStoryContent } from "@/lib/data/story";

export const metadata: Metadata = {
  title: "The Freemind Story",
  description:
    "Some places are built to be seen. Others are built to be felt. The story behind Freemind BKK.",
};

export default async function StoryPage() {
  const content = await getStoryContent();

  return (
    <div className="pt-32 pb-12 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <RevealOnScroll>
          <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
            {content.eyebrow}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h1 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-[1.15] text-ivory md:text-6xl">
            {content.headlineLine1}
            <br />
            <span className="italic text-taupe">{content.headlineLine2}</span>
          </h1>
        </RevealOnScroll>
      </div>

      <div className="mt-16 md:mt-24">
        {content.sections.map((section, i) => (
          <StorySection
            key={`${section.label}-${i}`}
            label={section.label}
            title={section.title}
            body={section.body}
            image={section.image}
            imageAlt={section.title}
            reverse={section.reverse}
          />
        ))}
      </div>
    </div>
  );
}
