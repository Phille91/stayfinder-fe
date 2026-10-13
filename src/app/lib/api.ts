import { Property } from "@/types/api";

export async function getProperties(): Promise<Property[]> {
  const response = await fetch(`${process.env.API_BASE_URL}/properties`);

  if (!response.ok) {
    throw new Error("Could not fetch properties");
  }

  return response.json();
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const response = await fetch(`${process.env.API_BASE_URL}/properties/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 400) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Faild to fetch property");
  }
  return response.json();
}
