import type { ListingDetails } from "../types/listing";

export async function getListingById(
  listingId: string,
): Promise<ListingDetails> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/listings/${listingId}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to fetch listing");
  }

  return res.json();
}
