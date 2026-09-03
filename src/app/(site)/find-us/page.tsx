import type { Metadata } from "next";
import Image from "next/image";
import { getSiteSettings } from "@/lib/data/settings";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Find Your Way",
  description: "Find your way to Freemind BKK — address, hours, and how to reach us.",
};

export default async function FindUsPage() {
  const settings = await getSiteSettings();
  const mapQuery = encodeURIComponent(settings.address);

  return (
    <div className="pb-24 md:pb-36">
      {/* Hero with opening hours + contact overlaid, bottom-left/right */}
      <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-obsidian pt-24">
        <Image
          src={settings.findUsImageUrl}
          alt="Freemind BKK at night"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-obsidian/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-10 md:pb-28">
          <RevealOnScroll>
            <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
              Bangkok, Thailand
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">
              Opening Hours
            </h1>
          </RevealOnScroll>

          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:gap-14">
            <RevealOnScroll delay={0.15}>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                  Address
                </p>
                <p className="mt-3 max-w-[26ch] font-sans text-base font-medium leading-snug text-cream">
                  {settings.address}
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                  Reach Us
                </p>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="mt-3 block font-sans text-base font-medium tabular-nums text-cream transition-colors hover:text-ivory"
                >
                  {settings.phone}
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="mt-1 block font-sans text-sm text-taupe transition-colors hover:text-cream"
                >
                  {settings.email}
                </a>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.25}>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
                  We&apos;re Open
                </p>
                <div className="mt-3 space-y-1.5">
                  {settings.openingHours.map((entry) => (
                    <div key={entry.days} className="flex gap-4">
                      <span className="w-24 font-sans text-xs uppercase tracking-wide text-taupe">
                        {entry.days}
                      </span>
                      <span className="font-sans text-base font-medium tabular-nums text-cream">
                        {entry.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <a
                href="#map"
                data-cursor="view"
                className="inline-flex h-fit items-center border border-brass/60 px-6 py-3 font-sans text-xs uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-brass/10"
              >
                Open Our Map
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="scroll-mt-24">
        <div className="h-[45vh] min-h-[320px] w-full">
          <iframe
            title="Freemind BKK location"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
