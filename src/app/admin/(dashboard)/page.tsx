import Link from "next/link";
import { getAllMenuItemsAdmin } from "@/lib/data/menu";
import { getAllEventsAdmin } from "@/lib/data/events";
import { getReservationsAdmin } from "@/lib/data/reservations";

export default async function AdminOverviewPage() {
  const [menuItems, events, reservations] = await Promise.all([
    getAllMenuItemsAdmin(),
    getAllEventsAdmin(),
    getReservationsAdmin(),
  ]);

  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= todayStr);
  const stats = [
    {
      label: "Pending Reservations",
      value: reservations.filter((r) => r.status === "pending").length,
      href: "/admin/reservations",
    },
    { label: "Menu Items", value: menuItems.length, href: "/admin/menu" },
    { label: "Upcoming Events", value: upcoming.length, href: "/admin/events" },
    {
      label: "Featured Events",
      value: events.filter((e) => e.featured).length,
      href: "/admin/events",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-ivory">Overview</h1>
      <p className="mt-2 font-sans text-sm text-taupe">
        A quick look at what&apos;s live on the site.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="border border-walnut/50 bg-chocolate p-6 transition-colors hover:border-brass/50"
          >
            <p className="font-serif text-4xl text-ivory">{stat.value}</p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.18em] text-taupe">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-14">
        <p className="font-sans text-[10px] uppercase tracking-[0.24em] text-taupe/70">
          Quick actions
        </p>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link
            href="/admin/homepage"
            className="border border-brass/60 px-5 py-3 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10"
          >
            Edit Homepage
          </Link>
          <Link
            href="/admin/menu/new"
            className="border border-brass/60 px-5 py-3 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10"
          >
            + New Menu Item
          </Link>
          <Link
            href="/admin/events/new"
            className="border border-brass/60 px-5 py-3 font-sans text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-brass/10"
          >
            + New Event
          </Link>
        </div>
      </div>
    </div>
  );
}
