"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { NewProperty, Property, PropertyKind } from "@/types/property";

type ErrorResponse = {
  message?: string;
  error?: string;
  errors?: [string, string][];
};

export default function PropertyForm() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [maxGuests, setMaxGuests] = React.useState("");
  const [kind, setKind] = React.useState<PropertyKind>("apartment");
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const body: NewProperty = {
      title,
      description,
      location,
      price_per_night: Number(price),
      max_guests: Number(maxGuests),
      kind,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/properties`,
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
          setError(data.errors.map(([, message]) => message).join(". "));
        } else {
          setError(data.message ?? data.error ?? "Något gick fel");
        }
        return;
      }

      const property = (await response.json()) as Property;
      router.push(`/properties/${property.property_id}`);
    } catch {
      setError("Kunde inte nå servern");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titel
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Beskrivning
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        Plats
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </label>

      <label>
        Pris per natt
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>

      <label>
        Max antal gäster
        <input
          type="number"
          value={maxGuests}
          onChange={(e) => setMaxGuests(e.target.value)}
          required
        />
      </label>

      <label>
        Typ
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value as PropertyKind)}
        >
          <option value="apartment">Lägenhet</option>
          <option value="villa">Villa</option>
        </select>
      </label>

      <button type="submit">Skapa boende</button>

      {error && <p>{error}</p>}
    </form>
  );
}
