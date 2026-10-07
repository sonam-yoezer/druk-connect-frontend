import { apiFetch } from "@/src/lib/api/client";
import type { ListingsResponse } from "../types/listing";

export async function getMyListings(): Promise<ListingsResponse> {
  const response = await apiFetch("/api/v1/listings/getMyListings");

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Failed to fetch listings");
  }

  return response.json();
}
