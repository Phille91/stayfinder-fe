"use client";

import * as React from "react";
import { useUser } from "../context/user";
import type { Booking } from "@/types/booking";

type PropertyBookingsProps = {
  propertyId: string;
};

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function PropertyBookings({
  propertyId,
}: PropertyBookingsProps) {
  const { user } = useUser();

  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [editingId, setEditId] = React.useState<string | null>(null);
  const [editGuests, setEditGuests] = React.useState("");
  const [editCheckIn, setEditCheckIn] = React.useState("");
  const [editCheckOut, setEditCheckOut] = React.useState("");

  const loadBookings = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/bookings/properties/${propertyId}`, {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Kunde inte hämta bokningar");
      setBookings((await response.json()) as Booking[]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [propertyId]);

  React.useEffect(() => {
    if (user) loadBookings();
  }, [user, loadBookings]);

  async function handleDelete(bookingId: string) {
    setError(null);
    const response = await fetch(` ${API}/bookings/${bookingId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      setError("Kunde inte ta bort bokningen");
      return;
    }
    setBookings((current) => current.filter((b) => b.booking_id !== bookingId));
  }

  function startEdit(booking: Booking) {
    setEditId(booking.booking_id);
    setEditGuests(String(booking.guests));
    setEditCheckIn(booking.check_in);
    setEditCheckOut(booking.check_out);
  }

  async function handleSave(bookingId: string) {
    setError(null);
    const response = await fetch(`${API}/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        guests: Number(editGuests),
        check_in: editCheckIn,
        check_out: editCheckOut,
      }),
    });
    if (!response.ok) {
      const data = (await response.json()) as {
        errors?: [string, string][];
        error?: string;
      };
      setError(
        data.errors?.map(([, m]) => m).join(". ") ??
          data.error ??
          "Kunde inte spara",
      );
      return;
    }

    const updated = (await response.json()) as Booking;
    setBookings((current) =>
      current.map((b) => (b.booking_id === bookingId ? updated : b)),
    );
    setEditId(null);
  }

  if (!user) return null;
  if (isLoading) return <p>Laddar bokningar...</p>;

  return (
    <section>
      <h2>Bokningar</h2>
      {error && <p>{error}</p>}
      {bookings.length === 0 && <p>Inga bokningar än.</p>}

      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id}>
            {editingId === booking.booking_id ? (
              <>
                <input
                  type="number"
                  value={editGuests}
                  onChange={(e) => setEditGuests(e.target.value)}
                />
                <input
                  type="date"
                  value={editCheckIn}
                  onChange={(e) => setEditCheckIn(e.target.value)}
                />
                <input
                  type="date"
                  value={editCheckOut}
                  onChange={(e) => setEditCheckOut(e.target.value)}
                />
                <button onClick={() => handleSave(booking.booking_id)}>
                  Spara
                </button>
                <button onClick={() => setEditId(null)}>Avbryt</button>
              </>
            ) : (
              <>
                {booking.guest_name}, {booking.check_in} - {booking.check_out},{" "}
                {booking.guests} gäster ({booking.status})
                <button onClick={() => startEdit(booking)}>Ändra</button>
                <button onClick={() => handleDelete(booking.booking_id)}>
                  Ta bort
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
