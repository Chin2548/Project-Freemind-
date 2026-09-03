import { EventForm } from "@/components/admin/EventForm";
import { createEvent } from "@/lib/data/event-actions";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">New Event</h1>
      <div className="mt-10">
        <EventForm action={createEvent} />
      </div>
    </div>
  );
}
