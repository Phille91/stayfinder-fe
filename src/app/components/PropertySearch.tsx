import Link from "next/link";
import type { Property } from "@/types/api";
import { PropertyFilters } from "../lib/api";

type PropertySearchProps = {
  filters: PropertyFilters;
};

export default function PropertySearch({ filters }: PropertySearchProps) {
  return (
    <form action="properties" method="get">
      <input
        name="location"
        placeholder="Plats"
        defaultValue={filters.location}
      />
      <input
        name="maxprice"
        type="number"
        placeholder="Maxpris"
        defaultValue={filters.maxprice}
      />
      <input
        name="maxguests"
        type="number"
        placeholder="Antal gäster"
        defaultValue={filters.maxguests}
      />

      <select name="sort" defaultValue={filters.sort ?? ""}>
        <option value="">Ingen sortering</option>
        <option value="asc">Pris, lägst först</option>
        <option value="desc">Pris, högst först</option>
      </select>

      <button type="submit">Sök</button>
      <Link href="properties">Rensa</Link>
    </form>
  );
}
