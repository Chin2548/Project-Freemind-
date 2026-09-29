"use client";

import { useState, useTransition } from "react";
import {
  deleteReservation,
  updateReservationStatus,
} from "@/lib/data/reservation-actions";
import { DeleteButton } from "./DeleteButton";
import type { Reservation, ReservationStatus } from "@/lib/types";

const STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: "text-brass",
  confirmed: "text-[#8fbf8f]",
  cancelled: "text-taupe/70",
};

export function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
  const [list, setList] = useState(reservations);
  const [, startTransition] = useTransition();

  const setStatus = (id: string, status: ReservationStatus) => {
    setList((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    startTransition(() => {
      updateReservationStatus(id, status);
    });
  };

  const remove = async (id: string) => {
    await deleteReservation(id);
    setList((prev) => prev.filter((r) => r.id !== id));
  };

  if (list.length === 0) {
    return (
      <p className="py-8 font-sans text-sm text-taupe">
        No reservation requests yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col divide-y divide-walnut/40 border-t border-walnut/40">
      {list.map((r) => (
        <div key={r.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <p className="font-serif text-lg text-ivory">{r.name}</p>
              <span className={`font-sans text-[10px] uppercase tracking-[0.18em] ${STATUS_COLORS[r.status]}`}>
                {STATUS_LABELS[r.status]}
              </span>
            </div>
            <p className="mt-1 font-sans text-xs text-taupe">
              {r.date} · {r.time} · {r.partySize} {r.partySize === 1 ? "guest" : "guests"}
            </p>
            <p className="mt-1 font-sans text-xs text-taupe">
              {r.phone} · {r.email}
            </p>
            {r.notes && (
              <p className="mt-2 max-w-md font-sans text-xs italic text-taupe">
                &ldquo;{r.notes}&rdquo;
              </p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <select
              value={r.status}
              onChange={(e) => setStatus(r.id, e.target.value as ReservationStatus)}
              className="border border-walnut bg-chocolate px-3 py-1.5 font-sans text-xs uppercase tracking-[0.14em] text-cream outline-none focus:border-brass"
            >
              {(Object.keys(STATUS_LABELS) as ReservationStatus[]).map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABELS[s]}
                </option>
              ))}
            </select>
            <DeleteButton
              action={() => remove(r.id)}
              confirmMessage="Delete this reservation request?"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
