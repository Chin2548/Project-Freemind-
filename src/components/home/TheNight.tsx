import Image from "next/image";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import type { HomepageContent } from "@/lib/types";

export function TheNight({ content }: { content: HomepageContent }) {
  const lines = content.nightHeadline.split("\n");

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-obsidian py-24">
      <Image
        src={content.nightImageUrl}
        alt="Dim ambient light in the Freemind BKK bar at night"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-obsidian/55" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <RevealOnScroll>
          <h2 className="font-serif text-[9vw] leading-[1.05] tracking-tight text-ivory sm:text-[6vw] md:text-6xl">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </RevealOnScroll>
      </div>
    </section>
  );
}
