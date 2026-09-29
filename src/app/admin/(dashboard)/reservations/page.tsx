import { getReservationsAdmin } from "@/lib/data/reservations";
import { ReservationsTable } from "@/components/admin/ReservationsTable";

export default async function AdminReservationsPage() {
  const reservations = await getReservationsAdmin();

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Reservations</h1>
      <p className="mt-2 max-w-lg font-sans text-sm text-taupe">
        Table requests submitted from the site. Mark them confirmed or
        cancelled as you follow up.
      </p>
      <div className="mt-10">
        <ReservationsTable reservations={reservations} />
      </div>
    </div>
  );
}
