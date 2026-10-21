"use client";
import * as React from "react";
import Link from "next/link";
import { useUser } from "../context/user";
import type { NewBooking } from "@/types/booking";
import { count } from "console";

type BookingFormProps = {
  propertyId: string;
  pricePerNight: number;
};

type ErrorResponse = {
  message?: string;
  error?: string;
  errors?: [string, string][];
};

function countNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export default function BookingForm({
  propertyId,
  pricePerNight,
}: BookingFormProps) {
  const { user, isLoading } = useUser();

  const [guestName, setGuestName] = React.useState("");
  const [guestEmail, setGuestEmail] = React.useState("");
  const [guests, setGuests] = React.useState("1");
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const nights = countNights(checkIn, checkOut);
  const totalPrice = nights * pricePerNight;

  if (isLoading) return null;
  if (!user) {
    return (
      <p>
        <Link href="/login">Logga in</Link> för att boka
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSuccess(false);

    const body: NewBooking = {
      property_id: propertyId,
      guest_name: guestName,
      guest_email: guestEmail,
      guests: Number(guests),
      check_in: checkIn,
      check_out: checkOut,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        const data = (await response.json()) as ErrorResponse;

        if (data.errors) {
          setFieldErrors(Object.fromEntries(data.errors));
        } else {
          setError(data.message ?? data.error ?? "Något gick fel");
        }
        return;
      }

      setSuccess(true);
    } catch {
      setError("Kunde inte nå servern");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Boka</h2>

      <label>
        Namn
        <input
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
      </label>
      {fieldErrors.guest_name && <p>{fieldErrors.guest_name}</p>}

      <label>
        E-post
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
      </label>
      {fieldErrors.guest_email && <p>{fieldErrors.guest_email}</p>}

      <label>
        Antal gäster
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </label>
      {fieldErrors.guests && <p>{fieldErrors.guests}</p>}

      <label>
        Incheckning
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </label>
      {fieldErrors.check_in && <p>{fieldErrors.check_in}</p>}

      <label>
        Utcheckning
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </label>
      {fieldErrors.check_out && <p>{fieldErrors.check_out}</p>}

      <p>
        {nights} {nights === 1 ? "natt" : "nätter"} x {pricePerNight} kr ={" "}
        <strong>{totalPrice} kr</strong>
      </p>

      <button type="submit">Boka</button>

      {error && <p>{error}</p>}
      {success && <p>Tack för din bokning</p>}
    </form>
  );
}
