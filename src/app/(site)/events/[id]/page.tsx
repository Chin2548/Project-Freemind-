import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventById, getEvents } from "@/lib/data/events";
import { ReservationButton } from "@/components/ReservationButton";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { EVENT_CATEGORY_LABELS } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ id: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) return {};
  return { title: event.title, description: event.description };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  const d = formatEventDate(event.date);
  const bookingUrl =
    event.bookingUrl === "#reserve"
      ? `/reserve?event=${encodeURIComponent(event.title)}`
      : event.bookingUrl;

  return (
    <div className="pt-28 pb-24 md:pt-32 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Link
          href="/events"
          data-cursor="explore"
          className="font-sans text-xs uppercase tracking-[0.24em] text-taupe transition-colors hover:text-ivory"
        >
          ← Back to what&apos;s happening
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-chocolate">
              <Image src={event.imageUrl} alt={event.title} fill className="object-cover" priority />
            </div>
          </div>

          <div className="md:col-span-5 md:pt-4">
            <RevealOnScroll>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-brass">
                {EVENT_CATEGORY_LABELS[event.category]}
              </p>
              <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-ivory md:text-5xl">
                {event.title}
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="mt-8 space-y-1 font-sans text-sm text-taupe">
                <p className="text-cream">{d.full}</p>
                <p>{event.startTime} — {event.endTime}</p>
                <p>{event.location}</p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2}>
              <p className="mt-8 font-serif text-lg italic leading-relaxed text-cream">
                &ldquo;{event.description}&rdquo;
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <div className="mt-10">
                <ReservationButton href={bookingUrl}>
                  Reserve Your Table
                </ReservationButton>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
