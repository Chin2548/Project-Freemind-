import { RevealOnScroll } from "@/components/RevealOnScroll";
import type { HomepageContent } from "@/lib/types";

export function Philosophy({ content }: { content: HomepageContent }) {
  const lines = content.philosophyHeadline.split("\n");

  return (
    <section className="relative bg-chocolate py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <RevealOnScroll>
          <h2 className="font-serif text-[13vw] leading-[0.98] tracking-tight text-ivory sm:text-[9vw] md:text-[6.5vw]">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <p className="mx-auto mt-10 max-w-md font-sans text-sm leading-relaxed text-taupe md:text-base">
            {content.philosophySubtext}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
