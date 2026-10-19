import { apiFetch } from "@/src/lib/api/client";

export type UpdateListingData = {
  pricingType?: "PAID" | "FREE";
  rateAmount?: number | null;
  availability?: string;
  retainedImageIds?: string[];
  images?: File[];
};

export async function updateListing(listingId: string, data: UpdateListingData): Promise<void> {
  const { images, ...fields } = data;
  const options: RequestInit = { method: "PATCH" };
  if (images?.length) {
    const body = new FormData();
    body.append("data", JSON.stringify(fields));
    images.forEach(image => body.append("images", image));
    options.body = body;
  } else {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(fields);
  }
  const response = await apiFetch(`/api/v1/listings/${listingId}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Failed to update listing");
  }
}
