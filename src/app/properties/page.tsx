import { getProperties } from "../lib/api";
import { PropertyCard } from "../components/PropertyCard";
import { PropertyFilters } from "../lib/api";
import PropertySearch from "../components/PropertySearch";

type PropertiesPageProps = {
  searchParams: Promise<PropertyFilters>;
};
export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const filters = await searchParams;
  const properties = await getProperties(filters);

  return (
    <main>
      <h1>Boenden</h1>
      <PropertySearch filters={filters} />
      {properties.map((property) => (
        <PropertyCard key={property.property_id} property={property} />
      ))}
    </main>
  );
}
