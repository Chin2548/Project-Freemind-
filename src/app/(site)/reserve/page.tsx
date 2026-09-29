import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/data/settings";
import { ReservationForm } from "@/components/ReservationForm";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Reserve",
  description: "Reserve your table at Freemind BKK.",
};

export default async function ReservePage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const [settings, params] = await Promise.all([getSiteSettings(), searchParams]);
  const defaultNotes = params.event ? `Regarding: ${params.event}` : "";

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <RevealOnScroll>
          <p className="text-center font-sans text-xs uppercase tracking-[0.32em] text-brass">
            Get Your Table
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <h1 className="mt-6 text-center font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">
            Make a Reservation
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="mx-auto mt-6 max-w-md text-center font-sans text-sm leading-relaxed text-taupe">
            Tell us when you&apos;d like to visit, and we&apos;ll hold a table for
            you. We&apos;ll confirm shortly after.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="mt-14 border border-walnut/50 bg-chocolate/30 p-6 md:p-10">
            <ReservationForm defaultNotes={defaultNotes} />
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.25}>
          <p className="mt-10 text-center font-sans text-sm text-taupe">
            Prefer to talk it through? Call{" "}
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="text-cream transition-colors hover:text-ivory"
            >
              {settings.phone}
            </a>{" "}
            or email{" "}
            <a
              href={`mailto:${settings.email}`}
              className="text-cream transition-colors hover:text-ivory"
            >
              {settings.email}
            </a>
            .
          </p>
        </RevealOnScroll>
      </div>
    </div>
  );
}
