import { getProperties } from "../lib/api";
import { PropertyCard } from "../components/PropertyCard";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main>
      <h1>Properties</h1>
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </main>
  );
}
