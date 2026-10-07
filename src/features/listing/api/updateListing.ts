import { apiFetch } from "@/src/lib/api/client";

export type UpdateListingData = {
  pricingType?: "PAID" | "FREE";
  rateAmount?: number | null;
  availability?: "BOTH" | "WEEKDAYS" | "WEEKENDS";
};

export async function updateListing(
  listingId: string,
  data: UpdateListingData,
): Promise<void> {
  const response = await apiFetch(`/api/v1/listings/${listingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Failed to update listing");
  }
}
