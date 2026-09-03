import Image from "next/image";
import { ReservationButton } from "@/components/ReservationButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import type { HomepageContent, SiteSettings } from "@/lib/types";

export function ReservationCTA({
  settings,
  content,
}: {
  settings: SiteSettings;
  content: HomepageContent;
}) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-obsidian py-24">
      <Image
        src={content.reserveImageUrl}
        alt=""
        fill
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-obsidian/50" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <RevealOnScroll>
          <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
            Reserve
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h2 className="mt-6 font-serif text-5xl leading-[1.05] text-ivory md:text-7xl">
            {content.reserveHeadline}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <div className="mt-10 flex justify-center">
            <ReservationButton href={settings.reservationUrl}>
              Reserve Your Evening
            </ReservationButton>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
