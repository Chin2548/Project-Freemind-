import type { Metadata } from "next";
import { getEvents } from "@/lib/data/events";
import { EventArchive } from "@/components/events/EventArchive";

export const metadata: Metadata = {
  title: "What's Happening",
  description: "Music, collaborations, tastings, and nights worth staying out for.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="pt-32 pb-24 md:pt-40 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <p className="font-sans text-xs uppercase tracking-[0.32em] text-brass">
          What&apos;s Happening
        </p>
        <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.05] text-ivory md:text-6xl">
          Music, collaborations, tastings,
          <br />
          and nights worth staying out for.
        </h1>

        <div className="mt-16">
          <EventArchive events={events} />
        </div>
      </div>
    </div>
  );
}
