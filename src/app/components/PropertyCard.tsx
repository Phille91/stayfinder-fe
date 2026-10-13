import { Property } from "@/types/api";
import Link from "next/dist/client/link";

type PropertyCardProps = {
  property: Property;
};

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.property_id}`}>
      <article>
        <h2>{property.title}</h2>
        <p>{property.location}</p>
        <p>{property.price_per_night}</p>
      </article>
    </Link>
  );
}
