import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SectionLabel } from "@/components/SectionLabel";
import { EVENT_CATEGORY_LABELS } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";
import type { BarEvent } from "@/lib/types";

export function WhatsHappening({
  events,
  label,
  headline,
}: {
  events: BarEvent[];
  label: string;
  headline: string;
}) {
  return (
    <section className="relative bg-chocolate py-24 md:py-36">
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
              href="/events"
              data-cursor="explore"
              className="font-sans text-xs uppercase tracking-[0.28em] text-taupe underline decoration-brass/50 decoration-1 underline-offset-8 transition-colors hover:text-ivory"
            >
              See all events →
            </Link>
          </RevealOnScroll>
        </div>

        <div className="mt-16 flex flex-col divide-y divide-walnut/50 border-t border-walnut/50">
          {events.slice(0, 3).map((event, i) => {
            const d = formatEventDate(event.date);
            return (
              <RevealOnScroll key={event.id} delay={0.08 * i}>
                <Link
                  href={`/events/${event.id}`}
                  data-cursor="open"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-8 md:grid-cols-[100px_1fr_auto_auto] md:gap-10"
                >
                  <span className="font-serif text-4xl text-ivory md:text-5xl">
                    {d.day}
                  </span>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-brass">
                      {EVENT_CATEGORY_LABELS[event.category]}
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-ivory transition-colors group-hover:text-cream md:text-2xl">
                      {event.title}
                    </h3>
                  </div>
                  <span className="hidden font-sans text-xs uppercase tracking-[0.16em] text-taupe md:block">
                    {d.weekday}
                  </span>
                  <span className="font-sans text-xs text-taupe">
                    {event.startTime} — {event.endTime}
                  </span>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
