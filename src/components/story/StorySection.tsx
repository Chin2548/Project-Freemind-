import { ImageReveal } from "@/components/ImageReveal";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLabel } from "@/components/SectionLabel";

interface StorySectionProps {
  label: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

export function StorySection({
  label,
  title,
  body,
  image,
  imageAlt,
  reverse = false,
}: StorySectionProps) {
  return (
    <section className="relative bg-obsidian py-20 md:py-32">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        <div
          className={`md:col-span-5 md:pt-16 ${
            reverse ? "md:order-2 md:col-start-8" : "md:order-1 md:col-start-1"
          }`}
        >
          <RevealOnScroll>
            <SectionLabel>{label}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="mt-6 font-serif text-3xl leading-[1.1] text-ivory md:text-4xl">
              {title}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-taupe md:text-base">
              {body}
            </p>
          </RevealOnScroll>
        </div>

        <div
          className={`md:col-span-6 ${
            reverse ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-7"
          }`}
        >
          <ImageReveal src={image} alt={imageAlt} className="aspect-[4/5] w-full" />
        </div>
      </div>
    </section>
  );
}
