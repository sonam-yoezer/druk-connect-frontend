import { apiFetch } from "@/src/lib/api/client";

export async function deleteListing(listingId: string): Promise<void> {
  const response = await apiFetch(`/api/v1/listings/${listingId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Failed to delete listing");
  }
}
