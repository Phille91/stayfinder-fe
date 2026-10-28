import { getPropertyById } from "@/app/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/app/components/BookingForm";
import PropertyBookings from "@/app/components/PropertyBookings";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) notFound();

  return (
    <main>
      <Link href="/properties">← Tillbaka till alla boenden</Link>

      <h1>{property.title}</h1>
      <p>{property.location}</p>
      <p>{property.kind === "villa" ? "Villa" : "Lägenhet"}</p>

      <p>{property.description}</p>

      <p>{property.price_per_night} kr / natt</p>
      <p>Max {property.max_guests} gäster </p>

      <BookingForm
        propertyId={property.property_id}
        pricePerNight={property.price_per_night}
      />

      <PropertyBookings propertyId={property.property_id} />
    </main>
  );
}
