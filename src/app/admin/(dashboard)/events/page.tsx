import Image from "next/image";
import Link from "next/link";
import { getAllEventsAdmin } from "@/lib/data/events";
import { deleteEvent } from "@/lib/data/event-actions";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { EVENT_CATEGORY_LABELS } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";

export default async function AdminEventsPage() {
  const events = await getAllEventsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-ivory">Events</h1>
        <Link
          href="/admin/events/new"
          className="border border-brass/60 px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10"
        >
          + New Event
        </Link>
      </div>

      <div className="mt-10 flex flex-col divide-y divide-walnut/40 border-t border-walnut/40">
        {events.length === 0 && (
          <p className="py-8 font-sans text-sm text-taupe">
            No events yet. Create the first one.
          </p>
        )}
        {events.map((event) => {
          const d = formatEventDate(event.date);
          return (
            <div key={event.id} className="flex items-center gap-4 py-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-walnut bg-espresso">
                {event.imageUrl && (
                  <Image src={event.imageUrl} alt="" fill unoptimized className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg text-ivory">{event.title}</p>
                <p className="mt-1 font-sans text-[11px] uppercase tracking-[0.16em] text-taupe">
                  {d.full} · {EVENT_CATEGORY_LABELS[event.category]}
                  {!event.published && " · Unpublished"}
                  {event.featured && " · Featured"}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-5">
                <Link
                  href={`/admin/events/${event.id}`}
                  className="font-sans text-[11px] uppercase tracking-[0.18em] text-taupe transition-colors hover:text-cream"
                >
                  Edit
                </Link>
                <DeleteButton action={deleteEvent.bind(null, event.id)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
