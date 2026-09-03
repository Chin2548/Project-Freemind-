import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { getEventByIdAdmin } from "@/lib/data/events";
import { updateEvent } from "@/lib/data/event-actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventByIdAdmin(id);
  if (!event) notFound();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Edit {event.title}</h1>
      <div className="mt-10">
        <EventForm action={updateEvent.bind(null, id)} event={event} />
      </div>
    </div>
  );
}
