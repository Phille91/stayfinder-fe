export type PropertyKind = "apartment" | "villa";

export type Property = {
  title: string;
  owner_id: string;
  description: string;
  location: string;
  price_per_night: number;
  max_guests: number;
  property_id: string;
  kind: PropertyKind;
  created_at: string;
};

export type NewProperty = Omit<
  Property,
  "property_id" | "created_at" | "owner_id"
>;
